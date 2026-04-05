"use client";

import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import PastSessionsSection from "@/components/sections/PastSessionsSection";
import LogosSection from "@/components/sections/LogosSection";
import BookAppointmentSection from "@/components/sections/BookAppointmentSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <UpcomingEventsSection />
      <PastSessionsSection />
      <LogosSection />
      <BookAppointmentSection />
    </div>
  );
}
