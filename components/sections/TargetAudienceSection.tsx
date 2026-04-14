"use client";

import { motion } from "framer-motion";
import { Users, Building, GraduationCap, Workflow } from "lucide-react";

const targetGroups = [
  {
    title: "Startup Founders",
    subtitle: "Idea to Growth Stage",
    icon: <Users className="w-6 h-6 text-primary" />,
    description: "Whether you're validating an idea or scaling a proven model, I provide the strategic roadmap and execution systems you need."
  },
  {
    title: "Business Owners",
    subtitle: "Facing Growth Challenges",
    icon: <Building className="w-6 h-6 text-primary" />,
    description: "For established businesses that have hit a plateau or are struggling with the transition from small to medium-scale operations."
  },
  {
    title: "EdTech & Skill Dev",
    subtitle: "Education Companies",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    description: "Specialized consulting for education institutions and technology platforms looking to streamline operations across multiple locations."
  },
  {
    title: "Operational Teams",
    subtitle: "Struggling with Systems",
    icon: <Workflow className="w-6 h-6 text-primary" />,
    description: "For leadership teams that have the vision but lack the ground-level execution systems, SOPs, and workflow automation."
  }
];

export default function TargetAudienceSection() {
  return (
    <section id="who-it-is-for" className="py-24 px-6 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Who This Is <span className="text-primary italic">For</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              I work with a select group of founders and organizations that are committed to measurable growth and operational excellence.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block pb-2"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary opacity-60" />
                  </div>
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                +100
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-card/40 border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {group.icon}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest mt-1">
                      {group.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {group.description}
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
