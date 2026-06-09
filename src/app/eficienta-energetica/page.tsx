import type { Metadata } from "next";
import { SeoHubPage } from "@/components/seo-hub-page";
import { hubBySlug } from "@/data/seoHubs";

const hub = hubBySlug.get("eficienta-energetica")!;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.metaDescription,
  alternates: {
    canonical: `/${hub.slug}`
  },
  openGraph: {
    title: hub.title,
    description: hub.metaDescription,
    url: `/${hub.slug}`,
    type: "article",
    locale: "ro_RO"
  }
};

export default function EficientaEnergeticaPage() {
  return <SeoHubPage hub={hub} />;
}
