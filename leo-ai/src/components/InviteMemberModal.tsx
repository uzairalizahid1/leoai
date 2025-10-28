"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

interface InviteMemberModalProps {
  teamId: string;
  onClose: () => void;
}

const InviteMemberModal = ({ teamId, onClose }: InviteMemberModalProps) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: user, error: userError } = await supabase.from('users').select('id').eq('email', email).single();
    if (userError || !user) {
      toast.error('User not found.');
      return;
    }

    const { error: insertError } = await supabase.from('team_members').insert({
      team_id: teamId,
      user_id: user.id,
      role,
    });

    if (insertError) {
      toast.error(insertError.message);
    } else {
      toast.success(`User ${email} invited to the team!`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-secondary p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Invite Member</h2>
        <form onSubmit={handleInvite}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 text-white bg-primary rounded-md"
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 mb-4 text-white bg-primary rounded-md">
            <option value="Viewer">Viewer</option>
            <option value="Co-Host">Co-Host</option>
          </select>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-white bg-gray-600 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md">
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
