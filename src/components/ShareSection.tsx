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
    <section id="share" className="py-20 bg-[#06090F] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Growth Strategy & Ambassador Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Campus Viral Loop &amp; Growth Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Lead Your College Batch.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                Unlock Ambassador Perks.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Engineering breakthroughs happen when peers build together. Share your referral
              link with your branch WhatsApp groups, placement cohorts, and coding clubs to climb the leaderboards.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <Users className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Bring 3+ Batchmates</h4>
                  <p className="text-xs text-slate-400">
                    Unlock priority 1-on-1 code reviews and direct feedback from the workshop engineers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Campus Ambassador Recognition</h4>
                  <p className="text-xs text-slate-400">
                    Top student ambassadors per campus receive official acknowledgment on the challenge leaderboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Link Generator Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/30 p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Generate Your Campus Referral Link
                </h3>
                <p className="text-xs text-slate-400">
                  Already registered or want to share immediately? Enter your name to generate a trackable link.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="flex gap-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name (e.g. Ananya)"
                  className="flex-1 bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  Create Code
                </button>
              </form>

              {/* Generated Result */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Your Unique Code:</span>
                  <span className="font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {generatedCode || 'BS-CAMPUS-7701'}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400">Shareable URL:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={getShareUrl()}
                      className="w-full bg-[#070A10] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
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

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp Class Groups</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <a
                  href="#register"
                  className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium"
                >
                  Haven&apos;t reserved your own spot yet? Register here <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

