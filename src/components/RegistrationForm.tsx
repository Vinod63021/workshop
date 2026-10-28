'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Share2,
  Shield,
  GraduationCap,
  Building,
  Mail,
  User,
  Tag,
  ArrowRight,
  Code2,
  Zap,
  Ticket,
} from 'lucide-react';
import {
  ALLOWED_SOURCES,
  ENGINEERING_BRANCHES,
  GRADUATION_YEARS,
  Registration,
  SourceCategory,
} from '@/lib/types';
import { isValidEmail, normalizeEmail } from '@/lib/utils';

export default function RegistrationForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationYear, setGraduationYear] = useState<number>(2025);
  const [referralCode, setReferralCode] = useState('');
  const [source, setSource] = useState<string>('college club');

  // Attribution from URL
  const [utmSource, setUtmSource] = useState<string | null>(null);
  const [utmMedium, setUtmMedium] = useState<string | null>(null);
  const [utmCampaign, setUtmCampaign] = useState<string | null>(null);

  // Form State
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [registeredStudent, setRegisteredStudent] = useState<Registration | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Read URL search params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref');
      const utmSrc = params.get('utm_source');
      const utmMed = params.get('utm_medium');
      const utmCmp = params.get('utm_campaign');
      const srcParam = params.get('source');

      if (refParam) {
        setReferralCode(refParam.toUpperCase());
        setSource('student referral');
      }

      if (utmSrc) {
        setUtmSource(utmSrc);
        if (!refParam) {
          if (utmSrc.toLowerCase().includes('club')) setSource('college club');
          else if (utmSrc.toLowerCase().includes('ad') || utmSrc.toLowerCase().includes('meta'))
            setSource('paid promotion');
          else if (
            utmSrc.toLowerCase().includes('whatsapp') ||
            utmSrc.toLowerCase().includes('community')
          )
            setSource('WhatsApp/community');
          else if (utmSrc.toLowerCase().includes('email')) setSource('email');
        }
      }

      if (utmMed) setUtmMedium(utmMed);
      if (utmCmp) setUtmCampaign(utmCmp);
      if (srcParam && ALLOWED_SOURCES.includes(srcParam as SourceCategory)) {
        setSource(srcParam);
      }
    }
  }, []);

  const validateClient = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    }

    const normEmail = normalizeEmail(email);
    if (!normEmail || !isValidEmail(normEmail)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!college.trim() || college.trim().length < 2) {
      errors.college = 'College / university name is required.';
    }

    if (!branch) {
      errors.branch = 'Please select your engineering branch.';
    }

    if (!graduationYear) {
      errors.graduationYear = 'Please select your graduation year.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateClient()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: fullName.trim(),
        email: normalizeEmail(email),
        college: college.trim(),
        branch,
        graduation_year: graduationYear,
        referral_code: referralCode.trim() ? referralCode.trim().toUpperCase() : undefined,
        source,
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || 'Registration failed. Please check your inputs.');
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setLoading(false);
        return;
      }

      // Success
      setRegisteredStudent(data.registration);
      setLoading(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0070F3', '#06B6D4', '#6366F1', '#10B981'],
        });
      } catch {
        // Safe fallback
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setFormError(`Connection failed: ${msg}. Please try again.`);
      setLoading(false);
    }
  };

  const getPersonalReferralUrl = () => {
    if (!registeredStudent) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://buildsprint.ai';
    return `${origin}/?ref=${registeredStudent.referral_code}`;
  };

  const handleCopyLink = () => {
    const url = getPersonalReferralUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const shareViaWhatsApp = () => {
    const url = getPersonalReferralUrl();
    const text = encodeURIComponent(
      `Hey! I just reserved my spot for the free 60-Minute "Build Your First AI Project" workshop by NxtWave. We're building and deploying an AI project live on GitHub. Grab your free spot here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="register" className="py-24 bg-[#080C14] relative scroll-mt-10 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>30-Second Free Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your Free Spot
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Designed specifically for final-year engineering students ready to build with AI.
            <br className="hidden sm:inline" />
            100% Free • No Card Required • Instant Confirmation.
          </p>
        </div>

        {/* Confirmation Screen / Virtual Workshop Pass */}
        {registeredStudent ? (
          <div className="max-w-2xl mx-auto rounded-3xl bg-[#0B0F19]/95 border border-cyan-500/40 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 space-y-7 text-center animate-fade-in backdrop-blur-xl">
            {/* Pass Header Badge */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-7 p-1 rounded bg-white flex items-center justify-center">
                  <img src="/nxtwave-logo.png" alt="NxtWave" className="h-full w-auto object-contain" />
                </div>
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  BuildSprint AI Pass
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                Confirmed
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                You&apos;re in, {registeredStudent.full_name}!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                We sent workshop access credentials and session join links to{' '}
                <strong className="text-cyan-300 font-semibold">{registeredStudent.email}</strong>.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#070A10] border border-slate-800 text-left space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Ticket className="w-4 h-4 text-indigo-400" />
                  <span>Virtual Workshop Ticket</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">
                  ID: #{registeredStudent.id.slice(0, 8)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[11px]">College</span>
                  <span className="text-white font-medium truncate block">
                    {registeredStudent.college}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Branch &amp; Year</span>
                  <span className="text-white font-medium block">
                    {registeredStudent.branch} ({registeredStudent.graduation_year})
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 block">
                    Your Referral Code
                  </span>
                  <span className="text-sm font-mono font-bold text-white">
                    {registeredStudent.referral_code}
                  </span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Invite Batchmates Action Hub */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/30 via-slate-900/60 to-slate-900/90 border border-blue-500/25 space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Build Together with Batchmates</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Share your link with your college group. When batchmates join, you unlock VIP mentor
                  review and campus ambassador recognition!
                </p>
              </div>

              {/* URL Input Bar */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getPersonalReferralUrl()}
                  className="w-full bg-[#05070D] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Share Button */}
              <button
                onClick={shareViaWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/80 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Batchmates on WhatsApp</span>
              </button>
            </div>

            <button
              onClick={() => {
                setRegisteredStudent(null);
                setFullName('');
                setEmail('');
                setFieldErrors({});
              }}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Register Another Student
            </button>
          </div>
        ) : (
          /* Form Grid: Left column benefits + Right column form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Why Join / What You Get */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-[#0B0F19]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Workshop Package
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    What You Walk Away With
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    A high-impact 60 minutes designed to jumpstart your AI engineering journey.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Live AI App on GitHub</h4>
                      <p className="text-xs text-slate-400">
                        A working full-stack project running in production, not a toy demo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">API Keys &amp; Prompt Orchestration</h4>
                      <p className="text-xs text-slate-400">
                        Learn how to connect LLM endpoints, handle streaming, and parse structured output.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Placement-Ready Resume Bullet</h4>
                      <p className="text-xs text-slate-400">
                        A concrete project to talk about in tech interviews with working proof.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cohort Spec Pill */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Format</span>
                    <span className="font-semibold text-white">Live Online Masterclass</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Duration</span>
                    <span className="font-semibold text-cyan-300">60 Minutes</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Target Cohort</span>
                    <span className="font-semibold text-white">2025 / 2026 Batch</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Cost</span>
                    <span className="font-bold text-emerald-400">₹0 (100% Free)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Registration Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#0B0F19]/95 border border-white/10 p-6 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                {/* Top glowing gradient stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                {/* Error Banner */}
                {formError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-3 text-rose-200 text-xs animate-shake">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-semibold text-rose-300">Registration Notice</span>
                      <p>{formError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: '' });
                        }}
                        placeholder="e.g. Karthik Reddy"
                        className={`w-full bg-[#070A10] border ${
                          fieldErrors.fullName ? 'border-rose-500' : 'border-slate-800'
                        } focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                      />
                      {fieldErrors.fullName && (
                        <p className="text-[11px] text-rose-400">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                        }}
                        placeholder="e.g. karthik@university.edu"
                        className={`w-full bg-[#070A10] border ${
                          fieldErrors.email ? 'border-rose-500' : 'border-slate-800'
                        } focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-rose-400">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* College / University */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-blue-400" />
                      <span>College / University *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => {
                        setCollege(e.target.value);
                        if (fieldErrors.college) setFieldErrors({ ...fieldErrors, college: '' });
                      }}
                      placeholder="e.g. BITS Pilani / VIT / NIT Trichy / DTU"
                      className={`w-full bg-[#070A10] border ${
                        fieldErrors.college ? 'border-rose-500' : 'border-slate-800'
                      } focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                    />
                    {fieldErrors.college && (
                      <p className="text-[11px] text-rose-400">{fieldErrors.college}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Engineering Branch */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                        <span>Branch *</span>
                      </label>
                      <select
                        required
                        value={branch}
                        onChange={(e) => {
                          setBranch(e.target.value);
                          if (fieldErrors.branch) setFieldErrors({ ...fieldErrors, branch: '' });
                        }}
                        className={`w-full bg-[#070A10] border ${
                          fieldErrors.branch ? 'border-rose-500' : 'border-slate-800'
                        } focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors`}
                      >
                        <option value="" disabled className="bg-slate-900 text-slate-400">
                          Select Your Branch
                        </option>
                        {ENGINEERING_BRANCHES.map((b) => (
                          <option key={b} value={b} className="bg-[#0B0F19] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.branch && (
                        <p className="text-[11px] text-rose-400">{fieldErrors.branch}</p>
                      )}
                    </div>

                    {/* Graduation Year */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                        <span>Graduation Year *</span>
                        <span className="text-[10px] text-cyan-400 font-medium">Final Year</span>
                      </label>
                      <select
                        required
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(Number(e.target.value))}
                        className="w-full bg-[#070A10] border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      >
                        {GRADUATION_YEARS.map((y) => (
                          <option key={y} value={y} className="bg-[#0B0F19] text-white">
                            {y} {y === 2025 ? '(Final Year Target)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Optional Referral Code & Source */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-slate-500" />
                          Referral Code
                        </span>
                        {referralCode && (
                          <span className="text-[10px] text-emerald-400 font-mono">
                            Attributed ✓
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                        placeholder="e.g. BS-KAR-4921"
                        className="w-full bg-[#070A10] border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-slate-600 focus:outline-none transition-colors uppercase"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400">
                        How Did You Hear About Us?
                      </label>
                      <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full bg-[#070A10] border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      >
                        {ALLOWED_SOURCES.map((s) => (
                          <option key={s} value={s} className="bg-[#0B0F19] text-white">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-400">
                      <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-300">Privacy Notice:</strong> Your information is
                        used exclusively for workshop access, session credentials, and attendance verification.
                        We respect your privacy: student contact records are protected and never sold or made publicly accessible.
                      </span>
                    </div>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying &amp; Reserving Spot...</span>
                        </>
                      ) : (
                        <>
                          <span>Reserve My Free Spot (60-Min Masterclass)</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
