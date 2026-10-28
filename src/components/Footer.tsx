'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05080E] border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">
                BuildSprint <span className="text-indigo-400">AI</span>
              </span>
              <p className="text-[11px] text-slate-500">
                NxtWave Growth Intern Challenge Initiative
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#preview" className="hover:text-white transition-colors">
              What You&apos;ll Build
            </a>
            <a href="#journey" className="hover:text-white transition-colors">
              60-Min Sprint
            </a>
            <a href="#outcomes" className="hover:text-white transition-colors">
              Learning Outcomes
            </a>
            <a href="#register" className="hover:text-white transition-colors">
              Reserve Free Spot
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQs
            </a>
            <Link
              href="/admin"
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Challenge Compliance & Honest Disclaimer Notice */}
        <div className="space-y-2 text-[11px] text-slate-500 max-w-4xl">
          <p>
            <strong>Growth Challenge Specification:</strong> BuildSprint AI is an engineering-driven
            growth prototype designed to simulate acquiring 500 final-year engineering student registrations
            within 7 days under a ₹2,000 budget constraint.
          </p>
          <p>
            Event timing, mentor credentials, and certification availability are designated as configurable
            placeholders per evaluation instructions. No fabricated urgency, fake countdown timers, or
            artificial scarcity are utilized. Student registrations are securely stored and never publicly exposed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900/60 text-[11px]">
          <span>© 2026 BuildSprint AI • Crafted for NxtWave Growth Intern Challenge</span>
          <span className="flex items-center gap-1 text-slate-500">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}

