import React from "react";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  size = "md",
}: LogoProps) {
  const heights = {
    sm: 60,
    md: 52,
    lg: 64,
  };

  const h = heights[size];

  return (
    <div className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="The Well - Your Business & Culture Connection"
        height={h}
        style={{ height: `${h}px`, width: "auto" }}
      />
    </div>
  );
}
