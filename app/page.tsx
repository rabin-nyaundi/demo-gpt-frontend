"use client";

import { useState } from "react";
import PromptResponse from "./components/PromptResponse";
import TextArea from "./components/TextArea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  timestamp: string;
  messages: Message[];
};

type Conversations = Conversation[];

export default function Home() {
  const [conversations, setConversations] = useState<Conversations>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-auto border min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col relative mx-auto w-full lg:w-3/4 2xl:w-1/2 border border-red-600 h-screen overflow-y-auto">
        <PromptResponse messages={messages} isLoading={isLoading} />
        <div className="sticky bottom-0 right-0 left-0 pb-10 px-4 bg-white">
          <TextArea
            messages={messages}
            setMessages={setMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            conversations={conversations}
            setConversations={setConversations}
          />
        </div>
      </main>
    </div>
  );
}
