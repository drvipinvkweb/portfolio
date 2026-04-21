"use client";

import { LogoItem } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";

const defaultLogos: LogoItem[] = [
  { id: "1", name: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: "2", name: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { id: "3", name: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: "4", name: "Tesla", image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { id: "5", name: "Meta", image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
];

export default function LogosSection({ initialLogos = [] }: { initialLogos?: LogoItem[] }) {
  const logos = initialLogos.length > 0 ? initialLogos : defaultLogos;

  if (logos.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden border-y border-white/5 bg-black/20">
      <div className="text-center space-y-4 mb-16 px-6 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white"
        >
          Startups Built. Skills Transformed. Futures Shaped.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Mentored and guided multiple startups and skill-driven ventures across domains.
        </motion.p>
      </div>

      <div className="relative w-full flex overflow-hidden group py-10 items-center">
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-16 md:gap-24 w-max px-16 items-center"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* Duplicate array to create the seamless infinite scroll loop effect */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="flex-shrink-0 flex items-center justify-center transition-all duration-300 bg-white/95 rounded-2xl p-4 md:p-6 w-36 h-20 md:w-48 md:h-28 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <img 
                src={logo.image} 
                alt="Client Logo" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
