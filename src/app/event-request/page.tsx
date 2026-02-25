import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Event Request Form | The Well Lakeland",
  description:
    "Submit an event request to host your next gathering at The Well in Lakeland, FL. Fill out the form to get started.",
};

export default function EventRequestPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12 noise-overlay bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <h1
            className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            Event Request Form
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            Fill out the form below to request hosting your event at The Well.
            We&apos;ll get back to you within 1-2 business days.
          </p>
          <Link
            href="/events"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white font-[family-name:var(--font-inter)]"
            style={{ transition: "color 0.2s" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            Back to Events
          </Link>
        </div>
      </section>

      {/* Google Form Embed */}
      <section className="bg-surface py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] overflow-hidden">
            <iframe
              src={`${BUSINESS.eventRequestForm}?embedded=true`}
              title="Event Request Form"
              className="w-full border-0"
              style={{ minHeight: "1200px" }}
              loading="lazy"
            >
              Loading form...
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
}
