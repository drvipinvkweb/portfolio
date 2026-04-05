"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "7+", label: "YEARS OF EXPERIENCE" },
  { value: "15+", label: "STARTUPS CONSULTED" },
  { value: "20+", label: "BUSINESS VENTURES" },
];

export default function StatsSection() {
  return (
    <section className="py-12 border-y border-white/5 bg-black/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="space-y-2 group"
            >
              <h3 className="text-5xl font-bold text-white transition-colors group-hover:text-primary">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
