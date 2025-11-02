import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { useThemeStyles } from "../ThemeProvider";
import { Image, Smile, MapPin, Send, Brain, Camera, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { PostType } from "./PostCard";

interface CreatePostProps {
  onPost?: (content: string, type: PostType) => void;
}

const postTypes = [
  {
    type: "thought" as PostType,
    label: "Thought",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    hoverColor: "hover:bg-purple-500/20",
    activeColor: "bg-purple-500/20 border-purple-500",
    description: "Quick ideas & insights",
  },
  {
    type: "memory" as PostType,
    label: "Memory",
    icon: Camera,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    hoverColor: "hover:bg-amber-500/20",
    activeColor: "bg-amber-500/20 border-amber-500",
    description: "Past experiences",
  },
  {
    type: "reflection" as PostType,
    label: "Reflection",
    icon: Sparkles,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    hoverColor: "hover:bg-sky-500/20",
    activeColor: "bg-sky-500/20 border-sky-500",
    description: "Deep thinking",
  },
];

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<PostType>("thought");
  const styles = useThemeStyles();
  
  // Get user profile from localStorage
  const profile = JSON.parse(localStorage.getItem("echoboard-profile") || "{}");
  const userName = profile.name || "User";
  const userImage = profile.image || "";

  const handleSubmit = () => {
    if (content.trim()) {
      onPost?.(content, selectedType);
      setContent("");
      setSelectedType("thought");
    }
  };

  const selectedTypeConfig = postTypes.find(t => t.type === selectedType)!;
  const SelectedIcon = selectedTypeConfig.icon;

  return (
    <Card className={`p-6 ${styles.shadow.card}`}>
      <div className="flex gap-4">
        <Avatar className="w-12 h-12 border-2 border-sky-500">
          <AvatarImage src={userImage} />
          <AvatarFallback className="bg-sky-500 text-white">
            {userName[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          {/* Post type selector */}
          <div className="flex gap-2 flex-wrap">
            {postTypes.map((type) => {
              const TypeIcon = type.icon;
              const isSelected = selectedType === type.type;
              return (
                <Button
                  key={type.type}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedType(type.type)}
                  className={`gap-2 ${isSelected ? type.activeColor : `${type.hoverColor}`} transition-all`}
                >
                  <TypeIcon className={`w-4 h-4 ${isSelected ? type.color : "text-muted-foreground"}`} />
                  <span className={isSelected ? type.color : ""}>{type.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Description for selected type */}
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${selectedTypeConfig.bgColor}`}
          >
            <SelectedIcon className={`w-4 h-4 ${selectedTypeConfig.color}`} />
            <p className={`text-sm ${selectedTypeConfig.color}`}>
              {selectedTypeConfig.description}
            </p>
          </motion.div>

          {/* Content input */}
          <Textarea
            placeholder={`Share a ${selectedTypeConfig.label.toLowerCase()}...`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
          />
          
          {content && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-muted-foreground text-right"
            >
              {content.length} characters
            </motion.div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-sky-500"
              >
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Photo</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-sky-500"
              >
                <Smile className="w-4 h-4" />
                <span className="hidden sm:inline">Emoji</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-sky-500"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Location</span>
              </Button>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={`gap-2 ${styles.shadow.button}`}
            >
              <Send className="w-4 h-4" />
              Post {selectedTypeConfig.label}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
