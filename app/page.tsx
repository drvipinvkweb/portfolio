import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ApproachSection from "@/components/sections/ApproachSection";
import TargetAudienceSection from "@/components/sections/TargetAudienceSection";
import ImpactSection from "@/components/sections/ImpactSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import LogosSection from "@/components/sections/LogosSection";
import WhyChooseMeSection from "@/components/sections/WhyChooseMeSection";
import BookAppointmentSection from "@/components/sections/BookAppointmentSection";
import Footer from "@/components/Footer";
import { getUpcomingEvents, getClientLogos, getAvailability, getBookings } from "@/lib/actions";

export default async function Home() {
  const [upcomingEvents, clientLogos, availability, bookings] = await Promise.all([
    getUpcomingEvents(),
    getClientLogos(),
    getAvailability(),
    getBookings()
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
      <LogosSection initialLogos={clientLogos || []} />
      <WhyChooseMeSection />
      <BookAppointmentSection 
        initialAvailability={availability || {}} 
        initialBookings={bookings || []}
      />
      <Footer />
    </div>
  );
}



