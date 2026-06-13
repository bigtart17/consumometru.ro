import type { MetadataRoute } from "next";
import { seoAppliancePages } from "@/data/seoAppliancePages";
import { seoComparisons } from "@/data/seoComparisons";
import { seoHubs } from "@/data/seoHubs";
import { allScenarioPages } from "@/data/seoScenarioPages";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const consumptionPages = seoAppliancePages.map((page) => ({
    url: `${siteConfig.url}/cat-consuma/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));
  const hubPages = seoHubs.map((hub) => ({
    url: `${siteConfig.url}/${hub.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));
  const comparisonPages = seoComparisons.map((comparison) => ({
    url: `${siteConfig.url}/comparatii/${comparison.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.78
  }));
  const scenarioPages = allScenarioPages.map((page) => ({
    url: `${siteConfig.url}/${page.basePath}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.76
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteConfig.url}/calculeaza`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.86
    },
    {
      url: `${siteConfig.url}/aparate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.86
    },
    {
      url: `${siteConfig.url}/ghiduri`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82
    },
    ...hubPages,
    ...scenarioPages,
    {
      url: `${siteConfig.url}/comparatii`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75
    },
    ...comparisonPages,
    ...consumptionPages,
    {
      url: `${siteConfig.url}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${siteConfig.url}/confidentialitate`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${siteConfig.url}/termeni`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${siteConfig.url}/despre`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${siteConfig.url}/metodologie`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.45
    },
    {
      url: `${siteConfig.url}/surse`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.45
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
