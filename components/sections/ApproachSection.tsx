"use client";

import { motion } from "framer-motion";
import { Search, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    title: "Clarify",
    icon: <Search className="w-8 h-8 text-primary" />,
    description: "We define your business direction, goals, and priorities.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Execute",
    icon: <Zap className="w-8 h-8 text-primary" />,
    description: "We build systems, processes, and action plans that actually work.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Scale",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    description: "We optimize and grow your business sustainably.",
    color: "from-orange-500/20 to-yellow-500/20"
  }
];

export default function ApproachSection() {
  return (
    <section id="approach" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            My Approach: <span className="text-primary italic">Clarify.</span> Execute. Scale.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A proven methodology designed to take your business from uncertainty to sustainable growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center space-y-6 p-8 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-sm group-hover:border-primary/20 transition-all duration-500">
                <div className="relative">
                  <div className="bg-primary/10 w-20 h-20 flex items-center justify-center rounded-2xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border border-white/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                    0{idx + 1}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
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
