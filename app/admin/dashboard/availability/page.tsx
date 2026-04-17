"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useLocalStorage } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Plus, Trash2, CalendarIcon } from "lucide-react";

const BASE_SLOTS = [
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

export default function AdminAvailability() {
  const [availability, setAvailability, isClient] = useLocalStorage<Record<string, string[]>>("admin_date_availability", {});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newSlot, setNewSlot] = useState("");

  if (!isClient) return null;

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const rawSlots = dateKey && availability[dateKey] ? availability[dateKey] : [];
  
  // Sundays are disabled
  const isSunday = selectedDate?.getDay() === 0;

  // For the UI, we merge BASE_SLOTS with any custom ones
  // But if the date has NO config and it's not Sunday, we assume all BASE_SLOTS are ON
  const activeSlots = (dateKey && availability[dateKey]) 
    ? availability[dateKey] 
    : (isSunday ? [] : BASE_SLOTS);

  const toggleSlot = (slot: string) => {
    if (!dateKey) return;
    const isCurrentlyActive = activeSlots.includes(slot);
    
    setAvailability((prev) => {
      const currentConfig = prev[dateKey] || (isSunday ? [] : [...BASE_SLOTS]);
      let newConfig;
      if (isCurrentlyActive) {
        newConfig = currentConfig.filter(s => s !== slot);
      } else {
        newConfig = [...currentConfig, slot].sort();
      }
      return { ...prev, [dateKey]: newConfig };
    });
  };

  const handleAddCustomSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateKey || !newSlot.trim() || activeSlots.includes(newSlot.trim())) return;
    
    setAvailability((prev) => {
      const currentConfig = prev[dateKey] || (isSunday ? [] : [...BASE_SLOTS]);
      return {
        ...prev,
        [dateKey]: [...currentConfig, newSlot.trim()].sort()
      };
    });
    setNewSlot("");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Availability Manager</h1>
        <p className="text-muted-foreground">Manage your working hours. Default is Mon-Sat, 3 PM - 9 PM.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 h-fit">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(d) => d.getDay() === 0}
            className="rounded-md text-white bg-transparent"
            classNames={{
              day_selected: "bg-primary text-black font-bold hover:bg-primary hover:text-black focus:bg-primary focus:text-black",
              day_today: "bg-[#333] text-white",
            }}
          />
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 space-y-8">
          <div className="flex items-center justify-between border-b border-[#333] pb-4">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-white">
                {selectedDate ? format(selectedDate, "EEEE, MMM do") : "Select a date"}
              </h2>
            </div>
            {isSunday && <span className="text-red-500 text-sm font-bold">CLOSED (Sunday)</span>}
          </div>

          {!isSunday && selectedDate && (
            <>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Standard Hours (3 PM - 9 PM)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BASE_SLOTS.map((slot) => {
                    const isActive = activeSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => toggleSlot(slot)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                          isActive 
                            ? "bg-primary/10 border-primary text-primary" 
                            : "bg-black/20 border-[#333] text-muted-foreground hover:border-white/20"
                        }`}
                      >
                        <span className="text-sm font-bold">{slot}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isActive ? "bg-primary border-primary" : "border-white/20"}`}>
                          {isActive && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#333]">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Add Custom Slot</h3>
                <form onSubmit={handleAddCustomSlot} className="flex gap-3">
                  <Input 
                    className="flex-1 bg-black/40 border-[#333]" 
                    placeholder="e.g. 10:00 AM" 
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                  />
                  <Button type="submit" className="shrink-0 gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </form>

                {activeSlots.filter(s => !BASE_SLOTS.includes(s)).length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-medium text-muted-foreground mb-3">Active Custom Slots:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSlots.filter(s => !BASE_SLOTS.includes(s)).map(slot => (
                        <div key={slot} className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-3 py-1 text-xs text-primary">
                          {slot}
                          <button onClick={() => toggleSlot(slot)} className="hover:text-red-400">
                             <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

