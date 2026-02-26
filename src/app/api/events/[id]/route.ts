import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/slugify";
import { EventStatus } from "@prisma/client";

// Public: get single event by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

// Admin: update event
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // If title changed, regenerate slug
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = await generateUniqueSlug(title);
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        slug,
        ...(date !== undefined ? { date: new Date(date) } : {}),
        ...(endDate !== undefined
          ? { endDate: endDate ? new Date(endDate) : null }
          : {}),
        ...(location !== undefined ? { location } : {}),
        ...(details !== undefined ? { details } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(tags !== undefined ? { tags } : {}),
        ...(rsvpUrl !== undefined ? { rsvpUrl: rsvpUrl || null } : {}),
        ...(capacity !== undefined
          ? { capacity: capacity ? parseInt(capacity) : null }
          : {}),
        ...(isFeatured !== undefined ? { isFeatured } : {}),
        ...(isFeaturedPast !== undefined ? { isFeaturedPast } : {}),
        ...(status !== undefined
          ? {
              status:
                status === "PUBLISHED"
                  ? EventStatus.PUBLISHED
                  : EventStatus.DRAFT,
            }
          : {}),
      },
      include: { photos: true },
    });

    revalidateTag("events", "max");
    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// Admin: delete event
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete associated blob images
    const photos = await prisma.eventPhoto.findMany({ where: { eventId: id } });
    for (const photo of photos) {
      try {
        const { del } = await import("@vercel/blob");
        await del(photo.url);
      } catch {
        // Blob deletion is best-effort
      }
    }

    await prisma.event.delete({ where: { id } });

    revalidateTag("events", "max");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
