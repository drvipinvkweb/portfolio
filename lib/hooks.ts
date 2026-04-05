"use client";

import { useState, useEffect } from "react";

import * as actions from "./actions";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Remote Database Loading Phase
    const fetchRemote = async () => {
      try {
        let dbData = null;
        if (key === "admin_upcoming_events") dbData = await actions.getUpcomingEvents();
        if (key === "admin_past_sessions") dbData = await actions.getPastSessions();
        if (key === "admin_bookings") dbData = await actions.getBookings();
        if (key === "admin_client_logos") dbData = await actions.getClientLogos();
        if (key === "admin_date_availability") dbData = await actions.getAvailability();

        if (dbData) {
          setStoredValue(dbData as T);
          return;
        }
      } catch (e) { console.error("DB Fetch Error:", e); }

      // Fallback local storage
      try {
        const item = window.localStorage.getItem(key);
        if (item) setStoredValue(JSON.parse(item));
        else window.localStorage.setItem(key, JSON.stringify(initialValue));
      } catch (error) {
        console.warn("Unable to read localStorage", error);
      }
    };
    fetchRemote();
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event("storage"));
      }

      // Background Remote Sync Phase
      setTimeout(async () => {
        try {
          if (key === "admin_upcoming_events") await actions.syncUpcomingEvents(valueToStore as any);
          if (key === "admin_past_sessions") await actions.syncPastSessions(valueToStore as any);
          if (key === "admin_bookings") await actions.syncBookings(valueToStore as any);
          if (key === "admin_client_logos") await actions.syncClientLogos(valueToStore as any);
          if (key === "admin_date_availability") await actions.syncAvailability(valueToStore as any);
        } catch (e) { console.error("Background sync failed", e); }
      }, 0);
      
    } catch (error) {
      console.warn("Unable to set localStorage", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(error);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, isClient] as const;
}

export type EventItem = { id: string; title: string; date: string; time: string; location: string; description: string; image: string; registrationLink?: string; };
export type SessionItem = { id: string; title: string; date: string; time: string; location: string; description: string; image: string; registrationLink?: string; };
export type BookingItem = { id: string; name: string; email: string; phone: string; message: string; date: string; time: string; status: "Pending" | "Confirmed" | "Cancelled" };
export type LogoItem = { id: string; name: string; image: string };
