"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { MessageSquare, Menu, Moon, Sun, LogIn, LayoutDashboard } from "lucide-react";
import { useTheme, useThemeStyles } from "./ThemeProvider";
import Link from "next/link";

interface NavigationProps {
  hasCompletedOnboarding: boolean;
  onGetStarted: () => void;
  onGoToDashboard: () => void;
}

export default function Navigation({
  hasCompletedOnboarding,
  onGetStarted,
  onGoToDashboard,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const styles = useThemeStyles();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 ${styles.glass.nav} border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">EchoBoard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-sky-500 transition-colors">
              Features
            </a>
            <a href="#preview" className="text-sm hover:text-sky-500 transition-colors">
              Preview
            </a>
            <a href="#about" className="text-sm hover:text-sky-500 transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm hover:text-sky-500 transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-lg bg-muted ${styles.hover.bg} flex items-center justify-center transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {/* Conditional buttons based on onboarding */}
            {hasCompletedOnboarding ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <LogIn className="w-4 h-4 mr-2" />
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" onClick={onGoToDashboard}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Sign In
                </Button>
                <Button size="sm" onClick={onGetStarted}>
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
