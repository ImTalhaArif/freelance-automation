"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Zap,
  PlayCircle,
  PauseCircle,
  XCircle,
} from "lucide-react";

export default function AutomationPage() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Fiverr Auto-Reply Bot",
      platform: "Fiverr",
      description:
        "Automatically replies to new Fiverr messages with custom templates.",
      status: true,
      lastRun: "2 hours ago",
    },
    {
      id: 2,
      name: "Freelancer Lead Scraper",
      platform: "Freelancer",
      description:
        "Scrapes new projects and filters by AI or web development keywords.",
      status: true,
      lastRun: "10 minutes ago",
    },
    {
      id: 3,
      name: "Upwork Bid Assistant",
      platform: "Upwork",
      description:
        "Drafts and submits proposals with tailored intros using AI.",
      status: false,
      lastRun: "Yesterday",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    platform: "Fiverr",
    description: "",
    status: true,
  });

  const toggleAutomation = (id: number) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: !a.status } : a))
    );
  };

  const handleCreateAutomation = () => {
    const nextId = automations.length + 1;
    setAutomations([
      ...automations,
      { id: nextId, lastRun: "Never", ...newAutomation },
    ]);
    setNewAutomation({
      name: "",
      platform: "Fiverr",
      description: "",
      status: true,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
          <Zap className="text-indigo-600 w-8 h-8" />
          Automation Center
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="w-4 h-4" />
          New Automation
        </Button>
      </div>

      {/* Active Automations */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Active Automations
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((a) => (
            <motion.div
              key={a.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white border rounded-2xl shadow-sm p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {a.name}
                    </h3>
                    <p className="text-sm text-gray-500">{a.platform}</p>
                  </div>
                  <Switch
                    checked={a.status}
                    onChange={() => toggleAutomation(a.id)}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {a.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
                <span>Last run: {a.lastRun}</span>
                {a.status ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <PlayCircle className="w-4 h-4" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400">
                    <PauseCircle className="w-4 h-4" /> Paused
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trigger Setup Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Trigger-Based Workflows
        </h2>
        <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">
          <p className="text-gray-600">
            Create smart automations that connect your freelance platforms with
            custom triggers and actions. For example:
          </p>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              When a <strong>new Fiverr message</strong> arrives →{" "}
              <strong>send auto-reply</strong> using predefined template.
            </li>
            <li>
              When a <strong>Freelancer project</strong> matches your keywords →
              <strong> save lead</strong> to your database.
            </li>
            <li>
              When a <strong>proposal is accepted</strong> on Upwork →{" "}
              <strong>send notification</strong> on Telegram or email.
            </li>
          </ul>

          <div className="pt-4">
            <Button onClick={() => setIsModalOpen(true)}>
              + Add New Workflow
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- Modal ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Create New Automation
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={newAutomation.name}
                  onChange={(e) =>
                    setNewAutomation({ ...newAutomation, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={newAutomation.platform}
                  onChange={(e) =>
                    setNewAutomation({
                      ...newAutomation,
                      platform: e.target.value,
                    })
                  }
                >
                  <option>Fiverr</option>
                  <option>Upwork</option>
                  <option>Freelancer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={newAutomation.description}
                  onChange={(e) =>
                    setNewAutomation({
                      ...newAutomation,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={newAutomation.status}
                  onChange={() =>
                    setNewAutomation({
                      ...newAutomation,
                      status: !newAutomation.status,
                    })
                  }
                />
                <span className="text-sm text-gray-700">Active</span>
              </div>

              <Button onClick={handleCreateAutomation}>Create Automation</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* -----------------------------
   REUSABLE COMPONENTS BELOW
----------------------------- */

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-6 flex items-center rounded-full transition-colors duration-300 ${
        checked ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      ></span>
    </button>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition"
    >
      {children}
    </button>
  );
}