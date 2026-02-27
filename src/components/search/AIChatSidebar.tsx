"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageResponse } from "@/components/ai-elements/message";
import {
  X,
  ArrowUp,
  Copy,
  Check,
  RefreshCw,
  Square,
  Sparkles,
  Loader2,
  Command,
  Zap,
  BookOpen,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { useSearch } from "./SearchProvider";

const SUGGESTED_QUESTIONS = [
  { icon: Zap, text: "What is quadratic funding?" },
  { icon: BookOpen, text: "Show me active campaigns" },
  { icon: HelpCircle, text: "How does retroactive funding work?" },
  { icon: BarChart3, text: "What apps support direct grants?" },
];

export default function AIChatSidebar() {
  const { sidebarOpen, setSidebarOpen, dismissSidebar, initialQuery } = useSearch();
  const {
    messages,
    status,
    error,
    sendMessage,
    regenerate,
    stop,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSentInitial = useRef(false);

  // Manage open/close with animation
  useEffect(() => {
    if (sidebarOpen) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    } else if (visible) {
      setClosing(true);
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cmd+I to toggle sidebar
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "i") {
        e.preventDefault();
        if (sidebarOpen) dismissSidebar();
        else setSidebarOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  // Auto-send message when opened with a query from the search modal
  useEffect(() => {
    if (sidebarOpen && initialQuery && !hasSentInitial.current) {
      hasSentInitial.current = true;
      sendMessage({ text: `Can you tell me about ${initialQuery}?` });
    }
  }, [sidebarOpen, initialQuery, sendMessage]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const router = useRouter();

  // Intercept link clicks inside AI responses — navigate internally for local URLs
  const handleMessageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // Relative link
      if (href.startsWith("/")) {
        e.preventDefault();
        setSidebarOpen(false);
        router.push(href);
        return;
      }

      // Absolute link to our own domain
      try {
        const parsed = new URL(href);
        if (parsed.hostname === window.location.hostname) {
          e.preventDefault();
          setSidebarOpen(false);
          router.push(parsed.pathname);
        }
      } catch {}
    },
    [router, setSidebarOpen],
  );

  function handleCopy(msgId: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (!visible) return null;

  const animClass = closing
    ? "animate-[sidebar-out-bottom_200ms_ease-in_forwards] sm:animate-[sidebar-out-right_200ms_ease-in_forwards]"
    : "animate-[sidebar-in-bottom_250ms_ease-out] sm:animate-[sidebar-in-right_250ms_ease-out]";

  return (
    <>
    {/* Backdrop overlay */}
    <div
      className={`fixed inset-0 z-101 bg-black/85 backdrop-blur-md ${closing ? "animate-[dropdown-out_100ms_ease-in_forwards]" : "animate-[dropdown-in_150ms_ease-out]"}`}
      onClick={() => dismissSidebar()}
    />
    <div
      className={`fixed z-102 flex flex-col border-gray-700 bg-gray-900 shadow-2xl bottom-0 left-0 right-0 h-[90dvh] rounded-t-2xl border-t sm:top-0 sm:left-auto sm:right-0 sm:h-full sm:w-full sm:max-w-sm sm:rounded-t-none sm:border-l sm:border-t-0 ${animClass}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-iris-500" />
          <span className="text-sm font-medium text-gray-25">AI Assistant</span>
        </div>
        <button
          type="button"
          onClick={() => dismissSidebar()}
          className="rounded-lg p-1 text-gray-400 hover:text-gray-25 cursor-pointer"
          style={{ transition: "color 150ms ease" }}
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" onClick={handleMessageClick}>
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col justify-end h-full px-1">
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map(({ icon: Icon, text }) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => sendMessage({ text })}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-25 cursor-pointer text-left"
                  style={{ transition: "all 150ms ease" }}
                >
                  <Icon className="size-4 shrink-0 text-gray-500" />
                  {text}
                </button>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-gray-600">
              Tip: Open and close chat with
              <kbd className="inline-flex items-center gap-0.5 rounded border border-gray-700 bg-gray-800 size-5 justify-center text-xs font-mono text-gray-400">
                {typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent) ? (
                  <Command className="size-2.5" />
                ) : (
                  <span>Ctrl</span>
                )}
              </kbd>
              <kbd className="inline-flex items-center rounded border border-gray-700 bg-gray-800 size-5 justify-center text-xs font-mono text-gray-400">
                I
              </kbd>
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            Something went wrong. Please try again.
          </div>
        )}

        {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-700 text-gray-25"
                    : "bg-gray-950 text-gray-200 border border-gray-700"
                }`}
              >
                {msg.role === "user" ? (
                  <span className="whitespace-pre-wrap">
                    {msg.parts
                      .filter((p) => p.type === "text")
                      .map((p, i) => (
                        <span key={i}>{p.type === "text" ? p.text : null}</span>
                      ))}
                  </span>
                ) : (
                  <>
                    {msg.parts.some(
                      (p) => p.type === "text" && p.text,
                    ) ? (
                      <MessageResponse
                        className="prose-chat text-sm leading-relaxed text-gray-200 [&_a]:text-teal-400 [&_a]:underline [&_a:hover]:text-teal-300 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-0.5 [&_strong]:font-semibold [&_strong]:text-gray-25 [&_code]:rounded [&_code]:bg-gray-700 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs"
                        linkSafety={{ enabled: false }}
                      >
                        {msg.parts
                          .filter((p) => p.type === "text")
                          .map((p) => (p.type === "text" ? p.text : ""))
                          .join("")}
                      </MessageResponse>
                    ) : null}
                  </>
                )}

                {msg.role === "assistant" &&
                  msg.parts.some((p) => p.type === "text" && p.text) &&
                  !isLoading && (
                    <div className="mt-2 flex items-center gap-1.5 border-t border-gray-700 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            msg.id,
                            msg.parts
                              .filter((p) => p.type === "text")
                              .map((p) =>
                                p.type === "text" ? p.text : "",
                              )
                              .join(""),
                          )
                        }
                        className="rounded p-1 text-gray-500 hover:text-gray-300 cursor-pointer"
                        style={{ transition: "color 150ms ease" }}
                        title="Copy"
                      >
                        {copiedId === msg.id ? (
                          <Check className="size-3.5 text-teal-500" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => regenerate()}
                        disabled={
                          !(
                            status === "ready" ||
                            status === "error"
                          )
                        }
                        className="rounded p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30 cursor-pointer"
                        style={{ transition: "color 150ms ease" }}
                        title="Regenerate"
                      >
                        <RefreshCw className="size-3.5" />
                      </button>
                    </div>
                  )}
              </div>
            </div>
        ))}
        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed bg-gray-950 text-gray-200 border border-gray-700">
              <span className="inline-flex items-center gap-1.5 text-gray-500">
                <Loader2 className="size-3.5 animate-spin" />
                Thinking...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2 rounded-xl border border-gray-600 bg-gray-900 px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={error != null}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-base sm:text-sm text-gray-25 placeholder:text-gray-500 outline-none border-none shadow-none focus:shadow-none p-0"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-lg bg-gray-600 p-1.5 text-gray-25 cursor-pointer"
              style={{ transition: "opacity 150ms ease" }}
              title="Stop"
            >
              <Square className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-lg bg-teal-500 p-1.5 text-gray-900 disabled:opacity-30 cursor-pointer"
              style={{ transition: "opacity 150ms ease" }}
            >
              <ArrowUp className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
