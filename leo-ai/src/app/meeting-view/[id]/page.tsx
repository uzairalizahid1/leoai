"use client";

import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { startLecture, handleUserQuestion } from '@/lib/aiMeetingEngine';

const MeetingViewPage = ({ params }: { params: { id: string } }) => {
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [lectureStarted, setLectureStarted] = useState(false);

  const beginLecture = () => {
    setLectureStarted(true);
    toast.success('Lecture started!');
    // Placeholder for lecture input and context
    const lectureInput = 'An introduction to Quantum Computing.';
    startLecture(lectureInput);
  };

  const askQuestion = () => {
    toast('Listening for your question...');
    // Placeholder for lecture context
    const lectureContext = 'The current topic is quantum entanglement.';
    handleUserQuestion(lectureContext);
  };

  useEffect(() => {
    // This is a mock to simulate the AI speaking indicator
    const interval = setInterval(() => {
      if (lectureStarted) {
        setIsAISpeaking(prev => !prev);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [lectureStarted]);

  return (
    <div className="flex flex-col bg-primary min-h-screen text-white p-6">
      <Toaster />
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Live Lecture: {params.id}</h1>
        {isAISpeaking && <div className="text-lg text-blue-400">AI is speaking...</div>}
      </header>
      <main className="flex-1 bg-secondary rounded-lg p-6 shadow-md">
        {/* Placeholder for lecture content display */}
        <p>Lecture content will be displayed here...</p>
      </main>
      <footer className="mt-6 flex justify-center gap-4">
        {!lectureStarted && (
          <button
            onClick={beginLecture}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Lecture
          </button>
        )}
        {lectureStarted && (
          <button
            onClick={askQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ask a Question
          </button>
        )}
      </footer>
    </div>
  );
};

export default MeetingViewPage;
