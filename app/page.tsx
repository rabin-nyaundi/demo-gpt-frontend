"use client";

import { useState } from "react";
import PromptResponse from "./components/PromptResponse";
import TextArea from "./components/TextArea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-auto min-h-screen w-full font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col mx-auto w-full h-screen overflow-y-auto lg:p-8">
        <div className="flex flex-col relative mx-auto w-full lg:w-3/4 2xl:w-1/2 rounded-md shadow-md h-screen overflow-y-auto">
          <PromptResponse messages={messages} isLoading={isLoading} />
          <div className="sticky bottom-0 right-0 left-0 pb-10 px-4 bg-white">
            <TextArea
              messages={messages}
              setMessages={setMessages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
