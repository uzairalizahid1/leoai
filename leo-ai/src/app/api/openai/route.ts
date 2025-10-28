import { NextResponse } from 'next/server';
import { generateLectureContent, answerQuestion } from '@/lib/openaiClient';

export async function POST(request: Request) {
  const { action, payload } = await request.json();

  switch (action) {
    case 'generateLecture':
      const { input } = payload;
      const lectureContent = await generateLectureContent(input);
      return NextResponse.json(lectureContent);
    case 'answerQuestion':
      const { question, lectureContext } = payload;
      const answer = await answerQuestion(question, lectureContext);
      return NextResponse.json(answer);
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}
