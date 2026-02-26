"use client";

import { useState } from "react";
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

  const filtered =
    selected === "all"
      ? events
      : events.filter((e) => e.category === selected);

  // Only show categories that have events
  const activeCategories = CATEGORIES.filter(
    (cat) =>
      cat.value === "all" || events.some((e) => e.category === cat.value)
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {activeCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelected(cat.value)}
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

      <EventGrid events={filtered} />
    </div>
  );
}
