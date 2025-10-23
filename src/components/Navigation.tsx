import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button"; // import your reusable button

export default function Navigation() {
  return (
    <div>
      <nav className="flex flex-col md:flex-row items-center justify-between mx-4 md:mx-8 mt-8 gap-4 md:gap-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold">EchoBoard</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div>Features</div>
          <div>Preview</div>
          <div>About</div>
          <div>Contact</div>
        </div>

        {/* Reusable Button */}
        <div className="flex gap-2">
            <Button variant="secondary" size="md">
            Sign In
          </Button>
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </div>
      </nav>
    </div>
  );
}
