import { LandingClient } from "@/components/LandingPageClient";
import FeedClient from "@/components/FeedClient";
import { currentUser } from "@clerk/nextjs/server";

export default async function RootPage() {
  const user = await currentUser();

  // If no user, show landing page
  if (!user) {
    return <LandingClient />;
  }

  // Check onboarding status from Clerk metadata
  const hasCompletedOnboarding = user.unsafeMetadata?.hasCompletedOnboarding ?? false;

  // Only pass plain JSON-serializable data
  const plainUser = {
    id: user.id,
    fullName: user.fullName ?? "Anonymous User",
    email: user.primaryEmailAddress?.emailAddress ?? "",
    imageUrl: user.imageUrl ?? "/avatar.png",
    unsafeMetadata: user.unsafeMetadata ?? {},
  };

  // If user has completed onboarding, show feed/dashboard
  if (hasCompletedOnboarding) {
    return <FeedClient user={plainUser} />;
  }

  // Otherwise show landing + onboarding
  return <LandingClient />;
}
