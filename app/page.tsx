// app/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatsCard';
import StatusRow from '../components/StatusRow';
import FeedList from '../components/FeedList';
import QuickActions from '../components/QuickActions';
import { getMockStats, getMockStatuses, getMockActivities } from './utils/mock';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [statuses, setStatuses] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setStats(await getMockStats());
      setStatuses(await getMockStatuses());
      setActivities(await getMockActivities());
    })();

    const iv = setInterval(async () => {
      setActivities(await getMockActivities());
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Active Bids" value={stats?.activeBids ?? 0} delta="+12%" />
        <StatCard title="Client Responses" value={stats?.clientResponses ?? 0} delta="+3" />
        <StatCard title="Projects in Progress" value={stats?.projectsInProgress ?? 0} />
        <StatCard title="Auto-Follow Ups" value={stats?.autoFollowUps ?? 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <div className="font-medium mb-2">API Status</div>
            <div className="space-y-2">
              {statuses.map((s) => <StatusRow key={s.name} status={s} />)}
            </div>
          </div>

          <FeedList items={activities} />
        </div>

        <div className="space-y-4">
          <QuickActions />
          <div className="card">
            <div className="font-medium mb-2">Notifications</div>
            <div className="text-sm text-slate-500 dark:text-slate-300">No critical alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
}