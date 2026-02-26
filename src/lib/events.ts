import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { EventStatus } from "@/generated/prisma/client";

// ── Public cached queries ──────────────────────────────────────────

export const getUpcomingEvents = unstable_cache(
  async (limit?: number) => {
    return prisma.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
        date: { gte: new Date() },
      },
      include: { photos: { orderBy: { order: "asc" } } },
      orderBy: { date: "asc" },
      ...(limit ? { take: limit } : {}),
    });
  },
  ["upcoming-events"],
  { tags: ["events"], revalidate: 60 }
);

export const getFeaturedEvents = unstable_cache(
  async () => {
    return prisma.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
        isFeatured: true,
      },
      include: { photos: { orderBy: { order: "asc" } } },
      orderBy: { date: "asc" },
      take: 3,
    });
  },
  ["featured-events"],
  { tags: ["events"], revalidate: 60 }
);

export const getFeaturedPastEvents = unstable_cache(
  async () => {
    return prisma.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
        isFeaturedPast: true,
        date: { lt: new Date() },
      },
      include: { photos: { orderBy: { order: "asc" } } },
      orderBy: { date: "desc" },
    });
  },
  ["featured-past-events"],
  { tags: ["events"], revalidate: 60 }
);

export const getPastEvents = unstable_cache(
  async (limit?: number) => {
    return prisma.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
        date: { lt: new Date() },
      },
      include: { photos: { orderBy: { order: "asc" } } },
      orderBy: { date: "desc" },
      ...(limit ? { take: limit } : {}),
    });
  },
  ["past-events"],
  { tags: ["events"], revalidate: 60 }
);

export const getEventBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.event.findUnique({
      where: { slug, status: EventStatus.PUBLISHED },
      include: { photos: { orderBy: { order: "asc" } } },
    });
  },
  ["event-by-slug"],
  { tags: ["events"], revalidate: 60 }
);

export const getAllEventSlugs = unstable_cache(
  async () => {
    const events = await prisma.event.findMany({
      where: { status: EventStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    });
    return events;
  },
  ["all-event-slugs"],
  { tags: ["events"], revalidate: 60 }
);

// ── Admin queries (not cached) ─────────────────────────────────────

export async function getAdminEvents(filter?: "upcoming" | "past" | "draft" | "all") {
  const now = new Date();

  const where =
    filter === "upcoming"
      ? { date: { gte: now }, status: EventStatus.PUBLISHED }
      : filter === "past"
        ? { date: { lt: now }, status: EventStatus.PUBLISHED }
        : filter === "draft"
          ? { status: EventStatus.DRAFT }
          : {};

  return prisma.event.findMany({
    where,
    include: { photos: { orderBy: { order: "asc" } } },
    orderBy: { date: "desc" },
  });
}

export async function getAdminEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
}
