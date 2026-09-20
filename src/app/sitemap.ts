import type { MetadataRoute } from "next";
import { attractions } from "@/data/explore";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://srishahrukhlakeresort.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic attraction excursion pages for high organic search traffic
  const attractionRoutes: MetadataRoute.Sitemap = attractions.map((attraction) => ({
    url: `${baseUrl}/explore/${attraction.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: attraction.slug === "yala-national-park" ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...attractionRoutes];
}
