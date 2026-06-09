import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScenarioGuidePage } from "@/components/scenario-guide-page";
import { allScenarioPages } from "@/data/seoScenarioPages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const pages = allScenarioPages.filter((page) => page.basePath === "consum-locuinta");

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);

  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/${page.basePath}/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/${page.basePath}/${page.slug}`,
      type: "article",
      locale: "ro_RO"
    }
  };
}

export default async function HousingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);

  if (!page) notFound();

  return <ScenarioGuidePage page={page} />;
}
