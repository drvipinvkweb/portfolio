"use server";

import { prisma } from "./db";

import { revalidatePath } from "next/cache";

export async function syncUpcomingEvents(data: any[]) {
  try {
    await prisma.upcomingEvent.deleteMany({});
    
    const cleanData = data.map((item: any) => ({
      id: item.id,
      title: item.title || "",
      date: item.date || "",
      time: item.time || "",
      location: item.location || "",
      description: item.description || "",
      image: item.image || "",
      registrationLink: item.registrationLink || null,
    }));

    if (cleanData.length > 0) await prisma.upcomingEvent.createMany({ data: cleanData });
    revalidatePath("/");
  } catch (e) {
    console.error("syncUpcomingEvents Error:", e);
  }
}

export async function getUpcomingEvents() {
  try { return await prisma.upcomingEvent.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return []; }
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
  catch (e) { return []; }
}

export async function syncClientLogos(data: any[]) {
  try {
    await prisma.clientLogo.deleteMany({});

    const cleanData = data.map((item: any) => ({
      id: item.id,
      name: item.name || "Logo",
      image: item.image || "",
    }));

    if (cleanData.length > 0) await prisma.clientLogo.createMany({ data: cleanData });
    revalidatePath("/");
  } catch (e) {
    console.error("syncClientLogos Error:", e);
  }
}

export async function getClientLogos() {
  try { return await prisma.clientLogo.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return []; }
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
    revalidatePath("/");
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
// Force redeploy comment
// Final build stability deployment
