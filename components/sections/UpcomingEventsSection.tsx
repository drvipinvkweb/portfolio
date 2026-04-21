"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventItem } from "@/lib/hooks";

const defaultEvents: EventItem[] = [
  { id: "1", title: "AI in Startups Masterclass", date: "Oct 24, 2026", time: "2:00 PM EST", location: "Virtual (Zoom)", description: "Learn how to leverage generative AI models to accelerate your startup's MVP phase.", image: "/event_poster_1.png" },
  { id: "2", title: "STEM Education Future Trends", date: "Nov 05, 2026", time: "10:00 AM EST", location: "Tech Hub, New York", description: "A deep dive into emerging curriculum strategies for high school level STEM education.", image: "/event_poster_1.png" },
  { id: "3", title: "Founder's Pitch Clinic", date: "Nov 15, 2026", time: "4:00 PM EST", location: "Online", description: "Live feedback session on startup pitch decks with seasoned investors and founders.", image: "/event_poster_1.png" },
];

export default function UpcomingEventsSection({ initialEvents = [] }: { initialEvents?: EventItem[] }) {
  const upcomingEvents = initialEvents.length > 0 ? initialEvents : defaultEvents;

  if (upcomingEvents.length === 0) return <section id="upcoming-events" className="space-y-12 px-6 pt-24 pb-12 min-h-[80vh]" />;

  return (
    <section id="upcoming-events" className="space-y-12 px-6 pt-24 pb-12">
      <div className="text-center space-y-4 pt-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Upcoming <span className="text-primary">Events</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Join me for live masterclasses, mentorship clinics, and panel discussions on technology and business strategy.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border border-border overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-48 md:h-56 w-full overflow-hidden bg-black/40">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-105 p-2"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-border text-foreground">
                  Registering Now
                </div>
              </div>
              
              <CardContent className="flex-1 p-6 space-y-4">
                <h3 className="text-xl font-bold line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-sm line-clamp-3 text-muted-foreground pt-2">
                  {event.description}
                </p>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 mt-auto">
                {event.registrationLink ? (
                  <a 
                    href={event.registrationLink.startsWith('http') ? event.registrationLink : `https://${event.registrationLink}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground group">
                      Reserve a Spot
                      <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" className="w-full border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground group">
                    Reserve a Spot
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
