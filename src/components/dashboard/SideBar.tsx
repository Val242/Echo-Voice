import { useThemeStyles } from "../ThemeProvider";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/batch";
import {
  Home,
  Compass,
  Bell,
  User,
  Settings,
  MessageSquare,
  Moon,
  Sun,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import type { DashboardView } from "../Dashboard";
import { useTheme } from "../ThemeProvider";

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onBackToHome?: () => void;
}

export function Sidebar({ currentView, onViewChange, onBackToHome }: SidebarProps) {
  const styles = useThemeStyles();
  const { theme, toggleTheme } = useTheme();

  // Get user profile from localStorage (would be from API in production)
  const profile = JSON.parse(localStorage.getItem("echoboard-profile") || "{}");
  const userName = profile.name || "User";
  const userImage = profile.image || "";

  const navItems = [
    { id: "feed" as DashboardView, icon: Home, label: "Feed", badge: null },
    { id: "explore" as DashboardView, icon: Compass, label: "Explore", badge: null },
    { id: "notifications" as DashboardView, icon: Bell, label: "Notifications", badge: 3 },
    { id: "profile" as DashboardView, icon: User, label: "Profile", badge: null },
    { id: "settings" as DashboardView, icon: Settings, label: "Settings", badge: null },
  ];

  return (
    <div className={`w-64 h-screen ${styles.tw("bg-white", "bg-slate-900")} border-r border-border flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-linear-to-br ${styles.gradient.primary} rounded-xl flex items-center justify-center ${styles.shadow.glow}`}>
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl">EchoBoard</h1>
            <p className="text-xs text-muted-foreground">Digital Memory Wall</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "primary" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                isActive
                  ? `${styles.shadow.button} bg-sky-500 hover:bg-sky-600 text-white`
                  : "text-foreground"
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== null && item.badge > 0 && (
                <Badge className="bg-red-500 text-white hover:bg-red-600">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User profile & theme toggle */}
      <div className="p-4 border-t border-border space-y-2">
        {/* Back to Home button */}
        {onBackToHome && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12"
            onClick={onBackToHome}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Button>
        )}

        {/* Theme toggle */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-5 h-5" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>

        {/* User profile */}
        <div className={`p-3 rounded-lg ${styles.tw("bg-sky-50", "bg-sky-900/20")} ${styles.hover.bg} cursor-pointer transition-colors`}>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-sky-500">
              <AvatarImage src={userImage} />
              <AvatarFallback className="bg-sky-500 text-white">
                {userName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{userName}</p>
              <p className="text-xs text-muted-foreground">View Profile</p>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={() => {
            if (confirm("Are you sure you want to log out?")) {
              localStorage.removeItem("echoboard-onboarding-completed");
              window.location.reload();
            }
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
