import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact The Well - Coworking Space in Lakeland, FL",
  description:
    "Get in touch with The Well coworking space in Lakeland, FL. Contact us for event bookings, workspace inquiries, or general questions.",
};

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed">
            We&apos;d love to hear from you. Reach out to learn more about our spaces, events, or community.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left column - Contact Info */}
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text">
                Get in Touch With Us
              </h2>
              <p className="mt-6 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
                We invite you to share your feedback or ask us anything on your
                mind through our easily accessible form. Just fill out the form,
                submit it and we will contact you.
              </p>

              <div className="mt-10 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text font-[family-name:var(--font-inter)]">
                      Address
                    </h3>
                    <a
                      href={BUSINESS.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-text-muted hover:text-primary font-[family-name:var(--font-inter)]"
                      style={{ transition: "color 0.2s" }}
                    >
                      {BUSINESS.address.full}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text font-[family-name:var(--font-inter)]">
                      Phone
                    </h3>
                    <div className="mt-1 space-y-1">
                      <a
                        href={BUSINESS.phone.primaryHref}
                        className="block text-sm text-text-muted hover:text-primary font-[family-name:var(--font-inter)]"
                        style={{ transition: "color 0.2s" }}
                      >
                        {BUSINESS.phone.primary}
                      </a>
                      <a
                        href={BUSINESS.phone.secondaryHref}
                        className="block text-sm text-text-muted hover:text-primary font-[family-name:var(--font-inter)]"
                        style={{ transition: "color 0.2s" }}
                      >
                        {BUSINESS.phone.secondary}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text font-[family-name:var(--font-inter)]">
                      Email
                    </h3>
                    <a
                      href={BUSINESS.emailHref}
                      className="mt-1 text-sm text-text-muted hover:text-primary font-[family-name:var(--font-inter)]"
                      style={{ transition: "color 0.2s" }}
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text font-[family-name:var(--font-inter)]">
                      Hours
                    </h3>
                    <div className="mt-1 space-y-1 text-sm text-text-muted font-[family-name:var(--font-inter)]">
                      <p>{BUSINESS.hours.weekdays}</p>
                      <p>{BUSINESS.hours.weekends}</p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text font-[family-name:var(--font-inter)]">
                      Follow Us
                    </h3>
                    <div className="mt-2 flex gap-3">
                      <a
                        href={BUSINESS.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary
                          hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                          active:scale-[0.95]"
                        style={{ transition: "background-color 0.2s, transform 0.1s" }}
                        aria-label="Facebook"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href={BUSINESS.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary
                          hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                          active:scale-[0.95]"
                        style={{ transition: "background-color 0.2s, transform 0.1s" }}
                        aria-label="Instagram"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Contact Form */}
            <div>
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(27,77,110,0.08)] p-8 sm:p-10">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-text mb-8">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
