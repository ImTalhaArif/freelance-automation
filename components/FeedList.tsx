// components/FeedList.tsx
import React from 'react';

export default function FeedList({ items }: { items: { id: string; title: string; time: string; detail?: string }[] }) {
  return (
    <div className="card">
      <div className="font-medium mb-2">Recent Activities</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm">{it.title}</div>
              <div className="text-xs text-slate-400">{it.detail}</div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{it.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
