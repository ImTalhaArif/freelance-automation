"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || theme === 'light') return theme;
      if (matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch {}
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  return (
    <>
      {children}
    </>
  );
}
