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
  const [rawEvents, rawLogos, availability, rawBookings] = await Promise.all([
    getUpcomingEvents(),
    getClientLogos(),
    getAvailability(),
    getBookings()
  ]);

  // Type-safe mapping for the front-end
  const upcomingEvents = (rawEvents || []).map(e => ({ ...e, registrationLink: e.registrationLink || undefined }));
  const clientLogos = rawLogos || [];
  const bookings = (rawBookings || []).map(b => ({ ...b, status: b.status }));

  return (
    <div className="flex flex-col gap-0 pb-0">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <TargetAudienceSection />
      <ImpactSection />
      <UpcomingEventsSection initialEvents={upcomingEvents} />
      <LogosSection initialLogos={clientLogos} />
      <WhyChooseMeSection />
      <BookAppointmentSection 
        initialAvailability={availability || {}} 
        initialBookings={bookings}
      />
      <Footer />
    </div>
  );
}



