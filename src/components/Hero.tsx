"use client"

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { MessageSquare, Sparkles, Heart, MessageCircle, TrendingUp } from "lucide-react";
import { useThemeStyles } from "./ThemeProvider";

const floatingCards = [
  {
    id: 1,
    content: "Just finished my first marathon! 🏃‍♀️",
    author: "Sarah",
    likes: 24,
    position: { top: "15%", left: "5%", rotate: -6 },
    delay: 0,
  },
  {
    id: 2,
    content: "Coffee and coding all night ☕",
    author: "Alex",
    likes: 12,
    position: { top: "25%", right: "8%", rotate: 8 },
    delay: 0.3,
  },
  {
    id: 3,
    content: "Sunset views from the mountains 🌄",
    author: "Maya",
    likes: 45,
    position: { bottom: "20%", left: "8%", rotate: 5 },
    delay: 0.6,
  },
  {
    id: 4,
    content: "New beginnings start today! ✨",
    author: "Jordan",
    likes: 38,
    position: { bottom: "15%", right: "5%", rotate: -4 },
    delay: 0.9,
  },
];

export default function Hero() {
  const styles = useThemeStyles();

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 theme-gradient-hero" />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-400 theme-blob rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-400 theme-blob rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating memory cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          transition={{ 
            delay: card.delay,
            duration: 0.6,
          }}
          className="absolute hidden lg:block"
          style={{
            top: card.position.top,
            bottom: card.position.bottom,
            left: card.position.left,
            right: card.position.right,
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [card.position.rotate, card.position.rotate + 2, card.position.rotate],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            }}
            className={`${styles.glass.card} rounded-2xl p-4 ${styles.shadow.card} border ${styles.tw('border-sky-100', 'border-sky-900')} max-w-[240px]`}
          >
            <p className="text-sm mb-3">{card.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{card.author}</span>
              <div className="flex items-center gap-1 text-xs text-sky-500">
                <Heart className="w-3 h-3 fill-sky-500" />
                <span>{card.likes}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${styles.glass.card} shadow-lg border ${styles.tw('border-sky-100', 'border-sky-900')}`}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
            </motion.div>
            <span className={`text-sm ${styles.tw('text-sky-900', 'text-sky-100')}`}>Where memories echo forever</span>
            <div className={`flex items-center gap-1 px-2 py-0.5 ${styles.tw('bg-sky-50', 'bg-sky-900/50')} rounded-full`}>
              <TrendingUp className="w-3 h-3 text-sky-600" />
              <span className="text-xs text-sky-700">Live</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
              Your Digital
              <span className={`block mt-3 bg-gradient-to-r ${styles.gradient.text} bg-clip-text text-transparent`}>
                Memory Wall
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Share your thoughts, memories, and reflections in real-time.
            EchoBoard is more than a social wall—it's a living, breathing
            digital time capsule where every voice matters.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button size="lg" className={`min-w-[200px] h-12 group ${styles.shadow.button}`}>
              Get Started Free
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className={`min-w-[200px] h-12 border-2 ${styles.hover.bg} ${styles.hover.border}`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Real-time updates</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12"
          >
            {[
              { value: "10,000+", label: "Active Users", icon: "👥" },
              { value: "100,000+", label: "Memories Shared", icon: "💭" },
              { value: "99.9%", label: "Uptime", icon: "⚡" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="relative"
              >
                <div className={`${styles.glass.card} rounded-2xl p-6 border ${styles.tw('border-sky-100', 'border-sky-900')} shadow-sm`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-sky-500 mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
