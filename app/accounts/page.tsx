"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Zap, User } from "lucide-react";

export default function AccountsPage() {
  const [accounts] = useState([
    {
      id: 1,
      platform: "Fiverr",
      name: "Talha Arif",
      email: "talhawritescode@gmail.com",
      connected: true,
    },
    {
      id: 2,
      platform: "Upwork",
      name: "Talha Arif",
      email: "talhawritescode@gmail.com",
      connected: true,
    },
    {
      id: 3,
      platform: "Freelancer",
      name: "Talha Arif",
      email: "talhawritescode@gmail.com",
      connected: false,
    },
  ]);

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
          <Zap className="text-indigo-600 w-8 h-8" />
          Connected Accounts
        </h1>
      </div>

      {/* Accounts Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <motion.div
            key={acc.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-2xl shadow-md p-6 flex flex-col justify-between transition"
          >
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {acc.platform}
                </h2>
                <p className="text-gray-500 text-sm">{acc.name}</p>
                <p className="text-gray-400 text-xs">{acc.email}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              {acc.connected ? (
                <span className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5" /> Connected
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-500 font-medium">
                  <XCircle className="w-5 h-5" /> Not Connected
                </span>
              )}
              <button
                className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                  acc.connected
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {acc.connected ? "Manage" : "Connect"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
