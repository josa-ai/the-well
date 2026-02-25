"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, EXTERNAL_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[box-shadow,background-color] duration-300 ${
          scrolled ? "glass shadow-elevated" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-primary hover:opacity-80 active:opacity-70 focus-visible:outline-2 focus-visible:outline-primary"
            style={{ transition: "opacity 0.2s" }}
            aria-label="The Well - Home"
          >
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg
                      focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                      active:scale-[0.97]
                      ${
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-text-muted hover:text-primary hover:bg-primary/5"
                      }`}
                    style={{ transition: "color 0.2s, background-color 0.2s, transform 0.1s" }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={EXTERNAL_LINKS.eventRequest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary
                  hover:bg-primary-light
                  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                  active:scale-[0.97]"
                style={{ transition: "background-color 0.2s, transform 0.1s" }}
              >
                Event Request
                <svg
                  className="w-3.5 h-3.5"
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-primary
              hover:bg-primary/5
              focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
              active:scale-[0.95]"
            style={{ transition: "background-color 0.2s, transform 0.1s" }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay — rendered outside header to avoid stacking context issues */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
        >
          <style>{`
            @keyframes slideFromRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            style={{ animation: "fade-in 0.2s ease forwards" }}
          />
          {/* Panel */}
          <div
            className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-white shadow-floating"
            style={{ animation: "slideFromRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
          >
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="flex items-center justify-between p-5 border-b border-border-light">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-text-muted
                    hover:bg-primary/5 hover:text-primary
                    focus-visible:outline-2 focus-visible:outline-primary
                    active:scale-[0.95]"
                  style={{ transition: "background-color 0.2s, color 0.2s, transform 0.1s" }}
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex-1 py-4 px-3">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium
                          focus-visible:outline-2 focus-visible:outline-primary
                          active:scale-[0.98]
                          ${
                            isActive
                              ? "text-primary bg-primary/5"
                              : "text-text-muted hover:text-primary hover:bg-primary/5"
                          }`}
                        style={{ transition: "color 0.2s, background-color 0.2s, transform 0.1s" }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Event Request CTA */}
              <div className="p-5 border-t border-border-light">
                <a
                  href={EXTERNAL_LINKS.eventRequest.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-primary
                    hover:bg-primary-light
                    focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                    active:scale-[0.97]"
                  style={{ transition: "background-color 0.2s, transform 0.1s" }}
                >
                  Event Request Form
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
