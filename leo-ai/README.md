# Leo AI - AI-Powered Virtual Lecturer

Leo AI is an AI-powered virtual lecturer and meeting assistant that prepares, delivers, and manages interactive online workshops or lectures.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express (or Next.js API routes)
- **Database:** MongoDB (via Mongoose)
- **Auth:** NextAuth (Google + Email)
- **AI:** OpenAI API integration (for text + TTS)
- **Deployment:** Vercel or Render

## Getting Started

First, rename `.env.example` to `.env` and fill in the required environment variables.

Then, install the dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Meeting Engine

The AI Meeting Engine is the core component responsible for simulating a live lecture experience. It's designed to be modular, allowing for future integrations with real-time communication platforms like Google Meet or Zoom.

### How it Simulates Teaching

The engine takes lecture notes as input and uses an AI model (currently a placeholder for the OpenAI API) to generate a timed lecture script. Each segment of the script is associated with a timestamp, allowing the engine to simulate the flow of a real lecture. The `simulateLecture` function iterates through these segments, delivering them at the specified intervals.

### Pause/Resume and Q&A Logic

The simulation can be paused and resumed at any time. When a participant "raises their hand," the lecture is automatically paused, and the `handleQuestion` function is invoked. This function captures the student's question, sends it to the AI for an answer, and logs the interaction. Once the answer is provided, the lecture can be resumed.

### Connecting to Google Meet API

While the current implementation is a simulation, the engine is designed for future integration with the Google Meet API. To connect to Google Meet, you would need to:

1.  **Authenticate:** Use OAuth 2.0 to authenticate with the Google Meet API.
2.  **Real-time Transcription:** Integrate a speech-to-text service to transcribe the audio from the Google Meet session in real-time.
3.  **AI-Powered Responses:** Feed the transcribed text to the AI Meeting Engine to generate responses.
4.  **Text-to-Speech (TTS):** Use a TTS service to deliver the AI's responses back into the Google Meet session.

## Future Features

-   [ ] User authentication with NextAuth
-   [ ] Lecture creation from uploaded notes or PDFs
-   [ ] AI-generated slides and speaker scripts
-   [ ] Google Meet and Zoom integration for scheduling meetings
-   [ ] AI-powered lecture delivery with text-to-speech
-   [ ] Real-time Q&A with AI assistance
-   [ ] Post-lecture analytics and reports
-   [ ] AI voice customization
-   [ ] PDF report generation

This project is still in its early stages. We welcome contributions from the community!
