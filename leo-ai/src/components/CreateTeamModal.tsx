"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

interface CreateTeamModalProps {
  onClose: () => void;
}

const CreateTeamModal = ({ onClose }: CreateTeamModalProps) => {
  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: team, error } = await supabase.from('teams').insert({ team_name: teamName, owner_id: user.id }).single();
      if (error) {
        toast.error(error.message);
      } else {
        await supabase.from('team_members').insert({ team_id: (team as any).id, user_id: user.id, role: 'Owner' });
        toast.success('Team created successfully!');
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-secondary p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
        <form onSubmit={handleCreateTeam}>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 mb-4 text-white bg-primary rounded-md"
            required
          />
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-white bg-gray-600 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
