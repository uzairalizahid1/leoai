"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Account');
  // State for account, team, and API key settings

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div className="flex border-b border-gray-700">
            <button onClick={() => setActiveTab('Account')} className={`py-2 px-4 ${activeTab === 'Account' ? 'border-b-2 border-blue-500' : ''}`}>Account</button>
            <button onClick={() => setActiveTab('Team')} className={`py-2 px-4 ${activeTab === 'Team' ? 'border-b-2 border-blue-500' : ''}`}>Team</button>
            <button onClick={() => setActiveTab('API Keys')} className={`py-2 px-4 ${activeTab === 'API Keys' ? 'border-b-2 border-blue-500' : ''}`}>API Keys</button>
          </div>
          <div className="mt-8">
            {activeTab === 'Account' && <div>Account Settings</div>}
            {activeTab === 'Team' && <div>Team Settings</div>}
            {activeTab === 'API Keys' && <div>API Key Settings</div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
