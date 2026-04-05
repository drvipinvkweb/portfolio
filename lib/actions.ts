"use server";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

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
