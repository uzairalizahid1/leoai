import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StatsCard from '@/components/StatsCard';
import LectureCard from '@/components/LectureCard';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Lectures Prepared', value: 12 },
    { title: 'Meetings Scheduled', value: 8 },
    { title: 'Active Workshops', value: 3 },
    { title: 'Avg. Student Engagement', value: '85%' },
  ];

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for recent lectures */}
              <LectureCard />
              <LectureCard />
              <LectureCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
