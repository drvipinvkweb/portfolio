"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "drvipinvk@123") {
      sessionStorage.setItem("admin_auth", "authenticated");
      router.push("/admin/dashboard");
    } else {
      setError("Access Denied");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-foreground">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">VK. Admin</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              required
              placeholder="Enter Access Key"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="bg-card h-12 border-border focus-visible:ring-primary"
            />
            {error && (
              <p className="text-sm font-medium text-destructive mt-2 text-center">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full h-12 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  );
}
