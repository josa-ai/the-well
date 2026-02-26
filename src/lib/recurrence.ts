/**
 * Generates recurring event dates based on a pattern.
 *
 * @param startDate - The first occurrence
 * @param pattern - "weekly" | "biweekly" | "monthly-date" | "monthly-day"
 * @param days - Day codes for weekly patterns: ["MO","TU","WE","TH","FR","SA","SU"]
 * @param endDate - When to stop generating (null = 1 year from start)
 * @param maxInstances - Cap on total instances (default 52)
 * @returns Array of Date objects for each occurrence
 */

const DAY_MAP: Record<string, number> = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
};

export function generateRecurrenceDates(
  startDate: Date,
  pattern: string,
  days: string[],
  endDate: Date | null,
  maxInstances: number = 52
): Date[] {
  const end = endDate || new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
  const dates: Date[] = [];

  switch (pattern) {
    case "weekly":
      return generateWeekly(startDate, days, end, maxInstances, 1);
    case "biweekly":
      return generateWeekly(startDate, days, end, maxInstances, 2);
    case "monthly-date":
      return generateMonthlyDate(startDate, end, maxInstances);
    case "monthly-day":
      return generateMonthlyDay(startDate, end, maxInstances);
    default:
      return dates;
  }
}

function generateWeekly(
  startDate: Date,
  days: string[],
  endDate: Date,
  maxInstances: number,
  weekInterval: number
): Date[] {
  const dates: Date[] = [];
  const targetDays = days.map((d) => DAY_MAP[d]).filter((d) => d !== undefined);

  if (targetDays.length === 0) {
    // Default to the start date's day of week
    targetDays.push(startDate.getDay());
  }

  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();

  // Start from the beginning of the week containing startDate
  const current = new Date(startDate);
  current.setDate(current.getDate() - current.getDay()); // Move to Sunday

  while (current <= endDate && dates.length < maxInstances) {
    for (const dayNum of targetDays.sort((a, b) => a - b)) {
      const candidate = new Date(current);
      candidate.setDate(candidate.getDate() + dayNum);
      candidate.setHours(hours, minutes, 0, 0);

      if (candidate >= startDate && candidate <= endDate && dates.length < maxInstances) {
        dates.push(candidate);
      }
    }
    // Advance by weekInterval weeks
    current.setDate(current.getDate() + 7 * weekInterval);
  }

  return dates;
}

function generateMonthlyDate(
  startDate: Date,
  endDate: Date,
  maxInstances: number
): Date[] {
  const dates: Date[] = [];
  const dayOfMonth = startDate.getDate();
  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();

  let current = new Date(startDate);

  while (current <= endDate && dates.length < maxInstances) {
    // Handle months that don't have this day (e.g., Feb 30)
    const candidate = new Date(current.getFullYear(), current.getMonth(), dayOfMonth, hours, minutes);
    if (candidate.getDate() === dayOfMonth && candidate >= startDate && candidate <= endDate) {
      dates.push(candidate);
    }
    // Move to next month
    current.setMonth(current.getMonth() + 1);
  }

  return dates;
}

function generateMonthlyDay(
  startDate: Date,
  endDate: Date,
  maxInstances: number
): Date[] {
  const dates: Date[] = [];
  const dayOfWeek = startDate.getDay();
  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();

  // Determine which occurrence of the weekday (1st, 2nd, 3rd, 4th)
  const weekOfMonth = Math.ceil(startDate.getDate() / 7);

  let current = new Date(startDate);

  while (current <= endDate && dates.length < maxInstances) {
    const candidate = getNthWeekdayOfMonth(
      current.getFullYear(),
      current.getMonth(),
      dayOfWeek,
      weekOfMonth
    );
    if (candidate) {
      candidate.setHours(hours, minutes, 0, 0);
      if (candidate >= startDate && candidate <= endDate) {
        dates.push(candidate);
      }
    }
    // Move to next month
    current.setMonth(current.getMonth() + 1);
  }

  return dates;
}

function getNthWeekdayOfMonth(
  year: number,
  month: number,
  dayOfWeek: number,
  n: number
): Date | null {
  const firstDay = new Date(year, month, 1);
  let dayOffset = dayOfWeek - firstDay.getDay();
  if (dayOffset < 0) dayOffset += 7;

  const date = 1 + dayOffset + (n - 1) * 7;
  const result = new Date(year, month, date);

  // Verify the result is still in the correct month
  if (result.getMonth() !== month) return null;
  return result;
}

/**
 * Returns a human-readable label for the recurrence pattern count.
 */
export function getRecurrencePreviewCount(
  startDate: Date | null,
  pattern: string,
  days: string[],
  endDate: Date | null
): number {
  if (!startDate || !pattern || pattern === "none") return 0;
  return generateRecurrenceDates(startDate, pattern, days, endDate).length;
}
