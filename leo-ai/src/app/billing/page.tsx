"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

const BillingPage = () => {
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (error) {
          toast.error('Could not fetch subscription details.');
        } else {
          setSubscription(data);
        }
      }
    };
    fetchSubscription();
  }, []);

  const handleManageSubscription = async () => {
    // Redirect to Stripe's customer portal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <h1 className="text-4xl font-bold mb-8">Billing</h1>
      {subscription ? (
        <div className="bg-secondary p-8 rounded-lg shadow-lg">
          <p>Plan: {subscription.plan}</p>
          <p>Status: {subscription.status}</p>
          <button onClick={handleManageSubscription} className="mt-8 w-full py-2 bg-blue-600 rounded-md">
            Manage Subscription
          </button>
        </div>
      ) : (
        <p>No active subscription found.</p>
      )}
    </div>
  );
};

export default BillingPage;
