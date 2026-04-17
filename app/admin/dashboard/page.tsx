"use client";

import { useLocalStorage, EventItem, BookingItem } from "@/lib/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

export default function DashboardOverview() {
  const [events, , isClientE] = useLocalStorage<EventItem[]>("admin_upcoming_events", []);
  const [bookings, , isClientB] = useLocalStorage<BookingItem[]>("admin_bookings", []);

  if (!isClientE || !isClientB) return null;

  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
      <p className="text-muted-foreground">Welcome back, Vipin VK. Here is an overview of your platform.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-400">Upcoming Events</p>
              <p className="text-3xl font-bold text-white">{events.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-400">Pending Bookings</p>
              <p className="text-3xl font-bold text-white">{pendingBookings}</p>
            </div>
            <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

