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

import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "The engineering atlas of the world’s greatest bridges: specs, explanations, and context — built for curious builders.",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "The engineering atlas of the world’s greatest bridges: specs, explanations, and context.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "The engineering atlas of the world’s greatest bridges: specs, explanations, and context.",
  },
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
