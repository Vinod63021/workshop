'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  KeyRound,
  ArrowRight,
  Database,
} from 'lucide-react';
import { DEMO_ADMIN_CREDENTIALS } from '@/lib/auth-constants';

interface AdminLoginProps {
  onLoginSuccess: (user: { email: string; role: string }, mode: 'supabase' | 'demo') => void;
  mode: 'supabase' | 'demo';
}

export default function AdminLogin({ onLoginSuccess, mode }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      onLoginSuccess(data.user, data.mode);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection error';
      setError(`Login failed: ${msg}`);
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_ADMIN_CREDENTIALS.email);
    setPassword(DEMO_ADMIN_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#080C14] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-radial-gradient">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            BuildSprint AI Admin
          </h2>
          <p className="text-xs text-slate-400">
            Protected Growth Analytics &amp; Student Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/25 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Mode Pill & Quick Fill Hint */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Storage Mode:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  mode === 'supabase'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-amber-500/10 text-amber-300'
                }`}
              >
                {mode === 'supabase' ? 'Supabase Postgres' : 'Demo Simulation Mode'}
              </span>
            </div>

            {mode === 'demo' && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <div className="text-slate-400">
                  Demo User: <code className="text-indigo-300 font-mono">admin@buildsprint.ai</code>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="px-2 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 font-semibold transition-colors flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Auto-Fill</span>
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@buildsprint.ai"
                className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-800/80">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Student Landing Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

