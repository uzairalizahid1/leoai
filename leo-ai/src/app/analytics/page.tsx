"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Chart from '@/components/Chart';
import StatsCard from '@/components/StatsCard';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

const AnalyticsPage = () => {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch teams, stats, and chart data
      }
    };
    fetchData();
  }, [selectedTeam]);

  const exportToCSV = () => {
    // CSV export logic
    toast.success('Report exported successfully!');
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <div className="flex items-center space-x-4">
              <select onChange={(e) => setSelectedTeam(e.target.value)} className="bg-secondary text-white p-2 rounded">
                <option value="">All Teams</option>
                {/* Populate with teams */}
              </select>
              <button onClick={exportToCSV} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Export to CSV
              </button>
            </div>
          </div>
          {/* Stats cards and chart */}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
