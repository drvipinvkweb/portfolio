"use client";

import { useState } from "react";
import { useLocalStorage, EventItem } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const defaultEvents: EventItem[] = [
  { id: "1", title: "AI in Startups Masterclass", date: "Oct 24, 2026", time: "2:00 PM EST", location: "Virtual (Zoom)", description: "Learn how to leverage generative AI models to accelerate your startup's MVP phase.", image: "/event_poster_1.png" },
  { id: "2", title: "STEM Education Future Trends", date: "Nov 05, 2026", time: "10:00 AM EST", location: "Tech Hub, New York", description: "A deep dive into emerging curriculum strategies for high school level STEM education.", image: "/event_poster_1.png" },
  { id: "3", title: "Founder's Pitch Clinic", date: "Nov 15, 2026", time: "4:00 PM EST", location: "Online", description: "Live feedback session on startup pitch decks with seasoned investors and founders.", image: "/event_poster_1.png" },
];

export default function AdminUpcomingEvents() {
  const [events, setEvents, isClient] = useLocalStorage<EventItem[]>("admin_upcoming_events", defaultEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<EventItem>>({});

  if (!isClient) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: formData.title!,
        date: formData.date!,
        time: formData.time || "",
        location: formData.location || "",
        description: formData.description || "",
        image: formData.image || "/event_poster_1.png",
        registrationLink: formData.registrationLink || "",
      }
    ]);
    setIsOpen(false);
    setFormData({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Upcoming Events</h1>
          <p className="text-muted-foreground">Manage your future sessions and workshops.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Add Event
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border border-[#333] text-white">
            <DialogHeader>
              <DialogTitle>Add New Upcoming Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input required className="bg-background" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input required className="bg-background" placeholder="e.g. Nov 05, 2026" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input className="bg-background" placeholder="e.g. 10:00 AM EST" value={formData.time || ""} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input className="bg-background" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Image (Select File)</Label>
                <Input type="file" accept="image/*" className="bg-background" onChange={handleImageUpload} />
              </div>
              <div className="space-y-2">
                <Label>Registration Link (Optional)</Label>
                <Input className="bg-background" placeholder="https://..." value={formData.registrationLink || ""} onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea className="bg-background" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">Save Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-[#333] rounded-lg bg-[#1a1a1a] text-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#333] hover:bg-transparent">
              <TableHead className="text-neutral-400">Title</TableHead>
              <TableHead className="text-neutral-400">Date/Time</TableHead>
              <TableHead className="text-neutral-400">Location</TableHead>
              <TableHead className="text-neutral-400">Link</TableHead>
              <TableHead className="text-neutral-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow className="border-[#333] hover:bg-white/5">
                <TableCell colSpan={5} className="text-center text-muted-foreground">No events found.</TableCell>
              </TableRow>
            ) : events.map((event) => {
              const absoluteLink = event.registrationLink
                ? (event.registrationLink.startsWith('http') ? event.registrationLink : `https://${event.registrationLink}`)
                : null;

              return (
                <TableRow key={event.id} className="border-[#333] hover:bg-white/5">
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date} {event.time && `• ${event.time}`}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    {absoluteLink ? (
                      <a href={absoluteLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                        View Link
                      </a>
                    ) : (
                      <span className="text-neutral-500 text-xs italic">No link</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
