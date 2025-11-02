import { useState, useEffect, ChangeEvent } from "react";
import { CreatePost } from "./CreatePost";
import { PostCard, type Post, type PostType } from "./PostCard";
import { useThemeStyles } from "../ThemeProvider";
import { Sparkles, TrendingUp, Brain, Camera, Filter } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/batch";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

// Mock data - would come from API
const generateMockPosts = (): Post[] => [
  {
    id: "1",
    author: {
      name: "Sarah Mitchell",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Designer & Creative Thinker",
    },
    content: "Just launched my new portfolio website! 🎉 It's been an incredible journey building this from scratch. Check it out and let me know what you think!",
    timestamp: "2 hours ago",
    likes: 42,
    comments: 8,
    isLiked: false,
    isBookmarked: false,
    type: "thought",
  },
  {
    id: "2",
    author: {
      name: "Alex Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      bio: "Full-stack Developer",
    },
    content: "The best code is no code at all. The second best is code that's so simple, it's obviously correct.\n\nWhat's your favorite programming principle?",
    timestamp: "5 hours ago",
    likes: 127,
    comments: 23,
    isLiked: true,
    isBookmarked: true,
    type: "reflection",
  },
  {
    id: "3",
    author: {
      name: "Maya Patel",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      bio: "UX Researcher",
    },
    content: "Fascinating insights from today's user research session. People don't always say what they mean, and they don't always mean what they say. That's why observing behavior is crucial! 📊",
    timestamp: "8 hours ago",
    likes: 89,
    comments: 15,
    isLiked: false,
    isBookmarked: false,
    type: "thought",
  },
  {
    id: "4",
    author: {
      name: "James Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      bio: "Product Manager",
    },
    content: "Remember: Your first version doesn't have to be perfect. Ship it, learn from it, iterate. Progress over perfection! 🚀",
    timestamp: "12 hours ago",
    likes: 203,
    comments: 31,
    isLiked: true,
    isBookmarked: false,
    type: "reflection",
  },
  {
    id: "5",
    author: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bio: "Content Strategist",
    },
    content: "Just finished reading 'The Mom Test' - highly recommend it for anyone building products! The key takeaway: talk to customers about their lives, not your idea.",
    timestamp: "1 day ago",
    likes: 156,
    comments: 19,
    isLiked: false,
    isBookmarked: true,
    type: "memory",
  },
];

export function FeedView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTypes, setFilterTypes] = useState<PostType[]>(["thought", "memory", "reflection"]);
  const styles = useThemeStyles();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(generateMockPosts());
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCreatePost = (content: string, type: PostType) => {
    const profile = JSON.parse(localStorage.getItem("echoboard-profile") || "{}");
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: profile.name || "User",
        image: profile.image || "",
        bio: profile.bio,
      },
      content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      type,
    };
    setPosts([newPost, ...posts]);
  };

  const toggleFilterType = (type: PostType) => {
    if (filterTypes.includes(type)) {
      // Don't allow removing all filters
      if (filterTypes.length > 1) {
        setFilterTypes(filterTypes.filter(t => t !== type));
      }
    } else {
      setFilterTypes([...filterTypes, type]);
    }
  };

  const filteredPosts = posts.filter(post => filterTypes.includes(post.type));

  const postTypeCounts = {
    thought: posts.filter(p => p.type === "thought").length,
    memory: posts.filter(p => p.type === "memory").length,
    reflection: posts.filter(p => p.type === "reflection").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Page header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl mb-1">Your Feed</h1>
              <p className="text-sm text-muted-foreground">
                Stay connected with your community
              </p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                    {filterTypes.length < 3 && (
                      <Badge variant="secondary" className="ml-1">
                        {filterTypes.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                  <DropdownMenuLabel>Post Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filterTypes.includes("thought")}
                    onClick={() => toggleFilterType("thought")}
                  >
                    <Brain className="w-4 h-4 mr-2 text-purple-500" />
                    Thoughts ({postTypeCounts.thought})
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterTypes.includes("memory")}
                    onClick={() => toggleFilterType("memory")}
                  >
                    <Camera className="w-4 h-4 mr-2 text-amber-500" />
                    Memories ({postTypeCounts.memory})
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterTypes.includes("reflection")}
                    onClick={() => toggleFilterType("reflection")}
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-sky-500" />
                    Reflections ({postTypeCounts.reflection})
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">For You</span>
              </Button>
            </div>
          </div>

          {/* Create post */}
          <CreatePost onPost={handleCreatePost} />

          {/* Posts */}
          <div className="space-y-4">
            {isLoading ? (
              // Loading skeletons
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <div className="flex gap-3 mb-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </Card>
                ))}
              </>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            ) : (
              <Card className="p-12 text-center">
                <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg mb-2">No posts found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters to see more content
                </p>
                <Button onClick={() => setFilterTypes(["thought", "memory", "reflection"])}>
                  Show All Posts
                </Button>
              </Card>
            )}
          </div>

          {/* Load more */}
          {!isLoading && filteredPosts.length > 0 && (
            <div className="text-center py-8">
              <Button variant="outline">Load More Posts</Button>
            </div>
          )}
        </div>

        {/* Right sidebar - Trending & Suggestions */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          {/* Trending topics */}
          <Card className={`p-6 ${styles.shadow.card} sticky top-6`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              <h2 className="text-lg">Trending Today</h2>
            </div>
            <div className="space-y-4">
              {[
                { tag: "#WebDevelopment", posts: "1.2k posts" },
                { tag: "#DesignThinking", posts: "856 posts" },
                { tag: "#ProductLaunch", posts: "623 posts" },
                { tag: "#RemoteWork", posts: "445 posts" },
                { tag: "#UXDesign", posts: "389 posts" },
              ].map((topic, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${styles.tw("bg-sky-50", "bg-sky-900/20")} ${styles.hover.bg} cursor-pointer transition-colors`}
                >
                  <p className="text-sky-500">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground mt-1">{topic.posts}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggestions */}
          <Card className={`p-6 ${styles.shadow.card}`}>
            <h2 className="text-lg mb-4">Suggested Connections</h2>
            <div className="space-y-4">
              {[
                { name: "David Kim", role: "Software Engineer" },
                { name: "Lisa Anderson", role: "Product Designer" },
                { name: "Michael Brown", role: "Data Scientist" },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.role}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
