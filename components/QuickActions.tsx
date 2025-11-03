// components/QuickActions.tsx
export default function QuickActions() {
  const actions = ['View All Chats', 'Check Bids', 'Manage Accounts', 'Run Automation'];
  return (
    <div className="card">
      <div className="font-medium mb-2">Quick Actions</div>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <button key={a} className="px-3 py-2 rounded-lg border text-sm">{a}</button>
        ))}
      </div>
    </div>
  );
}
