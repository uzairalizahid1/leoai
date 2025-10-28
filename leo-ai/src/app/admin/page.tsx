"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useUserRole } from '@/app/hooks/useUserRole'; // Assuming a general role hook, not team-specific

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, subscriptions: 0 });
  // const userRole = useUserRole(); // Simplified for example

  // useEffect(() => {
  //   if (userRole !== 'admin') {
  //     window.location.href = '/dashboard';
  //   }
  //   // Fetch admin stats
  // }, [userRole]);

  return (
    <div className="p-6 bg-primary min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-4xl">{stats.users}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-bold">Active Subscriptions</h2>
          <p className="text-4xl">{stats.subscriptions}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
