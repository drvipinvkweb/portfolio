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
import { getUpcomingEvents, getPastSessions, getClientLogos, getAvailability } from "@/lib/actions";

export default async function Home() {
  const [upcomingEvents, pastSessions, clientLogos, availability] = await Promise.all([
    getUpcomingEvents(),
    getPastSessions(),
    getClientLogos(),
    getAvailability()
  ]);

  return (
    <div className="flex flex-col gap-0 pb-0">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <TargetAudienceSection />
      <ImpactSection />
      <UpcomingEventsSection initialEvents={upcomingEvents || []} />
      <PastSessionsSection initialSessions={pastSessions || []} />
      <LogosSection initialLogos={clientLogos || []} />
      <WhyChooseMeSection />
      <BookAppointmentSection initialAvailability={availability || {}} />
      <Footer />
    </div>
  );
}

