"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AIResponseBox from '@/components/AIResponseBox';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

const LecturePreparationPage = () => {
  const [lectureContent, setLectureContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');

  const handleGenerateLecture = async (input: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generateLecture', payload: { input } }),
      });
      const content = await response.json();
      setLectureContent(content);
    } catch (error) {
      console.error('Failed to generate lecture content:', error);
      toast.error('Failed to generate lecture content.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveLecture = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && lectureContent) {
      const { error } = await supabase.from('lectures').insert({
        user_id: user.id,
        title,
        content: lectureContent,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Lecture saved successfully!');
      }
    }
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
              <div className="flex flex-col items-center justify-center p-6 bg-primary rounded-lg">
                <input type="file" className="mb-4" />
                <p className="text-center text-gray-400">Upload PDF or Audio</p>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 mb-4 text-white bg-primary rounded-md"
                  required
                />
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
          {lectureContent && (
            <div className="mt-8">
              <AIResponseBox />
              <button
                onClick={saveLecture}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Lecture
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LecturePreparationPage;
