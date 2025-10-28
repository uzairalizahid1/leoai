import React from 'react';
import LectureCard from '@/components/LectureCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Lecture
        </button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LectureCard />
          <LectureCard />
          <LectureCard />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
