"use client";

import Dashboard from "./Dashboard";

interface FeedClientProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
    unsafeMetadata?: Record<string, unknown>;
  };
}

export default function FeedClient({ user }: FeedClientProps) {
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/landing";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Dashboard {...({ user, onSignOut: handleSignOut } as any)} />;
}
