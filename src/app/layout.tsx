import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReactAtoms - Atomic React Components",
  description:
    "An open source collection of atomic, reusable React components for building stunning user interfaces. Copy-paste ready code with live previews.",
  keywords: [
    "React",
    "React Components",
    "UI Library",
    "Component Library",
    "React Animations",
    "Tailwind CSS",
    "TypeScript",
  ],
  authors: [{ name: "ReactAtoms" }],
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ReactAtoms - Atomic React Components",
    description:
      "An open source collection of atomic, reusable React components for building stunning user interfaces.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ReactAtoms Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReactAtoms - Atomic React Components",
    description:
      "An open source collection of atomic, reusable React components for building stunning user interfaces.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
