"use client"

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Badge } from "./ui/batch";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useThemeStyles } from "./ThemeProvider";

const samplePosts = [
  {
    id: 1,
    author: "Sarah Mitchell",
    username: "@sarahm",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content:
      "Just watched the most incredible sunset from my favorite hiking spot. Nature really has a way of putting everything into perspective. 🌅✨",
    time: "2 min ago",
    likes: 124,
    comments: 18,
    shares: 5,
    isNew: true,
  },
  {
    id: 2,
    author: "Alex Chen",
    username: "@alexc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    content:
      "Coffee shop coding sessions hit different when you're working on something you're passionate about. The hustle continues! ☕💻",
    time: "5 min ago",
    likes: 89,
    comments: 12,
    shares: 3,
    isNew: false,
  },
  {
    id: 3,
    author: "Maya Patel",
    username: "@mayap",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    content:
      "Finished reading 'Atomic Habits' today. The 1% improvement rule is going to change how I approach my goals. Highly recommend! 📚",
    time: "12 min ago",
    likes: 256,
    comments: 34,
    shares: 12,
    isNew: false,
  },
  {
    id: 4,
    author: "Jordan Lee",
    username: "@jordanl",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    content:
      "New beginnings are always scary but exciting. Today marks the start of my entrepreneurial journey. Let's build something amazing! 🚀",
    time: "18 min ago",
    likes: 342,
    comments: 56,
    shares: 23,
    isNew: false,
  },
  {
    id: 5,
    author: "Emma Wilson",
    username: "@emmaw",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    content:
      "Sometimes the best therapy is a long drive with good music and no destination in mind. Taking time for yourself matters. 🎵🚗",
    time: "25 min ago",
    likes: 178,
    comments: 23,
    shares: 8,
    isNew: false,
  },
];

function PostCard({ post, index }: { post: typeof samplePosts[0]; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const styles = useThemeStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${styles.tw('bg-white', 'bg-slate-800')} rounded-2xl p-5 shadow-sm border ${styles.tw('border-sky-100', 'border-sky-900')} relative`}
    >
      {post.isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 z-10"
        >
          <div className="bg-sky-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            New
          </div>
        </motion.div>
      )}

      {/* Post header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <Avatar className={`w-11 h-11 border-2 ${styles.tw('border-sky-100', 'border-sky-900')}`}>
            <AvatarImage src={post.avatar} alt={post.author} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm truncate">{post.author}</span>
              <svg className="w-4 h-4 text-sky-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">{post.username} · {post.time}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 -mr-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Post content */}
      <p className="text-sm leading-relaxed mb-4">{post.content}</p>

      {/* Post stats */}
      <div className={`flex items-center gap-4 text-xs text-muted-foreground mb-3 pb-3 border-b ${styles.tw('border-sky-50', 'border-sky-900')}`}>
        <span>{post.likes.toLocaleString()} likes</span>
        <span>{post.comments} comments</span>
        <span>{post.shares} shares</span>
      </div>

      {/* Post actions */}
      <div className="flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isLiked ? "text-red-500" : `text-muted-foreground ${styles.hover.bg}`
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
          <span className="text-xs">Like</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground ${styles.hover.bg} transition-colors`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs">Comment</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground ${styles.hover.bg} transition-colors`}
        >
          <Share2 className="w-4 h-4" />
          <span className="text-xs">Share</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSaved(!isSaved)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isSaved ? "text-sky-500" : `text-muted-foreground ${styles.hover.bg}`
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-sky-500" : ""}`} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function WallPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const x = useMotionValue(0);
  const styles = useThemeStyles();
  const background = useTransform(
    x,
    [-200, 0, 200],
    ["rgba(239, 246, 255, 0)", "rgba(239, 246, 255, 0)", "rgba(239, 246, 255, 0)"]
  );

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % samplePosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < samplePosts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <section className={`px-6 py-20 overflow-hidden bg-gradient-to-b from-background ${styles.tw('via-sky-50/30', 'via-sky-950/20')} to-background`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="secondary" className="mb-2 bg-sky-50 text-sky-700 border-sky-200">
            Interactive Preview
          </Badge>
          <h2 className="text-4xl md:text-5xl max-w-3xl mx-auto">
            See the magic in action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Swipe through posts, react in real-time, and experience the vibrant community.
            Every interaction happens instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto"
          >
            {/* Phone frame */}
            <div className="relative w-[340px] h-[680px] mx-auto">
              {/* Phone outer frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] shadow-2xl p-3">
                {/* Phone screen */}
                <div className={`relative w-full h-full ${styles.tw('bg-white', 'bg-slate-900')} rounded-[2.5rem] overflow-hidden`}>
                  {/* Status bar */}
                  <div className={`absolute top-0 left-0 right-0 h-12 ${styles.tw('bg-white', 'bg-slate-900')} z-20 flex items-center justify-between px-6`}>
                    <span className="text-xs">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 border-2 border-black rounded-sm"></div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-1 h-3 bg-black rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className={`absolute top-12 left-0 right-0 h-14 ${styles.tw('bg-white', 'bg-slate-900')} border-b ${styles.tw('border-sky-100', 'border-sky-900')} z-20 flex items-center justify-between px-4`}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-sm">EchoBoard</span>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs text-sky-500 flex items-center gap-1"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                      </span>
                      Live
                    </motion.div>
                  </div>

                  {/* Scrollable content area */}
                  <div className="absolute top-26 left-0 right-0 bottom-0 overflow-hidden">
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.1}
                      onDragEnd={handleDragEnd}
                      style={{ x }}
                      className="px-4 py-4 space-y-4 h-full overflow-y-auto"
                    >
                      <PostCard post={samplePosts[currentIndex]} index={0} />
                      {samplePosts[currentIndex + 1] && (
                        <PostCard post={samplePosts[currentIndex + 1]} index={1} />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30"></div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-[3rem] blur-2xl -z-10"></div>
            </div>

            {/* Swipe indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <motion.span
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ← Swipe →
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                {
                  icon: "⚡",
                  title: "Instant Updates",
                  description: "See new posts appear in real-time without refreshing. Stay connected to the community pulse.",
                },
                {
                  icon: "💬",
                  title: "Engage Freely",
                  description: "Like, comment, and share thoughts instantly. Every interaction is smooth and responsive.",
                },
                {
                  icon: "🔔",
                  title: "Smart Notifications",
                  description: "Get notified when someone interacts with your posts or mentions you in conversations.",
                },
                {
                  icon: "📱",
                  title: "Mobile First",
                  description: "Beautifully designed for mobile with touch gestures and smooth animations.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className={`flex-shrink-0 w-12 h-12 ${styles.tw('bg-sky-50', 'bg-sky-900/30')} rounded-xl flex items-center justify-center text-2xl`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Carousel dots */}
            <div className="flex items-center gap-2 pt-4">
              {samplePosts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-8 bg-sky-500" : "w-2 bg-sky-200"
                  }`}
                />
              ))}
            </div>

            <div className="pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                Try It Yourself
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
