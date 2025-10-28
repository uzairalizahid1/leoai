import OpenAI from 'openai';
import { personalities } from './aiPersonalities';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateLectureWithPersonality = async (input: string, mode: keyof typeof personalities) => {
  const personality = personalities[mode];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: personality.prompt },
      { role: 'user', content: `Create a lecture about: ${input}` },
    ],
  });

  return response.choices[0].message?.content;
};

// ... (answerQuestion function remains the same)
