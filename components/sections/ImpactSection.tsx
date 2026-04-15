"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, GraduationCap } from "lucide-react";

const impacts = [
  {
    title: "EdTech Operations",
    metric: "100+ Schools",
    description: "Helped an EdTech company streamline operations and scale across 100+ schools regionally.",
    icon: <GraduationCap className="w-6 h-6 text-primary" />
  },
  {
    title: "Student Impact",
    metric: "1000+ Students",
    description: "Built structured programs impacting over 1000+ students through skill development initiatives.",
    icon: <Users className="w-6 h-6 text-primary" />
  },
  {
    title: "Team Efficiency",
    metric: "40% Increase",
    description: "Designed systems that significantly improved team efficiency and execution speed for operational teams.",
    icon: <TrendingUp className="w-6 h-6 text-primary" />
  },
  {
    title: "Founder Mentorship",
    metric: "Idea to Revenue",
    description: "Mentored founders to successfully move from idea stage to revenue-generating businesses.",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  }
];

const stats = [
  { value: "7+", label: "YEARS OF EXPERIENCE" },
  { value: "15+", label: "STARTUPS CONSULTED" },
  { value: "20+", label: "BUSINESS VENTURES" },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Real Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Measurable results across startups, education, and large-scale operations.
          </motion.p>
        </div>

        {/* Top Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-12 border-y border-white/5 bg-white/[0.02] rounded-[3rem]">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center space-y-2"
            >
              <h3 className="text-5xl font-bold text-white tracking-tighter">{stat.value}</h3>
              <p className="text-xs font-bold text-primary tracking-[0.3em] uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Impact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {impacts.map((impact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-10 rounded-[2.5rem] bg-card/30 border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="w-16 h-16 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {impact.icon}
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {impact.title}
                    </h4>
                    <span className="shrink-0 text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full text-xs tracking-widest border border-primary/20">
                      {impact.metric}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {impact.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
