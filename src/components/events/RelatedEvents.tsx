import { getUpcomingEvents } from "@/lib/events";
import EventCard from "./EventCard";

export default async function RelatedEvents({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const events = await getUpcomingEvents(4);
  const related = events
    .filter((e) => e.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[var(--color-border)]">
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--color-text)] tracking-tight mb-8">
        More Upcoming Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((event) => (
          <EventCard
            key={event.slug}
            slug={event.slug}
            title={event.title}
            date={event.date}
            location={event.location}
            category={event.category}
            photos={event.photos}
          />
        ))}
      </div>
    </section>
  );
}
