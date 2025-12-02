import React, { useState } from 'react';

// Hardcoded demo credentials
const DEMO_USER = {
  email: 'demo@babybliss.com',
  password: 'baby123'
};

export const LoginPage = ({ onSuccess, onLogin }) => {
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState(DEMO_USER.password);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        throw new Error('Invalid credentials (demo user only).');
      }
      const data = await res.json();
      localStorage.setItem('babybliss_token', data.token);
      onLogin?.(data.token);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-slate-800 mb-1">Login (Demo)</h1>
      <p className="text-xs text-slate-500 mb-4">
        Use the pre-filled demo credentials to simulate login. This will fetch a fake JWT from the
        backend.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-pink-50 p-4 space-y-3"
      >
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-sm flex justify-center"
        >
          {loading ? 'Logging in...' : 'Login as Demo User'}
        </button>
      </form>
      <div className="mt-3 text-[11px] text-slate-400">
        <p>Demo credentials:</p>
        <p>
          <span className="font-medium">Email:</span> {DEMO_USER.email}
        </p>
        <p>
          <span className="font-medium">Password:</span> {DEMO_USER.password}
        </p>
      </div>
    </main>
  );
};


