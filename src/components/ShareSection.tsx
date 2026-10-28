'use client';

import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Users,
  Award,
  Zap,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { generateReferralCode } from '@/lib/utils';

export default function ShareSection() {
  const [studentName, setStudentName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    const code = generateReferralCode(studentName.trim());
    setGeneratedCode(code);
  };

  const getShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://buildsprint.ai';
    return `${origin}/?ref=${generatedCode || 'CAMPUS2025'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(
      `Hey! Join me for the free 60-Minute "Build Your First AI Project" workshop by NxtWave. We will build a real AI app from scratch. Reserve your spot here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="share" className="py-24 bg-[#06090F] relative border-t border-slate-900/80 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Viral Loop Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Campus Viral Loop</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Build Together.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                Lead Your Campus.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Engineering is better when you build with peers. Invite your batchmates to join the masterclass,
              collaborate on your GitHub repos, and unlock campus ambassador recognition.
            </p>

            {/* Quick 2-Card Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#0B0F19]/80 border border-white/5 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-300">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Cohort Collaboration</h4>
                <p className="text-[11px] text-slate-400">
                  Build and test AI micro-apps side-by-side with your college friends.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0F19]/80 border border-white/5 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Campus Ambassador</h4>
                <p className="text-[11px] text-slate-400">
                  Top referrers per college earn priority mentor reviews and campus badges.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Generator */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0B0F19]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Generate Your Personal Referral Link
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Type your name to create an attributed invite link for your WhatsApp groups.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="flex gap-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name (e.g. Ananya)"
                  className="flex-1 bg-[#070A10] border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Create Link
                </button>
              </form>

              {/* Link Details */}
              <div className="p-4 rounded-2xl bg-[#070A10] border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Referral Code</span>
                  <span className="font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                    {generatedCode || 'BS-CAMPUS-7701'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl()}
                    className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share with Batchmates on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
