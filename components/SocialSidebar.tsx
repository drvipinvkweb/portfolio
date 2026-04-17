"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
}

export default function SocialSidebar() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 hidden sm:flex"
    >
      <div className="flex flex-col gap-6 text-muted-foreground">
        <a href="https://www.instagram.com/vipinvk?igsh=MThoNTRnM29kYThwNQ==" target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-110 transition-all">
          <InstagramIcon className="w-5 h-5" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-110 transition-all">
          <FacebookIcon className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/drvipinvk?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-110 transition-all">
          <LinkedinIcon className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="h-16 w-px bg-gradient-to-b from-white/20 to-transparent" />
        <div className="relative h-24 w-4 flex items-center justify-center">
          <span className="-rotate-90 absolute whitespace-nowrap text-[10px] font-bold tracking-[0.5em] text-muted-foreground/40 uppercase select-none hover:text-primary transition-all duration-300 transform-gpu cursor-default">
            Follow Me
          </span>
        </div>
      </div>
    </motion.div>
  );
}
