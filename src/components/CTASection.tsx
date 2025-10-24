"use client"
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useThemeStyles } from "./ThemeProvider";

export default function CTASection() {
  const styles = useThemeStyles();

  return (
    <section className={`px-6 py-20 bg-gradient-to-br ${styles.tw('from-sky-50 via-blue-50/50 to-sky-50', 'from-sky-950/30 via-blue-950/20 to-sky-950/30')} relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-sky-500 theme-blob rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-400 theme-blob rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-sky-500" />
            <Sparkles className="w-4 h-4 text-sky-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl max-w-3xl mx-auto">
            Ready to create your first echo?
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of people sharing their stories, thoughts, and
            memories. Your voice deserves to be heard. Start your journey with
            EchoBoard today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="min-w-[200px] group">
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" size="lg" className="min-w-[200px]">
              Learn More
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Setup in minutes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
