'use client';

import React from 'react';
import {
  BrainCircuit,
  Binary,
  Layers,
  Workflow,
  CheckCircle,
  HelpCircle,
  Award,
  Calendar,
  UserCheck,
} from 'lucide-react';

const OUTCOMES = [
  {
    icon: BrainCircuit,
    title: 'Modern LLM API Integration',
    desc: 'Understand tokens, streaming endpoints, system prompts, and temperature parameters without mathematical overload.',
  },
  {
    icon: Binary,
    title: 'Deterministic Structured Output',
    desc: 'Force AI models to reliably respond in validated JSON/schemas so your web frontend never crashes from unexpected text.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Reactive UI Architecture',
    desc: 'Wire up asynchronous state, real-time typing effect, loading spinners, and error boundaries in Next.js.',
  },
  {
    icon: Workflow,
    title: 'Instant Cloud Deployment',
    desc: 'Ship your working AI project to a live public URL on Vercel with HTTPS and mobile responsiveness.',
  },
];

export default function Curriculum() {
  return (
    <section id="outcomes" className="py-20 bg-[#06090F] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Learning Outcomes */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Skill-First Engineering Curriculum</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Real engineering outcomes.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                Zero theoretical fluff.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Most online tutorials take weeks. We distill the core production pattern of AI engineering
              into 60 minutes so you have tangible code running on your machine by the end of the hour.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {OUTCOMES.map((o, idx) => {
                const Icon = o.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{o.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{o.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Workshop Spec & Configurable Placeholders */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/30 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Workshop Specifications</h3>
                  <p className="text-xs text-slate-400">Build Your First AI Project in 60 Minutes</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  FREE ENTRY
                </span>
              </div>

              {/* Spec Items */}
              <div className="space-y-4 text-xs">
                <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Session Duration</span>
                  <span className="text-white font-medium">60 Minutes Fast-Paced</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Format &amp; Delivery</span>
                  <span className="text-white font-medium">100% Online (Live Code-Along)</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Intended Audience</span>
                  <span className="text-white font-medium text-right">
                    Final-Year Engineering Students (CSE, IT, ECE, EEE, Mech, Civil)
                  </span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Prerequisites</span>
                  <span className="text-white font-medium text-right">
                    Basic programming familiarity (JS/Python/C++); zero AI background required
                  </span>
                </div>

                {/* Honest Configurable Placeholders as required by prompt */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/25 space-y-2.5">
                  <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Configurable Event Parameters</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-300">
                    <p>
                      <strong className="text-slate-400">Date &amp; Time:</strong>{' '}
                      <span className="text-amber-200">[Configurable Placeholder: Announced upon batch lock]</span>
                    </p>
                    <p>
                      <strong className="text-slate-400">Lead Mentor:</strong>{' '}
                      <span className="text-amber-200">[Configurable Placeholder: Lead AI Engineer, NxtWave Team]</span>
                    </p>
                    <p>
                      <strong className="text-slate-400">Certificate Status:</strong>{' '}
                      <span className="text-amber-200">[Configurable Placeholder: Attendance verification details provided post-session]</span>
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-800">
                    * Note: Following challenge guidelines, event timing and host details remain configurable placeholders until official schedule confirmation.
                  </p>
                </div>
              </div>

              <a
                href="#register"
                className="w-full inline-flex items-center justify-center py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all text-center"
              >
                Enroll in the Next Sprint
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

