export function generateGoogleCalendarUrl(event: {
  title: string;
  date: Date;
  endDate?: Date | null;
  location: string;
  details: string;
}): string {
  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatDate(new Date(event.date))}/${formatDate(
      event.endDate ? new Date(event.endDate) : new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000)
    )}`,
    location: event.location,
    details: event.details.slice(0, 500),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICSContent(event: {
  title: string;
  date: Date;
  endDate?: Date | null;
  location: string;
  details: string;
}): string {
  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const end = event.endDate
    ? new Date(event.endDate)
    : new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000);

  // Escape special characters for ICS format
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Well//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatDate(new Date(event.date))}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${escape(event.title)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(event.details.slice(0, 500))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
