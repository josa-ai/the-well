"use client";

import { useState, useMemo } from "react";
import EventGrid from "./EventGrid";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "community", label: "Community" },
  { value: "arts", label: "Arts & Culture" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "music", label: "Music" },
  { value: "wellness", label: "Wellness" },
];

const PAGE_SIZE = 12;

type Event = {
  slug: string;
  title: string;
  date: Date | string;
  location: string;
  category: string;
  photos: { url: string; alt: string; isPrimary: boolean }[];
};

export default function CategoryFilter({ events }: { events: Event[] }) {
  const [selected, setSelected] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      selected === "all"
        ? events
        : events.filter((e) => e.category === selected),
    [selected, events]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Only show categories that have events
  const activeCategories = CATEGORIES.filter(
    (cat) =>
      cat.value === "all" || events.some((e) => e.category === cat.value)
  );

  function handleCategoryChange(value: string) {
    setSelected(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {activeCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selected === cat.value
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-background)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-light)] hover:text-[var(--color-text)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <EventGrid events={visible} />

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-semibold
              hover:bg-[var(--color-primary)] hover:text-white
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]
              active:scale-[0.97] transition-colors duration-200"
          >
            See More Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            Showing {visible.length} of {filtered.length} events
          </p>
        </div>
      )}
    </div>
  );
}
