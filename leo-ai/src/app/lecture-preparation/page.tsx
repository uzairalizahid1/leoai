"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AIResponseBox from '@/components/AIResponseBox';

const LecturePreparationPage = () => {
  const [summary, setSummary] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Handle file upload and call API to generate summary
    setSummary('This is a placeholder summary of the uploaded document.');
  };

  const saveLecture = () => {
    // TODO: Implement logic to save the lecture to the database
    alert('Lecture saved!');
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
                <input type="file" onChange={handleFileUpload} className="mb-4" />
                <p className="text-center text-gray-400">Upload PDF or Audio</p>
              </div>
              <div className="col-span-2">
                <textarea
                  className="w-full h-32 p-4 bg-primary rounded-lg text-white"
                  placeholder="Or type a prompt..."
                ></textarea>
              </div>
            </div>
          </div>
          {summary && (
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
