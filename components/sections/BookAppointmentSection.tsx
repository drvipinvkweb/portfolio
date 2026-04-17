"use client";

import * as React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/hooks";
import { createBooking } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BASE_SLOTS = [
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

export default function BookAppointmentSection({ initialAvailability = {} }: { initialAvailability?: Record<string, string[]> }) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [availability, , isClient] = useLocalStorage<Record<string, string[]>>("admin_date_availability", initialAvailability);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setIsSheetOpen(true);
    }
  };

  const getAvailableSlots = (d: Date) => {
    // Sunday check
    if (d.getDay() === 0) return [];

    const dateKey = format(d, "yyyy-MM-dd");
    const customSlots = availability[dateKey];

    // If custom config exists for this date, use it
    if (customSlots && customSlots.length > 0) return customSlots;
    
    // Default to 3 PM - 9 PM
    return BASE_SLOTS;
  };

  const currentSlots = date ? getAvailableSlots(date) : [];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime) return;

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    setIsSubmitting(true);
    
    try {
      const result = await createBooking({
        name,
        email,
        phone,
        message,
        date: format(date, "MMM dd, yyyy"),
        time: selectedTime,
      });

      if (result.success) {
        setIsSheetOpen(false);
        setDate(undefined);
        setSelectedTime(null);
        alert("Appointment successfully booked! A confirmation email has been sent.");
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return <section id="book-appointment" className="space-y-12 px-6 pt-24 pb-12 min-h-screen" />;

  return (
    <section id="book-appointment" className="space-y-12 px-6 pt-24 pb-12">
      <div className="text-center space-y-4 pt-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Let&apos;s Build Something <span className="text-primary italic">That Works.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          If you&apos;re serious about building or scaling your business, let&apos;s talk. 
          Select a date to schedule your strategy consultation.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mx-auto bg-card/80 backdrop-blur-md border border-border p-6 rounded-3xl shadow-xl flex justify-center flex-col items-center gap-4"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md [&_.rdp-day_button:hover]:bg-primary/20 [&_.rdp-day_button[aria-selected='true']]:bg-primary [&_.rdp-day_button[aria-selected='true']]:text-primary-foreground focus:outline-none"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_outside: "text-muted-foreground opacity-50",
          }}
          disabled={(d) => {
            // Disable dates in the past or Sundays
            return d < new Date() || d.getDay() === 0;
          }}
        />
        <p className="text-xs text-muted-foreground text-center">
          Available Mon-Sat: 3:00 PM - 9:00 PM unless specifically booked or blocked.
        </p>
      </motion.div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l-border bg-card">
          <SheetHeader className="mb-6">
            <SheetTitle>Complete your booking</SheetTitle>
            <SheetDescription>
              {date ? (
                <span className="flex items-center gap-2 mt-2 font-medium text-foreground">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  {format(date, "EEEE, MMMM do, yyyy")}
                </span>
              ) : "Select a date to continue."}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleBooking} className="space-y-6">
            <div className="space-y-3">
              <Label>Select a Time Slot</Label>
              {currentSlots.length === 0 ? (
                <div className="p-4 border border-dashed border-border rounded-md text-sm text-center text-muted-foreground">
                  No availability configured for this date.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {currentSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "flex items-center justify-center py-2 px-3 text-sm rounded-md border transition-all duration-200",
                        selectedTime === time 
                          ? "bg-primary border-primary text-primary-foreground shadow-sm font-medium"
                          : "bg-background border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required placeholder="John Doe" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" required placeholder="john@example.com" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message roughly detailing topic</Label>
                <Textarea 
                  id="message" 
                  required 
                  placeholder="I would like to discuss..." 
                  className="min-h-[100px] bg-background"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold"
              disabled={!selectedTime || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
