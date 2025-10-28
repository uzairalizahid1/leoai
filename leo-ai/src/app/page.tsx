"use client";

import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-primary text-white">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to Leo AI</h1>
        <p className="text-xl mb-8">Your AI-powered virtual lecturer and meeting assistant.</p>
        <Link href="/signup" className="px-8 py-3 bg-blue-600 rounded-md text-lg">
          Get Started for Free
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 bg-primary rounded-lg">
            <h3 className="text-2xl font-bold mb-4">AI-Powered Lectures</h3>
            <p>Generate complete lectures from your notes or a simple prompt.</p>
          </div>
          {/* Feature 2 */}
          <div className="p-8 bg-primary rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Real-Time Q&A</h3>
            <p>Engage your audience with live, AI-powered question and answer sessions.</p>
          </div>
          {/* Feature 3 */}
          <div className="p-8 bg-primary rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Team Collaboration</h3>
            <p>Work with your team to create and deliver amazing presentations.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing</h2>
        {/* Simplified pricing, links to pricing page */}
        <div className="text-center">
          <Link href="/pricing" className="px-8 py-3 bg-blue-600 rounded-md text-lg">
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
