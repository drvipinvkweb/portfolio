"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ApproachSection from "@/components/sections/ApproachSection";
import TargetAudienceSection from "@/components/sections/TargetAudienceSection";
import ImpactSection from "@/components/sections/ImpactSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import PastSessionsSection from "@/components/sections/PastSessionsSection";
import LogosSection from "@/components/sections/LogosSection";
import WhyChooseMeSection from "@/components/sections/WhyChooseMeSection";
import BookAppointmentSection from "@/components/sections/BookAppointmentSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <TargetAudienceSection />
      <ImpactSection />
      <UpcomingEventsSection />
      <PastSessionsSection />
      <LogosSection />
      <WhyChooseMeSection />
      <BookAppointmentSection />
      <Footer />
    </div>
  );
}
