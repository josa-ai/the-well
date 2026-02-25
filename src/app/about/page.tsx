import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About The Well - Our Mission & Vision",
  description:
    "Learn about The Well's mission to foster a diverse community through collaboration, networking, education, and culturally inspired programming in Lakeland, FL.",
};

const founders = [
  {
    name: "Dr. Sallie Stone",
    role: "Co-Founder",
    bio: "With over twenty years of experience in educational leadership and management, Dr. Sallie is a respected figure in the field. As the owner of Well-done Events! multimedia services, she has garnered acclaim for her digital marketing and branding strategies expertise. Dr. Stone also serves as an educational consultant for Compass Smart Solutions, offering training, professional development, business coaching, and motivational speaking to diverse groups.",
    image: "https://placehold.co/400x500/1B4D6E/FAFAF7",
  },
  {
    name: "Mario Stone",
    role: "Director of Operations",
    bio: "As the Director of Operations at The Well, Mario brings over a decade of experience in leadership management, event management, and multimedia production. With a keen eye for detail, he ensures the smooth day-to-day operations of our establishment. Mario is known for his reliability, problem-solving skills, and excellent communication. Beyond his professional endeavors, he is dedicated to mentoring troubled youth, sharing his faith, and cherishing moments with his family.",
    image: "https://placehold.co/400x500/1B4D6E/FAFAF7",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <h1
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            About The Well
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Fostering community through collaboration, culture, and connection.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
                Our Purpose
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                The Mission
              </h2>
              <p className="mt-6 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                At The Well, our mission is to foster a diverse community by
                providing opportunities and resources for collaboration and
                networking. Through education, entertainment, and culturally
                inspired programming, we aim to create an inclusive environment
                where all members can thrive and grow. Committing to excellence
                and innovation, we strive to catalyze professional and personal
                development, empowering our members to reach their fullest
                potential and make meaningful contributions to society. Through
                our collaborative efforts and collective passion, we aspire to
                create positive change and build a brighter future for all. Keep
                reading to learn more about The Well workspace.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://placehold.co/800x600/1B4D6E/FAFAF7"
                alt="The Well mission - community collaboration"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent mix-blend-multiply rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-2xl">
              <Image
                src="https://placehold.co/800x600/2A7B6F/FAFAF7"
                alt="The Well vision - modern flexible workspace"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent mix-blend-multiply rounded-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent font-[family-name:var(--font-inter)]">
                Looking Forward
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                The Vision
              </h2>
              <p className="mt-6 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                The Well is a high-design flexible workspace, catering to
                independent professionals, startups, and teams from businesses of
                all sizes. Unlike traditional coworking or executive office
                suites, we offer a purpose-built environment that encourages
                focus, collaboration, learning, and innovation. By reimagining
                the conventional workspace, we provide our members with the
                optimal conditions for community gatherings through productivity
                and success, ensuring they have the tools and spaces they need to
                excel in their endeavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-[family-name:var(--font-inter)]">
              Leadership
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
              Meet Our Founders
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-text">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-secondary font-[family-name:var(--font-inter)]">
                    {founder.role}
                  </p>
                  <p className="mt-4 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Perfect Workspace CTA */}
      <section className="relative py-20 sm:py-28 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Find the Perfect Workspace
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Ready to discover the diverse workspaces and amenities available at
            The Well? Visit our Spaces page to explore our flexible options for
            focus, collaboration, and innovation. Whether you&apos;re a solo
            entrepreneur, part of a startup, or represent a larger organization,
            we have the perfect space to meet your needs.
          </p>
          <Link
            href="/spaces"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white
              hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
              active:scale-[0.97] font-[family-name:var(--font-inter)]"
            style={{ transition: "background-color 0.2s, transform 0.1s" }}
          >
            Get More Information
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
