import React from 'react';
import ChartCard from '@/components/ChartCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const AnalyticsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartCard />
          <ChartCard />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
