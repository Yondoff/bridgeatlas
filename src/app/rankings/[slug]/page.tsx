import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { rankingPages } from "@/lib/rankings";
import { getBridge } from "@/lib/bridges";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import ShareButton from "@/components/ShareButton";

export async function generateStaticParams() {
  return rankingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = rankingPages.find((p) => p.slug === slug);
  if (!page) return {};

  const title = page.title;
  const description = page.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/rankings/${page.slug}`,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/rankings/${page.slug}`,
      type: "article",
    },
  };
}

export default async function RankingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = rankingPages.find((p) => p.slug === slug);
  if (!page) return notFound();

  const items = page.bridgeSlugs
    .map((s) => getBridge(s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    description: page.description,
    itemListElement: items.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: b!.name,
      url: `${SITE_URL}/bridges/${b!.slug}`,
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl font-extrabold tracking-tight">{page.title}</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/rankings"
              className="text-sm font-semibold text-accent hover:text-accentDeep transition"
            >
              All rankings
            </Link>
            <ShareButton title={page.title} url={`${SITE_URL}/rankings/${page.slug}`} path={`/rankings/${page.slug}`} />
          </div>
        </div>

        <p className="mt-3 text-ink/70">{page.intro}</p>

        <ol className="mt-8 grid gap-3">
          {items.map((b, idx) => (
            <li key={b!.slug}>
              <Link
                href={`/bridges/${b!.slug}`}
                className="block rounded-[22px] bg-paper/60 border border-black/10 px-6 py-5 hover:bg-paper/75 transition"
              >
                <div className="text-xs font-bold tracking-wide text-ink/60">
                  #{idx + 1}
                </div>
                <div className="text-xl font-bold">{b!.name}</div>
                <div className="mt-1 text-sm text-ink/65">
                  {b!.country} • {b!.type} • {b!.length}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
