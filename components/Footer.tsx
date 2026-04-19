"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black/60 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              DR Vipin <span className="text-primary">VK</span>
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
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/vipinvk?igsh=MThoNTRnM29kYThwNQ==" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-primary/10 p-2.5 rounded-lg text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-primary/10 p-2.5 rounded-lg text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
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
          &copy; {new Date().getFullYear()} DR VIPIN VK. ALL RIGHTS RESERVED.
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
