import { useState } from "react";
import { Sidebar } from "./dashboard/SideBar";
import { FeedView } from "./dashboard/FeedView";
import { ExploreView } from "./dashboard/ExploreView";
import { NotificationsView } from "./dashboard/NotificationsView";
import { ProfileView } from "./dashboard/ProfileView";
import { SettingsView } from "./dashboard/SettingsView";
import { useThemeStyles } from "./ThemeProvider";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export type DashboardView = "feed" | "explore" | "notifications" | "profile" | "settings";

interface DashboardProps {
  onBackToHome?: () => void;
}

export default function Dashboard({ onBackToHome }: DashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>("feed");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const styles = useThemeStyles();

  const renderView = () => {
    switch (currentView) {
      case "feed":
        return <FeedView />;
      case "explore":
        return <ExploreView />;
      case "notifications":
        return <NotificationsView />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return <SettingsView />;
      default:
        return <FeedView />;
    }
  };

  return (
    <div className={`min-h-screen ${styles.tw("bg-gray-50", "bg-slate-950")}`}>
      {/* Mobile header */}
      <div className={`lg:hidden sticky top-0 z-40 ${styles.glass.nav} border-b border-border`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20">
              <span className="text-white">E</span>
            </div>
            <span className="text-lg">EchoBoard</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:sticky top-0 z-40 h-screen
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            transition-transform duration-300 ease-in-out
          `}
        >
          <Sidebar
            currentView={currentView}
            onViewChange={(view) => {
              setCurrentView(view);
              setIsMobileMenuOpen(false);
            }}
            onBackToHome={onBackToHome}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
