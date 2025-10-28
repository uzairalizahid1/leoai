import { sendEmail } from '@/lib/emailClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { to, subject, html } = await request.json();
  await sendEmail(to, subject, html);
  return NextResponse.json({ success: true });
}
