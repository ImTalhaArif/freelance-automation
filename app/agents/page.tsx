"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Zap, PauseCircle, PlayCircle, MessageCircle, Trophy } from "lucide-react";

type Agent = {
  id: number;
  name: string;
  email: string;
  platform: "Fiverr" | "Upwork" | "Freelancer";
  status: "active" | "idle" | "offline";
  tasksCompleted: number;
  leadsCaptured: number;
  assignedAutomations: string[];
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
      assignedAutomations: ["Fiverr Auto-Reply Bot"],
    },
    {
      id: 2,
      name: "Arif Khan",
      email: "arif@example.com",
      platform: "Upwork",
      status: "idle",
      tasksCompleted: 8,
      leadsCaptured: 3,
      assignedAutomations: ["Upwork Bid Assistant"],
    },
    {
      id: 3,
      name: "Zara Ali",
      email: "zara@example.com",
      platform: "Freelancer",
      status: "offline",
      tasksCompleted: 15,
      leadsCaptured: 7,
      assignedAutomations: [],
    },
  ]);

  const [filter, setFilter] = useState<"All" | "Fiverr" | "Upwork" | "Freelancer">("All");

  const filteredAgents = agents.filter(
    (a) => filter === "All" || a.platform === filter
  );

  const toggleStatus = (id: number) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus =
            a.status === "active" ? "idle" : a.status === "idle" ? "offline" : "active";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const assignAutomation = (id: number) => {
    const automationName = prompt("Enter automation name to assign:");
    if (!automationName) return;
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, assignedAutomations: [...a.assignedAutomations, automationName] }
          : a
      )
    );
  };

  const sendMessage = (id: number) => {
    const msg = prompt("Enter message to send to agent:");
    if (!msg) return alert(`Message sent to agent #${id}: "${msg}"`);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
          <Zap className="text-indigo-600 w-8 h-8" />
          Agents Dashboard
        </h1>

        {/* Platform Filters */}
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
              <p className="font-medium text-gray-700 mb-1">Automations:</p>
              {agent.assignedAutomations.length ? (
                <ul className="list-disc pl-5 text-gray-600">
                  {agent.assignedAutomations.map((a, i) => (
                    <li key={i}>{a}</li>
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
                onClick={() => assignAutomation(agent.id)}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Assign Automation
              </button>
              <button
                onClick={() => sendMessage(agent.id)}
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
    </div>
  );
}