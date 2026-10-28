'use client';

import React, { useState } from 'react';
import {
  X,
  Database,
  Key,
  ShieldAlert,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Code2,
} from 'lucide-react';

interface DemoModeModalProps {
  mode: 'supabase' | 'demo';
  onClose: () => void;
  onResetDemoData: () => void;
  isResetting: boolean;
}

export default function DemoModeModal({
  mode,
  onClose,
  onResetDemoData,
  isResetting,
}: DemoModeModalProps) {
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const envTemplate = `# Supabase Backend Configuration (Add to .env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-private-service-role-key`;

  const sqlFileRef = 'supabase/migrations/20261027_init.sql';

  const copyEnv = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const copySqlLocation = () => {
    navigator.clipboard.writeText(sqlFileRef);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0B0F19] border border-indigo-500/30 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Database &amp; Architecture Configuration</h3>
              <p className="text-xs text-slate-400">Dual-Mode Backend Engine (Demo Simulation &amp; Supabase)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Status */}
        <div
          className={`p-4 rounded-xl border space-y-1.5 ${
            mode === 'supabase'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="flex items-center justify-between font-semibold text-xs">
            <span>Current Status:</span>
            <span className="uppercase font-mono text-[11px] px-2 py-0.5 rounded bg-black/30">
              {mode === 'supabase' ? 'Active: Supabase Postgres' : 'Active: Local Demo Simulation'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {mode === 'supabase'
              ? 'Connected to your persistent Supabase Postgres cluster with Row Level Security enforcing admin-only data visibility.'
              : 'Running in honest Demo Simulation Mode with realistic pre-populated engineering student records and in-memory persistence. To connect your live Supabase database, follow the steps below.'}
          </p>
        </div>

        {/* How to Connect Supabase */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Key className="w-4 h-4 text-indigo-400" />
            How to Connect Your Supabase Project
          </h4>

          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">1. Add Environment Keys to .env.local:</span>
              <button
                onClick={copyEnv}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                {copiedEnv ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEnv ? 'Copied' : 'Copy Template'}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded bg-[#070A10] border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
              {envTemplate}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">2. Run SQL Schema &amp; RLS Policies:</span>
              <button
                onClick={copySqlLocation}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSql ? 'Copied Path' : 'Copy File Path'}</span>
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Execute the ready-to-run migration file located at:
            </p>
            <code className="block p-2 rounded bg-[#070A10] border border-slate-800 font-mono text-cyan-300 text-[11px]">
              {sqlFileRef}
            </code>
            <ul className="text-[11px] text-slate-400 space-y-1 pt-1 list-disc list-inside">
              <li>Creates `registrations`, `campaign_budget`, and `app_admins` tables.</li>
              <li>Configures Row Level Security: public can insert; only authenticated admins can select student data.</li>
            </ul>
          </div>
        </div>

        {/* Reset Demo Simulation */}
        {mode === 'demo' && (
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-white block">Reset Simulation Data</span>
              <span className="text-[11px] text-slate-400">
                Restore the demo store to the initial 185 seed records and original budget channels.
              </span>
            </div>
            <button
              onClick={onResetDemoData}
              disabled={isResetting}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset Seed</span>
            </button>
          </div>
        )}

        <div className="pt-2 text-right border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

