"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SecretTrigger() {
  const router = useRouter();
  const [keys, setKeys] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      setKeys((prev) => {
        // Keep only the last 4 characters to avoid unbounded growth
        const nextKeys = (prev + e.key).slice(-4);
        if (nextKeys === "4646") {
          router.push("/admin");
          return ""; // Reset after trigger
        }
        return nextKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
