"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setSubscription(data);
      }
    };
    fetchSubscription();
  }, []);

  return subscription;
};
