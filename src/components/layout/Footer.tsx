import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="md" className="text-white mb-4" />
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              A coworking community space and event venue in the heart of
              Lakeland, Florida.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70
                      hover:text-white
                      focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                      active:opacity-80"
                    style={{ transition: "color 0.2s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={BUSINESS.eventRequestForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white/70
                    hover:text-white
                    focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                    active:opacity-80"
                  style={{ transition: "color 0.2s" }}
                >
                  Event Request Form
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href={BUSINESS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:opacity-80"
                  style={{ transition: "color 0.2s" }}
                >
                  {BUSINESS.address.full}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.phone.primaryHref}
                  className="hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:opacity-80"
                  style={{ transition: "color 0.2s" }}
                >
                  {BUSINESS.phone.primary}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.phone.secondaryHref}
                  className="hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:opacity-80"
                  style={{ transition: "color 0.2s" }}
                >
                  {BUSINESS.phone.secondary}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.emailHref}
                  className="hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:opacity-80"
                  style={{ transition: "color 0.2s" }}
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Hours
            </h3>
            <ul className="space-y-1.5 text-sm text-white/70 mb-6">
              <li>{BUSINESS.hours.weekdays}</li>
              <li>{BUSINESS.hours.weekends}</li>
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10
                  hover:bg-white/20
                  focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                  active:scale-[0.95]"
                style={{ transition: "background-color 0.2s, transform 0.1s" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10
                  hover:bg-white/20
                  focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                  active:scale-[0.95]"
                style={{ transition: "background-color 0.2s, transform 0.1s" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; 2026 {BUSINESS.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-white/80 focus-visible:outline-2 focus-visible:outline-white active:opacity-80"
              style={{ transition: "color 0.2s" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/do-not-sell"
              className="hover:text-white/80 focus-visible:outline-2 focus-visible:outline-white active:opacity-80"
              style={{ transition: "color 0.2s" }}
            >
              Do Not Sell or Share
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
