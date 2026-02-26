import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/slugify";
import { EventStatus } from "@prisma/client";
import { sanitizeEventHtml } from "@/lib/sanitize";
import { generateRecurrenceDates } from "@/lib/recurrence";

// Public: list events with optional filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const featured = searchParams.get("featured");
  const time = searchParams.get("time"); // "upcoming" | "past"
  const limit = searchParams.get("limit");

  const now = new Date();

  const where = {
    status: EventStatus.PUBLISHED,
    isRecurrenceParent: false,
    ...(category ? { category } : {}),
    ...(featured === "true" ? { isFeatured: true } : {}),
    ...(time === "upcoming" ? { date: { gte: now } } : {}),
    ...(time === "past" ? { date: { lt: now } } : {}),
    ...(status === "draft" ? { status: EventStatus.DRAFT } : {}),
  };

  const events = await prisma.event.findMany({
    where,
    include: { photos: { orderBy: { order: "asc" } } },
    orderBy: { date: time === "past" ? "desc" : "asc" },
    ...(limit ? { take: parseInt(limit) } : {}),
  });

  return NextResponse.json(events);
}

// Admin: create event (with optional recurrence)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      date,
      endDate,
      location,
      details,
      category,
      tags,
      rsvpUrl,
      capacity,
      isFeatured,
      isFeaturedPast,
      status,
      recurrenceRule,
      recurrenceDays,
      recurrenceEndDate,
    } = body;

    if (!title || !date || !details) {
      return NextResponse.json(
        { error: "Title, date, and details are required" },
        { status: 400 }
      );
    }

    const sanitizedDetails = sanitizeEventHtml(details);
    const eventStatus = status === "PUBLISHED" ? EventStatus.PUBLISHED : EventStatus.DRAFT;

    const commonData = {
      title,
      location: location || undefined,
      details: sanitizedDetails,
      category: category || "community",
      tags: tags || [],
      rsvpUrl: rsvpUrl || null,
      capacity: capacity ? parseInt(capacity) : null,
      isFeatured: isFeatured || false,
      isFeaturedPast: isFeaturedPast || false,
    };

    // Non-recurring event
    if (!recurrenceRule || recurrenceRule === "none") {
      const slug = await generateUniqueSlug(title);
      const event = await prisma.event.create({
        data: {
          ...commonData,
          slug,
          date: new Date(date),
          endDate: endDate ? new Date(endDate) : null,
          status: eventStatus,
        },
        include: { photos: true },
      });

      revalidateTag("events", "max");
      return NextResponse.json(event, { status: 201 });
    }

    // Recurring event: generate dates and batch-create
    const startDate = new Date(date);
    const endDateParsed = recurrenceEndDate ? new Date(recurrenceEndDate) : null;
    const dates = generateRecurrenceDates(
      startDate,
      recurrenceRule,
      recurrenceDays || [],
      endDateParsed
    );

    if (dates.length === 0) {
      return NextResponse.json(
        { error: "No recurrence dates generated. Check your pattern and date range." },
        { status: 400 }
      );
    }

    const baseSlug = await generateUniqueSlug(title);
    const groupId = crypto.randomUUID();

    // Calculate event duration for endDate offset
    const durationMs = endDate
      ? new Date(endDate).getTime() - startDate.getTime()
      : 0;

    const result = await prisma.$transaction(async (tx) => {
      // Create hidden parent event (template)
      const parent = await tx.event.create({
        data: {
          ...commonData,
          slug: `${baseSlug}-parent`,
          date: startDate,
          endDate: endDate ? new Date(endDate) : null,
          status: EventStatus.DRAFT,
          isRecurrenceParent: true,
          recurrenceRule,
          recurrenceDays: recurrenceDays || [],
          recurrenceEndDate: endDateParsed,
          recurrenceGroupId: groupId,
        },
      });

      // Create individual instances
      const instances = [];
      for (const instanceDate of dates) {
        const dateStr = instanceDate.toISOString().split("T")[0];
        const instanceSlug = await generateUniqueSlug(`${title}-${dateStr}`);
        const instanceEndDate = durationMs
          ? new Date(instanceDate.getTime() + durationMs)
          : null;

        const instance = await tx.event.create({
          data: {
            ...commonData,
            slug: instanceSlug,
            date: instanceDate,
            endDate: instanceEndDate,
            status: eventStatus,
            recurrenceGroupId: groupId,
          },
        });
        instances.push(instance);
      }

      return { parent, instances };
    });

    revalidateTag("events", "max");
    return NextResponse.json(
      {
        ...result.parent,
        instanceCount: result.instances.length,
        instanceIds: result.instances.map((i) => i.id),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
