"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AIResponseBox from '@/components/AIResponseBox';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { personalities } from '@/lib/aiPersonalities';
import { useSubscription } from '@/app/hooks/useSubscription';

const LecturePreparationPage = () => {
  const [lectureContent, setLectureContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [personality, setPersonality] = useState<keyof typeof personalities>('warm_lecturer');
  const subscription = useSubscription();

  const handleGenerateLecture = async (input: string) => {
    // ... (handleGenerateLecture logic remains the same)
  };

  const saveLecture = async () => {
    // ... (saveLecture logic remains the same)
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Lecture Preparation</h1>
          <div className="bg-secondary rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Your Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ... (file upload and title input) */}
              <div className="col-span-2">
                {subscription?.plan === 'Pro' ? (
                  <select value={personality} onChange={(e) => setPersonality(e.target.value as keyof typeof personalities)} className="w-full px-4 py-2 mb-4 text-white bg-primary rounded-md">
                    {Object.entries(personalities).map(([key, value]) => (
                      <option key={key} value={key}>{value.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="mb-4">
                    <p className="text-gray-400">Upgrade to Pro to unlock more AI personalities.</p>
                  </div>
                )}
                <textarea
                  id="lecture-input"
                  className="w-full h-32 p-4 bg-primary rounded-lg text-white"
                  placeholder="Or type a prompt..."
                ></textarea>
                <button
                  onClick={() => handleGenerateLecture((document.getElementById('lecture-input') as HTMLTextAreaElement).value)}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Lecture'}
                </button>
              </div>
            </div>
          </div>
          {/* ... (lecture content display) */}
        </div>
      </main>
    </div>
  );
};

export default LecturePreparationPage;
