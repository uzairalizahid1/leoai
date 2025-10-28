import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const SettingsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        {/* TODO: Add settings form */}
      </main>
    </div>
  );
};

export default SettingsPage;
