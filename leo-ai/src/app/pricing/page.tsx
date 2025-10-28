"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const router = useRouter();

  const handleSelectPlan = (plan: string) => {
    router.push(`/upgrade?plan=${plan}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Tier */}
        <div className="bg-secondary p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Free</h2>
          <p className="text-4xl font-bold mb-4">$0<span className="text-lg">/mo</span></p>
          <ul className="space-y-2">
            <li>3 meetings per month</li>
            <li>Basic AI personality</li>
            <li>Limited analytics</li>
          </ul>
          <button onClick={() => handleSelectPlan('free')} className="mt-8 w-full py-2 bg-gray-600 rounded-md">
            Get Started
          </button>
        </div>
        {/* Pro Tier */}
        <div className="bg-secondary p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Pro</h2>
          <p className="text-4xl font-bold mb-4">$19<span className="text-lg">/mo</span></p>
          <ul className="space-y-2">
            <li>Unlimited meetings</li>
            <li>All AI personalities</li>
            <li>Advanced analytics</li>
            <li>Voice + Q&A enabled</li>
          </ul>
          <button onClick={() => handleSelectPlan('pro')} className="mt-8 w-full py-2 bg-blue-600 rounded-md">
            Upgrade to Pro
          </button>
        </div>
        {/* Enterprise Tier */}
        <div className="bg-secondary p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
          <p className="text-4xl font-bold mb-4">Custom</p>
          <ul className="space-y-2">
            <li>Team collaboration</li>
            <li>Custom AI model tuning</li>
            <li>Dedicated support</li>
          </ul>
          <button onClick={() => handleSelectPlan('enterprise')} className="mt-8 w-full py-2 bg-gray-600 rounded-md">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
