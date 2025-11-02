"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { OnboardingFlow } from "./OnboardingFlow";
import Navigation from "./Navigation";
import Hero from "./Hero";
import CTASection from "./CTASection";
import Dashboard from "./Dashboard";
import { useQuery } from "@tanstack/react-query";

export function LandingClient() {
  const { user, isLoaded } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // ✅ Use React Query for onboarding status
  const { data: hasCompletedOnboarding = false } = useQuery({
    queryKey: ["onboarding-status", user?.id],
    queryFn: async () => {
      if (!isLoaded || !user) return false;

      // 1️⃣ Check Clerk metadata first
      const clerkFlag = user.unsafeMetadata?.hasCompletedOnboarding;
      if (clerkFlag) {
        localStorage.setItem("echoboard-onboarding-completed", "true");
        return true;
      }

      // 2️⃣ Fallback to localStorage if metadata not found
      const localFlag =
        localStorage.getItem("echoboard-onboarding-completed") === "true";
      return localFlag;
    },
    enabled: isLoaded && !!user, // only runs when user is ready
  });

  // ✅ Placeholder user (for logged-out visitors)
  const placeholderUser = {
    name: "Guest User",
    email: "guest@example.com",
    image: "/avatar.png",
    bio: "Welcome to EchoBoard!",
  };

  // ✅ Build the user info dynamically
  const displayUser = user
    ? {
        name: user.fullName || "Anonymous User",
        email: user.primaryEmailAddress?.emailAddress || "",
        image: user.imageUrl || "/avatar.png",
        bio: user.unsafeMetadata?.bio || "Welcome back to EchoBoard!",
      }
    : placeholderUser;

  // === HANDLERS ===

  const handleStartOnboarding = () => setShowOnboarding(true);

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    localStorage.setItem("echoboard-onboarding-completed", "true");

    if (user) {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          hasCompletedOnboarding: true,
        },
      });
    }
  };

  const handleOnboardingSkip = () => setShowOnboarding(false);

  const handleGoToDashboard = () => {
    setShowDashboard(true);
    console.log(displayUser);
  };

  const handleSignOut = () => {
    setShowDashboard(false);
    localStorage.removeItem("echoboard-onboarding-completed");
    localStorage.removeItem("echoboard-preferences");
    localStorage.removeItem("onboardingStep");
  };

  // === CONDITIONAL RENDER ===
  if (showDashboard) {
    return <Dashboard user={displayUser} onSignOut={handleSignOut} />;
  }

  return (
    <>
      {showOnboarding && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      <Navigation
        onGetStarted={handleStartOnboarding}
        onGoToDashboard={handleGoToDashboard}
        hasCompletedOnboarding={hasCompletedOnboarding}
      />

      <Hero
        onGetStarted={handleStartOnboarding}
        onGoToDashboard={handleGoToDashboard}
        hasCompletedOnboarding={hasCompletedOnboarding}
      />

      <CTASection
        onGetStarted={handleStartOnboarding}
        onGoToDashboard={handleGoToDashboard}
        hasCompletedOnboarding={hasCompletedOnboarding}
      />
    </>
  );
}
