"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const UpgradePage = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId: 'user-id-placeholder' }), // TODO: Get user ID from session
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      toast.error('Failed to start checkout.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <h1 className="text-4xl font-bold mb-8">Upgrade to {plan}</h1>
      <button onClick={handleCheckout} className="px-8 py-3 bg-blue-600 rounded-md text-lg">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default UpgradePage;
