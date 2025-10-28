"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Chart from '@/components/Chart';

const AnalyticsPage = () => {
  const weeklyData = [
    { name: 'Week 1', interactions: 400, questions: 240 },
    { name: 'Week 2', interactions: 300, questions: 139 },
    { name: 'Week 3', interactions: 200, questions: 980 },
    { name: 'Week 4', interactions: 278, questions: 390 },
  ];

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <div className="flex justify-end mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Export Report
            </button>
          </div>
          <Chart data={weeklyData} />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
