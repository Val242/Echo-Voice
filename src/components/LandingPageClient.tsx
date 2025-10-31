"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { OnboardingFlow } from "./OnboardingFlow";
import Navigation from "./Navigation";
import Hero from "./Hero";
import CTASection from "./CTASection";
import Dashboard from "./Dashboard";

export function LandingClient() {
  const { user, isLoaded } = useUser();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // ✅ Load onboarding completion state from Clerk (or localStorage fallback)
  useEffect(() => {
    if (!isLoaded) return;

    const fetchOnboardingStatus = async () => {
      if (user) {
        const clerkFlag = user.unsafeMetadata?.hasCompletedOnboarding;
        if (clerkFlag) {
          setHasCompletedOnboarding(true);
          localStorage.setItem("echoboard-onboarding-completed", "true");
        } else {
          const localFlag =
            localStorage.getItem("echoboard-onboarding-completed") === "true";
          setHasCompletedOnboarding(localFlag);
        }
      }
    };

    fetchOnboardingStatus();
  }, [user, isLoaded]);

  // ✅ Placeholder if no user is logged in
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
    setHasCompletedOnboarding(true);
    localStorage.setItem("echoboard-onboarding-completed", "true");

    // ✅ Update Clerk metadata so onboarding isn’t repeated
    if (user) {
      await user.update({
        unsafeMetadata: { ...user.unsafeMetadata, hasCompletedOnboarding: true },
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

  // === RENDER LOGIC ===
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
