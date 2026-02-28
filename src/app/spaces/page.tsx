import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { WhatWeOfferSection } from "./SpacesSpotlightSections";

export const metadata: Metadata = {
  title: "Rental Spaces & Amenities | The Well Lakeland",
  description:
    "Explore versatile rental spaces, studios, and amenities at The Well. Host events, workshops, conferences, and more in Lakeland, FL.",
};

/* ─── Event Spaces Data (for bento grid) ─── */

const eventSpaces = [
  {
    title: "Personal and Professional Development",
    description:
      "The Well offers a conducive environment for personal and professional growth, providing ample space and resources for workshops, seminars, and training sessions.",
    image: "/images/spaces/development.jpg",
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
    image: "/images/spaces/faith.jpg",
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
    image: "/images/spaces/corporate.jpg",
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
    image: "/images/spaces/networking.jpg",
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
    image: "/images/spaces/celebrations.jpg",
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
    image: "/images/spaces/fundraiser.jpg",
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
    image: "/images/spaces/community.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ─── Bento grid layout classes ─── */

const bentoClasses = [
  "md:col-span-2 md:row-span-2", // Development — large
  "md:col-span-1 md:row-span-1", // Faith
  "md:col-span-1 md:row-span-1", // Corporate
  "md:col-span-1 md:row-span-1", // Networking
  "md:col-span-2 md:row-span-1", // Celebrations — wide
  "md:col-span-1 md:row-span-1", // Fundraiser
  "md:col-span-1 md:row-span-1", // Community
];

/* ─── Co-working Plans ─── */

const coworkingPlans = [
  {
    title: "Co-working Membership",
    price: "Starting at $100/month",
    description:
      "Flexible workspace, high-speed Wi-Fi, printing, kitchen access, mail services, community events",
    cta: "Get Started",
    href: "/contact",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    title: "Private Office Suite",
    price: "Starting at $650/month",
    description:
      "Fully furnished private office, lockable, personalized signage, all coworking amenities included",
    cta: "Schedule a Tour",
    href: "/contact",
    highlighted: false,
    badge: null,
  },
  {
    title: "Event Space Rental",
    price: "Contact for Pricing",
    description:
      "Versatile spaces for any occasion — corporate, community, celebrations, and more",
    cta: "Request a Quote",
    href: "/contact",
    highlighted: false,
    badge: null,
  },
];

export default function SpacesPage() {
  return (
    <>
      {/* Hero — Image Background */}
      <section className="relative min-h-[70vh] flex items-center noise-overlay overflow-hidden">
        <Image
          src="/images/workspace-1.jpeg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,150,62,0.15),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-40">
          <h1
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Host Something Remarkable
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            The Well is a hub for personal and professional growth, innovative
            events, and unforgettable experiences. Whether you&apos;re seeking a
            dynamic workspace, hosting an event, or attending one of our
            enriching programs like health and wellness coaching, The Well offers
            a welcoming environment where individuals and organizations can
            flourish.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#coworking"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white
                hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                active:scale-[0.97] font-[family-name:var(--font-inter)]"
              style={{ transition: "background-color 0.2s, transform 0.1s" }}
            >
              Explore Memberships
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white
                hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                active:scale-[0.97] font-[family-name:var(--font-inter)]"
              style={{ transition: "background-color 0.2s, transform 0.1s" }}
            >
              Book a Space
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Co-working & Office Suites — Generous spacing */}
      <section id="coworking" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Intro row */}
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center mb-20">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/mario-sally-inside.webp"
                  alt="Inside The Well workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
                  Memberships
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                  A Workspace Designed for How You Work
                </h2>
                <p className="mt-6 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                  Whether you need a flexible hot desk for a few hours a week or a fully private office suite for your growing team, The Well has you covered. Every membership includes high-speed Wi-Fi, printing services, kitchen access, mail handling, and invitations to our community networking events.
                </p>
                <p className="mt-4 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                  Dedicated desks, private offices, and co-working passes — all in a professional, community-oriented environment designed to help you do your best work.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {coworkingPlans.map((plan, index) => (
              <ScrollReveal key={plan.title} delay={index * 100}>
                <div
                  className={`relative rounded-2xl bg-white/80 backdrop-blur-sm border shadow-[0_4px_20px_rgba(27,77,110,0.08)] p-8 flex flex-col h-full
                    hover:shadow-[0_8px_30px_rgba(27,77,110,0.12)]
                    ${plan.highlighted ? "border-2 border-secondary/30" : "border-white/20"}`}
                  style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-8 inline-block bg-secondary text-white text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full font-[family-name:var(--font-inter)]">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-text">
                    {plan.title}
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-primary font-[family-name:var(--font-inter)]">
                    {plan.price}
                  </p>
                  <p className="mt-4 text-sm text-text-muted font-[family-name:var(--font-inter)] leading-relaxed flex-1">
                    {plan.description}
                  </p>
                  <Link
                    href={plan.href}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold uppercase tracking-wider
                      active:scale-[0.97] font-[family-name:var(--font-inter)]
                      ${
                        plan.highlighted
                          ? "bg-secondary text-white hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
                          : "bg-primary/10 text-primary hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                      }`}
                    style={{ transition: "background-color 0.2s, transform 0.1s" }}
                  >
                    {plan.cta}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Versatile Event Spaces — Dark Navy, Full-Width Bento, Tighter spacing */}
      <section className="relative bg-primary py-16 sm:py-24 overflow-hidden">
        {/* Subtle gold radial accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,150,62,0.08),transparent_60%)]" />
        <div className="relative">
          {/* Heading stays contained */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
                  Versatile Spaces
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-white">
                  Versatile Event Spaces
                </h2>
              </div>
            </ScrollReveal>
          </div>
          {/* Grid breaks out to wider container */}
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:auto-rows-[320px]">
              {eventSpaces.map((space, index) => (
                <ScrollReveal key={space.title} delay={index * 80}>
                  <div
                    className={`group relative rounded-xl overflow-hidden h-full ${bentoClasses[index]}
                      shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
                    style={{ transition: "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  >
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      className="object-cover group-hover:scale-105"
                      style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Color treatment layer */}
                    <div className="absolute inset-0 bg-primary/15 mix-blend-multiply" />
                    {/* Gradient overlay — reduced intensity on dark bg */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm text-white flex items-center justify-center mb-3">
                        {space.icon}
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white leading-tight">
                        {space.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/75 font-[family-name:var(--font-inter)] leading-relaxed line-clamp-2">
                        {space.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer — Merged Programs + Amenities, Generous spacing */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <WhatWeOfferSection />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA — Image Background, Most generous spacing */}
      <section className="relative py-28 sm:py-36 noise-overlay overflow-hidden">
        <Image
          src="/images/sal-and-stone-outside.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/80 to-primary/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.12),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Discover our upcoming events or book a space for your next gathering.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white
                hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                active:scale-[0.97] font-[family-name:var(--font-inter)]"
              style={{ transition: "background-color 0.2s, transform 0.1s" }}
            >
              Schedule a Tour
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white
                hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                active:scale-[0.97] font-[family-name:var(--font-inter)]"
              style={{ transition: "background-color 0.2s, transform 0.1s" }}
            >
              Explore Events
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
