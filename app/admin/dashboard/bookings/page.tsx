import { getBookings } from "@/lib/actions";
import BookingsTable from "./BookingsTable";


export default async function AdminBookingsPage() {
  const bookings = await getBookings() || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Manage Bookings</h1>
          <p className="text-muted-foreground">View and update incoming appointment requests from the database.</p>
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
