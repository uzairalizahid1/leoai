/**
 * @file aiMeetingEngine.ts
 * @description Core logic for handling real-time AI-powered meetings.
 */

import { textToSpeech, speechToText } from './voiceEngine';
import { supabase } from './supabaseClient';

/**
 * Starts the AI-powered lecture.
 * @param {string} lectureInput - The input material for the lecture.
 */
export const startLecture = async (lectureInput: string) => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generateLecture', payload: { input: lectureInput } }),
    });
    const lecture = await response.json();

    if (lecture && lecture.segments) {
      for (const segment of lecture.segments) {
        // Display the segment text on the UI
        console.log(`[${segment.timestamp}] ${segment.text}`);

        // Speak the segment
        textToSpeech(segment.text);

        // Wait for the segment duration before proceeding
        await new Promise(resolve => setTimeout(resolve, segment.duration * 1000));
      }
    }
  } catch (error) {
    console.error('An error occurred during the lecture:', error);
    textToSpeech('Sorry, an error occurred during the lecture.');
  }
};

/**
 * Handles a user's question during a lecture.
 * @param {string} lectureContext - The context of the lecture for the AI.
 * @param {string} meetingId - The ID of the current meeting.
 */
export const handleUserQuestion = async (lectureContext: string, meetingId: string) => {
  try {
    // Convert user's speech to text
    const userQuestion = await speechToText();
    console.log(`User question: "${userQuestion}"`);

    // Get an answer from the AI
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'answerQuestion', payload: { question: userQuestion, lectureContext } }),
    });
    const aiResponse = await response.json();

    if (aiResponse && aiResponse.response) {
      // Display the AI's response
      console.log(`AI Response: "${aiResponse.response}"`);

      // Speak the AI's response
      textToSpeech(aiResponse.response);

      // Save to database
      await supabase.from('questions').insert({
        meeting_id: meetingId,
        question_text: userQuestion,
        ai_response: aiResponse.response,
      });
    }
  } catch (error) {
    console.error('An error occurred while handling the question:', error);
    textToSpeech('Sorry, I was unable to process your question.');
  }
};
