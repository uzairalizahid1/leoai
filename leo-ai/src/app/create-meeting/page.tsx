"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const CreateMeetingPage = () => {
  const [meetingInfo, setMeetingInfo] = useState({
    title: '',
    dateTime: '',
    platform: 'Google Meet',
    lectureId: '',
  });
  const [meetingLink, setMeetingLink] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeetingInfo(prev => ({ ...prev, [name]: value }));
  };

  const scheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/meet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: meetingInfo.title, dateTime: meetingInfo.dateTime }),
    });
    const data = await response.json();
    setMeetingLink(data.meetingLink);
    alert(`Meeting "${meetingInfo.title}" scheduled successfully!`);
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Create New Meeting</h1>
          <form onSubmit={scheduleMeeting} className="bg-secondary rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            {/* Form inputs remain the same */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-400 font-medium mb-2">Meeting Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={meetingInfo.title}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="dateTime" className="block text-gray-400 font-medium mb-2">Date & Time</label>
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={meetingInfo.dateTime}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="platform" className="block text-gray-400 font-medium mb-2">Platform</label>
              <select
                id="platform"
                name="platform"
                value={meetingInfo.platform}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Google Meet</option>
                <option>Zoom</option>
              </select>
            </div>
            <div className="mb-8">
              <label htmlFor="lectureId" className="block text-gray-400 font-medium mb-2">Link Prepared Lecture</label>
              <select
                id="lectureId"
                name="lectureId"
                value={meetingInfo.lectureId}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a lecture</option>
                {/* TODO: Populate with actual lectures from DB */}
                <option value="1">Lecture on Quantum Physics</option>
                <option value="2">History of Ancient Rome</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Schedule & Launch Meeting
            </button>
          </form>
          {meetingLink && (
            <div className="mt-8 text-center">
              <p className="text-lg">Meeting Link:</p>
              <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{meetingLink}</a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateMeetingPage;
