import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bargreenenergy.com";
  const pages = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/technology", priority: 0.7 },
    { path: "/sustainability", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
    { path: "/book-test-ride", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}