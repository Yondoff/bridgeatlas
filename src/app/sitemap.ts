import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { bridges } from "@/lib/bridges";
import { learnPages } from "@/lib/learn";
import { rankingPages } from "@/lib/rankings";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/bridges`, lastModified: now },
    { url: `${SITE_URL}/map`, lastModified: now },
    { url: `${SITE_URL}/learn`, lastModified: now },
    { url: `${SITE_URL}/rankings`, lastModified: now },
  ];

  const bridgeRoutes: MetadataRoute.Sitemap = bridges.map((b) => ({
    url: `${SITE_URL}/bridges/${b.slug}`,
    lastModified: now,
  }));

  const learnRoutes: MetadataRoute.Sitemap = learnPages.map((p) => ({
    url: `${SITE_URL}/learn/${p.slug}`,
    lastModified: now,
  }));

  const rankingRoutes: MetadataRoute.Sitemap = rankingPages.map((p) => ({
    url: `${SITE_URL}/rankings/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...bridgeRoutes, ...learnRoutes, ...rankingRoutes];
}
