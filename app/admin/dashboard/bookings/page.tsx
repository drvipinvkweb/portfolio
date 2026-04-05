"use client";

import { useLocalStorage, BookingItem } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminBookings() {
  const [bookings, setBookings, isClient] = useLocalStorage<BookingItem[]>("admin_bookings", []);

  if (!isClient) return null;

  const updateStatus = (id: string, newStatus: BookingItem["status"]) => {
    setBookings((prev) => 
      prev.map((booking) => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Manage Bookings</h1>
        <p className="text-muted-foreground">View and update incoming appointment requests.</p>
      </div>

      <div className="border border-[#333] rounded-lg bg-[#1a1a1a] text-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#333] hover:bg-transparent">
              <TableHead className="text-neutral-400 min-w-[150px]">Contact</TableHead>
              <TableHead className="text-neutral-400">Date/Time</TableHead>
              <TableHead className="text-neutral-400 max-w-[200px]">Message</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
              <TableHead className="text-neutral-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow className="border-[#333] hover:bg-white/5">
                <TableCell colSpan={5} className="text-center text-muted-foreground">No bookings found.</TableCell>
              </TableRow>
            ) : bookings.map((booking) => (
              <TableRow key={booking.id} className="border-[#333] hover:bg-white/5">
                <TableCell>
                  <div className="font-medium">{booking.name}</div>
                  <div className="text-xs text-muted-foreground">{booking.email}</div>
                  <div className="text-xs text-muted-foreground">{booking.phone}</div>
                </TableCell>
                <TableCell>
                  <div>{booking.date}</div>
                  <div className="text-xs text-muted-foreground">{booking.time}</div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={booking.message}>
                  {booking.message}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={booking.status === "Confirmed" ? "default" : booking.status === "Cancelled" ? "destructive" : "secondary"}
                    className={booking.status === "Confirmed" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    disabled={booking.status === "Confirmed"}
                    onClick={() => updateStatus(booking.id, "Confirmed")}
                  >
                    Confirm
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    disabled={booking.status === "Cancelled"}
                    onClick={() => updateStatus(booking.id, "Cancelled")}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
