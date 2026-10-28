'use client';

import React from 'react';
import { Terminal, Code, Rocket, ArrowRight, Zap } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    time: '00 - 15 Min',
    title: 'Setup & System Architecture',
    desc: 'Understand LLM streaming APIs and set up your lightweight Next.js development environment without boilerplate headaches.',
    icon: Terminal,
    tag: 'Foundation',
    badgeClass: 'bg-[#E8F0FE] text-[#1A73E8] border-[#C2E7FF]',
    iconClass: 'bg-[#E8F0FE] text-[#1A73E8] border-[#C2E7FF]',
  },
  {
    step: '02',
    time: '15 - 45 Min',
    title: 'Live Code: The AI Core Pipeline',
    desc: 'Code along with the mentor. Build server actions, streaming token handlers, and enforce structured JSON outputs.',
    icon: Code,
    tag: 'Hands-On Code',
    badgeClass: 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]',
    iconClass: 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]',
  },
  {
    step: '03',
    time: '45 - 60 Min',
    title: 'Ship to Live Public Web',
    desc: 'Deploy your working application to the cloud with a verified public URL to showcase on your engineering resume.',
    icon: Rocket,
    tag: 'Live Portfolio',
    badgeClass: 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]',
    iconClass: 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]',
  },
];

export default function WorkshopJourney() {
  return (
    <section id="journey" className="py-24 bg-[#F8FAFD] dark:bg-[#080C14] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0FE] dark:bg-indigo-950/60 border border-[#C2E7FF] dark:border-indigo-500/30 text-[#1A73E8] dark:text-indigo-300 text-xs font-semibold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#1A73E8] dark:text-indigo-400" />
            <span>Fast-Paced 60-Minute Sprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How The Hour Unfolds
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
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
                className="relative rounded-3xl bg-white/90 dark:bg-[#090E17]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/5 p-7 hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Top Row: Number & Time Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-slate-300 dark:text-slate-800 group-hover:text-blue-500/40 transition-colors">
                      {s.step}
                    </span>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${s.badgeClass}`}>
                      {s.time}
                    </span>
                  </div>

                  {/* Icon Box with Google Pastel Accent */}
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${s.iconClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {s.tag}
                  </span>
                  <a
                    href="#register"
                    className="text-blue-600 dark:text-cyan-300 hover:text-blue-700 dark:hover:text-white font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
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
