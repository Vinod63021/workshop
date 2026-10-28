import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BuildSprint AI | Build Your First AI Project in 60 Minutes',
  description:
    'Free 60-Minute online masterclass for final-year engineering students to build and deploy their first production AI micro-app. NxtWave Growth Intern Challenge.',
  keywords: [
    'BuildSprint AI',
    'NxtWave',
    'AI workshop',
    'engineering students',
    'final year project',
    'LLM API',
    'AI micro-app',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#080C14] text-slate-100">
        {children}
      </body>
    </html>
  );
}
