"use client";

import React, { useEffect, useState, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const TextArea = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full relative h-auto flex items-end gap-2">
      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm right-2 bottom-2 absolute"
      >
        Send
      </button>
    </div>
  );
};

export default TextArea;
