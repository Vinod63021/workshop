'use client';

import React from 'react';
import { Terminal, Code, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    phase: '00 - 15 Min',
    title: 'Setup & System Architecture',
    subtitle: 'From zero to clean environment without boilerplate headache.',
    icon: Terminal,
    color: 'from-cyan-500 to-blue-500',
    points: [
      'Understand how modern LLMs communicate over streaming APIs',
      'Set up Next.js + AI SDK lightweight developer scaffold',
      'Safely configure environment keys without leaking tokens',
    ],
  },
  {
    step: '02',
    phase: '15 - 45 Min',
    title: 'Live Code: The AI Core Pipeline',
    subtitle: 'Hands-on code-along with live engineering mentor guidance.',
    icon: Code,
    color: 'from-indigo-500 to-violet-500',
    points: [
      'Write server actions for streaming responses directly to the DOM',
      'Implement prompt templates that enforce structured JSON outputs',
      'Handle error states, token rate limits, and latency indicators',
    ],
  },
  {
    step: '03',
    phase: '45 - 60 Min',
    title: 'Launch, Test & Portfolio Ready',
    subtitle: 'Ship your working AI micro-app to a live public URL.',
    icon: Rocket,
    color: 'from-violet-500 to-fuchsia-500',
    points: [
      'One-command cloud deployment to Vercel with automated preview',
      'Test edge cases, prompt injection safeguards, and mobile UI',
      'Add the verified GitHub repo to your final-year engineering CV',
    ],
  },
];

export default function WorkshopJourney() {
  return (
    <section id="journey" className="py-20 bg-[#080C14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span>Structured 60-Minute Sprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The 3-Step Workshop Journey
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every minute is optimized for maximum hands-on building. No passive lecture,
            no 50-slide presentations. You code alongside the mentor from minute one.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-glass-card p-6 sm:p-8 flex flex-col justify-between group"
              >
                {/* Step Pill */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-slate-700 group-hover:text-indigo-400/40 transition-colors">
                      {s.step}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {s.phase}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr p-0.5 mb-5 shadow-lg flex items-center justify-center bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {s.subtitle}
                  </p>

                  <ul className="space-y-3 pt-4 border-t border-slate-800/80">
                    {s.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Milestone {idx + 1} of 3</span>
                  <a
                    href="#register"
                    className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
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

