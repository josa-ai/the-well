import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Well - Coworking Community Space in Lakeland, FL",
  description:
    "Connect, collaborate, create, and celebrate at The Well. A vibrant coworking community space with flexible workspace and networking solutions in Lakeland, FL.",
};

const testimonials = [
  {
    name: "Donna Davis",
    text: "Beautiful, modern esthetic and a most welcoming space. I can see endless opportunities for the use of such a facility. The concept behind the Well is of the moment and much needed in our community. Bravo!",
  },
  {
    name: "Marcia Boyce",
    text: "Great idea. Gracious host. Comfortable space.",
  },
  {
    name: "L BL",
    text: "Great multipurpose venue. Also, a co-working space.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center noise-overlay">
        <Image
          src="/images/hero-building.jpeg"
          alt="The Well coworking space exterior in Lakeland, FL"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Connect, Collaborate, Create, Celebrate
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed font-[family-name:var(--font-inter)] max-w-lg">
              Take Advantage of Our Vibrant Community, Flexible Workspace and
              Networking Solutions
            </p>
            <Link
              href="/spaces"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white
                hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                active:scale-[0.97] font-[family-name:var(--font-inter)]"
              style={{ transition: "background-color 0.2s, transform 0.1s" }}
            >
              Explore Spaces
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Happening Section */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
            What&apos;s Happening at The Well...
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* BBE Gala Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)]">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/bbe-gala.jpg"
                  alt="Black Business Expo Gala event flyer"
                  fill
                  className="object-cover group-hover:scale-105"
                  style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-text">
                  Black Business Expo
                </h3>
                <p className="mt-2 text-sm text-text-muted font-[family-name:var(--font-inter)]">
                  Join us for an evening celebrating Black-owned businesses and entrepreneurship in the Lakeland community.
                </p>
              </div>
            </div>

            {/* News Highlight Card */}
            <div className="flex flex-col justify-center rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
                In the News
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-text leading-tight">
                Lakeland Named Best U.S. City for Working Women
              </h3>
              <p className="mt-4 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                Lakeland continues to be recognized as a thriving hub for professionals, making it the ideal home for The Well&apos;s community-driven workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multifaceted Workspace Section */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/workspace-1.jpeg"
                alt="Interior of The Well workspace and event setup"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent mix-blend-multiply rounded-2xl" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                A Multifaceted Workspace Experience
              </h2>
              <p className="mt-6 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                At the heart of The Well lies our business center and
                multi-purpose collaborative workspace, meticulously designed to
                cater to a wide range of professional needs. Whether you&apos;re
                seeking a quiet spot to focus, a collaborative environment to
                brainstorm ideas, or a venue to host meetings and events, our
                facility has you covered. With various areas dedicated to
                collaboration, learning, and innovation, we empower our members
                to work, grow and scale in an environment tailored to their
                preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Programming Section */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent font-[family-name:var(--font-inter)]">
                Community First
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                Community-Centric &amp; Culturally Relevant Programming
              </h2>
              <p className="mt-6 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                Beyond providing exceptional workspace solutions, The Well is
                committed to fostering a vibrant and supportive community.
                Through our community enrichment programs, we facilitate
                networking opportunities, skill-building workshops, and
                educational events aimed at empowering our members to thrive both
                personally and professionally. From networking mixers to
                educational seminars, our diverse range of programs ensures that
                there&apos;s something for everyone within our community. The
                Well is purposed with intentionality to support underserved and
                under-represented populations in the community.
              </p>
              <Link
                href="/events"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white
                  hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
                  active:scale-[0.97] font-[family-name:var(--font-inter)]"
                style={{ transition: "background-color 0.2s, transform 0.1s" }}
              >
                Discover Events
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl">
              <Image
                src="https://placehold.co/800x600/1B4D6E/FAFAF7"
                alt="Community programming at The Well"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Space CTA Section */}
      <section className="relative py-20 sm:py-28 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Find Your Space Today
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Ready to experience the unparalleled workspace environment at The
            Well? Contact us today to learn more about our offerings or to
            schedule a visit. Join our community and elevate your workspace
            experience with The Well.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white
              hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
              active:scale-[0.97] font-[family-name:var(--font-inter)]"
            style={{ transition: "background-color 0.2s, transform 0.1s" }}
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text text-center">
            What Our Community Says
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] p-8 flex flex-col"
              >
                {/* Quote icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-secondary/40 mb-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M11 7H7a4 4 0 00-4 4v1a3 3 0 003 3h1a2 2 0 012 2v0a2 2 0 01-2 2H6a1 1 0 01-1-1M21 7h-4a4 4 0 00-4 4v1a3 3 0 003 3h1a2 2 0 012 2v0a2 2 0 01-2 2h-1a1 1 0 01-1-1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-text-muted font-[family-name:var(--font-inter)] leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="mt-6 pt-4 border-t border-border-light">
                  <cite className="not-italic text-sm font-semibold text-text font-[family-name:var(--font-inter)]">
                    {t.name}
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
