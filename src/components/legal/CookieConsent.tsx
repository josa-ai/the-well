"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      style={{ animation: "fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
    >
      <div className="mx-auto max-w-3xl rounded-xl bg-surface shadow-floating border border-border-light p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-text-muted leading-relaxed flex-1">
          We use cookies to improve your experience. By continuing to browse, you
          agree to our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm font-medium text-text-muted rounded-lg border border-border
              hover:bg-background hover:text-text
              focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
              active:scale-[0.97]"
            style={{ transition: "background-color 0.2s, color 0.2s, transform 0.1s" }}
          >
            Reject All
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary
              hover:bg-primary-light
              focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
              active:scale-[0.97]"
            style={{ transition: "background-color 0.2s, transform 0.1s" }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
