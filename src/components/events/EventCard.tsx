import Link from "next/link";
import EventStatusBadge from "./EventStatusBadge";

type Photo = {
  url: string;
  alt: string;
  isPrimary: boolean;
};

type Props = {
  slug: string;
  title: string;
  date: Date | string;
  location: string;
  category: string;
  photos: Photo[];
};

export default function EventCard({
  slug,
  title,
  date,
  location,
  category,
  photos,
}: Props) {
  const eventDate = new Date(date);
  const primaryPhoto = photos.find((p) => p.isPrimary) || photos[0];

  return (
    <Link
      href={`/events/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-[0_1px_3px_rgba(27,77,110,0.06)] hover:shadow-[0_4px_16px_rgba(27,77,110,0.1),0_1px_3px_rgba(27,77,110,0.06)] transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {primaryPhoto ? (
          <>
            <img
              src={primaryPhoto.url}
              alt={primaryPhoto.alt || title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-[var(--color-primary)]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
        )}

        {/* Date overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center shadow-sm">
            <div className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide">
              {eventDate.toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="text-lg font-bold text-[var(--color-text)] leading-tight">
              {eventDate.getDate()}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <EventStatusBadge date={eventDate} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-wide capitalize">
            {category}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[var(--color-text)] tracking-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 mt-2 text-sm text-[var(--color-text-muted)]">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-sm text-[var(--color-text-muted)]">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {eventDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" at "}
            {eventDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
