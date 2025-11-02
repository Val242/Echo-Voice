import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/batch";
import { useThemeStyles } from "../ThemeProvider";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Brain, Camera, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export type PostType = "thought" | "memory" | "reflection";

export interface Post {
  id: string;
  author: {
    name: string;
    image: string;
    bio?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  type: PostType;
}

interface PostCardProps {
  post: Post;
}

const postTypeConfig = {
  thought: {
    label: "Thought",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  memory: {
    label: "Memory",
    icon: Camera,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  reflection: {
    label: "Reflection",
    icon: Sparkles,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
  },
};

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [likes, setLikes] = useState(post.likes);
  const styles = useThemeStyles();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const typeConfig = postTypeConfig[post.type];
  const TypeIcon = typeConfig.icon;

  return (
    <Card className={`p-6 ${styles.shadow.card} ${styles.hover.bg} transition-colors border-l-4 ${typeConfig.borderColor}`}>
      {/* Post header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3 flex-1">
          <Avatar className="w-12 h-12 border-2 border-sky-500">
            <AvatarImage src={post.author.image} />
            <AvatarFallback className="bg-sky-500 text-white">
              {post.author.name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium">{post.author.name}</p>
              <Badge variant="secondary" className={`gap-1 ${typeConfig.bgColor} ${typeConfig.color} border-0`}>
                <TypeIcon className="w-3 h-3" />
                {typeConfig.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Post content */}
      <div className="mb-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post stats */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border text-sm text-muted-foreground">
        <span>{likes} likes</span>
        <span>{post.comments} comments</span>
      </div>

      {/* Post actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <motion.div
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.div>
            <span>Like</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className={isBookmarked ? "text-sky-500" : "text-muted-foreground"}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
        </Button>
      </div>
    </Card>
  );
}
