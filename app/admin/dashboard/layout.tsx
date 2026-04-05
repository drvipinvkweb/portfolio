"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Calendar, Search, Users, LogOut, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth !== "authenticated") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-primary">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Upcoming Events", href: "/admin/dashboard/upcoming-events", icon: Calendar },
    { name: "Past Sessions", href: "/admin/dashboard/past-sessions", icon: Search },
    { name: "Client Logos", href: "/admin/dashboard/logos", icon: Users },
    { name: "Bookings", href: "/admin/dashboard/bookings", icon: Users },
    { name: "Availability", href: "/admin/dashboard/availability", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#1a1a1a] border-r border-[#333] flex flex-col text-white">
        <div className="h-16 flex items-center px-6 border-b border-[#333]">
          <h2 className="text-xl font-bold tracking-tight text-white"><span className="text-primary">VK</span> Admin</h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-black" : "text-neutral-400")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#333]">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-[#0a0a0a] p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
