import { notFound } from "next/navigation";
import { getAdminEventById } from "@/lib/events";
import EventForm from "@/components/admin/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getAdminEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--color-text)] tracking-tight mb-8">
        Edit Event
      </h1>
      <EventForm
        initialData={{
          id: event.id,
          title: event.title,
          date: event.date.toISOString(),
          endDate: event.endDate?.toISOString() || "",
          location: event.location,
          details: event.details,
          category: event.category,
          tags: event.tags,
          rsvpUrl: event.rsvpUrl || "",
          capacity: event.capacity?.toString() || "",
          isFeatured: event.isFeatured,
          isFeaturedPast: event.isFeaturedPast,
          status: event.status,
          photos: event.photos.map((p) => ({
            id: p.id,
            url: p.url,
            alt: p.alt,
            isPrimary: p.isPrimary,
            order: p.order,
          })),
        }}
      />
    </div>
  );
}
