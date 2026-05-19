import { permanentRedirect } from "next/navigation";
import { appliancePresets } from "@/data/appliancePresets";

type AppliancePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const canonicalGuides: Record<string, string> = {
  "aer-conditionat": "/cat-consuma/aer-conditionat-12000-btu",
  frigider: "/cat-consuma/frigider",
  "frigider-vechi": "/cat-consuma/frigider",
  "frigider-eficient": "/cat-consuma/frigider",
  "boiler-electric": "/cat-consuma/boiler-electric-80l",
  "centrala-electrica": "/cat-consuma/boiler-electric-80l",
  "pc-gaming": "/cat-consuma/pc-gaming",
  "desktop-pc": "/cat-consuma/pc-gaming",
  televizor: "/cat-consuma/televizor",
  "calorifer-electric": "/cat-consuma/calorifer-electric",
  "masina-de-spalat": "/cat-consuma/masina-de-spalat",
  "uscator-rufe": "/cat-consuma/uscator-rufe",
  "cuptor-electric": "/cat-consuma/cuptor-electric",
  laptop: "/cat-consuma/pc-gaming",
  "bec-led": "/cat-consuma/bec-led",
  "bec-incandescent": "/cat-consuma/bec-led",
  "plita-electrica": "/cat-consuma/cuptor-electric"
};

export function generateStaticParams() {
  return appliancePresets.map((preset) => ({
    slug: preset.slug
  }));
}

export default async function AppliancePage({ params }: AppliancePageProps) {
  const { slug } = await params;
  permanentRedirect(canonicalGuides[slug] ?? "/#calculator");
}
