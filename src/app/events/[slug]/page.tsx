import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventBySlug, getAllEventSlugs } from "@/lib/events";
import { sanitizeEventHtml } from "@/lib/sanitize";
import { generateEventSchema } from "@/lib/schema";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import PhotoGallery from "@/components/events/PhotoGallery";
import ShareButtons from "@/components/events/ShareButtons";
import CalendarButtons from "@/components/events/CalendarButtons";
import RelatedEvents from "@/components/events/RelatedEvents";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const slugs = await getAllEventSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    // DB not available at build time — generate dynamically
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  const primaryPhoto = event.photos.find((p) => p.isPrimary) || event.photos[0];
  const url = `${SITE_URL}/events/${event.slug}`;

  return {
    title: `${event.title} — ${SITE_NAME}`,
    description: event.details.slice(0, 160).replace(/[#*_\[\]]/g, ""),
    openGraph: {
      title: event.title,
      description: event.details.slice(0, 160).replace(/[#*_\[\]]/g, ""),
      url,
      type: "article",
      ...(primaryPhoto ? { images: [{ url: primaryPhoto.url, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.details.slice(0, 160).replace(/[#*_\[\]]/g, ""),
      ...(primaryPhoto ? { images: [primaryPhoto.url] } : {}),
    },
    alternates: { canonical: url },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const primaryPhoto = event.photos.find((p) => p.isPrimary) || event.photos[0];
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  const url = `${SITE_URL}/events/${event.slug}`;

  const eventSchema = generateEventSchema({
    name: event.title,
    startDate: event.date.toISOString(),
    endDate: event.endDate?.toISOString(),
    location: event.location,
    description: event.details.slice(0, 500),
    image: primaryPhoto?.url,
    url,
    rsvpUrl: event.rsvpUrl || undefined,
  });

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Events", item: `${SITE_URL}/events` },
      { "@type": "ListItem", position: 3, name: event.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={eventSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="bg-[var(--color-background)]">
        {/* Hero image */}
        {primaryPhoto && (
          <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
            <img
              src={primaryPhoto.url}
              alt={primaryPhoto.alt || event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-multiply" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/events" className="hover:text-[var(--color-primary)] transition-colors">
              Events
            </Link>
            <span>/</span>
            <span className="text-[var(--color-text)] truncate">{event.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-[var(--color-primary)] uppercase tracking-wide capitalize">
                {event.category}
              </span>
              <EventStatusBadge date={eventDate} />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text)] tracking-tight leading-[1.1]">
              {event.title}
            </h1>
          </header>

          {/* Event details summary */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-8 shadow-[0_1px_3px_rgba(27,77,110,0.06)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">When</p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {eventDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {eventDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {event.endDate && (
                      <>
                        {" — "}
                        {new Date(event.endDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">Where</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{event.location}</p>
                </div>
              </div>

              {event.capacity && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">Capacity</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{event.capacity} spots</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border-light)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                {event.rsvpUrl && !isPast && (
                  <a
                    href={event.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] active:scale-[0.98] transition-all duration-200"
                  >
                    RSVP / Get Tickets
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
                {!isPast && (
                  <CalendarButtons
                    title={event.title}
                    date={event.date.toISOString()}
                    endDate={event.endDate?.toISOString()}
                    location={event.location}
                    details={event.details}
                  />
                )}
              </div>
              <ShareButtons url={url} title={event.title} />
            </div>
          </div>

          {/* Event details */}
          <div
            className="prose prose-lg max-w-none text-[var(--color-text)] prose-headings:font-[family-name:var(--font-playfair)] prose-headings:tracking-tight prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: sanitizeEventHtml(event.details) }}
          />

          {/* Photo gallery */}
          {event.photos.length > 1 && (
            <section className="mt-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--color-text)] tracking-tight mb-6">
                Photos
              </h2>
              <PhotoGallery photos={event.photos} />
            </section>
          )}

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-background)] text-[var(--color-text-muted)] border border-[var(--color-border-light)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Related events */}
          <RelatedEvents currentSlug={event.slug} />
        </div>
      </article>
    </>
  );
}
