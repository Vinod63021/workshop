import type { Metadata } from 'next';
import './globals.css';
import CursorEffect from '@/components/CursorEffect';

export const metadata: Metadata = {
  title: 'BuildSprint AI | Build Your First AI Project in 60 Minutes (NxtWave)',
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
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Instant theme hydration script to avoid flash - defaults to light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('buildsprint_theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFD] dark:bg-[#080C14] text-slate-800 dark:text-slate-100 transition-colors duration-200">
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
