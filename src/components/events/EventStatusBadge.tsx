export default function EventStatusBadge({ date }: { date: Date }) {
  const now = new Date();
  const eventDate = new Date(date);
  const diffMs = eventDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffMs < 0) {
    return (
      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-text)]/8 text-[var(--color-text-muted)]">
        Past
      </span>
    );
  }

  if (diffHours <= 48) {
    return (
      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-secondary)]/15 text-[var(--color-secondary-dark)]">
        Happening Soon
      </span>
    );
  }

  return (
    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)]/15 text-[var(--color-accent-dark)]">
      Upcoming
    </span>
  );
}
