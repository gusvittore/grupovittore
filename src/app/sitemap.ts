import type { MetadataRoute } from "next";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/blog/content";

const SITE_URL = "https://grupovittore.com.br";

const PUBLIC_ROUTES = [
  "/",
  "/sobre",
  "/blog",
  "/assessoria-comercial",
  "/materiais-impressos",
  "/politicas-de-privacidade",
  "/termos-de-uso",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
  }));

  const blogArticles: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => {
    const post = getBlogPostBySlug(slug);
    const lastModified = post?.updatedAt || post?.publishedAt;

    return {
      url: `${SITE_URL}/blog/${slug}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [...publicPages, ...blogArticles];
}
