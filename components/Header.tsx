// components/Header.tsx
'use client';
import React from 'react';

const Header: React.FC<{ theme: string; setTheme: (t: 'light' | 'dark') => void }> = ({ theme, setTheme }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">☰</button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block text-sm text-slate-600 dark:text-slate-300">Admin • John Doe</div>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded-lg border">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
};

export default Header;
