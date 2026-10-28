'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Who is eligible to participate in this workshop?',
    a: 'This workshop is specifically designed for final-year engineering students (Graduating 2025/2026) across computer science, IT, electronics, electrical, mechanical, and civil branches who want to build and deploy an AI micro-app to their technical portfolio.',
  },
  {
    q: 'Do I need prior experience in Machine Learning or Artificial Intelligence?',
    a: 'No prior machine learning, calculus, or deep learning background is required. Basic understanding of any programming language (JavaScript, Python, C++, etc.) is sufficient. We focus on modern API integration, reactive UI construction, and prompt structure.',
  },
  {
    q: 'Is there any registration fee or hidden cost?',
    a: 'No. The workshop is 100% free of charge as part of the NxtWave Growth Challenge initiative to empower upcoming engineering graduates.',
  },
  {
    q: 'What are the hardware and software prerequisites?',
    a: 'Any standard laptop (Windows, Mac, or Linux) with Google Chrome or any modern browser and an active internet connection. All coding tools and sandboxes run in browser or lightweight terminal.',
  },
  {
    q: 'When will the exact session date and time be confirmed?',
    a: 'Following the challenge guidelines, the batch schedule is a [Configurable Placeholder: Upcoming batch schedule notified via email upon registration]. Enrolled students receive calendar invites and session links prior to the live sprint.',
  },
  {
    q: 'Will participants receive a certificate or project verification?',
    a: '[Configurable Placeholder: Certificate availability & attendance verification details will be confirmed post-session]. The primary outcome is a verified, live-deployed AI micro-app running on your GitHub profile.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#080C14] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about the 60-Minute BuildSprint AI workshop.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B0F19]/90 border border-white/5 overflow-hidden transition-all hover:border-white/10"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
