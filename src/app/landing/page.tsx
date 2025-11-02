import { LandingClient } from "@/components/LandingPageClient";
import  Features  from "@/components/Features";
import  WallPreview  from "@/components/WallPreview";
import  Footer  from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function LandingPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Client component handles interactive logic */}
        <LandingClient />

        {/* Server-rendered components */}
        <Features />
        <WallPreview />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
