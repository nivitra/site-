import type { MetadataRoute } from "next";
import { languages } from "@/lib/languages";
import { industries } from "@/lib/industries";
import { posts } from "@/lib/posts";

const BASE = "https://speaksy.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/platform",
    "/solutions",
    "/pricing",
    "/languages",
    "/languages/explore",
    "/customers",
    "/integrations",
    "/about",
    "/careers",
    "/security",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : p === "/languages" || p === "/pricing" ? 0.9 : 0.7,
  }));

  const languagePages = languages.map((l) => ({
    url: `${BASE}/languages/${l.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const industryPages = industries.map((i) => ({
    url: `${BASE}/solutions/${i.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...languagePages, ...industryPages, ...blogPages];
}
