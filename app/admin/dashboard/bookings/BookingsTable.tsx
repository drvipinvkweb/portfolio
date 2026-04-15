"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { updateBookingStatus } from "@/lib/actions";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export default function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = React.useState<Booking[]>(initialBookings);

  const handleStatusUpdate = async (id: string, newStatus: Booking["status"]) => {
    const result = await updateBookingStatus(id, newStatus);
    if (result.success) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } else {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      {bookings.length === 0 ? (
        <div className="text-center text-muted-foreground py-12 bg-white/5 rounded-xl border border-dashed border-[#333]">
          No bookings found in the database.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-[#222] border border-[#333] rounded-2xl p-6 space-y-4 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white">{booking.name}</h3>
                  <p className="text-xs text-muted-foreground">{booking.email}</p>
                  <p className="text-xs text-muted-foreground">{booking.phone}</p>
                </div>
                <Badge 
                  variant={booking.status === "Confirmed" ? "default" : booking.status === "Cancelled" ? "destructive" : "secondary"}
                  className={booking.status === "Confirmed" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {booking.status}
                </Badge>
              </div>

              <div className="pt-4 border-t border-[#333] flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{booking.date}</p>
                  <p className="text-xs text-muted-foreground">{booking.time}</p>
                </div>
              </div>

              <div className="bg-black/20 p-3 rounded-lg text-sm text-neutral-400 min-h-[60px]">
                {booking.message || "No message provided."}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  disabled={booking.status === "Confirmed"}
                  onClick={() => handleStatusUpdate(booking.id, "Confirmed")}
                >
                  Confirm
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
                  disabled={booking.status === "Cancelled"}
                  onClick={() => handleStatusUpdate(booking.id, "Cancelled")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
