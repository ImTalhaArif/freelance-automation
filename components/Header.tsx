"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links: { href: string; label: string }[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/accounts", label: "Accounts" },
    { href: "/crm", label: "CRM" },
    { href: "/agents", label: "Agents" },
    { href: "/automation", label: "Automation" },
    { href: "/chat", label: "Chats" }, // ✅ Added missing Chats link
  ];

  return (
    <>
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-4 py-3 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-lg text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors"
            onClick={() => setOpen(false)}
          >
            Automation Portal
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border rounded-lg hover:bg-gray-100 transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-black" // ✅ made icon fully black
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-black" // ✅ made icon fully black
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname === l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right-side Profile (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <ProfileButton />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
        aria-hidden={!open}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-indigo-600 text-lg">EvoDynamics</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black" // ✅ consistent black color
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2 text-base font-medium">
          {links.map((l) => (
            <MobileLink
              key={l.href}
              href={l.href}
              active={pathname === l.href}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </MobileLink>
          ))}

          <div className="mt-4 border-t pt-4 text-sm text-gray-600">
            <div className="px-1">Signed in as <strong>Admin</strong></div>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-1 py-1 rounded ${
        active
          ? "text-indigo-600 underline decoration-indigo-200"
          : "text-gray-700 hover:text-indigo-600"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded px-3 py-2 transition ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}

function ProfileButton() {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex flex-col text-right">
        <span className="text-xs text-gray-500">Signed in as</span>
        <span className="text-sm font-medium">Admin</span>
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
        A
      </div>
    </div>
  );
}