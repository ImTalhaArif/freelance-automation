// components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Dashboard' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/crm', label: 'CRM' },
  { href: '/projects', label: 'Projects' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/chat', label: 'Unified Chat' },
  { href: '/agents', label: 'Agents Center' },
  { href: '/automation', label: 'Automation' },
  { href: '/whatsapp', label: 'WhatsApp' },
  { href: '/logs', label: 'System Logs' },
  { href: '/settings', label: 'Admin Settings' },
];

export default function Sidebar() {
  const pathname = usePathname() || '/';
  return (
    <aside className="w-64 p-4 border-r border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-800/40">
      <div className="mb-6">
        <div className="text-2xl font-bold">FreelanceAI</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">Centralized CRM</div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((it) => (
          <Link key={it.href} href={it.href}>
            <a className={`block px-3 py-2 rounded-lg ${pathname === it.href ? 'bg-slate-200 dark:bg-slate-700 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
              {it.label}
            </a>
          </Link>
        ))}
      </nav>

      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">v1.0 • UI prototype</div>
    </aside>
  );
}
