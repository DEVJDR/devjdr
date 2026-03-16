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
import Link from "next/link";

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
  link?: string;
};

export default function AIChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentAiMessage, loading]);

  useEffect(() => {
    if (currentAiMessage) {
      const timer = setTimeout(() => scrollToBottom("instant"), 30);
      return () => clearTimeout(timer);
    }
  }, [currentAiMessage]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMsg: Message = { role: "user", text: message.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);
    setCurrentAiMessage("");

    try {
      const res = await fetch("/api/contact/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!res.ok || !res.body) throw new Error("Failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        let clean = accumulated
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/\*(.*?)\*/g, "$1")
          .replace(/^\s*[-•*]\s*/gm, "• ");

        setCurrentAiMessage(clean);
        scrollToBottom("instant");
      }

      let final = accumulated
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^\s*[-•*]\s*/gm, "• ")
        .trim();

      setMessages((prev) => [...prev, { role: "ai", text: final }]);
      setCurrentAiMessage("");
      scrollToBottom();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry — something went wrong. Please try again." },
      ]);
      scrollToBottom();
    } finally {
      setLoading(false);
    }
  }

  const parseProjectsFromText = (text: string): Project[] => {
    const projects: Project[] = [];
    const projectLinks: Record<string, string> = {
      "RunIt": "https://github.com/DEVJDR/reactcodeditor",
      "IMDB Clone": "https://github.com/DEVJDR/IMDb-CLONe",
      "NeuroEase": "https://github.com/DEVJDR/NeuroEaseApp",
      "EasyComply": "https://github.com/DEVJDR/EasyComply",
      "KPLR ONDC": "https://kplr.in/",
      "3D Portfolio": "https://github.com/DEVJDR/threeDportfolio",
    };

    const lines = text.split("\n").map(l => l.trim());
    let current: Partial<Project> = {};
    let mode: "title" | "problem" | "solution" | "tech" | null = null;

    for (const line of lines) {
      if (!line) continue;

      if (line.match(/^\d+\.\s*(?:\*?\*?)(.+?)(?:\*?\*?)$/)) {
        if (current.title) {
          current.link = projectLinks[current.title] || undefined;
          projects.push(current as Project);
        }
        current = {};
        current.title = line.replace(/^\d+\.\s*(?:\*?\*?)/, "").replace(/(?:\*?\*?)$/, "").trim();
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
        current.technologies = line.replace("* Technologies:", "").trim().split(/[,•]/).map(t => t.trim()).filter(Boolean);
        continue;
      }

      if (mode === "problem" && !line.startsWith("*")) current.problem += " " + line;
      if (mode === "solution" && !line.startsWith("*")) current.solution += " " + line;
    }

    if (current.title) {
      current.link = projectLinks[current.title] || undefined;
      projects.push(current as Project);
    }

    return projects;
  };

  const suggestedQuestions = [
    "Arun's best projects?",
    "Tech stack & tools?",
    "What's RunIt about?",
    "Work experience?",
  ];

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 bg-gradient-to-b from-background/80 to-background scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {messages.length === 0 && !loading && !currentAiMessage ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="mb-6 rounded-full bg-primary/10 p-5 shadow-sm">
              <Bot className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Hey there!</h3>
            <p className="mt-2 text-muted-foreground max-w-xs text-sm leading-relaxed">
              Ask me anything about Arun — projects, tech stack, experience...
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => {
              const isLastAI = msg.role === "ai" && idx === messages.length - 1 && !currentAiMessage;
              const projects = isLastAI ? parseProjectsFromText(msg.text) : [];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex items-start gap-3 sm:gap-4", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "ai" && (
                    <div className="mt-1 shrink-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                        <Bot className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary" strokeWidth={1.8} />
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex-1 max-w-[85%] sm:max-w-[82%] px-4 sm:px-5 py-3 sm:py-4 rounded-2xl sm:rounded-3xl text-[14.5px] sm:text-[15.2px] leading-relaxed shadow-sm border",
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-br-none border-secondary"
                        : "bg-card text-card-foreground rounded-bl-none border-border"
                    )}
                  >
                    <div className="whitespace-pre-wrap break-words leading-relaxed">{msg.text}</div>

                    {projects.length > 0 && (
                      <div className="mt-5 sm:mt-6 space-y-4 pt-4 border-t border-border/60">
                        {projects.slice(0, 3).map((p, i) => (
                          <div
                            key={i}
                            className="w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-primary text-base">
                                {p.title}
                              </span>
                            </div>

                            {p.short && (
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                                {p.short}
                              </p>
                            )}

                            {p.link ? (
                              <Link
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                              >
                                View Project <ExternalLink className="h-4 w-4" />
                              </Link>
                            ) : (
                              <button
                                onClick={() => setSelectedProject(p)}
                                className="text-sm mt-2 text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
                              >
                                View details <ExternalLink className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        {projects.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center mt-3">
                            +{projects.length - 3} more • ask for more
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="mt-1 shrink-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-secondary flex items-center justify-center shadow-sm border border-secondary">
                        <User className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-secondary-foreground" strokeWidth={1.8} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {currentAiMessage && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 sm:gap-4 justify-start"
              >
                <div className="mt-1 shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                    <Bot className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary" strokeWidth={1.8} />
                  </div>
                </div>

                <div className="max-w-[85%] sm:max-w-[82%] px-4 sm:px-5 py-3 sm:py-4 rounded-2xl sm:rounded-3xl text-[14.5px] sm:text-[15.2px] leading-relaxed shadow-sm bg-card text-card-foreground rounded-bl-none border border-border">
                  <div className="whitespace-pre-wrap break-words leading-relaxed">
                    {currentAiMessage}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {loading && !currentAiMessage && (
          <div className="flex items-center justify-start pl-10 sm:pl-11 py-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm mr-3 border border-primary/20">
              <Bot className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              Thinking
              <span className="flex gap-0.5 text-primary">
                <motion.span animate={{ y: [-3, 0, -3] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                  .
                </motion.span>
                <motion.span animate={{ y: [-3, 0, -3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}>
                  .
                </motion.span>
                <motion.span animate={{ y: [-3, 0, -3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}>
                  .
                </motion.span>
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="min-h-[120px] sm:min-h-[140px]" />
      </div>

      {/* Fixed input area at bottom */}
      <div className="shrink-0 border-t bg-background px-4 sm:px-5 py-4 sm:py-5 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.4)]">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-4 sm:mb-5 justify-center">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setMessage(q);
                  setTimeout(sendMessage, 80);
                }}
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary border border-border hover:bg-primary/10 hover:border-primary/30 transition-all active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 sm:gap-3">
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
            className="flex-1 px-4 sm:px-5 py-3 rounded-3xl border bg-background focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none text-sm sm:text-base transition-all disabled:opacity-50"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className={cn(
              "px-4 sm:px-6 rounded-3xl text-primary-foreground min-w-[52px] sm:min-w-[58px] flex items-center justify-center shadow-md transition-all duration-300",
              loading || !message.trim()
                ? "bg-muted cursor-not-allowed text-muted-foreground"
                : "bg-primary hover:brightness-110 active:scale-95"
            )}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Project Modal */}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
              <div
                className="bg-card rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-card border-b px-6 py-4 flex items-center justify-between z-10">
                  <h3 className="font-bold text-xl flex items-center gap-3 text-foreground">
                    <Code className="h-5 w-5 text-primary" />
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="p-6 sm:p-7 space-y-6 sm:space-y-7 text-muted-foreground text-[14.5px] sm:text-[15px] leading-relaxed">
                  {selectedProject.short && (
                    <p className="border-b pb-5">{selectedProject.short}</p>
                  )}
                  {selectedProject.problem && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Problem</h4>
                      <p>{selectedProject.problem}</p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Solution</h4>
                      <p>{selectedProject.solution}</p>
                    </div>
                  )}
                  {selectedProject.technologies?.length ? (
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-3.5 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {selectedProject.link && (
                    <div className="pt-4">
                      <Link
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        Open Project <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}