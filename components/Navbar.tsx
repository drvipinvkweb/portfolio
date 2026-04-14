"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Approach", href: "#approach" },
  { name: "Impact", href: "#impact" },
  { name: "Book Consultation", href: "#book-appointment" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    links.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isScrolled ? 0 : -100, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-card/80 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-border/40 overflow-x-auto max-w-full pointer-events-auto"
        style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
      >
        {links.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(link.href);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={cn(
                "relative px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium rounded-full transition-colors whitespace-nowrap",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {link.name}
            </a>
          );
        })}
      </motion.nav>
    </div>
  );
}
