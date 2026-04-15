import { getBookings, getGoogleConnectionStatus } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, XCircle } from "lucide-react";
import BookingsTable from "./BookingsTable";
import Link from "next/link";

export default async function AdminBookingsPage() {
  const bookings = await getBookings() || [];
  const isConnected = await getGoogleConnectionStatus();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Manage Bookings</h1>
          <p className="text-muted-foreground">View and update incoming appointment requests from the database.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Connected to Google Calendar
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm font-medium">
              <XCircle className="w-4 h-4" />
              Not Connected
            </div>
          )}
          
          <Button asChild variant={isConnected ? "outline" : "default"} className={!isConnected ? "bg-primary hover:bg-primary/90" : ""}>
            <Link href="/api/auth/google">
              <Calendar className="w-4 h-4 mr-2" />
              {isConnected ? "Reconnect Calendar" : "Connect Google Calendar"}
            </Link>
          </Button>
        </div>
      </div>

      <div className="border border-[#333] rounded-lg bg-[#1a1a1a] text-white overflow-hidden">
        <BookingsTable initialBookings={bookings.map(b => ({
          ...b,
          id: b.id,
          name: b.name,
          email: b.email,
          phone: b.phone,
          message: b.message,
          date: b.date,
          time: b.time,
          status: b.status as any
        }))} />
      </div>
    </div>
  );
}
