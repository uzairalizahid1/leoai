"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StatsCard from '@/components/StatsCard';
import LectureCard from '@/components/LectureCard';
import CreateTeamModal from '@/components/CreateTeamModal';
import InviteMemberModal from '@/components/InviteMemberModal';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: 'Total Lectures Prepared', value: 0 },
    { title: 'Meetings Scheduled', value: 0 },
    { title: 'Active Workshops', value: 0 },
    { title: 'Avg. Student Engagement', value: '0%' },
  ]);
  const [recentLectures, setRecentLectures] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: lecturesData, error: lecturesError } = await supabase.from('lectures').select('*').eq('user_id', user.id);
        const { data: meetingsData, error: meetingsError } = await supabase.from('meetings').select('*').eq('user_id', user.id);
        const { data: teamsData, error: teamsError } = await supabase.from('teams').select('*, team_members(*)').eq('team_members.user_id', user.id);

        if (lecturesError || meetingsError || teamsError) {
          toast.error('Failed to fetch dashboard data.');
        } else {
          setStats([
            { title: 'Total Lectures Prepared', value: lecturesData?.length || 0 },
            { title: 'Meetings Scheduled', value: meetingsData?.length || 0 },
            { title: 'Active Workshops', value: meetingsData?.filter(m => m.status === 'active').length || 0 },
            { title: 'Avg. Student Engagement', value: '0%' }, // Placeholder
          ]);
          setRecentLectures(lecturesData?.slice(0, 3) || []);
          setTeams(teamsData || []);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          {loading ? <p>Loading...</p> : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatsCard key={index} title={stat.title} value={stat.value} />
                ))}
              </div>
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentLectures.map(lecture => (
                    <LectureCard key={lecture.id} />
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">My Teams</h2>
                  <button onClick={() => setShowCreateTeamModal(true)} className="px-4 py-2 text-white bg-blue-600 rounded-md">
                    Create Team
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map(team => (
                    <div key={team.id} className="bg-secondary p-4 rounded-lg">
                      <h3 className="font-bold">{team.team_name}</h3>
                      <button onClick={() => setShowInviteMemberModal(team.id)} className="text-blue-400">Invite</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      {showCreateTeamModal && <CreateTeamModal onClose={() => setShowCreateTeamModal(false)} />}
      {showInviteMemberModal && <InviteMemberModal teamId={showInviteMemberModal} onClose={() => setShowInviteMemberModal(null)} />}
    </div>
  );
};

export default DashboardPage;
