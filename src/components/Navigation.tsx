"use client";

import { Button } from "./ui/button";
import { MessageSquare, Menu, Moon, Sun, LayoutDashboard } from "lucide-react";
import { useTheme, useThemeStyles } from "./ThemeProvider";
import Link from "next/link";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useCallback } from "react";

interface NavigationProps {
  hasCompletedOnboarding: boolean;
  onGetStarted: () => void;
}

export default function Navigation({
  hasCompletedOnboarding,
  onGetStarted,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const styles = useThemeStyles();
  const { signOut } = useClerk();

  const handleSignOut = useCallback(() => {
    try {
      localStorage.removeItem("echoboard-onboarding-completed");
      localStorage.removeItem("onboardingStep");
      localStorage.removeItem("echoboard-preferences");
    } catch (err) {
      console.error("Failed to clear localStorage on sign-out:", err);
    }

    signOut({ redirectUrl: "/sign-in" });
  }, [signOut]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${styles.glass.nav} border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">EchoBoard</span>
          </div>

          {/* Desktop links */}
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

          {/* Actions & nav buttons */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-lg bg-muted ${styles.hover.bg} flex items-center justify-center transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Signed out */}
            <SignedOut>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" onClick={onGetStarted}>
                Get Started
              </Button>
            </SignedOut>

            {/* Signed in */}
            <SignedIn>
              {hasCompletedOnboarding ? (
                <>
                  {/* Link to feed/dashboard */}
                  <Link href="/feed" passHref>
                    <Button size="sm">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={onGetStarted}>
                    Continue Onboarding
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </SignedIn>

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
