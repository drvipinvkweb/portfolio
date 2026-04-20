"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black/60 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Vipin <span className="text-primary">VK</span>
            </h3>
            <p className="text-primary/60 font-bold text-xs tracking-[0.3em] uppercase">
              Business Consultant
            </p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Helping startups and growing businesses clarify their direction, execute with precision, and scale sustainably.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">drvipinvk@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm">+91 9292109404</span>
            </li>
          </ul>
          
          <div className="pt-4 flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/drvipinvk?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-primary/10 p-2.5 rounded-lg text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/vipinvk?igsh=MThoNTRnM29kYThwNQ==" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-primary/10 p-2.5 rounded-lg text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              title="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-primary/10 p-2.5 rounded-lg text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              title="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Location & Coverage</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-muted-foreground group">
              <div className="bg-primary/10 p-2 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Kochi, Kerala</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground group">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">India & International Consulting</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Subscribe for strategic insights and updates.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 w-full"
            />
            <button className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} VIPIN VK. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-8 h-px bg-primary/30" />
          <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase italic">
            Where Strategy Meets Execution.
          </p>
          <span className="w-8 h-px bg-primary/30" />
        </div>
      </div>
    </footer>
  );
}
