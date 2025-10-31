"use client"

/**
 * createContext: creates a global context to share data (like theme) across components.
 * useContext: lets components read that shared context.
 * useEffect: runs side effects when data changes.
 * useState: holds and updates component state.
 */

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
};

const lightColors: ThemeColors = {
  background: "#FAFAFA",
  foreground: "#0F172A",
  card: "#ffffff",
  cardForeground: "#0F172A",
  primary: "#3B82F6",
  primaryForeground: "#ffffff",
  secondary: "#E0F2FE",
  secondaryForeground: "#0C4A6E",
  muted: "#F1F5F9",
  mutedForeground: "#64748B",
  accent: "#60A5FA",
  accentForeground: "#ffffff",
  border: "rgba(59, 130, 246, 0.15)",
  ring: "#3B82F6",
};

const darkColors: ThemeColors = {
  background: "#0F172A",
  foreground: "#F1F5F9",
  card: "#1E293B",
  cardForeground: "#F1F5F9",
  primary: "#3B82F6",
  primaryForeground: "#ffffff",
  secondary: "#1E3A5F",
  secondaryForeground: "#BFDBFE",
  muted: "#1E293B",
  mutedForeground: "#94A3B8",
  accent: "#2563EB",
  accentForeground: "#ffffff",
  border: "rgba(59, 130, 246, 0.15)",
  ring: "#3B82F6",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const stored = localStorage.getItem("echoboard-theme") as Theme;
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme === "dark" ? darkColors : lightColors;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    // CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Gradients and shadows
    if (theme === "dark") {
      root.style.setProperty("--theme-gradient-from", "#0C4A6E");
      root.style.setProperty("--theme-gradient-to", "#1E3A8A");
      root.style.setProperty("--theme-gradient-hero", "linear-gradient(to bottom right, rgba(12, 74, 110, 0.3), rgba(30, 58, 138, 0.2), var(--background))");
      root.style.setProperty("--theme-gradient-feature", "linear-gradient(to bottom, var(--background), rgba(12, 74, 110, 0.2), var(--background))");
      root.style.setProperty("--theme-blob-opacity", "0.15");
      root.style.setProperty("--theme-card-hover-bg", "rgba(59, 130, 246, 0.05)");
      root.style.setProperty("--theme-glass-bg", "rgba(30, 41, 59, 0.8)");
      root.style.setProperty("--theme-shadow", "rgba(0, 0, 0, 0.5)");
    } else {
      root.style.setProperty("--theme-gradient-from", "#E0F2FE");
      root.style.setProperty("--theme-gradient-to", "#DBEAFE");
      root.style.setProperty("--theme-gradient-hero", "linear-gradient(to bottom right, #E0F2FE, rgba(219, 234, 254, 0.3), var(--background))");
      root.style.setProperty("--theme-gradient-feature", "linear-gradient(to bottom, var(--background), rgba(224, 242, 254, 0.3), var(--background))");
      root.style.setProperty("--theme-blob-opacity", "0.2");
      root.style.setProperty("--theme-card-hover-bg", "rgba(59, 130, 246, 0.05)");
      root.style.setProperty("--theme-glass-bg", "rgba(255, 255, 255, 0.8)");
      root.style.setProperty("--theme-shadow", "rgba(0, 0, 0, 0.1)");
    }

    localStorage.setItem("echoboard-theme", theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) metaThemeColor.setAttribute("content", colors.background);
    else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = colors.background;
      document.head.appendChild(meta);
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("echoboard-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const colors = theme === "dark" ? darkColors : lightColors;

  return <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

// Utility hook for theme-aware styling with card variants
export function useThemeStyles() {
  const { theme, colors } = useTheme();

  const lightCardVariants = ["#ffffff", "#fef3c7", "#d1fae5", "#f0f9ff"];
  const darkCardVariants = ["#1e293b", "#111827", "#1e3a8a", "#0f172a"];

  return {
    theme,
    colors,
    isDark: theme === "dark",
    isLight: theme === "light",
    tw: (lightClass: string, darkClass: string) => (theme === "dark" ? darkClass : lightClass),
    gradient: {
      hero: "bg-[image:var(--theme-gradient-hero)]",
      feature: "bg-[image:var(--theme-gradient-feature)]",
      primary: theme === "dark" ? "from-sky-600 via-blue-600 to-sky-700" : "from-sky-400 via-blue-500 to-sky-500",
      text: theme === "dark" ? "from-sky-400 via-blue-400 to-sky-300" : "from-sky-500 via-blue-500 to-sky-400",
    },
    shadow: {
      card: theme === "dark" ? "shadow-lg shadow-black/20" : "shadow-lg shadow-sky-500/10",
      button: theme === "dark" ? "shadow-lg shadow-sky-500/10" : "shadow-lg shadow-sky-500/20",
      glow: theme === "dark" ? "shadow-2xl shadow-sky-500/20" : "shadow-2xl shadow-sky-500/30",
    },
    glass: {
      card: theme === "dark" ? "bg-slate-800/80 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm",
      nav: theme === "dark" ? "bg-slate-900/80 backdrop-blur-lg" : "bg-white/80 backdrop-blur-lg",
    },
    hover: {
      bg: theme === "dark" ? "hover:bg-sky-900/30" : "hover:bg-sky-50",
      border: theme === "dark" ? "hover:border-sky-500/50" : "hover:border-sky-300",
    },
    cardVariant: (index: number) => (theme === "dark" ? darkCardVariants[index % darkCardVariants.length] : lightCardVariants[index % lightCardVariants.length]),
  };
}
