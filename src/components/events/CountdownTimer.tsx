"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    function calculate() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }

    calculate();
    const interval = setInterval(calculate, 60_000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center gap-4">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Min" },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] tabular-nums leading-none">
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
