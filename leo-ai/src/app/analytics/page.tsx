"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Chart from '@/components/Chart';
import StatsCard from '@/components/StatsCard';

const AnalyticsPage = () => {
  const weeklyData = [
    { name: 'Week 1', interactions: 400, questions: 240 },
    { name: 'Week 2', interactions: 300, questions: 139 },
    { name: 'Week 3', interactions: 200, questions: 980 },
    { name: 'Week 4', interactions: 278, questions: 390 },
  ];

  const analyticsStats = [
    { title: 'Number of Sessions Held', value: 12 },
    { title: 'Total Lecture Duration', value: '8h 32m' },
    { title: 'Questions Asked & Answered', value: 142 },
    { title: 'Average Response Time', value: '2.5s' },
  ];

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsStats.map((stat, index) => (
              <StatsCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
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
