"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    googleApiKey: '',
    zoomApiKey: '',
    openaiApiKey: '',
    enableRealTimeQA: true,
    autoSummarize: false,
    enableVoiceOutput: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('leoAiSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('leoAiSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <form onSubmit={saveSettings} className="bg-secondary rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-6">API Keys</h2>
            <div className="mb-4">
              <label htmlFor="googleApiKey" className="block text-gray-400 mb-2">Google Meet API Key</label>
              <input
                type="text"
                id="googleApiKey"
                name="googleApiKey"
                value={settings.googleApiKey}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zoomApiKey" className="block text-gray-400 mb-2">Zoom API Key</label>
              <input
                type="text"
                id="zoomApiKey"
                name="zoomApiKey"
                value={settings.zoomApiKey}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-2 rounded"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="openaiApiKey" className="block text-gray-400 mb-2">OpenAI API Key</label>
              <input
                type="text"
                id="openaiApiKey"
                name="openaiApiKey"
                value={settings.openaiApiKey}
                onChange={handleInputChange}
                className="w-full bg-primary text-white p-2 rounded"
              />
            </div>
            <h2 className="text-xl font-bold mb-6">Preferences</h2>
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="enableRealTimeQA" className="text-gray-400">Enable Real-Time Q&A</label>
              <input
                type="checkbox"
                id="enableRealTimeQA"
                name="enableRealTimeQA"
                checked={settings.enableRealTimeQA}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="autoSummarize" className="text-gray-400">Auto Summarize Lectures</label>
              <input
                type="checkbox"
                id="autoSummarize"
                name="autoSummarize"
                checked={settings.autoSummarize}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between mb-8">
              <label htmlFor="enableVoiceOutput" className="text-gray-400">Enable AI Voice Output</label>
              <input
                type="checkbox"
                id="enableVoiceOutput"
                name="enableVoiceOutput"
                checked={settings.enableVoiceOutput}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Settings
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
