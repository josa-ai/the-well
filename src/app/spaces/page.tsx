import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rental Spaces & Amenities | The Well Lakeland",
  description:
    "Explore versatile rental spaces, studios, and amenities at The Well. Host events, workshops, conferences, and more in Lakeland, FL.",
};

const eventSpaces = [
  {
    title: "Personal and Professional Development",
    description:
      "The Well offers a conducive environment for personal and professional growth, providing ample space and resources for workshops, seminars, and training sessions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" />
      </svg>
    ),
  },
  {
    title: "Faith-based Events",
    description:
      "Whether it's a religious gathering, prayer meeting, or spiritual retreat, The Well accommodates faith-based events with reverence and respect.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Corporate Workshops and Seminars",
    description:
      "Host your corporate events with confidence at The Well, equipped with state-of-the-art facilities and professional support.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Conferences/Networking Events",
    description:
      "From large-scale conferences to intimate networking sessions, The Well provides flexible spaces tailored to your needs.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Celebrations/Weddings",
    description:
      "Create unforgettable memories at The Well with our elegant event spaces perfect for weddings, receptions, and celebrations.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Fundraisers/Non-profit Events",
    description:
      "Make a meaningful impact with your fundraising or non-profit event at The Well.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Community Gatherings",
    description:
      "Foster connections and camaraderie within your community by hosting gatherings, meetups, and social events.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const communityPrograms = [
  "Financial Literacy Training",
  "Computer Training",
  "First Aid/CPR/CNA Training",
  "Business Plan Development",
  "College Scholarship Coaching",
  "Health & Wellness Coaching",
  "Training & Professional Development",
];

const amenities = [
  { name: "High-Speed Wi-Fi", icon: "wifi" },
  { name: "Secure Parking", icon: "parking" },
  { name: "Prep Kitchen", icon: "kitchen" },
  { name: "Live Stream Capabilities", icon: "stream" },
  { name: "Printing and Fax Services", icon: "print" },
  { name: "Admin Support Services", icon: "admin" },
  { name: "Mail Services", icon: "mail" },
  { name: "Video Conferencing Services", icon: "video" },
];

const studios = [
  {
    title: "Media Room",
    description:
      "Equipped for product photography and video filming, this versatile space features three backdrop options (green, black, and white) and a pipe grid with adjustable overhead studio lighting. Capacity: 10.",
    image: "https://placehold.co/600x400/1B4D6E/FAFAF7",
  },
  {
    title: "Video/Podcast Production Studio",
    description:
      "Craft your message with precision using cutting-edge technology in our studio.",
    image: "https://placehold.co/600x400/2A7B6F/FAFAF7",
  },
  {
    title: "Music Recording Studio",
    description:
      "Unleash your creativity in our fully-equipped studio, offering recording, mixing, mastering, editing, and training facilities.",
    image: "https://placehold.co/600x400/C8963E/FAFAF7",
  },
];

function AmenityIcon({ type }: { type: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    wifi: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
    ),
    parking: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1a2 2 0 012 2 2 2 0 01-2 2H9V7z" />
    ),
    kitchen: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    ),
    stream: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    ),
    print: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    ),
    admin: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    mail: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    video: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  };

  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {iconMap[type]}
    </svg>
  );
}

export default function SpacesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <h1
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Grow Your Community Reach With Our Rental Spaces
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            The Well is a hub for personal and professional growth, innovative
            events, and unforgettable experiences. Whether you&apos;re seeking a
            dynamic workspace, hosting an event, or attending one of our
            enriching programs like health and wellness coaching, The Well offers
            a welcoming environment where individuals and organizations can
            flourish.
          </p>
        </div>
      </section>

      {/* Versatile Event Spaces */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
              Versatile Spaces
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
              Versatile Event Spaces
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventSpaces.map((space) => (
              <div
                key={space.title}
                className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] p-8
                  hover:shadow-[0_8px_30px_rgba(27,77,110,0.12)]"
                style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/15"
                  style={{ transition: "background-color 0.3s" }}
                >
                  {space.icon}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-text">
                  {space.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                  {space.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empowering Your Community */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent font-[family-name:var(--font-inter)]">
              Programs
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
              Empowering Your Community
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {communityPrograms.map((program) => (
              <div
                key={program}
                className="rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] px-6 py-5 flex items-center gap-4
                  hover:shadow-[0_8px_30px_rgba(27,77,110,0.12)]"
                style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text font-[family-name:var(--font-inter)]">
                  {program}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Amenities */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
              Amenities
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
              Enhanced Amenities
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.name}
                className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] p-6 text-center
                  hover:shadow-[0_8px_30px_rgba(27,77,110,0.12)]"
                style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <AmenityIcon type={amenity.icon} />
                </div>
                <span className="text-sm font-medium text-text font-[family-name:var(--font-inter)]">
                  {amenity.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studios */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent font-[family-name:var(--font-inter)]">
              Creative Spaces
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
              Our Studios
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio.title}
                className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] overflow-hidden
                  hover:shadow-[0_8px_30px_rgba(27,77,110,0.12)]"
                style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    fill
                    className="object-cover group-hover:scale-105"
                    style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-text">
                    {studio.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                    {studio.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Events CTA */}
      <section className="relative py-20 sm:py-28 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Discover our upcoming events or book a space for your next gathering.
          </p>
          <Link
            href="/events"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white
              hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
              active:scale-[0.97] font-[family-name:var(--font-inter)]"
            style={{ transition: "background-color 0.2s, transform 0.1s" }}
          >
            Find Out More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
