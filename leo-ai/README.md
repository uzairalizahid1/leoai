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

## Features

-   **Dashboard:** View key statistics and recent activity at a glance.
-   **Lecture Preparation:** Upload materials (PDF, audio, or text prompts) to automatically generate lecture notes and summaries.
-   **Create Meeting:** Schedule meetings on Google Meet or Zoom and link them to prepared lectures.
-   **Analytics:** Visualize student engagement and meeting data with interactive charts.
-   **Settings:** Configure API keys and application preferences.

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
