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

const amenityItems: SpotlightItem[] = [
  { icon: Wifi, title: "High-Speed Wi-Fi", description: "Stay connected with reliable, fast internet throughout the entire facility.", color: "#1B4D6E" },
  { icon: Car, title: "Secure Parking", description: "Convenient, well-lit parking available for all members and guests.", color: "#5A6E7D" },
  { icon: UtensilsCrossed, title: "Prep Kitchen", description: "A fully equipped prep kitchen for catering and event food preparation.", color: "#C8963E" },
  { icon: Video, title: "Live Stream Capabilities", description: "Broadcast your events with professional-grade live streaming equipment.", color: "#E05252" },
  { icon: Printer, title: "Printing and Fax Services", description: "On-site printing, copying, and fax services for all your business needs.", color: "#2A7B6F" },
  { icon: Headphones, title: "Admin Support Services", description: "Professional administrative support to keep your business running smoothly.", color: "#7C5CBF" },
  { icon: Mail, title: "Mail Services", description: "Secure mail handling and a professional business address for your correspondence.", color: "#D4785C" },
  { icon: MonitorSmartphone, title: "Video Conferencing Services", description: "State-of-the-art video conferencing for seamless remote collaboration.", color: "#3A8FCC" },
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

export function AmenitiesSpotlight() {
  return (
    <SpotlightCards
      items={amenityItems}
      eyebrow="Amenities"
      heading="Enhanced Amenities"
    />
  );
}
