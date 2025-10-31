"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useThemeStyles, useTheme } from "./ThemeProvider";
import {
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Home,
  Users,
  Globe,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    image: string;
    bio?: string;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  const { signOut } = useClerk();
  const { colors, tw, shadow, hover, glass, cardVariant } = useThemeStyles();
  const { theme, toggleTheme } = useTheme();

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
    <div
      className={`flex flex-col h-screen transition-colors duration-500`}
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      {/* --- TOP BAR --- */}
      <header
        className={`flex items-center justify-between border-b px-6 py-3 sticky top-0 z-20 transition-all`}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          boxShadow: shadow.card,
        }}
      >
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-sky-500" />
          <h1 className="text-xl font-semibold">EchoBoard</h1>
        </div>

        <div
          className="hidden md:flex items-center rounded-full px-3 py-1.5 w-72 transition-all"
          style={{
            backgroundColor: colors.muted,
            color: colors.mutedForeground,
          }}
        >
          <Search className="w-4 h-4 mr-2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search EchoBoard..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={toggleTheme} variant="ghost" className="rounded-full">
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-sky-600" />
            )}
          </Button>

          <Bell className="w-5 h-5 text-sky-500 cursor-pointer" />

          <Avatar className="w-9 h-9 border border-sky-500">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* --- MAIN BODY --- */}
      <div className="flex flex-1 overflow-hidden px-6 py-6 gap-8">
        {/* LEFT SIDEBAR */}
        <aside
          className={`hidden lg:flex flex-col w-64 border-r p-4 space-y-4 rounded-2xl transition-all`}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            boxShadow: shadow.card,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 border-2 border-sky-500">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-xs" style={{ color: colors.mutedForeground }}>
                {user.email}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link href="/dashboard" className={`flex items-center gap-2 p-2 rounded transition-colors ${hover.bg}`}>
              <Home className="w-5 h-5 text-sky-500" /> Home
            </Link>
            <Link href="/dashboard/messages" className={`flex items-center gap-2 p-2 rounded transition-colors ${hover.bg}`}>
              <MessageSquare className="w-5 h-5 text-sky-500" /> Messages
            </Link>
            <Link href="/dashboard/groups" className={`flex items-center gap-2 p-2 rounded transition-colors ${hover.bg}`}>
              <Users className="w-5 h-5 text-sky-500" /> Groups
            </Link>
            <Link href="/dashboard/settings" className={`flex items-center gap-2 p-2 rounded transition-colors ${hover.bg}`}>
              <Settings className="w-5 h-5 text-sky-500" /> Settings
            </Link>

            <Button variant="ghost" size="sm" className="mt-4 flex items-center gap-2" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </nav>
        </aside>

        {/* CENTER FEED */}
        <main className="flex-1 overflow-y-auto space-y-6">
          <motion.h2 initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-4">
            Welcome back, {user.name.split(" ")[0]} 👋
          </motion.h2>

          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="p-6 rounded-xl transition-all"
              style={{
                backgroundColor: cardVariant(i),
                boxShadow: shadow.card,
                color: colors.cardForeground,
              }}
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs" style={{ color: colors.mutedForeground }}>
                    Posted 2h ago
                  </p>
                  <p className="mt-2 text-sm">Loving the new EchoBoard dashboard — sleek and functional!</p>
                </div>
              </div>
            </Card>
          ))}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside
          className={`hidden xl:flex flex-col w-72 border-l p-4 rounded-2xl transition-all space-y-6`}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            boxShadow: shadow.card,
          }}
        >
          <Card className={`p-4 transition-all ${tw("bg-white", "bg-slate-800/50")}`} style={{ boxShadow: shadow.card }}>
            <h3 className="font-semibold mb-3">Suggested Friends</h3>
            <ul className="space-y-2 text-sm">
              <li>Sarah Johnson</li>
              <li>Mike Anderson</li>
              <li>Emily Carter</li>
            </ul>
          </Card>

          <Card className={`p-4 transition-all ${tw("bg-white", "bg-slate-800/50")}`} style={{ boxShadow: shadow.card }}>
            <h3 className="font-semibold mb-3">Trending Topics</h3>
            <ul className="space-y-2 text-sm">
              <li>#ReactJS</li>
              <li>#NextJS</li>
              <li>#OpenSource</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
