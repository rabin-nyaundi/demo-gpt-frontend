"use client";

/*
 * Textarea component with api call to the backend Fast API
 * We can remove the API intergration from thie component to the page.tsx
 * to make it reusable. But for the purpose of this test, I'll leave it here,
 * since it is only called once
 *
 * Currently no authentication that is why I'm making the api call on the client side.
 */

import React, { useEffect, useState, useRef } from "react";
import { getBackendUrl } from "../lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextArea = ({
  messages,
  setMessages,
  isLoading,
  setIsLoading,
}: Props) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${getBackendUrl()}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error: Could not get response" },
      ]);
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading}
        className="flex-1 resize-none rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm right-2 bottom-0 absolute disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
      <div ref={chatEndRef} />
    </div>
  );
};

export default TextArea;
