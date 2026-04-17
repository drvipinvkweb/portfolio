"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 px-6 pt-32 pb-20 relative">
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 space-y-10"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-primary"
          >
            Strategy & Execution Partner
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-none"
          >
            Where <span className="text-primary">Strategy</span> <br />
            Meets <span className="text-primary">Execution.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light mx-auto"
          >
            I help startups and growing businesses clarify their direction, 
            execute with precision, and scale sustainably.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4"
        >
          <Link href="#book-appointment" className={cn(buttonVariants({ size: "lg" }), "rounded-full font-bold h-14 px-10 text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 hover:scale-105 active:scale-95 bg-primary")}>
            Book a Consultation
          </Link>
          <Link href="#upcoming-events" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full font-bold h-14 px-10 text-lg border-white/10 hover:bg-white/5 transition-all duration-500")}>
            View Sessions
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-12"
        >
          <p className="text-sm font-medium text-muted-foreground/80 tracking-wide">
            <span className="text-primary font-bold mr-2">// TRUSTED BY</span>
            Founders across India & the Middle East to scale operations & strategy.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
