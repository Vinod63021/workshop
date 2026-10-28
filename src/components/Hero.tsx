'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Zap,
  Play,
  CheckCircle2,
  Clock,
  Layers,
  Cpu,
} from 'lucide-react';

export default function Hero() {
  const [activeCodeTab, setActiveCodeTab] = useState<'prompt' | 'output'>('prompt');

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden transition-colors duration-200">
      {/* Background radial glow & mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#4285F4]/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Bold Editorial Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            
            {/* Google Antigravity & NxtWave Verified Masterclass Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E8F0FE] dark:bg-slate-900/90 border border-[#C2E7FF] dark:border-blue-500/30 text-xs font-semibold shadow-sm shadow-blue-500/10 dark:shadow-lg dark:shadow-blue-900/20">
              <span className="flex h-2 w-2 rounded-full bg-[#4285F4] dark:bg-cyan-400 animate-pulse" />
              <span className="text-[#1A73E8] dark:text-white font-bold">NxtWave AI Workshop</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-[#1A73E8] dark:text-cyan-300">Free 60-Minute Masterclass</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Less scrolling.{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                More building.
              </span>{' '}
              <br className="hidden sm:block" />
              Your first AI project starts here.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Turn your curiosity into code. Join a free 60-minute online workshop
              designed for final-year engineering students ready to start building with AI.
            </p>

            {/* Google Pastel Impact Metrics Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold">
              <span className="px-3.5 py-1.5 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-[#C2E7FF] dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#1A73E8] dark:text-blue-400" />
                60 Mins Live
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3] dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Terminal className="w-3.5 h-3.5 text-[#B06000] dark:text-cyan-400" />
                Hands-On Code
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#137333] dark:text-indigo-400" />
                100% Free Entry
              </span>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <a
                href="#register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Reserve My Free Spot</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white hover:bg-slate-50 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>See What You&apos;ll Build</span>
              </a>
            </div>

            {/* Transparent Configurable Metadata Note */}
            <div className="text-[11px] text-amber-900 dark:text-amber-300/80 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-3.5 max-w-lg mx-auto lg:mx-0 shadow-sm">
              ⚡ <strong>Upcoming Session:</strong> [Configurable Placeholder: Batch schedule announced upon reservation] • Zero prior AI experience needed.
            </div>
          </div>

          {/* Right Column: Visual Interactive Project Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-cyan-400/20 dark:from-blue-600/30 dark:via-indigo-600/25 dark:to-cyan-400/30 rounded-3xl blur-2xl opacity-75" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-white/95 dark:bg-[#090E17]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 p-6 sm:p-7 shadow-xl shadow-blue-500/5 dark:shadow-2xl space-y-5">
                
                {/* Header with Traffic Lights & File Tab */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
                      <div className="w-3 h-3 rounded-full bg-[#FBBC04]" />
                      <div className="w-3 h-3 rounded-full bg-[#34A853]" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 pl-1">
                      my-first-ai-app.ts
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-[#C2E7FF] dark:bg-blue-500/10 dark:text-cyan-300 dark:border-blue-500/30">
                      Live Preview
                    </span>
                  </div>
                </div>

                {/* Micro Tabs */}
                <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                  <button
                    onClick={() => setActiveCodeTab('prompt')}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeCodeTab === 'prompt'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    1. Prompt &amp; Model
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('output')}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeCodeTab === 'output'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    2. Streamed Response
                  </button>
                </div>

                {/* Code Window */}
                <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed min-h-[175px] overflow-x-auto shadow-inner">
                  {activeCodeTab === 'prompt' ? (
                    <div className="space-y-1">
                      <div className="text-slate-500">// Connect directly to Frontier LLMs</div>
                      <div>
                        <span className="text-violet-400">const</span>{' '}
                        <span className="text-blue-300">app</span> ={' '}
                        <span className="text-cyan-400">new</span> BuildSprintAI({'{'}
                      </div>
                      <div className="pl-4 text-slate-400">
                        model: <span className="text-emerald-300">&quot;gemini-2.5-flash&quot;</span>,
                      </div>
                      <div className="pl-4 text-slate-400">
                        temperature: <span className="text-amber-300">0.2</span>,
                      </div>
                      <div className="pl-4 text-slate-400">
                        task: <span className="text-cyan-300">&quot;Review &amp; Deploy AI Assistant&quot;</span>
                      </div>
                      <div>{'}'});</div>
                      <div className="text-slate-500 pt-2">// You write this in the first 25 mins</div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="text-emerald-400 flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        AI Analysis Complete (240ms)
                      </div>
                      <div className="text-slate-400">
                        → Time Complexity: <span className="text-white font-bold">O(log N)</span>
                      </div>
                      <div className="text-slate-400">
                        → Edge Cases Generated: <span className="text-cyan-300">3 verified tests</span>
                      </div>
                      <div className="text-slate-400">
                        → Status: <span className="text-emerald-300">Ready for Portfolio URL</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Trust Row */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span>Real Cloud Deployment</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                    Zero Boilerplate
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
