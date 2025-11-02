"use client";

import Dashboard from "./Dashboard";

interface FeedClientProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
    unsafeMetadata?: Record<string, any>;
  };
}

export default function FeedClient({ user }: FeedClientProps) {
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/landing";
  };

  return <Dashboard user={user} onSignOut={handleSignOut} />;
}
