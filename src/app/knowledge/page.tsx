"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { mockChatMessages } from "@/data/mockData";
import { ChatMessage } from "@/types";

export default function KnowledgePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedPrompts = [
    "What are the termination notice requirements?",
    "Show me contracts missing indemnification",
    "Summarize the data processing limits in Meridian"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const newBotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on the contracts in your workspace, I've analyzed your query. While this is a simulated response, in a production environment, I would connect to the backend AI to retrieve specific clauses and answer accurately based on the verified documents.",
        citations: ["[Simulated Citation]"]
      };
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col pb-6">
      <div className="flex flex-col gap-1 mb-6 shrink-0">
        <h1 className="text-2xl font-semibold text-slate-900">Legal Knowledge Assistant</h1>
        <p className="text-slate-500 text-sm">Ask questions about your contracts. Answers include citations to specific sections.</p>
      </div>

      <div className="flex-1 bg-white rounded-t-xl border-x border-t border-slate-200 shadow-sm overflow-y-auto p-6 space-y-6 flex flex-col">
        {/* Intro Message */}
        <div className="flex gap-4 max-w-3xl">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200">
            <Bot className="w-4 h-4 text-indigo-700" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
               ContractIQ Assistant
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-5 py-3.5 text-slate-700 text-sm leading-relaxed shadow-sm">
              Hello! I&apos;m your Legal Knowledge Assistant. I can answer questions about your contracts, explain legal concepts, and help you find relevant clauses. What would you like to know?
            </div>
          </div>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1 border border-indigo-200">
                <Bot className="w-4 h-4 text-indigo-700" />
              </div>
            )}
            <div className="space-y-1">
              {msg.role === 'assistant' && (
                <p className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                   ContractIQ Assistant
                </p>
              )}
              <div className={`${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none px-5 py-3.5 shadow-sm' 
                  : 'bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm'
                } text-sm leading-relaxed`}
              >
                <p>{msg.content}</p>
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                    {msg.citations.map((cite, i) => (
                      <span key={i} className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                        {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 max-w-3xl">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200">
              <Bot className="w-4 h-4 text-indigo-700" />
            </div>
            <div className="space-y-1">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-5 py-3.5 text-slate-700 text-sm shadow-sm flex items-center gap-1.5 h-12">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-slate-50 border-x border-b border-slate-200 rounded-b-xl p-4 shadow-sm">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {suggestedPrompts.map((prompt, i) => (
            <button 
              key={i}
              onClick={() => handleSend(prompt)}
              className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-medium hover:border-indigo-300 hover:text-indigo-700 transition-colors shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask about your contracts..." 
            className="w-full pl-4 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 p-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 rounded-lg transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

