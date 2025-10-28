"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useSubscription } from '@/app/hooks/useSubscription';
import { personalities } from '@/lib/aiPersonalities';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const subscription = useSubscription();
  const [defaultPersonality, setDefaultPersonality] = useState('');

  // Fetch and set user preferences

  const handleSavePreferences = async () => {
    // Save preferences to Supabase
    toast.success('Preferences saved!');
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div className="flex border-b border-gray-700">
            {/* ... tabs */}
          </div>
          <div className="mt-8">
            {activeTab === 'Account' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Account</h2>
                <p>Current Plan: {subscription?.plan}</p>
                <select value={defaultPersonality} onChange={(e) => setDefaultPersonality(e.target.value)} className="w-full px-4 py-2 mt-4 text-white bg-primary rounded-md">
                  {Object.entries(personalities).map(([key, value]) => (
                    <option key={key} value={key}>{value.name}</option>
                  ))}
                </select>
                <button onClick={handleSavePreferences} className="mt-4 px-4 py-2 bg-blue-600 rounded-md">Save</button>
              </div>
            )}
            {/* ... other tabs */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
