import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const LecturesPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Lectures</h1>
        {/* TODO: Add lecture creation and management UI */}
      </main>
    </div>
  );
};

export default LecturesPage;
