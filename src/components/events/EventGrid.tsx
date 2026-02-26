import EventCard from "./EventCard";

type Event = {
  slug: string;
  title: string;
  date: Date | string;
  location: string;
  category: string;
  photos: { url: string; alt: string; isPrimary: boolean }[];
};

export default function EventGrid({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-12 h-12 mx-auto text-[var(--color-text-muted)]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <p className="text-[var(--color-text-muted)]">No events to show</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.slug} {...event} />
      ))}
    </div>
  );
}
