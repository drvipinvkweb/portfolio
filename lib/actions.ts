"use server";

import { prisma } from "./db";

import { createCalendarEvent, sendConfirmationEmail } from "./google";
import { revalidatePath } from "next/cache";

export async function syncUpcomingEvents(data: any[]) {
  try {
    await prisma.upcomingEvent.deleteMany({});
    if (data.length > 0) await prisma.upcomingEvent.createMany({ data });
  } catch (e) {
    console.error(e);
  }
}

export async function getUpcomingEvents() {
  try { return await prisma.upcomingEvent.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return null; }
}

export async function syncPastSessions(data: any[]) {
  try {
    await prisma.pastSession.deleteMany({});
    if (data.length > 0) await prisma.pastSession.createMany({ data });
  } catch (e) {
    console.error(e);
  }
}

export async function getPastSessions() {
  try { return await prisma.pastSession.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return null; }
}

export async function syncBookings(data: any[]) {
  try {
    await prisma.booking.deleteMany({});
    if (data.length > 0) await prisma.booking.createMany({ data });
  } catch (e) {
    console.error(e);
  }
}

export async function getBookings() {
  try { return await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return null; }
}

export async function syncClientLogos(data: any[]) {
  try {
    await prisma.clientLogo.deleteMany({});
    if (data.length > 0) await prisma.clientLogo.createMany({ data });
  } catch (e) {
    console.error(e);
  }
}

export async function getClientLogos() {
  try { return await prisma.clientLogo.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return null; }
}

export async function syncAvailability(data: Record<string, string[]>) {
  try {
    await prisma.availabilityConfig.deleteMany({});
    const rows = [];
    for (const [dateKey, slots] of Object.entries(data)) {
      for (const timeSlot of slots) {
        rows.push({ dateKey, timeSlot });
      }
    }
    if (rows.length > 0) await prisma.availabilityConfig.createMany({ data: rows });
  } catch (e) {
    console.error(e);
  }
}

export async function getAvailability() {
  try {
    const configs = await prisma.availabilityConfig.findMany();
    const result: Record<string, string[]> = {};
    for (const row of configs) {
      if (!result[row.dateKey]) result[row.dateKey] = [];
      result[row.dateKey].push(row.timeSlot);
    }
    if (Object.keys(result).length === 0) return null;
    return result;
  } catch (error) {
    return null;
  }
}

export async function createBooking(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  time: string;
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        ...data,
        status: "Pending",
      },
    });

    // Try to create Google Calendar event
    await createCalendarEvent(data);

    // Try to send confirmation email
    await sendConfirmationEmail({
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time
    });

    revalidatePath("/admin/dashboard/bookings");
    return { success: true, booking };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/dashboard/bookings");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getGoogleConnectionStatus() {
  try {
    const token = await prisma.googleToken.findUnique({
      where: { id: "google-token" },
    });
    return !!token;
  } catch (error) {
    return false;
  }
}
// Force redeploy comment
