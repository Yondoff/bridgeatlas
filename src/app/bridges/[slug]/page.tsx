import Link from "next/link";
import type { Metadata } from "next";
import { BridgeProvider } from "@/components/BridgeContext";
import { getBridge } from "@/lib/bridges";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import BridgeDetailClient from "./BridgeDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bridge = getBridge(slug);
  if (!bridge) return { title: "Not found" };

  const title = bridge.name;
  const description = bridge.tagline || bridge.intro;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/bridges/${bridge.slug}`,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/bridges/${bridge.slug}`,
      type: "article",
      images: bridge.photo?.url ? [bridge.photo.url] : undefined,
    },
  };
}

export default async function BridgeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bridge = getBridge(slug);

  if (!bridge) {
    return (
      <div className="min-h-dvh">
        <main className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10">
            <h1 className="text-2xl font-semibold">Not found</h1>
            <p className="mt-3 text-sm text-ink/70">Unknown bridge.</p>
            <div className="mt-6">
              <Link
                href="/bridges"
                className="rounded-full bg-accent text-white px-5 py-2.5 text-sm font-semibold hover:bg-accentDeep transition"
              >
                Back to gallery
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <BridgeProvider bridgeSlug={bridge.slug}>
      <BridgeDetailClient bridge={bridge} />
    </BridgeProvider>
  );
}
