"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Event = {
  slug: string;
  title: string;
  date: Date | string;
  category: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  community: "bg-[var(--color-primary)]",
  arts: "bg-[var(--color-secondary)]",
  business: "bg-[var(--color-accent)]",
  education: "bg-[#6B5B95]",
  music: "bg-[#E8596A]",
  wellness: "bg-[var(--color-accent-light)]",
  private: "bg-[var(--color-text-muted)]",
  other: "bg-[var(--color-border)]",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toEastern(date: Date): { year: number; month: number; day: number } {
  const parts = date.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const [month, day, year] = parts.split("/").map(Number);
  return { year, month: month - 1, day };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

export default function EventCalendar({ events }: { events: Event[] }) {
  const today = new Date();
  const todayEastern = toEastern(today);
  const [currentYear, setCurrentYear] = useState(todayEastern.year);
  const [currentMonth, setCurrentMonth] = useState(todayEastern.month);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Build a map of day -> events for the current month
  const eventsByDay = useMemo(() => {
    const map: Record<number, { slug: string; title: string; time: string; category: string }[]> = {};
    for (const event of events) {
      const d = new Date(event.date);
      const eastern = toEastern(d);
      if (eastern.year === currentYear && eastern.month === currentMonth) {
        if (!map[eastern.day]) map[eastern.day] = [];
        map[eastern.day].push({
          slug: event.slug,
          title: event.title,
          time: formatTime(d),
          category: event.category,
        });
      }
    }
    return map;
  }, [events, currentYear, currentMonth]);

  // Calendar grid calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  function prevMonth() {
    setSelectedDay(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    setSelectedDay(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function goToToday() {
    setSelectedDay(null);
    setCurrentYear(todayEastern.year);
    setCurrentMonth(todayEastern.month);
  }

  const isToday = (day: number) =>
    day === todayEastern.day &&
    currentMonth === todayEastern.month &&
    currentYear === todayEastern.year;

  const selectedEvents = selectedDay ? eventsByDay[selectedDay] || [] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Calendar grid */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--color-border)] shadow-[0_1px_3px_rgba(27,77,110,0.06)] overflow-hidden">
        {/* Month header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[var(--color-text)]">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={goToToday}
              className="px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)] transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[var(--color-border)]">
          {DAY_NAMES.map((day) => (
            <div
              key={day}
              className="py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const dayEvents = day ? eventsByDay[day] : undefined;
            const hasEvents = dayEvents && dayEvents.length > 0;
            const isSelected = day === selectedDay;
            const isTodayCell = day !== null && isToday(day);

            return (
              <button
                key={i}
                type="button"
                disabled={day === null}
                onClick={() => day !== null && setSelectedDay(isSelected ? null : day)}
                className={`
                  relative min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 border-b border-r border-[var(--color-border-light)] text-left transition-colors
                  ${day === null ? "bg-[var(--color-background)]/50" : "hover:bg-[var(--color-primary)]/[0.03]"}
                  ${isSelected ? "bg-[var(--color-primary)]/[0.06] ring-2 ring-inset ring-[var(--color-primary)]/20" : ""}
                `}
              >
                {day !== null && (
                  <>
                    <span
                      className={`
                        inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium
                        ${isTodayCell ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)]"}
                      `}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map((evt, idx) => (
                          <div
                            key={idx}
                            className={`${CATEGORY_COLORS[evt.category] || "bg-[var(--color-primary)]"} rounded px-1.5 py-0.5 truncate`}
                          >
                            <span className="text-[10px] sm:text-xs text-white font-medium leading-tight truncate block">
                              {evt.title}
                            </span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[10px] text-[var(--color-text-muted)] font-medium pl-1">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar: selected day detail or upcoming list */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[0_1px_3px_rgba(27,77,110,0.06)] p-6 h-fit lg:sticky lg:top-8">
        {selectedDay && selectedEvents.length > 0 ? (
          <>
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[var(--color-text)] mb-1">
              {MONTH_NAMES[currentMonth]} {selectedDay}
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] mb-5">
              {selectedEvents.length} event{selectedEvents.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-3">
              {selectedEvents.map((evt, i) => (
                <Link
                  key={i}
                  href={`/events/${evt.slug}`}
                  className="group block p-3.5 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/30 hover:shadow-[0_2px_8px_rgba(27,77,110,0.08)] transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-1 self-stretch rounded-full shrink-0 ${CATEGORY_COLORS[evt.category] || "bg-[var(--color-primary)]"}`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                        {evt.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {evt.time}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : selectedDay ? (
          <>
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[var(--color-text)] mb-1">
              {MONTH_NAMES[currentMonth]} {selectedDay}
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">No events on this day.</p>
          </>
        ) : (
          <>
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[var(--color-text)] mb-1">
              Event Calendar
            </h4>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
              Click a day to see its events.
            </p>
            {/* Show upcoming events for this month */}
            {(() => {
              const monthEvents = Object.entries(eventsByDay)
                .sort(([a], [b]) => Number(a) - Number(b))
                .flatMap(([day, evts]) =>
                  evts.map((evt) => ({ ...evt, day: Number(day) }))
                )
                .slice(0, 5);

              if (monthEvents.length === 0) {
                return (
                  <p className="text-sm text-[var(--color-text-muted)] italic">
                    No events this month.
                  </p>
                );
              }

              return (
                <div className="space-y-2.5">
                  {monthEvents.map((evt, i) => (
                    <Link
                      key={i}
                      href={`/events/${evt.slug}`}
                      className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-background)] transition-colors"
                    >
                      <div className="text-center shrink-0 w-10">
                        <div className="text-lg font-bold text-[var(--color-text)] leading-tight">
                          {evt.day}
                        </div>
                        <div className="text-[10px] uppercase text-[var(--color-text-muted)] font-medium">
                          {MONTH_NAMES[currentMonth].slice(0, 3)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                          {evt.title}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {evt.time}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
}
