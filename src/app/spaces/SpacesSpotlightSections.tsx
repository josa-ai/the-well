"use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import type { SpotlightItem } from "@/components/kokonutui/spotlight-cards";
import {
  DollarSign,
  Monitor,
  HeartPulse,
  Briefcase,
  GraduationCap,
  Activity,
  Award,
  Wifi,
  Car,
  UtensilsCrossed,
  Video,
  Printer,
  Headphones,
  Mail,
  MonitorSmartphone,
} from "lucide-react";

const communityProgramItems: SpotlightItem[] = [
  { icon: DollarSign, title: "Financial Literacy Training", description: "Build financial knowledge and skills for personal and professional success.", color: "#C8963E" },
  { icon: Monitor, title: "Computer Training", description: "Gain essential digital skills and computer proficiency for the modern workplace.", color: "#1B4D6E" },
  { icon: HeartPulse, title: "First Aid/CPR/CNA Training", description: "Learn life-saving techniques and earn certifications in a supportive environment.", color: "#E05252" },
  { icon: Briefcase, title: "Business Plan Development", description: "Turn your entrepreneurial vision into a structured, actionable business plan.", color: "#2A7B6F" },
  { icon: GraduationCap, title: "College Scholarship Coaching", description: "Get expert guidance on scholarship applications and college preparation.", color: "#7C5CBF" },
  { icon: Activity, title: "Health & Wellness Coaching", description: "Invest in your well-being with personalized health and wellness support.", color: "#D4785C" },
  { icon: Award, title: "Training & Professional Development", description: "Advance your career with targeted training and professional growth programs.", color: "#3A8FCC" },
];

const amenities = [
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Car, label: "Secure Parking" },
  { icon: UtensilsCrossed, label: "Prep Kitchen" },
  { icon: Video, label: "Live Streaming" },
  { icon: Printer, label: "Printing & Fax" },
  { icon: Headphones, label: "Admin Support" },
  { icon: Mail, label: "Mail Services" },
  { icon: MonitorSmartphone, label: "Video Conferencing" },
];

export function CommunityProgramsSpotlight() {
  return (
    <SpotlightCards
      items={communityProgramItems}
      eyebrow="Programs"
      heading="Empowering Your Community"
    />
  );
}

export function WhatWeOfferSection() {
  return (
    <div>
      <SpotlightCards
        items={communityProgramItems}
        eyebrow="What We Offer"
        heading="Programs & Amenities"
      />

      {/* Amenity Strip */}
      <div className="border-t border-border pt-8 mt-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center lg:gap-0">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.label}
                className={`flex items-center gap-2.5 px-5 py-3 lg:py-2 ${
                  index < amenities.length - 1 ? "lg:border-r lg:border-border" : ""
                }`}
              >
                <Icon size={20} strokeWidth={1.6} className="text-secondary shrink-0" />
                <span className="text-text-muted font-[family-name:var(--font-inter)] whitespace-nowrap">
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
