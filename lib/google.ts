import { google } from 'googleapis';
import { prisma } from './db';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function getGoogleAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
}

export async function setGoogleCredentials(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  
  if (tokens.refresh_token) {
    await prisma.googleToken.upsert({
      where: { id: 'google-token' },
      update: {
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
        expiryDate: tokens.expiry_date!,
      },
      create: {
        id: 'google-token',
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
        expiryDate: tokens.expiry_date!,
      },
    });
  } else {
    // If no refresh token, update only access token and expiry
    await prisma.googleToken.update({
      where: { id: 'google-token' },
      data: {
        accessToken: tokens.access_token!,
        expiryDate: tokens.expiry_date!,
      },
    });
  }
}

export async function getAuthorizedClient() {
  const tokenRecord = await prisma.googleToken.findUnique({
    where: { id: 'google-token' },
  });

  if (!tokenRecord) return null;

  oauth2Client.setCredentials({
    access_token: tokenRecord.accessToken,
    refresh_token: tokenRecord.refreshToken,
    expiry_date: Number(tokenRecord.expiryDate),
  });

  // Check if token is expired and refresh if necessary
  if (Date.now() >= Number(tokenRecord.expiryDate)) {
    const { credentials } = await oauth2Client.refreshAccessToken();
    await prisma.googleToken.update({
      where: { id: 'google-token' },
      data: {
        accessToken: credentials.access_token!,
        expiryDate: credentials.expiry_date!,
      },
    });
    oauth2Client.setCredentials(credentials);
  }

  return oauth2Client;
}

export async function createCalendarEvent(booking: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}) {
  const client = await getAuthorizedClient();
  if (!client) return null;

  const calendar = google.calendar({ version: 'v3', auth: client });

  // Parse date and time (assuming formats like "Mar 15, 2024" and "09:00 AM")
  // For simplicity, we'll try to construct a valid ISO string.
  // Note: Adjusting parsing logic might be needed based on exact date-fns format.
  const startDateTime = new Date(`${booking.date} ${booking.time}`);
  const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 mins appointment

  const event = {
    summary: `Appointment - ${booking.name}`,
    description: `Name: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nMessage: ${booking.message}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'UTC', // Replace with admin's timezone if known
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'UTC',
    },
    reminders: {
      useDefault: true,
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all',
    });
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}

export async function sendConfirmationEmail(booking: {
  name: string;
  email: string;
  date: string;
  time: string;
}) {
  const client = await getAuthorizedClient();
  if (!client) return null;

  const gmail = google.gmail({ version: 'v1', auth: client });

  const subject = `Booking Confirmation - Appointment with Dr. Vipin VK`;
  const body = `Hi ${booking.name},\n\nYour appointment has been successfully booked for ${booking.date} at ${booking.time}.\n\nLooking forward to seeing you!\n\nBest regards,\nDr. Vipin VK`;

  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `From: Dr. Vipin VK <me>`,
    `To: ${booking.email}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    body,
  ];
  const message = messageParts.join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}
