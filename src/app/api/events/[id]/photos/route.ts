import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { del } from "@vercel/blob";

const MAX_PHOTOS = 4;

// Admin: add photo to event
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { url, alt, isPrimary } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Check photo limit
    const count = await prisma.eventPhoto.count({ where: { eventId: id } });
    if (count >= MAX_PHOTOS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_PHOTOS} photos per event` },
        { status: 400 }
      );
    }

    // If this is set as primary, unset existing primary
    if (isPrimary) {
      await prisma.eventPhoto.updateMany({
        where: { eventId: id, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    const photo = await prisma.eventPhoto.create({
      data: {
        eventId: id,
        url,
        alt: alt || "",
        isPrimary: isPrimary || count === 0, // First photo is auto-primary
        order: count,
      },
    });

    revalidateTag("events", "max");
    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("Failed to add photo:", error);
    return NextResponse.json(
      { error: "Failed to add photo" },
      { status: 500 }
    );
  }
}

// Admin: delete photo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get("photoId");
    const { id } = await params;

    if (!photoId) {
      return NextResponse.json(
        { error: "photoId is required" },
        { status: 400 }
      );
    }

    const photo = await prisma.eventPhoto.findFirst({
      where: { id: photoId, eventId: id },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Only delete the underlying blob if no other EventPhoto row references it.
    // Recurring events store the same blob URL on every instance's photo row, so
    // unconditional del() would break siblings.
    const stillReferenced = await prisma.eventPhoto.count({
      where: { url: photo.url, NOT: { id: photoId } },
    });
    if (stillReferenced === 0) {
      try {
        await del(photo.url);
      } catch {
        // Best-effort blob deletion
      }
    }

    await prisma.eventPhoto.delete({ where: { id: photoId } });

    revalidateTag("events", "max");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
