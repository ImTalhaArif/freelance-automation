"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Zap,
  PauseCircle,
  PlayCircle,
  MessageCircle,
  Trophy,
  Bell,
} from "lucide-react";

// Automation type
type Automation = {
  id: number;
  name: string;
  type:
    | "auto-reply"
    | "lead-scraper"
    | "bid-assistant"
    | "notification"
    | "reminder";
  platform: "Fiverr" | "Upwork" | "Freelancer";
  triggers: string[];
  actions: string[];
  reminder?: { title: string; datetime: string; afterTask?: boolean };
};

// Agent type
type Agent = {
  id: number;
  name: string;
  email: string;
  platform: "Fiverr" | "Upwork" | "Freelancer";
  status: "active" | "idle" | "offline";
  tasksCompleted: number;
  leadsCaptured: number;
  assignedAutomations: Automation[];
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: "Talha Arif",
      email: "talhawritescode@gmail.com",
      platform: "Fiverr",
      status: "active",
      tasksCompleted: 12,
      leadsCaptured: 5,
      assignedAutomations: [
        {
          id: 1,
          name: "Fiverr Auto-Reply Bot",
          type: "auto-reply",
          platform: "Fiverr",
          triggers: ["new message"],
          actions: ["send auto-reply"],
        },
      ],
    },
    {
      id: 2,
      name: "Arif Khan",
      email: "arif@example.com",
      platform: "Upwork",
      status: "idle",
      tasksCompleted: 8,
      leadsCaptured: 3,
      assignedAutomations: [
        {
          id: 2,
          name: "Upwork Bid Assistant",
          type: "bid-assistant",
          platform: "Upwork",
          triggers: ["new project matched"],
          actions: ["draft proposal", "send proposal"],
        },
      ],
    },
  ]);

  const [filter, setFilter] = useState<"All" | "Fiverr" | "Upwork" | "Freelancer">("All");

  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);

  const [newAutomationName, setNewAutomationName] = useState("");
  const [newAutomationType, setNewAutomationType] = useState<
    Automation["type"]
  >("auto-reply");
  const [newAutomationPlatform, setNewAutomationPlatform] = useState<
    Automation["platform"]
  >("Fiverr");
  const [newAutomationTriggers, setNewAutomationTriggers] = useState("");
  const [newAutomationActions, setNewAutomationActions] = useState("");
  const [newReminderTitle, setNewReminderTitle] = useState("");
  const [newReminderDateTime, setNewReminderDateTime] = useState("");
  const [newReminderAfterTask, setNewReminderAfterTask] = useState(false);

  const filteredAgents = agents.filter(
    (a) => filter === "All" || a.platform === filter
  );

  // Toggle agent status
  const toggleStatus = (id: number) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus =
            a.status === "active"
              ? "idle"
              : a.status === "idle"
              ? "offline"
              : "active";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  // Assign new automation
  const handleAssignAutomation = () => {
    if (selectedAgentId === null || !newAutomationName) return;

    const newAutomation: Automation = {
      id: Date.now(),
      name: newAutomationName,
      type: newAutomationType,
      platform: newAutomationPlatform,
      triggers: newAutomationTriggers.split(",").map((t) => t.trim()),
      actions: newAutomationActions.split(",").map((a) => a.trim()),
      reminder:
        newReminderTitle && newReminderDateTime
          ? {
              title: newReminderTitle,
              datetime: newReminderDateTime,
              afterTask: newReminderAfterTask,
            }
          : undefined,
    };

    setAgents((prev) =>
      prev.map((a) =>
        a.id === selectedAgentId
          ? {
              ...a,
              assignedAutomations: [...a.assignedAutomations, newAutomation],
            }
          : a
      )
    );

    // Reset modal
    setNewAutomationName("");
    setNewAutomationType("auto-reply");
    setNewAutomationPlatform("Fiverr");
    setNewAutomationTriggers("");
    setNewAutomationActions("");
    setNewReminderTitle("");
    setNewReminderDateTime("");
    setNewReminderAfterTask(false);
    setShowAutomationModal(false);
  };

  // Handle reminders
  useEffect(() => {
  const firedReminders = new Set<number>();

  const interval = setInterval(() => {
    const now = Date.now();

    agents.forEach((agent) => {
      agent.assignedAutomations.forEach((automation) => {
        if (automation.reminder && !firedReminders.has(automation.id)) {
          const reminderTime = new Date(automation.reminder.datetime).getTime();
          if (now >= reminderTime) {
            alert(`Reminder for Agent ${agent.name}: ${automation.reminder.title}`);
            firedReminders.add(automation.id);
          }
        }
      });
    });
  }, 1000); // check every second

  return () => clearInterval(interval);
}, [agents]);

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
          <Zap className="text-indigo-600 w-8 h-8" /> Agents Dashboard
        </h1>

        <div className="flex gap-2 flex-wrap">
          {["All", "Fiverr", "Upwork", "Freelancer"].map((plat) => (
            <button
              key={plat}
              onClick={() => setFilter(plat as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                filter === plat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white border rounded-2xl shadow-md p-5 flex flex-col justify-between transition"
          >
            {/* Agent Info */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-indigo-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{agent.name}</h3>
                  <p className="text-sm text-gray-500">{agent.email}</p>
                  <p className="text-xs text-gray-400">{agent.platform}</p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  agent.status === "active"
                    ? "bg-green-100 text-green-700"
                    : agent.status === "idle"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
            </div>

            {/* Stats */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <span>Tasks: {agent.tasksCompleted}</span>
              <span>Leads: {agent.leadsCaptured}</span>
            </div>

            {/* Assigned Automations */}
            <div className="mt-4 text-sm">
              <p className="font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Zap className="w-4 h-4 text-indigo-600" />
                Automations:
              </p>
              {agent.assignedAutomations.length ? (
                <ul className="list-disc pl-5 text-gray-600">
                  {agent.assignedAutomations.map((a) => (
                    <li key={a.id}>
                      {a.name}{" "}
                      {a.reminder && (
                        <span className="text-xs text-gray-500 ml-1 flex items-center gap-1">
                          <Bell className="w-3 h-3" />
                          Reminder: {new Date(a.reminder.datetime).toLocaleString()}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-xs">No automations assigned</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => toggleStatus(agent.id)}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                {agent.status === "active" ? (
                  <>
                    <PauseCircle className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" /> Resume
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedAgentId(agent.id);
                  setShowAutomationModal(true);
                }}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Assign Automation
              </button>

              <button
                onClick={() =>
                  alert(`Send message to ${agent.name} (simulate action)`)
                }
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                <MessageCircle className="w-4 h-4" /> Message
              </button>
            </div>

            {/* Mini Leaderboard */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>
                Efficiency:{" "}
                {Math.min(100, Math.round((agent.tasksCompleted / 20) * 100))}%
              </span>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Automation Modal */}
      {showAutomationModal && selectedAgentId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Assign Automation</h2>

            <input
              type="text"
              placeholder="Automation Name"
              value={newAutomationName}
              onChange={(e) => setNewAutomationName(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <select
              value={newAutomationType}
              onChange={(e) =>
                setNewAutomationType(e.target.value as Automation["type"])
              }
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="auto-reply">Auto-Reply</option>
              <option value="lead-scraper">Lead Scraper</option>
              <option value="bid-assistant">Bid Assistant</option>
              <option value="notification">Notification</option>
              <option value="reminder">Reminder</option>
            </select>

            <select
              value={newAutomationPlatform}
              onChange={(e) =>
                setNewAutomationPlatform(e.target.value as Automation["platform"])
              }
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="Fiverr">Fiverr</option>
              <option value="Upwork">Upwork</option>
              <option value="Freelancer">Freelancer</option>
            </select>

            <input
              type="text"
              placeholder="Triggers (comma separated)"
              value={newAutomationTriggers}
              onChange={(e) => setNewAutomationTriggers(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="text"
              placeholder="Actions (comma separated)"
              value={newAutomationActions}
              onChange={(e) => setNewAutomationActions(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <hr />

            <h3 className="font-medium text-gray-700">Add Reminder (Optional)</h3>
            <input
              type="text"
              placeholder="Reminder Title"
              value={newReminderTitle}
              onChange={(e) => setNewReminderTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="datetime-local"
              value={newReminderDateTime}
              onChange={(e) => setNewReminderDateTime(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newReminderAfterTask}
                onChange={(e) => setNewReminderAfterTask(e.target.checked)}
              />
              Trigger after task completion
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAutomationModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAutomation}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}