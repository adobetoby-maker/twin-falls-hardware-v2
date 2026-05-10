import type { MetadataRoute } from "next";
import { siteInfo } from "@/lib/siteInfo";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteInfo.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, priority: 1.0 },
    { url: `${base}/products`, lastModified: now, priority: 0.9 },
    { url: `${base}/cart`, lastModified: now, priority: 0.5 },
    { url: `${base}/contractors`, lastModified: now, priority: 0.8 },
    { url: `${base}/special-orders`, lastModified: now, priority: 0.8 },
    { url: `${base}/about`, lastModified: now, priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/products/${c.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.category}/${p.id}`,
    lastModified: now,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
