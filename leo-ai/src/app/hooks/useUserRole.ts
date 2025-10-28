"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useUserRole = (teamId: string) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && teamId) {
        const { data, error } = await supabase
          .from('team_members')
          .select('role')
          .eq('user_id', user.id)
          .eq('team_id', teamId)
          .single();
        if (!error && data) {
          setRole(data.role);
        }
      }
    };
    fetchRole();
  }, [teamId]);

  return role;
};
