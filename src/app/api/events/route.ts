import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/slugify";
import { EventStatus } from "@/generated/prisma/client";

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

// Admin: create event
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
    } = body;

    if (!title || !date || !details) {
      return NextResponse.json(
        { error: "Title, date, and details are required" },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(title);

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        location: location || undefined,
        details,
        category: category || "community",
        tags: tags || [],
        rsvpUrl: rsvpUrl || null,
        capacity: capacity ? parseInt(capacity) : null,
        isFeatured: isFeatured || false,
        isFeaturedPast: isFeaturedPast || false,
        status: status === "PUBLISHED" ? EventStatus.PUBLISHED : EventStatus.DRAFT,
      },
      include: { photos: true },
    });

    revalidateTag("events", "max");
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
