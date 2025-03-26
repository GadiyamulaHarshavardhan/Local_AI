"use client";

import React, { useState } from "react";
import CodeSnippet from "./CodeSnippet";
import { UserIcon, BotIcon } from "lucide-react";
import CopyButton from "./CopyButton";

interface MessageProps {
  role: string;
  content: string;
  isTyping?: boolean;
}

export default function Message({ role, content, isTyping }: MessageProps) {
  const [showCopyButton, setShowCopyButton] = useState(false);
  const isCodeSnippet = content.startsWith("```") && content.endsWith("```");
  const code = isCodeSnippet ? content.slice(3, -3).trim() : "";
  const language = isCodeSnippet ? code.split("\n")[0].trim() || "javascript" : "";

  return (
    <div className={`flex w-full ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div 
        className={`flex items-start gap-2 max-w-[70%] mb-4 ${role === "user" ? "flex-row-reverse" : "flex-row"}`}
        onMouseEnter={() => setShowCopyButton(true)}
        onMouseLeave={() => setShowCopyButton(false)}
      >
        {/* Icon - appears on opposite sides based on role */}
        <div className={`flex-shrink-0 ${role === "user" ? "ml-2" : "mr-2"}`}>
          {role === "user" ? (
            <UserIcon className="w-5 h-5 text-blue-400" />
          ) : (
            <BotIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {/* Message Bubble */}
        <div
          className={`relative p-3 rounded-lg ${
            role === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {/* Copy button - only shown on hover */}
          {showCopyButton && (
            <div className={`absolute ${role === "user" ? "left-2" : "right-2"} top-2`}>
              <CopyButton textToCopy={isCodeSnippet ? code : content} />
            </div>
          )}

          {isCodeSnippet ? (
            <CodeSnippet code={code.replace(language, "").trim()} language={language} />
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
          {isTyping && (
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-300">Typing</span>
              <div className="flex ml-1 space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}