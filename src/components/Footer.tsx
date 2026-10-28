'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Footer() {
  return (
    <footer className="bg-slate-100/80 dark:bg-[#05080E] border-t border-slate-200 dark:border-slate-900/90 text-slate-600 dark:text-slate-400 text-xs py-14 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-900">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 p-1 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-800">
              <img src="/nxtwave-logo.png" alt="NxtWave" className="h-full w-auto object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                BuildSprint <span className="text-blue-600 dark:text-cyan-400">AI</span>
              </span>
              <p className="text-[11px] text-slate-500">
                NxtWave Growth Intern Challenge Initiative
              </p>
            </div>
          </div>

          {/* Quick Links & Footer Theme Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <a href="#preview" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              What You Build
            </a>
            <a href="#journey" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              60-Min Sprint
            </a>
            <a href="#outcomes" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Outcomes
            </a>
            <a href="#register" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Reserve Free Spot
            </a>
            <a href="#share" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Invite Batchmates
            </a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQs
            </a>
            <Link
              href="/admin"
              className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <div className="pl-2 border-l border-slate-200 dark:border-slate-800">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Challenge Transparency Note */}
        <div className="space-y-2 text-[11px] text-slate-500 dark:text-slate-500 max-w-4xl leading-relaxed">
          <p>
            <strong>Growth Challenge Specification:</strong> BuildSprint AI is an engineering-driven
            growth prototype designed to simulate acquiring 500 final-year engineering student registrations
            within 7 days under a ₹2,000 budget constraint.
          </p>
          <p>
            Event timing, mentor credentials, and certification availability are designated as configurable
            placeholders per evaluation instructions. No fabricated urgency, fake countdown timers, or
            artificial scarcity are utilized. Student contact records are securely stored and never publicly exposed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-900/60 text-[11px] text-slate-500">
          <span>© 2026 BuildSprint AI • Crafted for NxtWave Growth Intern Challenge</span>
          <span>
            Inspired by Google Antigravity aesthetic • Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
