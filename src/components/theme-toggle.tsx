"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.2, ease: [0.2, 0, 0, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
      style={{ touchAction: "none" }}
      className="fixed bottom-5 right-5 z-50 h-10 w-10 rounded-full bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)] flex items-center justify-center text-muted hover:text-fg transition-colors duration-150 cursor-grab active:cursor-grabbing"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
