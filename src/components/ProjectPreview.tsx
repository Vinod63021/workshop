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
    input: 'function binarySearch(arr, target) { ... }',
    output: `// AI Analysis Streamed in 240ms:
Time Complexity: O(log N)
Memory Footprint: O(1)
Edge Cases: [Empty Array, Single Element, Duplicates]`,
  },
  {
    title: 'SQL Optimizer',
    tag: 'PostgreSQL',
    input: 'SELECT * FROM users WHERE branch = "CSE"',
    output: `// Generated Optimized Index:
CREATE INDEX idx_users_branch ON users(branch);
EXPLAIN ANALYZE: Query time reduced from 84ms -> 1.2ms`,
  },
  {
    title: 'API Pipeline',
    tag: 'Next.js + LLM',
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
    <section id="preview" className="py-24 relative overflow-hidden bg-[#060A11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Code Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What You Build in 60 Minutes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No fluff. Connect directly to frontier AI models, stream tokens to a reactive UI,
            and launch a live developer assistant on the web.
          </p>
        </div>

        {/* Floating Interactive Window */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#090E17]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Top Bar with Demo Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 pl-2">
                demo-project.buildsprint.dev
              </span>
            </div>

            {/* Quick Demo Switchers */}
            <div className="flex items-center gap-2">
              {DEMOS.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDemo(idx)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                    selectedDemo === idx
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive 2-Col Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Side */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">User Code Input</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {active.tag}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#05080E] border border-white/5 font-mono text-xs text-blue-200 min-h-[140px] flex items-center">
                {active.input}
              </div>
              <p className="text-[11px] text-slate-500">
                You will implement the streaming API endpoint that receives code and prompts.
              </p>
            </div>

            {/* Output Side */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Live AI Output Stream
                </span>
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-[#05080E] border border-emerald-500/20 font-mono text-xs text-emerald-300 min-h-[140px] whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {active.output}
              </pre>
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span>Response time: ~240ms</span>
                <a href="#register" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Build this live →
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
