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
          else if (utmSrc.toLowerCase().includes('ad') || utmSrc.toLowerCase().includes('meta')) setSource('paid promotion');
          else if (utmSrc.toLowerCase().includes('whatsapp') || utmSrc.toLowerCase().includes('community')) setSource('WhatsApp/community');
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
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981'],
        });
      } catch {
        // Safe fallback if canvas is restricted
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
      `Hey! I just registered for the free 60-Minute "Build Your First AI Project" workshop by NxtWave. You can build a real full-stack AI micro-app with live code. Register your free spot here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="register" className="py-20 bg-[#080C14] relative scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Fast 30-Second Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Reserve Your Free Spot Now
          </h2>
          <p className="text-slate-400 text-sm">
            Join final-year engineering students from leading colleges across India.
            100% Free • No Credit Card Required • Instant Spot Confirmation.
          </p>
        </div>

        {/* Confirmation Screen on Success */}
        {registeredStudent ? (
          <div className="rounded-2xl bg-[#0B0F19] border border-emerald-500/40 p-6 sm:p-10 shadow-2xl space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                Enrollment Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                You&apos;re in, {registeredStudent.full_name}!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                We sent workshop access credentials and session join links to{' '}
                <strong className="text-white">{registeredStudent.email}</strong>.
              </p>
            </div>

            {/* Registration Details Summary Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left max-w-lg mx-auto text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">College</span>
                <span className="text-white font-medium">{registeredStudent.college}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Branch &amp; Year</span>
                <span className="text-white font-medium">
                  {registeredStudent.branch} ({registeredStudent.graduation_year})
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Your Referral Code</span>
                <span className="font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                  {registeredStudent.referral_code}
                </span>
              </div>
            </div>

            {/* Referral / Share Action Hub */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 max-w-xl mx-auto space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Invite Your Campus Batchmates
                </h4>
                <p className="text-xs text-slate-400">
                  Share your unique link. When batchmates register through your code,
                  you unlock priority mentor code review and campus ambassador perks!
                </p>
              </div>

              {/* Copy Link Input Bar */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getPersonalReferralUrl()}
                  className="w-full bg-[#070A10] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
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

              {/* Quick WhatsApp Share Button */}
              <button
                onClick={shareViaWhatsApp}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-900/30"
              >
                <Share2 className="w-3.5 h-3.5" />
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
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
            >
              Register Another Student
            </button>
          </div>
        ) : (
          /* Registration Form */
          <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/25 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />

            {/* Error Notification Alert */}
            {formError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-3 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-rose-300">Registration Notice</span>
                  <p>{formError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
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
                    className={`w-full bg-[#080C14] border ${
                      fieldErrors.fullName ? 'border-rose-500' : 'border-slate-800'
                    } focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-[11px] text-rose-400">{fieldErrors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
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
                    className={`w-full bg-[#080C14] border ${
                      fieldErrors.email ? 'border-rose-500' : 'border-slate-800'
                    } focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-rose-400">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* College / University */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
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
                  className={`w-full bg-[#080C14] border ${
                    fieldErrors.college ? 'border-rose-500' : 'border-slate-800'
                  } focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                />
                {fieldErrors.college && (
                  <p className="text-[11px] text-rose-400">{fieldErrors.college}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Engineering Branch */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Engineering Branch *</span>
                  </label>
                  <select
                    required
                    value={branch}
                    onChange={(e) => {
                      setBranch(e.target.value);
                      if (fieldErrors.branch) setFieldErrors({ ...fieldErrors, branch: '' });
                    }}
                    className={`w-full bg-[#080C14] border ${
                      fieldErrors.branch ? 'border-rose-500' : 'border-slate-800'
                    } focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors`}
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
                    <span className="text-[10px] text-indigo-400 font-normal">
                      Final-Year Target: 2025
                    </span>
                  </label>
                  <select
                    required
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(Number(e.target.value))}
                    className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  >
                    {GRADUATION_YEARS.map((y) => (
                      <option key={y} value={y} className="bg-[#0B0F19] text-white">
                        {y} {y === 2025 ? '(Final Year)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Referral Code & Source */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      Referral Code (Optional)
                    </span>
                    {referralCode && (
                      <span className="text-[10px] text-emerald-400 font-mono">
                        Attributed from link
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BS-KAR-4921"
                    className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-slate-600 focus:outline-none transition-colors uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">
                    How Did You Hear About Us?
                  </label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  >
                    {ALLOWED_SOURCES.map((s) => (
                      <option key={s} value={s} className="bg-[#0B0F19] text-white">
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Privacy Notice Required by Prompt */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-400">
                  <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300">Privacy Notice:</strong> Your information is
                    collected exclusively for workshop access, session credentials, and attendance verification.
                    We respect your privacy: student contact records are protected and never sold or made publicly accessible.
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
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
        )}
      </div>
    </section>
  );
}

