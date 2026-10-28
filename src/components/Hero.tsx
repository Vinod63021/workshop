'use client';

import React from 'react';
import {
  Code2,
  Clock,
  Sparkles,
  ArrowRight,
  MonitorPlay,
  GraduationCap,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-radial-gradient">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Subtle Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Super Header / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-medium shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Free 60-Minute Masterclass for Final-Year Engineers</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-300 font-semibold">100% Free Entry</span>
            </div>

            {/* Hero Headline (EXACT REQUEST) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Less scrolling.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">
                More building.
              </span>{' '}
              Your first AI project starts here.
            </h1>

            {/* Supporting Copy (EXACT REQUEST) */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Turn your curiosity into code. Join a free 60-minute online workshop
              designed for final-year engineering students ready to start building with AI.
            </p>

            {/* Honest Configurable Metadata Callout (NO fake urgency or invented dates) */}
            <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 max-w-xl">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>60 Minutes Live</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MonitorPlay className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive Online</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
                <span>Final-Year B.Tech / B.E.</span>
              </div>
              <div className="w-full text-[11px] text-amber-300/80 mt-1 flex items-center gap-1">
                <span>⚡</span>
                <span>
                  Date &amp; Schedule: <strong className="text-amber-200">[Configurable Placeholder: Upcoming batch schedule notified upon registration]</strong>
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Reserve My Free Spot</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/40 transition-all"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>See What You&apos;ll Build</span>
              </a>
            </div>

            {/* Honest Key Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Prior AI Exp Required</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real Code, No Slides Only</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Portfolio-Ready Mini Project</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual of Connected Code Nodes & AI Project Interface */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Accent Glow Behind Card */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 blur-xl opacity-75" />

              {/* Polished Code / AI Node Architecture Card */}
              <div className="relative rounded-2xl bg-[#0B0F19] border border-indigo-500/30 p-5 shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      buildsprint-ai-pipeline.ts
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    60-Min Outcome
                  </span>
                </div>

                {/* Connected Architecture Nodes (SVG + Flow Cards) */}
                <div className="space-y-3 font-mono text-xs">
                  {/* Node 1: Input */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs">1. Prompt &amp; Context Pipeline</div>
                        <div className="text-[10px] text-slate-400">User Prompt → Token Parser</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">Ready</span>
                  </div>

                  {/* Flow Connector Arrow */}
                  <div className="flex justify-center -my-1">
                    <div className="h-4 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-400" />
                  </div>

                  {/* Node 2: Core LLM Engine */}
                  <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-cyan-500/20 text-cyan-300">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs">2. LLM Inference Streaming</div>
                        <div className="text-[10px] text-cyan-300">Structured Output • Temperature: 0.2</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 animate-pulse">
                      Live Stream
                    </span>
                  </div>

                  {/* Flow Connector Arrow */}
                  <div className="flex justify-center -my-1">
                    <div className="h-4 w-0.5 bg-gradient-to-b from-cyan-400 to-violet-500" />
                  </div>

                  {/* Node 3: Interactive UI Output */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-violet-500/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-violet-500/10 text-violet-400">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs">3. Reactive Web Micro-App</div>
                        <div className="text-[10px] text-slate-400">Deployed Portfolio URL</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-semibold">200 OK</span>
                  </div>
                </div>

                {/* Live Code Snippet Preview */}
                <div className="mt-4 p-3 rounded-lg bg-[#070A10] border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  <div className="text-slate-500">// You will build &amp; deploy this in 60 mins</div>
                  <div>
                    <span className="text-violet-400">const</span>{' '}
                    <span className="text-indigo-300">response</span> ={' '}
                    <span className="text-cyan-400">await</span> ai.generate({'{'}
                  </div>
                  <div className="pl-4 text-slate-400">
                    model: <span className="text-amber-300">&quot;gemini-2.5-flash&quot;</span>,
                  </div>
                  <div className="pl-4 text-slate-400">
                    prompt: formatEngineeringPrompt(userCode),
                  </div>
                  <div>{'}'});</div>
                </div>

                {/* Bottom Status bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Stack: Next.js + AI SDK</span>
                  </div>
                  <span className="text-slate-500">Zero Boilerplate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

