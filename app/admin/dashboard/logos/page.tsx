"use client";

import { useState } from "react";
import { useLocalStorage, LogoItem } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultLogos: LogoItem[] = [
  { id: "1", name: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: "2", name: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { id: "3", name: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: "4", name: "Tesla", image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { id: "5", name: "Meta", image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
];

export default function AdminLogos() {
  const [logos, setLogos, isClient] = useLocalStorage<LogoItem[]>("admin_client_logos", defaultLogos);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<LogoItem>>({});

  if (!isClient) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;

    setLogos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: formData.name!,
        image: formData.image!,
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
    setLogos((prev) => prev.filter((logo) => logo.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Client Logos</h1>
          <p className="text-muted-foreground">Manage the infinite scrolling logos bar.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="inline-flex items-center justify-center bg-primary text-primary-foreground h-9 px-4 py-2 rounded-md font-medium text-sm">
            Add Logo
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border border-[#333] text-white">
            <DialogHeader>
              <DialogTitle>Add New Logo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input required className="bg-background" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Logo Image (Select File)</Label>
                <Input type="file" accept="image/*" className="bg-background" onChange={handleImageUpload} />
              </div>
              <Button type="submit" className="w-full">Save Logo</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {logos.map((logo) => (
          <div key={logo.id} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 flex flex-col items-center gap-4 relative group">
            <button
              onClick={() => handleDelete(logo.id)}
              className="absolute top-2 right-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Delete
            </button>
            <div className="h-12 w-full flex items-center justify-center">
              <img src={logo.image} alt={logo.name} className="max-h-full max-w-full object-contain filter brightness-0 invert" />
            </div>
            <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">{logo.name}</p>
          </div>
        ))}
        {logos.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-[#333] rounded-xl text-neutral-500">
            No logos added yet. Click 'Add Logo' to start.
          </div>
        )}
      </div>
    </div>
  );
}
