// app/layout.tsx
<<<<<<< HEAD
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ThemeProvider from "../components/ThemeProvider";
import React from "react";

export const metadata = {
  title: "FreelanceAI CRM",
  description: "Centralized AI-powered freelance automation & CRM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
=======
'use client';
import './globals.css';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export const metadata = {
  title: 'FreelanceAI CRM',
  description: 'Centralized AI-powered freelance automation & CRM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const theme = globalThis?.localStorage?.getItem('theme');
      if (theme === 'dark' || theme === 'light') return theme;
      if (globalThis?.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch {}
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header theme={theme} setTheme={setTheme} />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
>>>>>>> 326a6409fb6dd969b932f479aefcd4369a699062
