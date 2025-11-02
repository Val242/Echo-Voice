
import { useThemeStyles } from "../ThemeProvider";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PostCard, type Post } from "./PostCard";
import { MapPin, Link as LinkIcon, Calendar, Edit, Heart, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function ProfileView() {
  const styles = useThemeStyles();
  
  // Get user profile from localStorage
  const profile = JSON.parse(localStorage.getItem("echoboard-profile") || "{}");
  const userName = profile.name || "User";
  const userEmail = profile.email || "email@example.com";
  const userBio = profile.bio || "No bio added yet";
  const userImage = profile.image || "";

  // Mock user stats
  const stats = {
    posts: 42,
    followers: 1234,
    following: 567,
  };

  // Mock user posts
  const userPosts: Post[] = [
    {
        id: "1",
        author: {
            name: userName,
            image: userImage,
            bio: userBio,
        },
        content: "Just completed my profile on EchoBoard! Excited to connect with this amazing community. 🎉",
        timestamp: "2 days ago",
        likes: 23,
        comments: 5,
        isLiked: false,
        isBookmarked: false,
        type: "thought"
    },
    {
        id: "2",
        author: {
            name: userName,
            image: userImage,
            bio: userBio,
        },
        content: "Working on some exciting new features. Can't wait to share them with everyone!",
        timestamp: "5 days ago",
        likes: 45,
        comments: 12,
        isLiked: true,
        isBookmarked: true,
        type: "thought"
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-6">
      {/* Profile header */}
      <Card className={`p-6 lg:p-8 mb-6 ${styles.shadow.card}`}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 border-4 border-sky-500 shadow-xl shadow-sky-500/20">
              <AvatarImage src={userImage} />
              <AvatarFallback className="bg-sky-500 text-white text-4xl">
                {userName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile info */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl mb-1">{userName}</h1>
                <p className="text-muted-foreground">{userEmail}</p>
              </div>
              <Button className={`gap-2 ${styles.shadow.button}`}>
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            {/* Bio */}
            <p className="mb-4">{userBio}</p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined November 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Earth</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="text-sky-500 hover:underline">
                  portfolio.example.com
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div>
                <p className="text-2xl">{stats.posts}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="cursor-pointer hover:text-sky-500 transition-colors">
                <p className="text-2xl">{stats.followers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="cursor-pointer hover:text-sky-500 transition-colors">
                <p className="text-2xl">{stats.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="w-full lg:w-auto">
          <TabsTrigger value="posts" className="flex-1 lg:flex-none">
            Posts
          </TabsTrigger>
          <TabsTrigger value="likes" className="flex-1 lg:flex-none">
            Likes
          </TabsTrigger>
          <TabsTrigger value="media" className="flex-1 lg:flex-none">
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {userPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="likes">
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg mb-2">Liked Posts</h3>
            <p className="text-sm text-muted-foreground">
              Posts you&apos;ve liked will appear here
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg mb-2">Media & Photos</h3>
            <p className="text-sm text-muted-foreground">
              Your photos and videos will be displayed here
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
