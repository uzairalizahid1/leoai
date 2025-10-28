/**
 * @file voiceEngine.ts
 * @description Implements text-to-speech and speech-to-text using the Web Speech API.
 */

/**
 * Converts text to speech using the browser's TTS engine.
 * @param {string} text - The text to be spoken.
 */
export const textToSpeech = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Speech synthesis not supported in this browser.');
  }
};

/**
 * Converts speech to text using the browser's speech recognition engine.
 * @returns {Promise<string>} - The recognized text.
 */
export const speechToText = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event: any) => {
        reject(event.error);
      };

      recognition.start();
    } else {
      reject('Speech recognition not supported in this browser.');
    }
  });
};
