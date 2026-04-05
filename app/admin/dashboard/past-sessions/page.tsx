"use client";

import { useState } from "react";
import { useLocalStorage, SessionItem } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const defaultSessions: SessionItem[] = [
  { id: "1", title: "Venture Capital Fundraising Strategies", date: "Aug 12, 2026", time: "1:00 PM EST", location: "Global VC Summit", description: "An exclusive look into how early-stage startups can position themselves for successful Series A rounds.", image: "/event_poster_1.png" },
  { id: "2", title: "Building Resilient Engineering Teams", date: "Jul 28, 2026", time: "11:00 AM EST", location: "Tech Leadership Conf", description: "Discussing strategies and frameworks for structuring engineering teams for scale and velocity.", image: "/event_poster_1.png" },
  { id: "3", title: "Generative AI in Education", date: "Jun 10, 2026", time: "9:30 AM EST", location: "EdTech World", description: "Keynote presentation detailing the transformative role of AI tutors in hybrid learning environments.", image: "/event_poster_1.png" },
];

export default function AdminPastSessions() {
  const [sessions, setSessions, isClient] = useLocalStorage<SessionItem[]>("admin_past_sessions", defaultSessions);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<SessionItem>>({});

  if (!isClient) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    
    setSessions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: formData.title!,
        date: formData.date!,
        time: formData.time || "",
        location: formData.location || "",
        description: formData.description || "",
        image: formData.image || "/event_poster_1.png",
      }
    ]);
    setIsOpen(false);
    setFormData({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData, image: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Past Sessions</h1>
          <p className="text-muted-foreground">Manage the archive of your completed events.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Add Session
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border border-[#333] text-white">
            <DialogHeader>
              <DialogTitle>Add Past Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input required className="bg-background" value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input required className="bg-background" placeholder="e.g. Jun 10, 2026" value={formData.date || ""} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input className="bg-background" value={formData.time || ""} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input className="bg-background" value={formData.location || ""} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Image (Select File)</Label>
                <Input type="file" accept="image/*" className="bg-background" onChange={handleImageUpload} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea className="bg-background" value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <Button type="submit" className="w-full">Save Session</Button>
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
              <TableHead className="text-neutral-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length === 0 ? (
              <TableRow className="border-[#333] hover:bg-white/5">
                <TableCell colSpan={4} className="text-center text-muted-foreground">No sessions found.</TableCell>
              </TableRow>
            ) : sessions.map((event) => (
              <TableRow key={event.id} className="border-[#333] hover:bg-white/5">
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date} {event.time && `• ${event.time}`}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
