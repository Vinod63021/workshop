import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BuildSprint AI | Protected Growth Admin Portal',
  description: 'Admin dashboard for tracking student registrations, source distribution, ambassador loops, and budget unit economics.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#080C14] text-slate-100">{children}</div>;
}

