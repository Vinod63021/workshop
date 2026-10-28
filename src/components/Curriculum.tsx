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
} from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: BrainCircuit,
    title: 'Streaming LLMs',
    desc: 'Tokens, endpoints, and latency management without complex calculus.',
  },
  {
    icon: Binary,
    title: 'Structured Output',
    desc: 'Enforce validated JSON outputs so your UI never breaks on unexpected text.',
  },
  {
    icon: Layers,
    title: 'Reactive Full-Stack UI',
    desc: 'Next.js server actions, loading skeletons, and real-time typing indicators.',
  },
  {
    icon: Rocket,
    title: 'Instant Cloud Deploy',
    desc: 'Deploy live on the web with a public HTTPS link ready for your GitHub & CV.',
  },
];

export default function Curriculum() {
  return (
    <section id="outcomes" className="py-24 bg-[#060A11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 4 Bento Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Engineering Skills</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Practical abilities you keep forever.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Most tutorials get stuck in theory. We jump straight to production patterns used by modern AI engineering teams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#090E17]/80 border border-white/5 hover:border-blue-500/30 transition-all space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Clean Specifications Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#090E17]/90 backdrop-blur-2xl border border-white/10 p-7 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white">Workshop Overview</h3>
                  <p className="text-xs text-slate-400">Build Your First AI Project in 60 Mins</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                  FREE
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-white font-semibold">60 Minutes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Format</span>
                  <span className="text-white font-semibold">100% Online Live Stream</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Target Audience</span>
                  <span className="text-white font-semibold text-right">Final-Year Engineering Students</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Prerequisites</span>
                  <span className="text-white font-semibold text-right">Basic programming logic (any language)</span>
                </div>
              </div>

              {/* Configurable Placeholders Box */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-xs space-y-2 text-slate-300">
                <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Session Logistics</span>
                </div>
                <p className="text-[11px]">
                  <strong className="text-slate-400">Date &amp; Time:</strong>{' '}
                  <span className="text-amber-200">[Configurable Placeholder: Announced upon registration lock]</span>
                </p>
                <p className="text-[11px]">
                  <strong className="text-slate-400">Mentor:</strong>{' '}
                  <span className="text-amber-200">[Configurable Placeholder: Senior NxtWave AI Engineers]</span>
                </p>
                <p className="text-[11px]">
                  <strong className="text-slate-400">Verification:</strong>{' '}
                  <span className="text-amber-200">[Configurable Placeholder: Certificate details confirmed post-session]</span>
                </p>
              </div>

              <a
                href="#register"
                className="w-full py-3.5 rounded-full font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
              >
                <span>Reserve Your Free Seat</span>
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
