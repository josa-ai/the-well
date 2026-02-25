"use client";

import { useState, type FormEvent } from "react";

type InquiryReason = "" | "event-booking" | "feedback" | "general";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<InquiryReason>("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-accent/5 border border-accent/20 p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-text">
          Message Sent!
        </h3>
        <p className="mt-3 text-text-muted font-[family-name:var(--font-inter)] leading-relaxed">
          Thank you for reaching out. We&apos;ll get back to you within 1-2
          business days.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            setEmail("");
            setReason("");
            setMessage("");
          }}
          className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium
            hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
            active:scale-[0.97] font-[family-name:var(--font-inter)]"
          style={{ transition: "background-color 0.2s, transform 0.1s" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-text mb-2 font-[family-name:var(--font-inter)]"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/50
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none
            font-[family-name:var(--font-inter)]"
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
          placeholder="Your full name"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-text mb-2 font-[family-name:var(--font-inter)]"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/50
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none
            font-[family-name:var(--font-inter)]"
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
          placeholder="(863) 555-0123"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text mb-2 font-[family-name:var(--font-inter)]"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/50
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none
            font-[family-name:var(--font-inter)]"
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
          placeholder="you@example.com"
        />
      </div>

      {/* Reason */}
      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-text mb-2 font-[family-name:var(--font-inter)]"
        >
          Reason for Inquiry <span className="text-red-500">*</span>
        </label>
        <select
          id="reason"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value as InquiryReason)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none
            font-[family-name:var(--font-inter)]"
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
        >
          <option value="" disabled>
            Select a reason...
          </option>
          <option value="event-booking">Event or Booking Questions</option>
          <option value="feedback">Feedback</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-text mb-2 font-[family-name:var(--font-inter)]"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/50 resize-y
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none
            font-[family-name:var(--font-inter)]"
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
          placeholder="How can we help you?"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white
          hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
          active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed
          font-[family-name:var(--font-inter)]"
        style={{ transition: "background-color 0.2s, transform 0.1s, opacity 0.2s" }}
      >
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
