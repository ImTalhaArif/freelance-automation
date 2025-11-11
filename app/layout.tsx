"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons — install lucide-react if not already

export const metadata = {
  title: "AI Freelance Automation Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Navbar */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="flex justify-between items-center px-4 py-3 md:px-8">
            <Link href="/" className="font-bold text-lg text-indigo-600">
              EvoDynamics Portal
            </Link>
            <button
              className="md:hidden p-2 border rounded"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/accounts">Accounts</Link>
              <Link href="/crm">CRM</Link>
              <Link href="/agents">Agents</Link>
              <Link href="/automation">Automation</Link>
            </nav>
          </div>
        </header>

        {/* Sidebar for mobile */}
        <aside
          className={`fixed top-0 left-0 h-full w-56 bg-white border-r shadow-md transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden z-40`}
        >
          <div className="p-4 font-bold text-indigo-600 text-lg border-b">
            EvoDynamics
          </div>
          <nav className="flex flex-col p-4 space-y-3 text-sm">
            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link href="/accounts" onClick={() => setOpen(false)}>Accounts</Link>
            <Link href="/crm" onClick={() => setOpen(false)}>CRM</Link>
            <Link href="/agents" onClick={() => setOpen(false)}>Agents</Link>
            <Link href="/automation" onClick={() => setOpen(false)}>Automation</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}