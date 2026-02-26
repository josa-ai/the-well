import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";
import { getUpcomingEvents, getFeaturedPastEvents, getPastEvents } from "@/lib/events";
import CategoryFilter from "@/components/events/CategoryFilter";
import EventCard from "@/components/events/EventCard";

export const metadata: Metadata = {
  title: "Events & Programming | The Well Lakeland",
  description:
    "Discover upcoming events, community programming, and culturally relevant gatherings at The Well in Lakeland, FL. RSVP to secure your spot.",
};

export default async function EventsPage() {
  let upcomingEvents: Awaited<ReturnType<typeof getUpcomingEvents>> = [];
  let featuredPastEvents: Awaited<ReturnType<typeof getFeaturedPastEvents>> = [];
  let pastEvents: Awaited<ReturnType<typeof getPastEvents>> = [];

  try {
    upcomingEvents = await getUpcomingEvents();
    featuredPastEvents = await getFeaturedPastEvents();
    pastEvents = await getPastEvents(8);
  } catch {
    // DB not available — show empty state
  }

  // Serialize dates for client components
  const serializedUpcoming = JSON.parse(JSON.stringify(upcomingEvents));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <h1
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Meet Us At The Well For Current Events and Culturally Relevant Programming
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Discover a vibrant array of upcoming events open to the public, where
            you can RSVP to secure your spot and join in the excitement. From
            lively community gatherings to enriching workshops, explore the
            diverse offerings and mark your calendar for an unforgettable
            experience. Contact us for further information or to inquire about
            hosting your own private event at The Well.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent font-[family-name:var(--font-inter)]">
                Coming Up
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                Upcoming Events
              </h2>
            </div>
            <CategoryFilter events={serializedUpcoming} />
          </div>
        </section>
      )}

      {/* Featured Past Events */}
      {featuredPastEvents.length > 0 && (
        <section className="bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
                Highlights
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                Featured Past Events
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPastEvents.map((event) => (
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
          </div>
        </section>
      )}

      {/* Past Events Gallery */}
      {pastEvents.length > 0 && (
        <section className={featuredPastEvents.length > 0 ? "bg-background py-20 sm:py-28" : "bg-surface py-20 sm:py-28"}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
                Gallery
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                Past Events at the Well
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                Discover the diverse events awaiting you at The Well, your premier
                co-working space for personal and professional growth.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pastEvents
                .filter((e) => !featuredPastEvents.some((f) => f.id === e.id))
                .map((event) => (
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
          </div>
        </section>
      )}

      {/* Show placeholder if no events at all */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <section className="bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <svg className="w-16 h-16 mx-auto text-text-muted/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-text">
              Events Coming Soon
            </h2>
            <p className="mt-3 text-text-muted font-[family-name:var(--font-inter)] max-w-md mx-auto">
              We&apos;re planning exciting events for the community. Check back soon or contact us for more information.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light active:scale-[0.97] font-[family-name:var(--font-inter)]"
              style={{ transition: "background-color 0.2s, transform 0.1s" }}
            >
              Contact Us
            </Link>
          </div>
        </section>
      )}

      {/* Host Your Event CTA */}
      <section className="relative py-20 sm:py-28 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Host Your Next Event at The Well
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Whether it&apos;s a corporate gathering, community celebration, or
            creative workshop, The Well provides the perfect space.
          </p>
          <a
            href={`${BUSINESS.eventRequestForm}?embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white
              hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
              active:scale-[0.97] font-[family-name:var(--font-inter)]"
            style={{ transition: "background-color 0.2s, transform 0.1s" }}
          >
            Submit Event Request
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
