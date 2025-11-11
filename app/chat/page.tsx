"use client";

import { useState, useRef, useEffect } from "react";

interface ChatPreview {
  id: number;
  platform: "Fiverr" | "Upwork" | "Freelancer";
  client: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "client";
  time: string;
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
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to latest message when chat updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]);

  const handleSend = () => {
    if (!input.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));

    setInput("");

    // Mock AI/client reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: "Got it! I’ll review and get back to you shortly.",
        sender: "client",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), reply],
      }));
    }, 1000);
  };

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

      {/* Chat Panel */}
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
                <h2 className="font-bold text-gray-800">{selectedChat.client}</h2>
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
              {(messages[selectedChat.id] || [
                {
                  id: 0,
                  text: "Hey there! 👋 Let’s start your project discussion.",
                  sender: "client",
                  time: "2:00 PM",
                },
              ]).map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] p-3 rounded-lg shadow-sm text-sm ${
                    msg.sender === "user"
                      ? "ml-auto bg-indigo-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block mt-1 text-[10px] ${
                      msg.sender === "user"
                        ? "text-indigo-200"
                        : "text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t rounded-br-xl flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}