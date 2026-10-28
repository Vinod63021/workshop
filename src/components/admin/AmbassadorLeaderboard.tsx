'use client';

import React from 'react';
import { Trophy, Award, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { AmbassadorStats } from '@/lib/types';

interface AmbassadorLeaderboardProps {
  ambassadors: AmbassadorStats[];
}

export default function AmbassadorLeaderboard({ ambassadors }: AmbassadorLeaderboardProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Top Student Ambassadors &amp; Referral Codes</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Leaderboard of peer advocates driving viral branch invitations
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
          Top 10 Advocates
        </span>
      </div>

      {ambassadors.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          No peer referrals recorded yet. Share referral links to activate this leaderboard.
        </div>
      ) : (
        <div className="space-y-2.5">
          {ambassadors.map((amb, idx) => {
            const isTop3 = idx < 3;
            const rankBadgeColor =
              idx === 0
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : idx === 1
                ? 'bg-slate-300/20 text-slate-200 border-slate-400/40'
                : idx === 2
                ? 'bg-amber-700/20 text-amber-400 border-amber-700/40'
                : 'bg-slate-800 text-slate-400 border-slate-700';

            return (
              <div
                key={amb.referral_code}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank badge */}
                  <div
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 ${rankBadgeColor}`}
                  >
                    {idx + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate">
                        {amb.student_name}
                      </span>
                      <button
                        onClick={() => handleCopy(amb.referral_code)}
                        className="text-[10px] font-mono bg-indigo-950/60 text-indigo-300 hover:text-white px-2 py-0.5 rounded border border-indigo-500/30 flex items-center gap-1 transition-colors"
                        title="Copy referral code"
                      >
                        <span>{amb.referral_code}</span>
                        {copiedCode === amb.referral_code ? (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">
                      {amb.college}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-white font-mono block">
                    {amb.referrals_count}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {amb.referrals_count === 1 ? 'batchmate' : 'batchmates'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

