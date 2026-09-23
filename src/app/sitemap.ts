import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calchub.app";

  const calcPages = calculators.map((c) => ({
    url: `${base}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...calcPages,
  ];
}
