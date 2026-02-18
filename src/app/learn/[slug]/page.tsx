import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { learnPages } from "@/lib/learn";
import { bridges } from "@/lib/bridges";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import ShareButton from "@/components/ShareButton";

export async function generateStaticParams() {
  return learnPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = learnPages.find((p) => p.slug === slug);
  if (!page) return {};

  const title = page.title;
  const description = page.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/learn/${page.slug}`,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/learn/${page.slug}`,
      type: "article",
    },
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = learnPages.find((p) => p.slug === slug);
  if (!page) return notFound();

  const related = (page.relatedBridgeSlugs ?? [])
    .map((s) => bridges.find((b) => b.slug === s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: `${SITE_URL}/learn/${page.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl font-extrabold tracking-tight">{page.title}</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="text-sm font-semibold text-accent hover:text-accentDeep transition"
            >
              All explainers
            </Link>
            <ShareButton title={page.title} url={`${SITE_URL}/learn/${page.slug}`} path={`/learn/${page.slug}`} />
          </div>
        </div>

        <p className="mt-3 text-ink/70">{page.description}</p>

        <div className="mt-8 space-y-8 text-[15px] leading-7 text-ink/85">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-extrabold tracking-tight text-ink">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {related.length ? (
          <div className="mt-10">
            <div className="text-xs font-bold tracking-wide text-ink/60">
              EXAMPLES
            </div>
            <div className="mt-3 grid gap-3">
              {related.map((b) => (
                <Link
                  key={b!.slug}
                  href={`/bridges/${b!.slug}`}
                  className="rounded-[18px] bg-paper/60 border border-black/10 px-5 py-4 hover:bg-paper/75 transition"
                >
                  <div className="font-bold">{b!.name}</div>
                  <div className="text-sm text-ink/65">
                    {b!.country} • {b!.type}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
