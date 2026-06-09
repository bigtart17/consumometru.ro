import { permanentRedirect } from "next/navigation";
import { appliancePresets } from "@/data/appliancePresets";

type AppliancePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const canonicalGuides: Record<string, string> = {
  "aer-conditionat": "/cat-consuma/aer-conditionat-12000-btu",
  "aer-conditionat-9000-btu": "/cat-consuma/aer-conditionat-9000-btu",
  "aer-conditionat-18000-btu": "/cat-consuma/aer-conditionat-18000-btu",
  ventilator: "/cat-consuma/ventilator",
  dezumidificator: "/cat-consuma/dezumidificator",
  frigider: "/cat-consuma/frigider",
  "frigider-vechi": "/cat-consuma/frigider",
  "frigider-eficient": "/cat-consuma/frigider",
  "boiler-electric": "/cat-consuma/boiler-electric-80l",
  "centrala-electrica": "/cat-consuma/boiler-electric-80l",
  "pc-gaming": "/cat-consuma/pc-gaming",
  "desktop-pc": "/cat-consuma/pc-gaming",
  televizor: "/cat-consuma/televizor",
  "calorifer-electric": "/cat-consuma/calorifer-electric",
  aeroterma: "/cat-consuma/aeroterma",
  "convector-electric": "/cat-consuma/convector-electric",
  "radiator-ulei": "/cat-consuma/radiator-ulei",
  "panou-radiant": "/cat-consuma/panou-radiant",
  "masina-de-spalat": "/cat-consuma/masina-de-spalat",
  congelator: "/cat-consuma/congelator",
  "lada-frigorifica": "/cat-consuma/lada-frigorifica",
  "masina-spalat-vase": "/cat-consuma/masina-spalat-vase",
  "uscator-rufe": "/cat-consuma/uscator-rufe",
  "cuptor-electric": "/cat-consuma/cuptor-electric",
  "cuptor-microunde": "/cat-consuma/cuptor-microunde",
  "fierbator-electric": "/cat-consuma/fierbator-electric",
  espressor: "/cat-consuma/espressor",
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
