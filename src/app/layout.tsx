import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { BottomNav } from "@/components/sidebar/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexusLearn — Student Dashboard",
  description:
    "A futuristic, hardware-accelerated student learning dashboard with live course tracking, activity insights, and a buttery-smooth user experience.",
  keywords: ["learning", "dashboard", "courses", "education", "student"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground flex">
        {/* Sidebar — Desktop & Tablet */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>

        {/* Bottom Navigation — Mobile Only */}
        <BottomNav />
      </body>
    </html>
  );
}
