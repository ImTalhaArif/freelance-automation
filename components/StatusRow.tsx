// components/StatusRow.tsx
import React from 'react';

export default function StatusRow({ status }: { status: { name: string; percent: number; status: 'ok' | 'warn' | 'down' } }) {
  const color = status.status === 'ok' ? 'bg-green-400' : status.status === 'warn' ? 'bg-yellow-400' : 'bg-red-500';
  return (
    <div className="p-2 card mb-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{status.name}</div>
          <div className="text-xs text-slate-400">{status.percent}%</div>
        </div>
        <div className="w-36 bg-slate-200 rounded-full h-3 overflow-hidden">
          <div className={`${color} h-3`} style={{ width: `${status.percent}%` }} />
        </div>
      </div>
    </div>
  );
}
