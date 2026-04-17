"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage, SessionItem } from "@/lib/hooks";

const defaultSessions: SessionItem[] = [
  { id: "1", title: "Venture Capital Fundraising Strategies", date: "Aug 12, 2026", time: "1:00 PM EST", location: "Global VC Summit", description: "An exclusive look into how early-stage startups can position themselves for successful Series A rounds.", image: "/event_poster_1.png" },
  { id: "2", title: "Building Resilient Engineering Teams", date: "Jul 28, 2026", time: "11:00 AM EST", location: "Tech Leadership Conf", description: "Discussing strategies and frameworks for structuring engineering teams for scale and velocity.", image: "/event_poster_1.png" },
  { id: "3", title: "Generative AI in Education", date: "Jun 10, 2026", time: "9:30 AM EST", location: "EdTech World", description: "Keynote presentation detailing the transformative role of AI tutors in hybrid learning environments.", image: "/event_poster_1.png" },
];

export default function PastSessionsSection({ initialSessions = [] }: { initialSessions?: SessionItem[] }) {
  const [pastEvents, , isClient] = useLocalStorage<SessionItem[]>("admin_past_sessions", initialSessions.length > 0 ? initialSessions : defaultSessions);

  if (!isClient) return <section id="past-sessions" className="space-y-12 px-6 pt-24 pb-12 min-h-[80vh]" />;

  return (
    <section id="past-sessions" className="space-y-12 py-24 bg-black/40 overflow-hidden border-y border-white/5">
      <div className="text-center space-y-4 px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Past <span className="text-primary">Sessions</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Explore previous masterclasses, speaking engagements, and workshops.
        </motion.p>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...pastEvents, ...pastEvents].map((event, index) => (
            <div key={`${event.id}-${index}`} className="w-[350px] md:w-[450px] shrink-0">
              <Card className="flex flex-col h-full bg-card/40 backdrop-blur-sm border border-border overflow-hidden grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-xs font-semibold border border-border text-white backdrop-blur-sm">
                    Completed
                  </div>
                </div>
                
                <CardContent className="flex-1 p-6 space-y-4">
                  <h3 className="text-xl font-bold line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm line-clamp-3 text-muted-foreground pt-2">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
