'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pointer-events-none">
      <nav className="w-full max-w-6xl mx-auto rounded-full bg-white/90 dark:bg-[#080C14]/85 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg shadow-blue-500/5 dark:shadow-2xl dark:shadow-black/60 px-5 sm:px-7 py-3 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 sm:h-9 flex items-center justify-center p-1 rounded-lg bg-white shadow-sm border border-slate-200/70 dark:border-white/10 group-hover:scale-105 transition-transform">
            <img
              src="/nxtwave-logo.png"
              alt="NxtWave"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-200 transition-colors">
              BuildSprint <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">AI</span>
            </span>
            <span className="hidden lg:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-[#C2E7FF] dark:bg-blue-500/10 dark:text-cyan-300 dark:border-blue-500/25">
              60-Min Masterclass
            </span>
          </div>
        </Link>

        {/* Desktop Quick Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-semibold tracking-wide">
          <a href="#preview" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">
            What You Build
          </a>
          <a href="#journey" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">
            60-Min Sprint
          </a>
          <a href="#outcomes" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">
            Outcomes
          </a>
          <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">
            FAQs
          </a>
        </div>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle (Light / Dark Switch) */}
          <ThemeToggle />

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-slate-200 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-all"
            title="Growth Intern Challenge Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Admin</span>
          </Link>

          <a
            href="#register"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Reserve Spot</span>
            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-white/20 text-white">
              FREE
            </span>
          </a>
        </div>

        {/* Mobile Toggle & Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 left-4 right-4 rounded-3xl bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-6 shadow-2xl space-y-4 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-semibold">
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 py-1"
            >
              What You&apos;ll Build
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 py-1"
            >
              60-Min Sprint Roadmap
            </a>
            <a
              href="#outcomes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 py-1"
            >
              Core Outcomes
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 py-1"
            >
              FAQs
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 py-1 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Admin Management</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Reserve Free Spot Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
