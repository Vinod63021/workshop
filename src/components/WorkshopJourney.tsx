'use client';

import React from 'react';
import { Terminal, Code, Rocket, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    time: '00 - 15 Min',
    title: 'Setup & System Architecture',
    desc: 'Understand LLM streaming APIs and set up your lightweight Next.js development environment without boilerplate headaches.',
    icon: Terminal,
    tag: 'Foundation',
  },
  {
    step: '02',
    time: '15 - 45 Min',
    title: 'Live Code: The AI Core Pipeline',
    desc: 'Code along with the mentor. Build server actions, streaming token handlers, and enforce structured JSON outputs.',
    icon: Code,
    tag: 'Hands-On Code',
  },
  {
    step: '03',
    time: '45 - 60 Min',
    title: 'Ship to Live Public Web',
    desc: 'Deploy your working application to the cloud with a verified public URL to showcase on your engineering resume.',
    icon: Rocket,
    tag: 'Live Portfolio',
  },
];

export default function WorkshopJourney() {
  return (
    <section id="journey" className="py-24 bg-[#080C14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fast-Paced 60-Minute Sprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How The Hour Unfolds
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every minute is purposeful. You code side-by-side with senior engineers from minute one.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-[#090E17]/80 backdrop-blur-xl border border-white/5 p-7 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Top Row: Number & Time Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-slate-800 group-hover:text-blue-500/30 transition-colors">
                      {s.step}
                    </span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                      {s.time}
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {s.tag}
                  </span>
                  <a
                    href="#register"
                    className="text-blue-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    Join Sprint <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
