"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useLocalStorage } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Plus, Trash2, CalendarIcon } from "lucide-react";

export default function AdminAvailability() {
  const [availability, setAvailability, isClient] = useLocalStorage<Record<string, string[]>>("admin_date_availability", {});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newSlot, setNewSlot] = useState("");

  if (!isClient) return null;

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const currentSlots = dateKey && availability[dateKey] ? availability[dateKey] : [];

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateKey || !newSlot.trim() || currentSlots.includes(newSlot.trim())) return;
    
    setAvailability((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newSlot.trim()].sort()
    }));
    setNewSlot("");
  };

  const handleDeleteSlot = (slotToDelete: string) => {
    if (!dateKey) return;
    setAvailability((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(slot => slot !== slotToDelete)
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Date-wise Availability</h1>
        <p className="text-muted-foreground">Select a specific date on the calendar to manage its custom time slots.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 h-fit">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md [&_.rdp-day_button:hover]:bg-primary/20 [&_.rdp-day_button[aria-selected='true']]:bg-primary [&_.rdp-day_button[aria-selected='true']]:text-primary-foreground text-white bg-transparent"
            classNames={{
              day_selected: "bg-primary text-black font-bold hover:bg-primary hover:text-black focus:bg-primary focus:text-black",
              day_today: "bg-[#333] text-white",
            }}
          />
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#333] pb-4">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-white">
              {selectedDate ? format(selectedDate, "MMMM do, yyyy") : "Select a date"}
            </h2>
          </div>

          <form onSubmit={handleAddSlot} className="flex gap-4">
            <Input 
              className="flex-1 bg-background" 
              placeholder="e.g., 05:00 PM" 
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              disabled={!selectedDate}
            />
            <Button type="submit" className="shrink-0 gap-2" disabled={!selectedDate}>
              <Plus className="w-4 h-4" /> Add Slot
            </Button>
          </form>

          <div className="space-y-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Configured Slots
            </h3>
            {currentSlots.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 border border-dashed border-[#333] rounded-lg text-center">
                No time slots available on this date.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {currentSlots.map((slot) => (
                  <div key={slot} className="flex items-center justify-between bg-black/40 border border-[#333] rounded-lg px-3 py-2 group">
                    <span className="text-sm font-medium text-white">{slot}</span>
                    <button 
                      onClick={() => handleDeleteSlot(slot)}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
