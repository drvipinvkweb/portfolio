"use client";

import { motion } from "framer-motion";
import { Zap, Target, Layers, UserPlus } from "lucide-react";

const reasons = [
  {
    title: "Execution-Focused",
    description: "I don't just believe in strategy decks. I work on ground-level execution, systems, and measurable growth.",
    icon: <Zap className="w-6 h-6 text-primary" />
  },
  {
    title: "Founder Mindset",
    description: "Hands-on experience in building and scaling ventures with a focus on real-world results, not just advice.",
    icon: <Target className="w-6 h-6 text-primary" />
  },
  {
    title: "Zero Templates",
    description: "No generic consulting models—every solution is customized to your unique business problem and scale.",
    icon: <Layers className="w-6 h-6 text-primary" />
  },
  {
    title: "Direct Involvement",
    description: "I work closely with founders and leadership teams to solve real obstacles in strategy and execution.",
    icon: <UserPlus className="w-6 h-6 text-primary" />
  }
];

export default function WhyChooseMeSection() {
  return (
    <section id="why-choose-me" className="py-24 px-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

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
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Value Proposition</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Why Work With <span className="text-primary italic">Me?</span>
              </h3>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              In a world of theory-heavy consulting, I offer a grounded, execution-first approach that focuses on 
              turning strategic vision into operational reality.
            </p>

            <div className="space-y-4">
              <button 
                onClick={() => {
                  const el = document.querySelector('#book-appointment');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-3 text-white font-bold text-lg hover:text-primary transition-colors"
              >
                Let&apos;s discuss your project
                <Zap className="w-5 h-5 group-hover:fill-primary transition-all" />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-card/40 border border-white/5 hover:border-primary/20 hover:bg-card/60 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    {reason.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white">{reason.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
