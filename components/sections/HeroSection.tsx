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
        className="flex-1 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
          Hi, I&apos;m <span className="text-primary">Vipin VK</span>
        </h1>
        <div className="h-10 text-2xl md:text-3xl font-medium text-muted-foreground">
          I am a{" "}
          <span className="text-white">
            <Typewriter
              words={["Business Strategist", "Consultant", "Innovator", "Technologist", "Startup Mentor", "Founder & CEO"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
          Empowering the next generation of innovators and guiding tech startups to scale. 
          With a deep passion for STEM and business strategy, I help build the future, one idea at a time.
        </p>
        
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link href="#book-appointment" className={cn(buttonVariants({ size: "lg" }), "rounded-full font-medium h-12 px-8")}>
            Book an Appointment
          </Link>
          <Link href="#upcoming-events" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full font-medium h-12 px-8 bg-transparent hover:bg-white/10")}>
            View Sessions
          </Link>
        </div>
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
