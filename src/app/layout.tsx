import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PWAInstaller from "@/components/PWAInstaller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SteakFinder - Find Your Nearest Steak Fix",
  description: "Discover steakhouses, Brazilian BBQ, Korean BBQ, and more near you. Perfect for keto and carnivore travelers.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.svg",
    apple: "/icon-192.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SteakFinder",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SteakFinder",
    title: "SteakFinder - Find Your Nearest Steak Fix",
    description: "Discover steakhouses, Brazilian BBQ, Korean BBQ, and more near you.",
  },
  twitter: {
    card: "summary",
    title: "SteakFinder - Find Your Nearest Steak Fix",
    description: "Discover steakhouses, Brazilian BBQ, Korean BBQ, and more near you.",
  },
};

export const viewport: Viewport = {
  themeColor: "#b22222",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SteakFinder" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white`}>
        {children}
        <PWAInstaller />
      </body>
    </html>
  );
}
