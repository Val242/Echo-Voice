"use client"

import { motion } from "motion/react";
import { Zap, Lock, Heart, Users, Sparkles, MessageCircle } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Zap,
    title: "Real-Time Updates",
    description:
      "See new posts, comments, and reactions appear instantly without refreshing. Every moment is live.",
    gradient: "from-sky-500/10 to-sky-400/15",
    iconColor: "text-sky-500",
  },
  {
    icon: Heart,
    title: "Emotionally Connected",
    description:
      "Share memories, thoughts, and reflections in a space designed to feel warm and human.",
    gradient: "from-sky-400/10 to-blue-400/15",
    iconColor: "text-sky-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join a vibrant community where every voice is heard and every story matters.",
    gradient: "from-blue-500/10 to-sky-500/15",
    iconColor: "text-blue-500",
  },
  {
    icon: Lock,
    title: "Private & Public Posts",
    description:
      "Control your privacy with options to share publicly or keep memories private.",
    gradient: "from-sky-600/10 to-sky-400/15",
    iconColor: "text-sky-700",
  },
  {
    icon: MessageCircle,
    title: "Interactive Comments",
    description:
      "Engage in meaningful conversations with threaded comments that update in real-time.",
    gradient: "from-sky-300/15 to-blue-300/15",
    iconColor: "text-sky-500",
  },
  {
    icon: Sparkles,
    title: "Beautiful Experience",
    description:
      "Enjoy a clean, minimalist interface with smooth animations and light/dark mode.",
    gradient: "from-blue-400/10 to-sky-500/15",
    iconColor: "text-blue-600",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-20 bg-sky-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2>Everything you need to share your story</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            EchoBoard combines powerful features with an intuitive design to
            create the perfect space for your memories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-sky-100">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
