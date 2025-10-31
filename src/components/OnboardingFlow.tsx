"use client";
/**
 * OnboardingFlow Component (Clerk-integrated)
 *
 * Simplified version — Clerk handles signup and user data.
 * This flow now only handles user preferences and onboarding completion.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Sparkles, MessageSquare, Users, Bell, Lock, Heart, Zap, ChevronRight, Check, X } from "lucide-react";
import { useThemeStyles } from "./ThemeProvider";
import Progress from "./ui/progress";
import Switch from "./ui/switch";
import Label from "./ui/label";

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface Preferences {
  publicProfile: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  showInDirectory: boolean;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>({
    publicProfile: true,
    emailNotifications: true,
    pushNotifications: false,
    showInDirectory: true,
  });

  const { user } = useUser();
  const styles = useThemeStyles();

  const totalSteps = 3; // removed signup step
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

const handleComplete = async () => {
  const userPreferences = {
    publicProfile: preferences.publicProfile,
    emailNotifications: preferences.emailNotifications,
    pushNotifications: preferences.pushNotifications,
    showInDirectory: preferences.showInDirectory,
  };

  // Save to localStorage for offline access
  localStorage.setItem("echoboard-preferences", JSON.stringify(userPreferences));
  localStorage.setItem("echoboard-onboarding-completed", "true");

  // ✅ Update Clerk user metadata persistently
  if (user) {
    await user.update({
      unsafeMetadata: {
        ...user.unsafeMetadata, // keep existing metadata
        hasCompletedOnboarding: true,
        preferences: userPreferences,
      },
    });
  }

  onComplete();
};


  const steps = [
    {
      id: "welcome",
      title: "Welcome to EchoBoard! 👋",
      subtitle: "Your journey to meaningful connections starts here",
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {/* Hero visual */}
          <div className="relative">
            <motion.div
              className="mx-auto w-32 h-32 bg-gradient-to-br from-sky-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-sky-500/30"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <MessageSquare className="w-16 h-16 text-white" />
            </motion.div>
          </div>

          {/* Welcome content */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl">Welcome to EchoBoard</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              A space where your memories echo forever. Share thoughts, connect
              with others, and create lasting digital memories in real-time.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid gap-4 max-w-md mx-auto">
            {[
              { icon: Zap, title: "Real-time Updates", desc: "See posts appear instantly" },
              { icon: Users, title: "Community Driven", desc: "Connect with like-minded people" },
              { icon: Heart, title: "Emotionally Connected", desc: "Share what matters most" },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${styles.tw("bg-sky-50", "bg-sky-900/20")}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm">{feature.title}</div>
                    <div className="text-xs text-muted-foreground">{feature.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ),
    },
    {
      id: "preferences",
      title: "Privacy & Preferences 🔒",
      subtitle: "Customize your experience",
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6 max-w-md mx-auto"
        >
          {[{
            id: "public-profile",
            label: "Public Profile",
            desc: "Allow others to view your profile and posts",
            icon: Lock,
            value: preferences.publicProfile,
            onChange: (v: boolean) => setPreferences({ ...preferences, publicProfile: v }),
          }, {
            id: "directory",
            label: "Show in Directory",
            desc: "Appear in the community member directory",
            icon: Users,
            value: preferences.showInDirectory,
            onChange: (v: boolean) => setPreferences({ ...preferences, showInDirectory: v }),
          }, {
            id: "email-notif",
            label: "Email Notifications",
            desc: "Get notified about mentions and replies",
            icon: Bell,
            value: preferences.emailNotifications,
            onChange: (v: boolean) => setPreferences({ ...preferences, emailNotifications: v }),
          }, {
            id: "push-notif",
            label: "Push Notifications",
            desc: "Real-time updates when you're active",
            icon: Sparkles,
            value: preferences.pushNotifications,
            onChange: (v: boolean) => setPreferences({ ...preferences, pushNotifications: v }),
          }].map((pref, i) => {
            const Icon = pref.icon;
            return (
              <div key={i} className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${styles.tw("border-sky-100", "border-sky-900")}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-sky-500" />
                    <Label htmlFor={pref.id} className="text-sm">
                      {pref.label}
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{pref.desc}</p>
                </div>
                <Switch id={pref.id} checked={pref.value} onChange={(e) => pref.onChange(e.target.checked)} />
              </div>
            );
          })}
        </motion.div>
      ),
    },
    {
      id: "complete",
      title: "You're All Set! 🎉",
      subtitle: "Welcome aboard",
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {/* Avatar summary */}
          <Card className={`p-6 max-w-md mx-auto ${styles.tw("bg-white", "bg-slate-800/50")}`}>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-sky-500">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>{user?.firstName?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg">{user?.fullName || "User"}</h3>
                <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>

          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="text-center">Next Steps</h3>
            {["Create your first post", "Explore the community", "Connect with others", "Share your story"].map(
              (step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${styles.tw("bg-sky-50", "bg-sky-900/20")}`}
                >
                  <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl">EchoBoard</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
              <X className="w-4 h-4 mr-2" />
              Skip
            </Button>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="text-sky-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Step content */}
        <Card className={`p-8 ${styles.shadow.card}`}>
          <div className="mb-8 text-center">
            <motion.h2 key={currentStep} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
              {steps[currentStep].title}
            </motion.h2>
            <motion.p key={`subtitle-${currentStep}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
              {steps[currentStep].subtitle}
            </motion.p>
          </div>

          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <div key={currentStep} className="w-full">
                {steps[currentStep].component}
              </div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className={currentStep === 0 ? "invisible" : ""}>
              Back
            </Button>

            <Button onClick={handleNext} className={`min-w-[120px] ${styles.shadow.button}`}>
              {currentStep === totalSteps - 1 ? (
                <>
                  Get Started <Sparkles className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


