import Link from "next/link";
import { getAdminEvents } from "@/lib/events";
import EventsTable from "@/components/admin/EventsTable";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const validFilter = (["upcoming", "past", "draft", "all"] as const).includes(
    filter as "upcoming" | "past" | "draft" | "all"
  )
    ? (filter as "upcoming" | "past" | "draft" | "all")
    : "all";

  const events = await getAdminEvents(validFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--color-text)] tracking-tight">
            Events
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {events.length} event{events.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] active:scale-[0.98] transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Event
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-[var(--color-background)] p-1 rounded-lg w-fit">
        {(["all", "upcoming", "past", "draft"] as const).map((f) => (
          <Link
            key={f}
            href={`/admin?filter=${f}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              validFilter === f
                ? "bg-white text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Link>
        ))}
      </div>

      <EventsTable events={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}
