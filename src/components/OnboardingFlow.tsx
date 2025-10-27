"use client"
/**
 * OnboardingFlow Component
 * 
 * Collects user information during the onboarding process.
 * Data structure aligns with the Prisma User schema:
 * 
 * User {
 *   id: string (auto-generated)
 *   clerkId: string (from Clerk authentication)
 *   email: string (collected here)
 *   name: string (collected here)
 *   image: string (auto-generated avatar)
 *   bio: string (optional, collected here)
 *   hasOnboarded: boolean (set to true on completion)
 *   createdAt: DateTime (auto-generated)
 *   updatedAt: DateTime (auto-generated)
 * }
 * 
 * TODO Backend Integration:
 * - Replace localStorage with API calls to save user data
 * - Implement Clerk authentication to get clerkId
 * - Save preferences to a separate UserPreferences table if needed
 * - Handle error states and validation
 */

import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import  Label  from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import  Progress  from "./ui/progress";
import  Switch  from "./ui/switch";
import { useThemeStyles } from "./ThemeProvider";
import {
  MessageSquare,
  Sparkles,
  Users,
  Bell,
  Lock,
  Heart,
  Zap,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

/**
 * User profile data matching the Prisma User schema
 */

interface UserProfile {
  name: string;
  image: string;
  bio: string;
  email: string;
}

interface Preferences {
  publicProfile: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  showInDirectory: boolean;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    image: "",
    bio: "",
    email: "",
  });
  const [preferences, setPreferences] = useState<Preferences>({
    publicProfile: true,
    emailNotifications: true,
    pushNotifications: false,
    showInDirectory: true,
  });
  const styles = useThemeStyles();

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Prepare user data for backend (matches User schema)
    const userData = {
      name: profile.name,
      image: profile.image,
      bio: profile.bio || null,
      email: profile.email,
      hasOnboarded: true,
    };

    // Prepare preferences for backend
    const userPreferences = {
      publicProfile: preferences.publicProfile,
      emailNotifications: preferences.emailNotifications,
      pushNotifications: preferences.pushNotifications,
      showInDirectory: preferences.showInDirectory,
    };

    // TODO: Send to backend API
    // Example:
    // await fetch('/api/user/onboarding', {
    //   method: 'POST',
    //   body: JSON.stringify({ user: userData, preferences: userPreferences })
    // });

    // Temporarily save to localStorage for demo
    localStorage.setItem("echoboard-profile", JSON.stringify(userData));
    localStorage.setItem("echoboard-preferences", JSON.stringify(userPreferences));
    localStorage.setItem("echoboard-onboarding-completed", "true");
    
    onComplete();
  };

  const generateAvatar = (name: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || "user")}`;
  };

  useEffect(() => {
    if (profile.name && !profile.image) {
      setProfile({ ...profile, image: generateAvatar(profile.name) });
    }
  }, [profile.name]);

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
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MessageSquare className="w-16 h-16 text-white" />
            </motion.div>
            <motion.div
              className="absolute top-0 right-1/4 w-16 h-16 bg-sky-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
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
              {
                icon: Zap,
                title: "Real-time Updates",
                desc: "See posts appear instantly",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Connect with like-minded people",
              },
              {
                icon: Heart,
                title: "Emotionally Connected",
                desc: "Share what matters most",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${styles.tw(
                    "bg-sky-50",
                    "bg-sky-900/20"
                  )}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm">{feature.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {feature.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ),
    },
    {
      id: "profile",
      title: "Create Your Profile ✨",
      subtitle: "Tell us a bit about yourself",
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Avatar preview */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Avatar className="w-24 h-24 border-4 border-sky-500 shadow-lg shadow-sky-500/20">
                <AvatarImage src={profile.image} />
                <AvatarFallback className="text-2xl">
                  {profile.name ? profile.name[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
            <p className="text-xs text-muted-foreground">
              Your avatar updates as you type
            </p>
          </div>

          {/* Form fields */}
          <div className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Sarah Mitchell"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="sarah@example.com"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="h-11"
                required
              />
              <p className="text-xs text-muted-foreground">
                We'll use this for notifications and account recovery
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Input
                id="bio"
                placeholder="Share a bit about yourself..."
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="h-11"
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground">
                {profile.bio.length}/160 characters
              </p>
            </div>
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
          {/* Privacy settings */}
          <div className="space-y-4">
            <div className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${styles.tw('border-sky-100 bg-sky-50/50', 'border-sky-900 bg-sky-900/20')}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-sky-500" />
                  <Label htmlFor="public-profile" className="text-sm">
                    Public Profile
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Allow others to view your profile and posts
                </p>
              </div>
              <Switch
                id="public-profile"
                checked={preferences.publicProfile}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPreferences({ ...preferences, publicProfile: e.target.checked })
                }
              />
            </div>

            <div className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${styles.tw('border-sky-100', 'border-sky-900')}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-sky-500" />
                  <Label htmlFor="directory" className="text-sm">
                    Show in Directory
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Appear in the community member directory
                </p>
              </div>
              <Switch
                id="directory"
                checked={preferences.showInDirectory}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPreferences({ ...preferences, showInDirectory: e.target.checked })
                }
              />
            </div>

            <div className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${styles.tw('border-sky-100', 'border-sky-900')}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-sky-500" />
                  <Label htmlFor="email-notif" className="text-sm">
                    Email Notifications
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get notified about mentions and replies
                </p>
              </div>
              <Switch
                id="email-notif"
                checked={preferences.emailNotifications}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: e.target.checked,
                  })
                }
              />
            </div>

            <div className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${styles.tw('border-sky-100', 'border-sky-900')}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <Label htmlFor="push-notif" className="text-sm">
                    Push Notifications
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Real-time updates when you're active
                </p>
              </div>
              <Switch
                id="push-notif"
                checked={preferences.pushNotifications}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPreferences({
                    ...preferences,
                    pushNotifications: e.target.checked,
                  })
                }
              />
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${styles.tw('border-sky-200 bg-sky-50', 'border-sky-800 bg-sky-900/30')}`}>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <strong className="text-foreground">Privacy First:</strong> You
                can always change these settings later. We'll never share your
                data without your permission.
              </div>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      id: "complete",
      title: "You're All Set! 🎉",
      subtitle: "Ready to start your journey",
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {/* Success animation */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mx-auto w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Check className="w-16 h-16 text-white" />
              </motion.div>
            </motion.div>
            {/* Confetti effect */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-sky-500"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: `${50 + Math.cos((i * Math.PI) / 3) * 100}%`,
                  y: `${50 + Math.sin((i * Math.PI) / 3) * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Profile summary */}
          <Card className={`p-6 max-w-md mx-auto ${styles.tw('bg-white', 'bg-slate-800/50')}`}>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-sky-500">
                <AvatarImage src={profile.image} />
                <AvatarFallback>
                  {profile.name ? profile.name[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg">{profile.name || "User"}</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.email || "email@example.com"}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            {profile.bio && (
              <p className="text-sm text-muted-foreground border-t border-border pt-4">
                {profile.bio}
              </p>
            )}
          </Card>

          {/* Next steps */}
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="text-center">What's Next?</h3>
            {[
              "Create your first post",
              "Explore the community",
              "Connect with others",
              "Share your story",
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${styles.tw('bg-sky-50', 'bg-sky-900/20')}`}
              >
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
  ];

  const canProceed = () => {
    if (currentStep === 1) {
      // Validate name and email
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);
      return profile.name.trim() && profile.email.trim() && isValidEmail;
    }
    return true;
  };

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
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground"
            >
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
            <motion.h2
              key={currentStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2"
            >
              {steps[currentStep].title}
            </motion.h2>
            <motion.p
              key={`subtitle-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
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

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={currentStep === 0 ? "invisible" : ""}
            >
              Back
            </Button>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "w-8 bg-sky-500"
                      : index < currentStep
                      ? "w-2 bg-sky-500"
                      : "w-2 bg-sky-200 dark:bg-sky-900"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`min-w-[120px] ${styles.shadow.button}`}
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
