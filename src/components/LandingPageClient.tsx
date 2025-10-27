"use client";

import { useState } from "react";
import { OnboardingFlow } from "./OnboardingFlow";
import  Navigation  from "./Navigation";
import  Hero  from "./Hero";
import  CTASection  from "./CTASection";

export function LandingClient() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("echoboard-onboarding-completed") === "true";
    }
    return false;
  });

  const handleStartOnboarding = () => setShowOnboarding(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem("echoboard-onboarding-completed", "true");
  };

  const handleOnboardingSkip = () => setShowOnboarding(false);

  const handleGoToDashboard = () => {
    alert("Welcome back! This would navigate to your dashboard.");
  };

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
