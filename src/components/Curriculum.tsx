'use client';

import React from 'react';
import {
  BrainCircuit,
  Binary,
  Layers,
  Rocket,
  CheckCircle2,
  Calendar,
  Sparkles,
  Shield,
  ArrowRight,
} from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: BrainCircuit,
    title: 'Streaming LLMs',
    desc: 'Tokens, endpoints, and latency management without complex calculus.',
    colorClass: 'bg-[#E8F0FE] text-[#1A73E8] border-[#C2E7FF]',
  },
  {
    icon: Binary,
    title: 'Structured Output',
    desc: 'Enforce validated JSON outputs so your UI never breaks on unexpected text.',
    colorClass: 'bg-[#F3E8FD] text-[#7C3AED] border-[#E9D5FF]',
  },
  {
    icon: Layers,
    title: 'Reactive Full-Stack UI',
    desc: 'Next.js server actions, loading skeletons, and real-time typing indicators.',
    colorClass: 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]',
  },
  {
    icon: Rocket,
    title: 'Instant Cloud Deploy',
    desc: 'Deploy live on the web with a public HTTPS link ready for your GitHub & CV.',
    colorClass: 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]',
  },
];

export default function Curriculum() {
  return (
    <section id="outcomes" className="py-24 bg-slate-50/60 dark:bg-[#060A11] border-y border-slate-200/80 dark:border-white/5 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 4 Bento Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0FE] dark:bg-cyan-950/60 border border-[#C2E7FF] dark:border-cyan-500/30 text-[#1A73E8] dark:text-cyan-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#1A73E8] dark:text-cyan-400" />
              <span>Real Engineering Skills</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Practical abilities you keep forever.
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Most tutorials get stuck in theory. We jump straight to production patterns used by modern AI engineering teams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-white/95 dark:bg-[#090E17]/80 border border-slate-200/90 dark:border-white/5 hover:border-blue-400/60 dark:hover:border-blue-500/30 transition-all space-y-3 shadow-md shadow-blue-500/5 group"
                  >
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${item.colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Clean Specifications Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/95 dark:bg-[#090E17]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 p-7 shadow-xl shadow-blue-500/5 dark:shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Workshop Overview</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Build Your First AI Project in 60 Mins</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 text-xs font-black">
                  FREE
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Duration</span>
                  <span className="text-slate-900 dark:text-white font-semibold">60 Minutes</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Format</span>
                  <span className="text-slate-900 dark:text-white font-semibold">100% Online Live Stream</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Target Cohort</span>
                  <span className="text-slate-900 dark:text-white font-semibold">Final-Year Engineering (2025/2026)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Prerequisites</span>
                  <span className="text-slate-900 dark:text-white font-semibold">Basic coding familiarity (Any language)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Batch Schedule</span>
                  <span className="text-amber-800 dark:text-amber-300 font-mono text-[11px]">
                    [Configurable Placeholder: Email Invite]
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#register"
                  className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Reserve Your Spot</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
