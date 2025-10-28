"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged in successfully!');
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">Login to Leo AI</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-white bg-primary rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-white bg-primary rounded-md"
            required
          />
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md">
            Login
          </button>
        </form>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={() => handleOAuthLogin('google')} className="px-4 py-2 text-white bg-red-600 rounded-md">
            Login with Google
          </button>
          <button onClick={() => handleOAuthLogin('github')} className="px-4 py-2 text-white bg-gray-700 rounded-md">
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
