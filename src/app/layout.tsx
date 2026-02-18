import type { Metadata } from "next";
import { Geist, Space_Grotesk, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { BridgeProvider } from "@/components/BridgeContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-condensed",
});

export const metadata: Metadata = {
  title: "BridgeAtlas",
  description: "A warm, curated atlas of iconic bridges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${spaceGrotesk.variable} ${barlowCondensed.variable} min-h-dvh bg-paper text-ink antialiased`}>
        <BridgeProvider>{children}</BridgeProvider>
      </body>
    </html>
  );
}
