# Leo AI - AI-Powered Virtual Lecturer

Leo AI is an AI-powered virtual lecturer and meeting assistant that prepares, delivers, and manages interactive online workshops or lectures.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes
- **Database & Auth:** Supabase
- **AI:** OpenAI API integration
- **Deployment:** Vercel

## Getting Started

### 1. Set up Supabase

1.  Go to [Supabase](https://supabase.io/) and create a new project.
2.  In your project dashboard, navigate to the SQL Editor and run the script from `/supabase/migrations/schema.sql` to create the necessary tables.
3.  Go to "Settings" > "API" and find your Project URL and anon key.

### 2. Local Development

1.  Clone the repository and install the dependencies:
    ```bash
    git clone https://github.com/your-username/leo-ai.git
    cd leo-ai
    npm install
    ```
2.  Create a `.env` file by copying `.env.example` and add your Supabase and OpenAI API keys.
3.  Run the development server:
    ```bash
    npm run dev
    ```

### 3. Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Create a new project on Vercel and import your repository.
3.  Add your environment variables in the Vercel project settings.
4.  Deploy!

## Live AI Hosting Workflow

... (rest of the README remains the same)
