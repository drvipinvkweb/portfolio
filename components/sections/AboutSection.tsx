"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Settings2, Rocket } from "lucide-react";

const highlights = [
  {
    icon: <Building2 className="w-5 h-5 text-primary" />,
    text: "Built & scaled operations across 100+ institutions"
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-primary" />,
    text: "Worked in EdTech, Skill Development, and Startup Ecosystems"
  },
  {
    icon: <Settings2 className="w-5 h-5 text-primary" />,
    text: "Expertise in Strategy, Operations, and Business Structuring"
  },
  {
    icon: <Rocket className="w-5 h-5 text-primary" />,
    text: "Founder & Mentor with real startup experience"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Built for Founders Who Want <span className="text-primary">Results</span> — Not Just Advice
              </h3>
            </div>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I’m Vipin, a Business & Startup Consultant focused on turning ideas into structured, scalable businesses.
              </p>
              <p>
                With hands-on experience in building and scaling ventures in education, operations, and technology, 
                I work closely with founders and leadership teams to solve real problems — from unclear strategy 
                to broken execution systems.
              </p>
              <p className="border-l-2 border-primary/30 pl-6 italic bg-primary/5 py-4 rounded-r-2xl">
                I don’t believe in theory-heavy consulting. I work on ground-level execution, systems, and measurable growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative grayscale hover:grayscale-0 transition-all duration-700"
          >
            <div className="aspect-[4/5] rounded-[2rem] bg-card/40 border border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                src="/vipin_vk_transparent.png"
                alt="Vipin VK"
                className="w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <p className="text-3xl font-bold text-white">DR Vipin VK</p>
                <p className="text-primary font-medium tracking-widest uppercase text-sm">Founder & Consultant</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-primary/20 rounded-tr-[3rem]" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-primary/20 rounded-bl-[3rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
