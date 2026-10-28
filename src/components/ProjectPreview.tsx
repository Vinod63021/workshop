'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Play,
  CheckCircle,
  Copy,
  Zap,
  ArrowRight,
  Code2,
} from 'lucide-react';

const DEMOS = [
  {
    title: 'Code Analyzer',
    tag: 'Python / JS',
    color: 'blue',
    input: 'function binarySearch(arr, target) { ... }',
    output: `// AI Analysis Streamed in 240ms:
Time Complexity: O(log N)
Memory Footprint: O(1)
Edge Cases: [Empty Array, Single Element, Duplicates]`,
  },
  {
    title: 'SQL Optimizer',
    tag: 'PostgreSQL',
    color: 'green',
    input: 'SELECT * FROM users WHERE branch = "CSE"',
    output: `// Generated Optimized Index:
CREATE INDEX idx_users_branch ON users(branch);
EXPLAIN ANALYZE: Query time reduced from 84ms -> 1.2ms`,
  },
  {
    title: 'API Pipeline',
    tag: 'Next.js + LLM',
    color: 'purple',
    input: 'streamText({ model: "gemini", prompt })',
    output: `// Reactive Token Stream:
Response status: 200 OK
First token latency: 180ms
Direct DOM streaming without UI freeze.`,
  },
];

export default function ProjectPreview() {
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = DEMOS[selectedDemo];

  const handleCopy = () => {
    navigator.clipboard.writeText(active.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="preview" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#060A11] border-y border-slate-200/80 dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0FE] dark:bg-blue-950/60 border border-[#C2E7FF] dark:border-blue-500/30 text-[#1A73E8] dark:text-cyan-300 text-xs font-semibold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#1A73E8] dark:text-cyan-400" />
            <span>Interactive Code Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What You Build in 60 Minutes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            No fluff. Connect directly to frontier AI models, stream tokens to a reactive UI,
            and launch a live developer assistant on the web.
          </p>
        </div>

        {/* Floating Interactive Window */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/95 dark:bg-[#090E17]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-xl shadow-blue-500/5 dark:shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Top Bar with Demo Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
              <div className="w-3 h-3 rounded-full bg-[#FBBC04]" />
              <div className="w-3 h-3 rounded-full bg-[#34A853]" />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 pl-2">
                demo-project.buildsprint.dev
              </span>
            </div>

            {/* Quick Demo Switchers (Google Antigravity Pastel Pills) */}
            <div className="flex items-center gap-2">
              {DEMOS.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDemo(idx)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    selectedDemo === idx
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Split View: Input / Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Input Side */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-sans font-semibold text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-400">
                  User Prompt Input
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-cyan-300 border border-blue-200 dark:border-blue-500/30 text-[10px]">
                  {active.tag}
                </span>
              </div>
              <p className="text-slate-800 dark:text-slate-300 pt-2 font-mono leading-relaxed">
                {active.input}
              </p>
            </div>

            {/* AI Output Stream Side */}
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 space-y-2 relative text-slate-200 shadow-inner">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-sans font-semibold text-[11px] uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Streaming AI Output
                </span>
                <button
                  onClick={handleCopy}
                  className="hover:text-white transition-colors cursor-pointer"
                  title="Copy Output"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="text-emerald-300/90 whitespace-pre-wrap pt-2 leading-relaxed text-[11px]">
                {active.output}
              </pre>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
              💡 You will clone this repository, configure your API keys, and deploy live on GitHub in the session.
            </p>
            <a
              href="#register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-300 hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Build this live with us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
