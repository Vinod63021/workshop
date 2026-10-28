'use client';

import React from 'react';
import { Layers, Share2, Users, Mail, MessageSquare, Megaphone, HelpCircle } from 'lucide-react';
import { SourceMetric } from '@/lib/types';

interface SourceChartProps {
  sources: SourceMetric[];
  total: number;
}

const SOURCE_ICONS: Record<string, React.ElementType> = {
  'college club': Users,
  'student referral': Share2,
  'email': Mail,
  'WhatsApp/community': MessageSquare,
  'paid promotion': Megaphone,
  'other': HelpCircle,
};

const SOURCE_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  'college club': { bar: 'bg-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  'student referral': { bar: 'bg-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  'paid promotion': { bar: 'bg-pink-500', text: 'text-pink-400', bg: 'bg-pink-500/10' },
  'WhatsApp/community': { bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  'email': { bar: 'bg-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  'other': { bar: 'bg-slate-500', text: 'text-slate-400', bg: 'bg-slate-500/10' },
};

export default function SourceChart({ sources, total }: SourceChartProps) {
  // Sort sources descending by count
  const sorted = [...sources].sort((a, b) => b.count - a.count);

  return (
    <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Acquisition Sources Breakdown</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Validated UTM &amp; attribution channels for {total} total registrations
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          6 Core Channels
        </span>
      </div>

      {/* Segmented Cumulative Bar */}
      <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden">
        {sorted.map((item, idx) => {
          const color = SOURCE_COLORS[item.source] || SOURCE_COLORS['other'];
          return (
            <div
              key={idx}
              className={`${color.bar} h-full transition-all duration-300`}
              style={{ width: `${item.percentage}%` }}
              title={`${item.source}: ${item.count} (${item.percentage}%)`}
            />
          );
        })}
      </div>

      {/* Channel Rows */}
      <div className="space-y-3 pt-1">
        {sorted.map((item, idx) => {
          const Icon = SOURCE_ICONS[item.source] || HelpCircle;
          const color = SOURCE_COLORS[item.source] || SOURCE_COLORS['other'];

          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${color.bg} ${color.text}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-slate-200 capitalize">
                    {item.source}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-mono font-bold">
                    {item.count} <span className="text-slate-500 font-normal">students</span>
                  </span>
                  <span className={`text-[11px] font-mono font-semibold ${color.text} w-12 text-right`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Mini row progress bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`${color.bar} h-full rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

