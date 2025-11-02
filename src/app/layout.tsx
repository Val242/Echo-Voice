import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { TarnstackProvider } from "@/components/providers.tsx/tarnstack-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ThemeProvider>
            <TarnstackProvider>{children}</TarnstackProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
