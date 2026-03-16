"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  User,
  Bot,
  Code,
  X,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "ai";
  text: string;
};

type Project = {
  title: string;
  short?: string;
  problem?: string;
  solution?: string;
  technologies?: string[];
};

export default function AIChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMsg: Message = { role: "user", text: message.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      let reply = data.reply || "No response received.";

      // Clean markdown artifacts
      reply = reply
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^\s*[-•*]\s*/gm, "• ");

      setMessages((prev) => [...prev, { role: "ai", text: reply.trim() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry — something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const parseProjectsFromText = (text: string): Project[] => {
    const projects: Project[] = [];
    const lines = text.split("\n").map((l) => l.trim());
    let current: Partial<Project> = {};
    let mode: "title" | "problem" | "solution" | "tech" | null = null;

    for (const line of lines) {
      if (!line) continue;

      if (line.match(/^\d+\.\s*(?:\*?\*?)(.+?)(?:\*?\*?)$/)) {
        if (current.title) projects.push(current as Project);
        current = {};
        let title = line.replace(/^\d+\.\s*(?:\*?\*?)/, "").replace(/(?:\*?\*?)$/, "").trim();
        current.title = title;

        const idx = lines.indexOf(line);
        if (idx + 1 < lines.length && !lines[idx + 1].startsWith("*")) {
          current.short = lines[idx + 1].replace(/^\* /, "").trim();
        }
        mode = "title";
        continue;
      }

      if (line.startsWith("* Problem:")) {
        mode = "problem";
        current.problem = line.replace("* Problem:", "").trim();
        continue;
      }
      if (line.startsWith("* Solution:")) {
        mode = "solution";
        current.solution = line.replace("* Solution:", "").trim();
        continue;
      }
      if (line.startsWith("* Technologies:")) {
        mode = "tech";
        const tech = line.replace("* Technologies:", "").trim();
        current.technologies = tech.split(/[,•]/).map((t) => t.trim()).filter(Boolean);
        continue;
      }

      if (mode === "problem" && !line.startsWith("*")) current.problem += " " + line;
      if (mode === "solution" && !line.startsWith("*")) current.solution += " " + line;
    }

    if (current.title) projects.push(current as Project);
    return projects;
  };

  const suggestedQuestions = [
    "Arun's best projects?",
    "Tech stack & tools?",
    "What's RunIt about?",
    "Work experience?",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-gradient-to-b from-slate-50/80 to-white scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {messages.length === 0 && !loading ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="mb-6 rounded-full bg-teal-50 p-5 shadow-sm">
              <Bot className="h-12 w-12 text-teal-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Hey there!</h3>
            <p className="mt-2 text-slate-600 max-w-xs text-sm leading-relaxed">
              Ask me anything about Arun — projects, tech stack, experience...
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isLastAI = msg.role === "ai" && idx === messages.length - 1;
            const projects = isLastAI ? parseProjectsFromText(msg.text) : [];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex items-start gap-4", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "ai" && (
                  <div className="mt-0.5 shrink-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm">
                      <Bot className="h-5 w-5 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[82%] px-5 py-4 rounded-3xl text-[15.2px] leading-relaxed shadow-sm",
                    msg.role === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : "bg-white border border-slate-200 rounded-bl-none"
                  )}
                >
                  <div className="whitespace-pre-wrap break-words">{msg.text}</div>

                  {projects.length > 0 && (
                    <div className="mt-6 space-y-4 pt-4 border-t border-slate-200/60">
                      {projects.slice(0, 3).map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedProject(p)}
                          className="w-full group text-left p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-teal-700 group-hover:text-teal-600 transition-colors">
                              {p.title}
                            </span>
                            <ExternalLink className="h-4.5 w-4.5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                          </div>
                          {p.short && (
                            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                              {p.short}
                            </p>
                          )}
                        </button>
                      ))}
                      {projects.length > 3 && (
                        <p className="text-xs text-slate-500 text-center mt-3">
                          +{projects.length - 3} more projects • ask for more
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="mt-0.5 shrink-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-2xl bg-slate-800 flex items-center justify-center shadow-sm">
                      <User className="h-5 w-5 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}

        {/* Modern centered thinking loader with animated dots */}
        {loading && (
          <div className="flex items-center justify-start pl-11 py-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm mr-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
              Thinking
              <span className="flex gap-0.5 text-teal-600">
                <motion.span
                  animate={{ y: [-2, 0, -2] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ y: [-2, 0, -2] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2, ease: "easeInOut" }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ y: [-2, 0, -2] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                >
                  .
                </motion.span>
              </span>
            </div>
          </div>
        )}

        {/* Invisible spacer at bottom to prevent cutoff */}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t bg-white px-5 py-5">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2.5 mb-5 justify-center">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setMessage(q);
                  setTimeout(sendMessage, 80);
                }}
                className="text-sm px-4 py-2 rounded-full bg-slate-100 border border-slate-200 hover:bg-teal-50 hover:border-teal-300 transition-all active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything about Arun..."
            className="flex-1 px-5 py-3.5 rounded-3xl border bg-slate-50 focus:border-teal-400 focus:ring-2 focus:ring-teal-200/30 outline-none text-base transition-all disabled:opacity-50"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className={cn(
              "px-6 rounded-3xl text-white min-w-[58px] flex items-center justify-center shadow-md transition-all duration-300",
              loading || !message.trim()
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:brightness-110 active:scale-95"
            )}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ scale: 0.92, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto border border-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                  <h3 className="font-bold text-xl flex items-center gap-3 text-slate-900">
                    <Code className="h-5 w-5 text-teal-600" />
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                <div className="p-7 space-y-7 text-slate-700 text-[15px] leading-relaxed">
                  {selectedProject.short && (
                    <p className="text-slate-600 border-b pb-5">{selectedProject.short}</p>
                  )}
                  {selectedProject.problem && (
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-2">Problem</h4>
                      <p>{selectedProject.problem}</p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-2">Solution</h4>
                      <p>{selectedProject.solution}</p>
                    </div>
                  )}
                  {selectedProject.technologies?.length ? (
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-4 py-1.5 bg-teal-50 text-teal-700 text-sm rounded-full font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}