"use client";

import { useState } from "react";

interface ChatPreview {
  id: number;
  platform: "Fiverr" | "Upwork" | "Freelancer";
  client: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

const sampleChats: ChatPreview[] = [
  {
    id: 1,
    platform: "Fiverr",
    client: "John D.",
    lastMessage: "Can we finalize the chatbot logic today?",
    time: "2:15 PM",
    unread: true,
  },
  {
    id: 2,
    platform: "Upwork",
    client: "Maria S.",
    lastMessage: "I reviewed your milestone submission.",
    time: "1:40 PM",
    unread: false,
  },
  {
    id: 3,
    platform: "Freelancer",
    client: "Mark R.",
    lastMessage: "Can you share the final report link?",
    time: "12:22 PM",
    unread: true,
  },
  {
    id: 4,
    platform: "Fiverr",
    client: "Alex K.",
    lastMessage: "Thank you, looks perfect now!",
    time: "Yesterday",
    unread: false,
  },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] bg-gray-50 rounded-xl shadow-inner border">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 border-r bg-white overflow-y-auto rounded-l-xl">
        <div className="px-4 py-3 border-b sticky top-0 bg-white z-10">
          <h1 className="text-xl font-semibold text-indigo-600">Chat Inbox</h1>
          <p className="text-sm text-gray-500">All Platforms</p>
        </div>

        <div className="divide-y">
          {sampleChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center justify-between p-4 cursor-pointer transition ${
                selectedChat?.id === chat.id
                  ? "bg-indigo-50 border-l-4 border-indigo-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <div>
                <h2 className="font-semibold text-gray-900">{chat.client}</h2>
                <p className="text-sm text-gray-600 truncate w-48">
                  {chat.lastMessage}
                </p>
                <span
                  className={`inline-block mt-1 text-xs font-medium ${
                    chat.platform === "Fiverr"
                      ? "text-green-600"
                      : chat.platform === "Upwork"
                      ? "text-blue-600"
                      : "text-orange-500"
                  }`}
                >
                  {chat.platform}
                </span>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="text-xs text-gray-500">{chat.time}</span>
                {chat.unread && (
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-100 rounded-r-xl">
        {!selectedChat ? (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            <p>Select a chat to view messages</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b rounded-tr-xl">
              <div>
                <h2 className="font-bold text-gray-800">
                  {selectedChat.client}
                </h2>
                <p className="text-sm text-gray-500">{selectedChat.platform}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  selectedChat.platform === "Fiverr"
                    ? "bg-green-100 text-green-700"
                    : selectedChat.platform === "Upwork"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {selectedChat.platform}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              <div className="max-w-[70%] bg-white shadow-sm p-3 rounded-lg text-gray-800">
                Hello {selectedChat.client.split(" ")[0]}, thank you for reaching
                out! How can I assist you with your project today?
              </div>
              <div className="max-w-[70%] bg-indigo-600 text-white ml-auto shadow-sm p-3 rounded-lg">
                Sure! Let’s go over the deliverables once more before finalizing.
              </div>
              <div className="max-w-[70%] bg-white shadow-sm p-3 rounded-lg text-gray-800">
                Sounds perfect! I’ll send the final version shortly.
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t rounded-br-xl flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}