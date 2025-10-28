import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // TODO: Return dummy analytics data
  return NextResponse.json({ engagement: 75, questions: 12 });
}
