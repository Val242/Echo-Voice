import FeedClient from "@/components/FeedClient";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/landing");
  }

  // Pick only plain JSON-serializable fields
  const plainUser = {
    id: user.id,
    fullName: user.fullName ?? "Anonymous User",
    email: user.primaryEmailAddress?.emailAddress ?? "",
    imageUrl: user.imageUrl ?? "/avatar.png",
    unsafeMetadata: user.unsafeMetadata ?? {},
  };

  return <FeedClient user={plainUser} />;
}
