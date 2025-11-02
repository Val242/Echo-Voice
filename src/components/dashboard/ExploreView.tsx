import { useState } from "react";
import { useThemeStyles } from "../ThemeProvider";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/batch";
import { Search, TrendingUp, Hash, Users, Sparkles, Brain, Camera } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  { name: "Technology", icon: Sparkles, color: "bg-blue-500", posts: "12.5k" },
  { name: "Design", icon: Sparkles, color: "bg-purple-500", posts: "8.3k" },
  { name: "Business", icon: TrendingUp, color: "bg-green-500", posts: "6.7k" },
  { name: "Lifestyle", icon: Hash, color: "bg-pink-500", posts: "5.2k" },
  { name: "Education", icon: Users, color: "bg-orange-500", posts: "4.8k" },
  { name: "Entertainment", icon: Sparkles, color: "bg-red-500", posts: "3.9k" },
];

const trendingTopics = [
  { tag: "#AI", description: "Artificial Intelligence discussions", posts: "2.3k", growth: "+23%" },
  { tag: "#RemoteWork", description: "Working from anywhere", posts: "1.8k", growth: "+15%" },
  { tag: "#Sustainability", description: "Green initiatives", posts: "1.5k", growth: "+42%" },
  { tag: "#Blockchain", description: "Crypto & Web3", posts: "1.2k", growth: "+8%" },
  { tag: "#MentalHealth", description: "Wellness discussions", posts: "989", growth: "+31%" },
];

const featuredUsers = [
  {
    name: "Dr. Sarah Thompson",
    role: "AI Researcher",
    followers: "45.2k",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrSarah",
  },
  {
    name: "Mark Chen",
    role: "Startup Founder",
    followers: "32.1k",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarkChen",
  },
  {
    name: "Emma Rodriguez",
    role: "Design Leader",
    followers: "28.7k",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaR",
  },
  {
    name: "David Kim",
    role: "Tech Influencer",
    followers: "51.3k",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK",
  },
];

export function ExploreView() {
  const [searchQuery, setSearchQuery] = useState("");
  const styles = useThemeStyles();

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Explore</h1>
        <p className="text-muted-foreground">
          Discover new content, trending topics, and interesting people
        </p>
      </div>

      {/* Search bar */}
      <Card className={`p-4 mb-8 ${styles.shadow.card}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for topics, people, or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </Card>

      {/* Post Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className={`p-6 ${styles.shadow.card} ${styles.hover.bg} cursor-pointer transition-all border-l-4 border-purple-500`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-lg">Thoughts</h3>
            </div>
            <p className="text-2xl mb-1">2,456</p>
            <p className="text-xs text-muted-foreground">Quick ideas & insights shared today</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`p-6 ${styles.shadow.card} ${styles.hover.bg} cursor-pointer transition-all border-l-4 border-amber-500`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg">Memories</h3>
            </div>
            <p className="text-2xl mb-1">1,823</p>
            <p className="text-xs text-muted-foreground">Past experiences cherished</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`p-6 ${styles.shadow.card} ${styles.hover.bg} cursor-pointer transition-all border-l-4 border-sky-500`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-500" />
              </div>
              <h3 className="text-lg">Reflections</h3>
            </div>
            <p className="text-2xl mb-1">3,102</p>
            <p className="text-xs text-muted-foreground">Deep thoughts explored</p>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-sky-500" />
              <h2 className="text-xl">Categories</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-6 ${styles.shadow.card} ${styles.hover.bg} cursor-pointer transition-all hover:scale-105`}
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mb-1">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {category.posts} posts
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Trending topics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              <h2 className="text-xl">Trending Topics</h2>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`p-4 ${styles.shadow.card} ${styles.hover.bg} cursor-pointer transition-colors`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sky-500">{topic.tag}</span>
                          <Badge className="bg-green-500 text-white">
                            {topic.growth}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {topic.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {topic.posts} posts today
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured users */}
          <Card className={`p-6 ${styles.shadow.card}`}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-sky-500" />
              <h2 className="text-lg">Featured Creators</h2>
            </div>
            <div className="space-y-4">
              {featuredUsers.map((user, index) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-sky-500"
                    style={{ backgroundImage: `url(${user.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.role}
                    </p>
                    <p className="text-xs text-sky-500">{user.followers} followers</p>
                  </div>
                  <Button size="sm">Follow</Button>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Popular tags */}
          <Card className={`p-6 ${styles.shadow.card}`}>
            <h2 className="text-lg mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "javascript",
                "design",
                "react",
                "ai",
                "startup",
                "productivity",
                "coding",
                "ux",
                "webdev",
                "opensource",
              ].map((tag, index) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
