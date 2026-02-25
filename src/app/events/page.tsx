import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Events & Programming | The Well Lakeland",
  description:
    "Discover upcoming events, community programming, and culturally relevant gatherings at The Well in Lakeland, FL. RSVP to secure your spot.",
};

const pastEvents = [
  {
    title: "The Murals Project",
    description: "A community art initiative celebrating local talent and cultural expression.",
    image: "https://placehold.co/600x400/1B4D6E/FAFAF7",
  },
  {
    title: "Community Membership Drive",
    description: "An open-door event welcoming new members to The Well community.",
    image: "https://placehold.co/600x400/2A7B6F/FAFAF7",
  },
  {
    title: "Init to Win It",
    description: "A startup pitch competition fostering entrepreneurship and innovation.",
    image: "https://placehold.co/600x400/C8963E/FAFAF7",
  },
  {
    title: "Book Signing",
    description: "An intimate gathering celebrating local authors and literary achievement.",
    image: "https://placehold.co/600x400/143A53/FAFAF7",
  },
];

export default function EventsPage() {
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

      {/* Past Events Gallery */}
      <section className="bg-surface py-20 sm:py-28">
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {pastEvents.map((event) => (
              <div
                key={event.title}
                className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] overflow-hidden
                  hover:shadow-[0_8px_30px_rgba(27,77,110,0.12)]"
                style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105"
                    style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white font-[family-name:var(--font-inter)]">
                      Past Event
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-text">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
