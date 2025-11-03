// components/StatsCard.tsx
import React from 'react';

const StatCard: React.FC<{ title: string; value: number; delta?: string }> = ({ title, value, delta }) => {
  return (
    <div className="card w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-300">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        {delta && <div className="text-sm text-green-400">{delta}</div>}
      </div>
    </div>
  );
};

export default StatCard;
