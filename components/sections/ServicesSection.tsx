"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Rocket, 
  Settings, 
  TrendingUp, 
  UserCircle2,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { 
    title: "Business Strategy & Positioning", 
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    items: [
      "Business Model Structuring",
      "Market Positioning",
      "Revenue Strategy",
      "Go-To-Market Planning"
    ]
  },
  { 
    title: "Startup Launch & Structuring", 
    icon: <Rocket className="w-8 h-8 text-primary" />,
    items: [
      "Idea Validation",
      "MVP Planning",
      "Pricing Strategy",
      "Founder Roadmapping"
    ]
  },
  { 
    title: "Operations & Systems Setup", 
    icon: <Settings className="w-8 h-8 text-primary" />,
    items: [
      "SOP Development",
      "Team Structure Design",
      "Process Optimization",
      "Workflow Automation"
    ]
  },
  { 
    title: "Growth & Scaling", 
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    items: [
      "Sales Funnel Design",
      "Expansion Strategy",
      "Performance Tracking Systems",
      "Business Audit & Optimization"
    ]
  },
  { 
    title: "Personal Consulting for Founders", 
    icon: <UserCircle2 className="w-8 h-8 text-primary" />,
    items: [
      "Decision Clarity",
      "Execution Planning",
      "Accountability Systems",
      "Strategic Mentorship"
    ]
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="space-y-16 px-6 py-24 bg-primary/[0.02]">
      <div className="text-center space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-widest uppercase text-sm"
        >
          Expertise
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          What I Do
        </motion.h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-all duration-300 group">
              <CardContent className="p-8 space-y-6">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
