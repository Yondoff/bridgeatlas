import type { Metadata } from "next";
import { Geist, Space_Grotesk, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { BridgeProvider } from "@/components/BridgeContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LanguageToggle from "@/components/LanguageToggle";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    // This is what Google often uses for the blue link when the homepage is shown.
    // Keep it descriptive; Google may still rewrite, but this strongly influences it.
    default: "BridgeAtlas — The engineering atlas of the world’s greatest bridges",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "The engineering atlas of the world’s greatest bridges. Bridge profiles with specs, sources, and real explanations — plus rankings and evergreen lessons.",
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "BridgeAtlas — The engineering atlas of the world’s greatest bridges",
    description:
      "Bridge profiles with specs, sources, and real explanations — plus rankings and evergreen lessons.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BridgeAtlas — The engineering atlas of the world’s greatest bridges",
    description:
      "Bridge profiles with specs, sources, and real explanations — plus rankings and evergreen lessons.",
  },
};

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} ${barlowCondensed.variable} min-h-dvh bg-paper text-ink antialiased`}
      >
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}

        <BridgeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <LanguageToggle />
        </BridgeProvider>
      </body>
    </html>
  );
}
