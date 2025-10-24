"use client"

import { motion } from "motion/react";
import { MessageSquare, Mail, MapPin, Phone, Send, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top section with newsletter */}
        <div className="py-16 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="text-sm text-sky-300">Stay Updated</span>
              </div>
              <h3 className="text-3xl md:text-4xl mb-4">
                Join our community
              </h3>
              <p className="text-slate-300 text-lg">
                Get the latest updates, tips, and stories delivered to your inbox. 
                Be the first to know about new features and community highlights.
              </p>
            </motion.div>

            {/* Newsletter form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20"
                  disabled={subscribed}
                >
                  {subscribed ? (
                    <>
                      <Heart className="w-4 h-4 mr-2 fill-white" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-slate-400 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl">EchoBoard</span>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Your digital memory wall where every voice echoes forever. 
                Share thoughts, memories, and reflections with a vibrant community 
                in real-time.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:hello@echoboard.io" className="text-sm">
                    hello@echoboard.io
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-sm">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    123 Memory Lane<br />
                    San Francisco, CA 94102
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Product links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="mb-6 text-white">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'FAQ', 'Roadmap', 'Changelog', 'API'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-sky-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Blog', 'Careers', 'Press Kit', 'Partners', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-sky-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'GDPR', 'Licenses'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-sky-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
              <p>© 2025 EchoBoard. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                <span>by the EchoBoard Team</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                {
                  name: 'Twitter',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  ),
                },
                {
                  name: 'GitHub',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                },
                {
                  name: 'Discord',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-white/10 hover:border-sky-500/50 transition-all duration-200"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
