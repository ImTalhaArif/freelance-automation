// app/layout.tsx
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
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
