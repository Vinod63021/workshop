'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pointer-events-none">
      <nav className="w-full max-w-6xl mx-auto rounded-full bg-[#080C14]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 px-5 sm:px-7 py-3 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 sm:h-9 flex items-center justify-center p-1 rounded-lg bg-white/95 shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform">
            <img
              src="/nxtwave-logo.png"
              alt="NxtWave"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-200 transition-colors">
              BuildSprint <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">AI</span>
            </span>
            <span className="hidden lg:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/25">
              60-Min Masterclass
            </span>
          </div>
        </Link>

        {/* Desktop Quick Nav */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide">
          <a href="#preview" className="text-slate-300 hover:text-white transition-colors">
            What You Build
          </a>
          <a href="#journey" className="text-slate-300 hover:text-white transition-colors">
            60-Min Sprint
          </a>
          <a href="#outcomes" className="text-slate-300 hover:text-white transition-colors">
            Outcomes
          </a>
          <a href="#faq" className="text-slate-300 hover:text-white transition-colors">
            FAQs
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/40 transition-all"
            title="Growth Intern Challenge Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Admin</span>
          </Link>

          <a
            href="#register"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Reserve Spot</span>
            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-white/20 text-white">
              FREE
            </span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#register"
            className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-blue-600 text-white"
          >
            Reserve Free
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl pointer-events-auto space-y-3 sm:hidden animate-fade-in">
          <a
            href="#preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 py-1.5"
          >
            What You Build
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 py-1.5"
          >
            60-Min Sprint
          </a>
          <a
            href="#outcomes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 py-1.5"
          >
            Outcomes
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 py-1.5"
          >
            FAQs
          </a>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-400 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
