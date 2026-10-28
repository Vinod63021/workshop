'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  Database,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

interface AdminHeaderProps {
  adminEmail?: string;
  mode: 'supabase' | 'demo';
  onLogout: () => void;
  onOpenDemoModal: () => void;
  onResetDemoData: () => void;
  isResetting: boolean;
}

export default function AdminHeader({
  adminEmail,
  mode,
  onLogout,
  onOpenDemoModal,
  onResetDemoData,
  isResetting,
}: AdminHeaderProps) {
  return (
    <header className="border-b border-indigo-500/20 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Demo Mode Notice Banner if in Demo Mode */}
      {mode === 'demo' && (
        <div className="bg-gradient-to-r from-amber-950/80 via-indigo-950/80 to-slate-900 border-b border-amber-500/30 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-200">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>
                <strong>Interactive Demo Simulation Active:</strong> Running with realistic seed records
                and in-memory persistence. No Supabase credentials currently configured in environment.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenDemoModal}
                className="underline hover:text-white font-medium text-amber-300"
              >
                View Supabase Setup Guide &amp; Schema
              </button>
              <button
                onClick={onResetDemoData}
                disabled={isResetting}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] disabled:opacity-50"
                title="Reset simulation to default seed records"
              >
                <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
                <span>Reset Demo Seed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  BuildSprint AI Admin
                </h1>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    mode === 'supabase'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {mode === 'supabase' ? 'Supabase Live' : 'Demo Simulation'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                NxtWave Growth Intern Challenge • 500 Registrations Target
              </p>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
            >
              <span>Public Landing Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg bg-indigo-950/50 border border-indigo-500/30 hover:border-indigo-500/60 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Database Config</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            {adminEmail && (
              <span className="text-xs text-slate-400 hidden md:block">
                {adminEmail}
              </span>
            )}

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

