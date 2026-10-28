'use client';

import React from 'react';
import { TrendingUp, Target, Calendar } from 'lucide-react';
import { DailyRegistrationMetric } from '@/lib/types';

interface TimelineChartProps {
  timeline: DailyRegistrationMetric[];
  totalGoal: number;
}

export default function TimelineChart({ timeline, totalGoal }: TimelineChartProps) {
  const maxDayCount = Math.max(...timeline.map((t) => t.count), 60);

  return (
    <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>7-Day Campaign Trajectory &amp; Run-Rate</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Daily acquisition velocity vs required 500-student target curve
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Daily New
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" /> Cumulative
          </span>
        </div>
      </div>

      {/* Visual Chart Bars for the 7 Days */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-6 pb-2 px-2 border-b border-slate-800">
        {timeline.map((item, idx) => {
          const heightPercent = Math.min(100, Math.max(12, (item.count / maxDayCount) * 100));
          const isPastOrCurrent = item.count > 0;

          return (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
              {/* Daily Count Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                +{item.count} (Total: {item.cumulative})
              </div>

              {/* Bar */}
              <div className="w-full max-w-[40px] bg-slate-800/60 rounded-t-lg flex flex-col justify-end overflow-hidden h-32 relative">
                {isPastOrCurrent ? (
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  />
                ) : (
                  <div className="w-full h-1 bg-slate-700/40 rounded-t-lg" />
                )}
              </div>

              {/* Day Label */}
              <div className="text-center">
                <span className="text-[11px] font-semibold text-slate-300 block">
                  {item.day_label}
                </span>
                <span className="text-[9px] text-slate-500 font-mono hidden sm:block">
                  {item.date.slice(5)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone Checkpoint Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Target Velocity:</span>
          <span className="font-semibold text-white">~71 registrations / day</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Simulation Goal:</span>
          <span className="font-semibold text-cyan-300">500 Students (7 Days)</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Current Progress:</span>
          <span className="font-semibold text-emerald-400">
            {timeline[timeline.length - 1]?.cumulative || 0} Registered
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Campaign Status:</span>
          <span className="font-semibold text-indigo-300">On Track to Goal</span>
        </div>
      </div>
    </div>
  );
}

