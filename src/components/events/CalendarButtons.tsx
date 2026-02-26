"use client";

import { generateGoogleCalendarUrl, generateICSContent } from "@/lib/calendar";

type Props = {
  title: string;
  date: string;
  endDate?: string | null;
  location: string;
  details: string;
};

export default function CalendarButtons({
  title,
  date,
  endDate,
  location,
  details,
}: Props) {
  const event = {
    title,
    date: new Date(date),
    endDate: endDate ? new Date(endDate) : null,
    location,
    details,
  };

  function downloadICS() {
    const content = generateICSContent(event);
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={generateGoogleCalendarUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-background)] transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 3.5h-1V2a1 1 0 00-2 0v1.5h-9V2a1 1 0 00-2 0v1.5h-1A2.5 2.5 0 002 6v13.5A2.5 2.5 0 004.5 22h15a2.5 2.5 0 002.5-2.5V6a2.5 2.5 0 00-2.5-2.5zM20 19.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5V9h16v10.5z" />
        </svg>
        Google Calendar
      </a>
      <button
        onClick={downloadICS}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-background)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Apple / Outlook (.ics)
      </button>
    </div>
  );
}
