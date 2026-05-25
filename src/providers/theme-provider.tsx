"use client";

import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "roblox-tracker-theme";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("${THEME_KEY}")||"dark";var r=t==="system"?window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light":t;if(r==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    const t = stored || "dark";
    setThemeState(t);
    applyTheme(t);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
