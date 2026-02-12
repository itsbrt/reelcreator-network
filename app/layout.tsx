import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReelCreator Network | Find Verified Mobile Reel Creators in India",
  description: "Discover verified mobile reel creators in your city for weddings, events, and celebrations. Join free or find creators instantly.",
  openGraph: {
    title: "ReelCreator Network",
    description: "The trusted platform for finding mobile reel creators.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
