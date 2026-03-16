"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import AIAssistant from "./AIAssistant"; // or AIChatPanel — whatever your chat component is named

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button – modern, cohesive with teal/indigo theme */}
      <motion.button
        initial={{ scale: 0.6, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.5 }}
        whileHover={{ scale: 1.14, y: -5 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-7 right-7 z-[9999]
          w-14 h-14 rounded-2xl
          bg-gradient-to-br from-indigo-600 via-indigo-500 to-teal-600
          text-white
          shadow-[0_12px_32px_-12px_rgba(79,70,229,0.45),0_4px_16px_-6px_rgba(0,0,0,0.18)]
          flex items-center justify-center
          ring-1 ring-indigo-300/30
          hover:ring-2 hover:ring-teal-300/50
          hover:shadow-[0_16px_40px_-12px_rgba(45,212,191,0.5)]
          transition-all duration-350 ease-out
          border border-indigo-400/20
        `}
        aria-label="Open AI Assistant"
      >
        {/* Icon micro-interaction */}
        <motion.div
          whileHover={{ scale: 1.18, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <MessageCircle className="h-6.5 w-6.5" strokeWidth={1.7} />
        </motion.div>

        {/* Online pulse – matches teal in chat */}
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-50"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-teal-500 border-2 border-white shadow-sm"></span>
        </span>

        <span className="sr-only">Open AI Assistant</span>
      </motion.button>

      {/* Slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`
                fixed inset-y-0 right-0 z-[9999]
                w-full max-w-md lg:max-w-lg
                bg-white shadow-2xl flex flex-col
                border-l border-slate-200
              `}
            >
              {/* Header – matches site theme, no purple */}
              <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-teal-50">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center shadow-md">
                    <Sparkles className="h-5 w-5 text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">AI Assistant</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Ask about my work</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-200/60 transition-colors"
                  aria-label="Close AI chat"
                >
                  <X className="h-6 w-6 text-slate-700" />
                </button>
              </div>

              {/* Chat content */}
              <AIAssistant />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}