'use client';

import React from 'react';
import {
  Users,
  Target,
  Calendar,
  IndianRupee,
  TrendingUp,
  Share2,
  Clock,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { AdminMetrics } from '@/lib/types';
import { formatCurrencyINR } from '@/lib/utils';

interface MetricsOverviewProps {
  metrics: AdminMetrics;
}

export default function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const {
    total_registrations,
    target_goal,
    target_percentage,
    campaign_days_total,
    current_campaign_day,
    remaining_registrations,
    daily_run_rate_needed,
    actual_daily_run_rate,
    budget_summary,
    sources,
  } = metrics;

  const referralCount = sources.find((s) => s.source === 'student referral')?.count || 0;
  const referralPercent = sources.find((s) => s.source === 'student referral')?.percentage || 0;

  return (
    <div className="space-y-6">
      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Target Registrations & Progress */}
        <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Valid Registrations
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {total_registrations}
            </span>
            <span className="text-xs text-slate-400">/ {target_goal} Target</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, target_percentage)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{target_percentage}% Completed</span>
              <span className="text-indigo-300 font-medium">
                {remaining_registrations} spots to go
              </span>
            </div>
          </div>
        </div>

        {/* KPI 2: Campaign Day Progress & Run-Rate */}
        <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Campaign Timeline
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Day {current_campaign_day}
            </span>
            <span className="text-xs text-slate-400">of {campaign_days_total} Days</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block">Actual Run Rate:</span>
              <strong className="text-emerald-400 font-semibold">
                +{actual_daily_run_rate} / day
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block">Required Rate:</span>
              <strong className="text-cyan-300 font-semibold">
                +{daily_run_rate_needed} / day
              </strong>
            </div>
          </div>
        </div>

        {/* KPI 3: Budget Utilization & Blended CAC */}
        <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              ₹2,000 Budget Tracker
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {formatCurrencyINR(budget_summary.actual_spent)}
            </span>
            <span className="text-xs text-slate-400">
              / {formatCurrencyINR(budget_summary.total_budget)}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <div>
              <span className="text-slate-400 block">Remaining:</span>
              <strong className="text-emerald-400">
                {formatCurrencyINR(budget_summary.remaining_budget)}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block">Blended CPR:</span>
              <strong className="text-indigo-300">
                {budget_summary.blended_cpr !== null
                  ? `${formatCurrencyINR(budget_summary.blended_cpr)}/lead`
                  : 'N/A'}
              </strong>
            </div>
          </div>
        </div>

        {/* KPI 4: Viral Peer Referral Loop */}
        <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Referral Loop Share
            </span>
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Share2 className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {referralPercent}%
            </span>
            <span className="text-xs text-slate-400">({referralCount} students)</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Viral Coeff (K-factor):</span>
            <span className="text-violet-300 font-mono font-semibold">
              {(referralCount / (total_registrations || 1)).toFixed(2)}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

