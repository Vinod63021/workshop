'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  // Default to light mode per user requirement
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('buildsprint_theme') as 'light' | 'dark' | null;
    if (saved === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('buildsprint_theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      className="relative flex items-center justify-between p-1 w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors shadow-inner cursor-pointer select-none group"
    >
      {/* Sun Icon (Light) */}
      <span className="flex items-center justify-center w-6 h-6 text-amber-500">
        <Sun className="w-3.5 h-3.5" />
      </span>

      {/* Moon Icon (Dark) */}
      <span className="flex items-center justify-center w-6 h-6 text-slate-400 group-hover:text-indigo-400">
        <Moon className="w-3.5 h-3.5" />
      </span>

      {/* Sliding Knob */}
      <div
        className={`absolute top-0.5 bottom-0.5 w-7 h-7 rounded-full bg-white dark:bg-indigo-600 shadow-md flex items-center justify-center text-slate-700 dark:text-white transition-transform duration-300 ease-out ${
          isLight ? 'left-0.5 translate-x-0' : 'left-0.5 translate-x-8'
        }`}
      >
        {isLight ? (
          <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
        ) : (
          <Moon className="w-4 h-4 text-white" />
        )}
      </div>
    </button>
  );
}
