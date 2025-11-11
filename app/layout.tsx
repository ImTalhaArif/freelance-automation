
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

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
            {/* Logo */}
            <Link
              href="/"
              className="font-extrabold text-lg text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors"
            >
              EvoDynamics Portal
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 border rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                // Close icon (X)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/accounts">Accounts</NavLink>
              <NavLink href="/crm">CRM</NavLink>
              <NavLink href="/agents">Agents</NavLink>
              <NavLink href="/automation">Automation</NavLink>
            </nav>
          </div>
        </header>

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden z-40`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-indigo-600 text-lg">EvoDynamics</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4 space-y-3 text-base font-medium">
            <MobileLink href="/dashboard" closeMenu={() => setOpen(false)}>Dashboard</MobileLink>
            <MobileLink href="/accounts" closeMenu={() => setOpen(false)}>Accounts</MobileLink>
            <MobileLink href="/crm" closeMenu={() => setOpen(false)}>CRM</MobileLink>
            <MobileLink href="/agents" closeMenu={() => setOpen(false)}>Agents</MobileLink>
            <MobileLink href="/automation" closeMenu={() => setOpen(false)}>Automation</MobileLink>
          </nav>
        </aside>

        {/* Overlay when menu is open */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

/* --- Reusable Link Components --- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  closeMenu,
  children,
}: {
  href: string;
  closeMenu: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className="text-gray-700 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
    >
      {children}
    </Link>
  );
}