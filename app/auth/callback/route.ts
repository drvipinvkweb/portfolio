import { NextRequest, NextResponse } from 'next/server';
import { setGoogleCredentials } from '@/lib/google';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    await setGoogleCredentials(code);
    return NextResponse.redirect(new URL('/admin/dashboard/bookings', req.url));
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
