import { NextResponse } from 'next/server';
import { createMeetSession } from '@/lib/googleMeet';

export async function POST(request: Request) {
  const { title, dateTime } = await request.json();
  const meetingLink = await createMeetSession(title, dateTime);
  return NextResponse.json({ meetingLink });
}
