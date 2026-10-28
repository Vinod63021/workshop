'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Building,
  GraduationCap,
  Tag,
  Share2,
  Calendar,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Registration } from '@/lib/types';
import { formatDateIndian } from '@/lib/utils';

interface StudentDetailModalProps {
  student: Registration;
  onClose: () => void;
}

export default function StudentDetailModal({ student, onClose }: StudentDetailModalProps) {
  const [copied, setCopied] = useState(false);

  const referralUrl = `https://buildsprint.ai/?ref=${student.referral_code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B0F19] border border-indigo-500/30 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Student Registration Profile</h3>
              <p className="text-[11px] text-slate-400 font-mono">ID: {student.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Record Type Banner */}
        <div
          className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
            student.is_demo
              ? 'bg-slate-900/80 text-slate-300 border-slate-700'
              : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
          }`}
        >
          <span>
            {student.is_demo
              ? '🏷️ Demo Seed Record (Pre-loaded simulation dataset)'
              : '⚡ Live Verified Submission (Real student registration)'}
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase">
            {student.is_demo ? 'Demo' : 'Live'}
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" /> Full Name:
              </span>
              <strong className="text-white">{student.full_name}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email:
              </span>
              <span className="font-mono text-slate-200">{student.email}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" /> College:
              </span>
              <span className="text-right text-slate-200 max-w-xs">{student.college}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Branch:
              </span>
              <span className="text-right text-slate-200">{student.branch}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400">Graduation Year:</span>
              <strong className="text-white font-mono">{student.graduation_year}</strong>
            </div>
          </div>

          {/* Growth Attribution Card */}
          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
            <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              Growth &amp; Attribution Metadata
            </h4>

            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Channel Source:</span>
              <span className="font-semibold text-indigo-300 capitalize">{student.source}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Personal Referral Code:</span>
              <span className="font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {student.referral_code}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Referred By Code:</span>
              <span className="font-mono text-slate-300">
                {student.referred_by_code || 'None (Direct / Organic)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-slate-500 block">UTM Source:</span>
                <span className="font-mono text-slate-300">{student.utm_source || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">UTM Medium:</span>
                <span className="font-mono text-slate-300">{student.utm_medium || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">UTM Campaign:</span>
                <span className="font-mono text-slate-300">{student.utm_campaign || '—'}</span>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> Registration Timestamp:
            </span>
            <span className="text-white font-mono">{formatDateIndian(student.created_at)}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Referral URL</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

