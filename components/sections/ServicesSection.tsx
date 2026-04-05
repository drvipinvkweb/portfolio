"use client";

import { motion } from "framer-motion";
import { UserPlus, TrendingUp, HandCoins, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { 
    title: "Entrepreneur", 
    icon: <UserPlus className="w-8 h-8 text-primary" />,
    description: "Founded and scaled multiple ventures, bringing a diverse portfolio of successful business empires across multiple sectors."
  },
  { 
    title: "Business Mentor", 
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    description: "Guiding young Entrepreneurs through mentorship, management training, and decisive leadership development curriculums."
  },
  { 
    title: "Investor", 
    icon: <HandCoins className="w-8 h-8 text-primary" />,
    description: "Fueling early-stage startups and smart ideas with strategic capital, vast networking, and vital growth support."
  },
  { 
    title: "Speaker & Visionary", 
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    description: "Sharing my journey, insights, and lessons learned through global seminars, keynotes, webinars, and leadership events."
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="space-y-16 px-6 pt-24 pb-12">
      <div className="text-center space-y-4 pt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-widest uppercase text-sm"
        >
          Services
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white relative inline-block"
        >
          What I Do
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-border flex gap-1">
            <div className="w-4 h-full bg-primary" />
            <div className="w-2 h-full bg-primary/50" />
          </div>
        </motion.h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-transparent border-0 shadow-none">
              <CardContent className="p-0 flex flex-col md:flex-row gap-6 items-start text-left">
                <div className="bg-card/50 w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl border border-border">
                  {service.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
