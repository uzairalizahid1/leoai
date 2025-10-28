import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable
});

/**
 * Generates a structured lecture script from a given input.
 * @param {string} input - The lecture notes or topic.
 * @returns {Promise<object>} - A structured JSON object representing the lecture.
 */
export const generateLectureContent = async (input: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI lecturer. Create a structured lecture script from the following input.
                    Each segment should have a timestamp, a text block, and an explanation level (basic, intermediate, or advanced).
                    Return the response as a JSON object with a "segments" array.'
        },
        { role: 'user', content: input },
      ],
    });

    const content = response.choices[0].message?.content;
    if (content) {
      return JSON.parse(content);
    }
    return { segments: [] };
  } catch (error) {
    console.error('Error generating lecture content:', error);
    return { segments: [] };
  }
};

/**
 * Generates a spoken-style answer to a question within a given lecture context.
 * @param {string} question - The question from the user.
 * @param {string} lectureContext - The relevant context from the lecture.
 * @returns {Promise<object>} - A structured JSON object with the answer.
 */
export const answerQuestion = async (question: string, lectureContext: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI lecturer. Answer the following question in a clear, spoken-style tone.
                    The answer should be concise and easy to understand.
                    Return the response as a JSON object with a "response" field.'
        },
        { role: 'user', content: `Context: ${lectureContext}\n\nQuestion: ${question}` },
      ],
    });

    const content = response.choices[0].message?.content;
    if (content) {
      return JSON.parse(content);
    }
    return { response: 'Sorry, I could not generate an answer.' };
  } catch (error) {
    console.error('Error answering question:', error);
    return { response: 'Sorry, I encountered an error.' };
  }
};
