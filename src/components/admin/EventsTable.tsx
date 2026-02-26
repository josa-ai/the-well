"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Event = {
  id: string;
  title: string;
  slug: string;
  date: string;
  status: "DRAFT" | "PUBLISHED";
  category: string;
  isFeatured: boolean;
  isFeaturedPast: boolean;
  photos: { url: string; isPrimary: boolean }[];
  recurrenceGroupId?: string | null;
  isRecurrenceParent?: boolean;
};

export default function EventsTable({ events }: { events: Event[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string, series?: boolean) {
    const msg = series
      ? `Delete the entire series "${title}"? All instances will be removed. This cannot be undone.`
      : `Delete "${title}"? This cannot be undone.`;
    if (!confirm(msg)) return;

    setDeleting(id);
    try {
      const url = series ? `/api/events/${id}?series=true` : `/api/events/${id}`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete event");
      }
    } catch {
      alert("Failed to delete event");
    } finally {
      setDeleting(null);
    }
  }

  async function toggleFeatured(id: string, field: "isFeatured" | "isFeaturedPast", value: boolean) {
    try {
      await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !value }),
      });
      router.refresh();
    } catch {
      alert("Failed to update");
    }
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-[var(--color-border)]">
        <svg className="w-12 h-12 mx-auto text-[var(--color-text-muted)]/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <p className="text-[var(--color-text-muted)]">No events found</p>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-light)] transition-colors"
        >
          Create your first event
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">Event</th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">Date</th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">Category</th>
              <th className="text-center px-4 py-3 font-medium text-[var(--color-text-muted)]">Status</th>
              <th className="text-center px-4 py-3 font-medium text-[var(--color-text-muted)]">Featured</th>
              <th className="text-right px-4 py-3 font-medium text-[var(--color-text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-light)]">
            {events.map((event) => {
              const primaryPhoto = event.photos.find((p) => p.isPrimary);
              const eventDate = new Date(event.date);
              const isPast = eventDate < new Date();

              return (
                <tr key={event.id} className="hover:bg-[var(--color-background)]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {primaryPhoto ? (
                        <img
                          src={primaryPhoto.url}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-background)] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[var(--color-text-muted)]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-[var(--color-text)]">{event.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">/{event.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">
                    {eventDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-background)] text-[var(--color-text-muted)] capitalize">
                        {event.category}
                      </span>
                      {event.recurrenceGroupId && !event.isRecurrenceParent && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                          Recurring
                        </span>
                      )}
                      {event.isRecurrenceParent && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                          Series
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.status === "PUBLISHED"
                          ? isPast
                            ? "bg-gray-100 text-gray-600"
                            : "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {event.status === "PUBLISHED"
                        ? isPast
                          ? "Past"
                          : "Published"
                        : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleFeatured(event.id, "isFeatured", event.isFeatured)}
                        title={event.isFeatured ? "Remove from featured" : "Add to featured"}
                        className={`p-1 rounded transition-colors ${
                          event.isFeatured
                            ? "text-[var(--color-secondary)]"
                            : "text-[var(--color-text-muted)]/30 hover:text-[var(--color-secondary)]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill={event.isFeatured ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/events/${event.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)] transition-colors"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)] transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        disabled={deleting === event.id}
                        className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                      {event.recurrenceGroupId && (
                        <button
                          onClick={() => handleDelete(event.id, event.title, true)}
                          disabled={deleting === event.id}
                          className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Delete Series"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
