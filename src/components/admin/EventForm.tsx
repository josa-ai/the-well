"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import PhotoUploader from "./PhotoUploader";
import { getRecurrencePreviewCount } from "@/lib/recurrence";

const CATEGORIES = [
  { value: "community", label: "Community" },
  { value: "arts", label: "Arts & Culture" },
  { value: "business", label: "Business & Networking" },
  { value: "education", label: "Education & Workshops" },
  { value: "music", label: "Music & Entertainment" },
  { value: "wellness", label: "Wellness" },
  { value: "private", label: "Private Event" },
  { value: "other", label: "Other" },
];

type Photo = {
  id?: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
};

type EventData = {
  id?: string;
  title: string;
  date: string;
  endDate: string;
  location: string;
  details: string;
  category: string;
  tags: string[];
  rsvpUrl: string;
  capacity: string;
  isFeatured: boolean;
  isFeaturedPast: boolean;
  status: "DRAFT" | "PUBLISHED";
  photos: Photo[];
};

const DEFAULT_LOCATION = "The Well - 114 E. Parker St., Lakeland, FL 33801";

function toLocalDateTimeValue(isoString: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  // Format as YYYY-MM-DDThh:mm for datetime-local input
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventForm({
  initialData,
}: {
  initialData?: EventData;
}) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    title: initialData?.title || "",
    date: initialData?.date ? toLocalDateTimeValue(initialData.date) : "",
    endDate: initialData?.endDate
      ? toLocalDateTimeValue(initialData.endDate)
      : "",
    location: initialData?.location || DEFAULT_LOCATION,
    details: initialData?.details || "",
    category: initialData?.category || "community",
    tags: initialData?.tags?.join(", ") || "",
    rsvpUrl: initialData?.rsvpUrl || "",
    capacity: initialData?.capacity || "",
    isFeatured: initialData?.isFeatured || false,
    isFeaturedPast: initialData?.isFeaturedPast || false,
    status: initialData?.status || ("DRAFT" as "DRAFT" | "PUBLISHED"),
  });

  const [photos, setPhotos] = useState<Photo[]>(initialData?.photos || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Recurrence state (only for new events)
  const [recurrenceRule, setRecurrenceRule] = useState("none");
  const [recurrenceDays, setRecurrenceDays] = useState<string[]>([]);
  const [recurrenceEndType, setRecurrenceEndType] = useState<"date" | "year">("year");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState("");

  const recurrenceCount = useMemo(() => {
    if (recurrenceRule === "none" || !form.date) return 0;
    const start = new Date(form.date);
    const end = recurrenceEndType === "date" && recurrenceEndDate
      ? new Date(recurrenceEndDate)
      : null;
    return getRecurrencePreviewCount(start, recurrenceRule, recurrenceDays, end);
  }, [form.date, recurrenceRule, recurrenceDays, recurrenceEndType, recurrenceEndDate]);

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        title: form.title,
        date: new Date(form.date).toISOString(),
        endDate: form.endDate
          ? new Date(form.endDate).toISOString()
          : null,
        location: form.location,
        details: form.details,
        category: form.category,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        rsvpUrl: form.rsvpUrl || null,
        capacity: form.capacity || null,
        isFeatured: form.isFeatured,
        isFeaturedPast: form.isFeaturedPast,
        status: form.status,
        ...(recurrenceRule !== "none" && !isEditing
          ? {
              recurrenceRule,
              recurrenceDays,
              recurrenceEndDate:
                recurrenceEndType === "date" && recurrenceEndDate
                  ? new Date(recurrenceEndDate).toISOString()
                  : null,
            }
          : {}),
      };

      const url = isEditing
        ? `/api/events/${initialData!.id}`
        : "/api/events";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save event");
      }

      const event = await res.json();

      // If creating, save photos to the new event
      if (!isEditing && photos.length > 0) {
        for (const photo of photos) {
          await fetch(`/api/events/${event.id}/photos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
          });
        }
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-colors";
  const labelClass =
    "block text-sm font-medium text-[var(--color-text)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content — left 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className={labelClass}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
              className={inputClass}
              placeholder="Event title"
            />
          </div>

          {/* Date / End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Date & Time</label>
              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              className={inputClass}
              placeholder="Event location"
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={form.details}
              onChange={(v) => updateField("details", v)}
            />
          </div>

          {/* Photos */}
          <div>
            <label className={labelClass}>Photos</label>
            <PhotoUploader
              eventId={initialData?.id}
              photos={photos}
              onChange={setPhotos}
            />
          </div>
        </div>

        {/* Sidebar — right col */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                updateField("status", e.target.value)
              }
              className={inputClass}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>

            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    updateField("isFeatured", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm text-[var(--color-text)]">
                  Featured on homepage
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeaturedPast}
                  onChange={(e) =>
                    updateField("isFeaturedPast", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm text-[var(--color-text)]">
                  Featured past event
                </span>
              </label>
            </div>
          </div>

          {/* Recurrence (new events only) */}
          {!isEditing && (
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 space-y-4">
              <div>
                <label className={labelClass}>Recurrence</label>
                <select
                  value={recurrenceRule}
                  onChange={(e) => setRecurrenceRule(e.target.value)}
                  className={inputClass}
                >
                  <option value="none">None</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Every 2 Weeks</option>
                  <option value="monthly-date">Monthly (same date)</option>
                  <option value="monthly-day">Monthly (same day)</option>
                </select>
              </div>

              {(recurrenceRule === "weekly" || recurrenceRule === "biweekly") && (
                <div>
                  <label className={labelClass}>On days</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { code: "MO", label: "M" },
                      { code: "TU", label: "T" },
                      { code: "WE", label: "W" },
                      { code: "TH", label: "T" },
                      { code: "FR", label: "F" },
                      { code: "SA", label: "S" },
                      { code: "SU", label: "S" },
                    ].map((day) => (
                      <button
                        key={day.code}
                        type="button"
                        onClick={() =>
                          setRecurrenceDays((prev) =>
                            prev.includes(day.code)
                              ? prev.filter((d) => d !== day.code)
                              : [...prev, day.code]
                          )
                        }
                        className={`w-9 h-9 rounded-full text-xs font-medium transition-colors ${
                          recurrenceDays.includes(day.code)
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-[var(--color-background)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {recurrenceRule !== "none" && (
                <>
                  <div>
                    <label className={labelClass}>Until</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="recurrenceEnd"
                          checked={recurrenceEndType === "year"}
                          onChange={() => setRecurrenceEndType("year")}
                          className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-sm text-[var(--color-text)]">For 1 year</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="recurrenceEnd"
                          checked={recurrenceEndType === "date"}
                          onChange={() => setRecurrenceEndType("date")}
                          className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-sm text-[var(--color-text)]">Until date</span>
                      </label>
                      {recurrenceEndType === "date" && (
                        <input
                          type="date"
                          value={recurrenceEndDate}
                          onChange={(e) => setRecurrenceEndDate(e.target.value)}
                          className={inputClass}
                        />
                      )}
                    </div>
                  </div>

                  {recurrenceCount > 0 && (
                    <p className="text-sm text-[var(--color-accent)] font-medium">
                      Creates {recurrenceCount} event{recurrenceCount !== 1 ? "s" : ""}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Category */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
            <label className={labelClass}>Category</label>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => updateField("tags", e.target.value)}
              className={inputClass}
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
              Separate tags with commas
            </p>
          </div>

          {/* RSVP & Capacity */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 space-y-4">
            <div>
              <label className={labelClass}>RSVP / Ticket URL</label>
              <input
                type="url"
                value={form.rsvpUrl}
                onChange={(e) => updateField("rsvpUrl", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelClass}>Capacity</label>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) => updateField("capacity", e.target.value)}
                className={inputClass}
                placeholder="Leave empty for unlimited"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3 border-t border-[var(--color-border)] pt-6">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Event"
              : "Create Event"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-2.5 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-background)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
