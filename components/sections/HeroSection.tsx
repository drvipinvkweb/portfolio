"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 px-6 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-8"
      >
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Where <span className="text-primary italic">Strategy</span> <br />
            Meets <span className="text-primary">Execution.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            I help startups and growing businesses clarify their direction, 
            execute with precision, and scale sustainably.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <Link href="#book-appointment" className={cn(buttonVariants({ size: "lg" }), "rounded-full font-semibold h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300")}>
            Book a Consultation
          </Link>
          <Link href="#upcoming-events" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full font-semibold h-12 px-8 bg-transparent border-primary/20 hover:bg-primary/10 transition-all duration-300")}>
            View Sessions
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-white/5 inline-block"
        >
          <p className="text-sm font-medium text-muted-foreground/80 tracking-wide uppercase">
            <span className="text-primary font-bold mr-2">// TRUSTED BY</span>
            Worked with startups, education companies, and operational teams across India & the Middle East.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <div className="relative group w-[280px] h-[380px] md:w-[380px] md:h-[500px] flex items-end justify-center">
          <div className="relative w-full h-full rounded-3xl flex items-end justify-center bg-transparent border-0 z-10">
            <Image
              src="/vipin_vk_transparent.png"
              alt="Vipin VK - Profile"
              fill
              priority
              className="object-contain object-bottom scale-125 hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
