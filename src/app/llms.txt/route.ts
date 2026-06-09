import { absoluteUrl, siteConfig } from "@/lib/site";
import { seoAppliancePages } from "@/data/seoAppliancePages";
import { seoComparisons } from "@/data/seoComparisons";
import { seoHubs } from "@/data/seoHubs";
import { allScenarioPages } from "@/data/seoScenarioPages";

export function GET() {
  const guideLinks = seoAppliancePages
    .map((page) => `- ${page.h1}: ${absoluteUrl(`/cat-consuma/${page.slug}`)}`)
    .join("\n");
  const hubLinks = seoHubs
    .map((hub) => `- ${hub.h1}: ${absoluteUrl(`/${hub.slug}`)}`)
    .join("\n");
  const comparisonLinks = seoComparisons
    .map((comparison) => `- ${comparison.h1}: ${absoluteUrl(`/comparatii/${comparison.slug}`)}`)
    .join("\n");
  const scenarioLinks = allScenarioPages
    .map((page) => `- ${page.h1}: ${absoluteUrl(`/${page.basePath}/${page.slug}`)}`)
    .join("\n");

  const body = `# ${siteConfig.name}

${siteConfig.name} este un calculator si ghid in limba romana pentru estimarea consumului electric al aparatelor din locuinta.

## Scop

Site-ul ajuta utilizatorii din Romania sa estimeze consumul in kWh si costul aproximativ pe zi, luna si an, folosind puterea aparatului, orele de utilizare, zilele pe luna si pretul energiei electrice.

## Pagini importante

- Homepage si calculator principal: ${siteConfig.url}
- Politica de confidentialitate: ${absoluteUrl("/confidentialitate")}
- Politica de cookies: ${absoluteUrl("/cookies")}
- Termeni si conditii: ${absoluteUrl("/termeni")}
- Contact: ${absoluteUrl("/contact")}
- Despre proiect: ${absoluteUrl("/despre")}
- Metodologie calcul: ${absoluteUrl("/metodologie")}
- Surse si valori orientative: ${absoluteUrl("/surse")}

## Ghiduri pentru aparate

${guideLinks}

## Hub-uri tematice

${hubLinks}

## Comparatii

${comparisonLinks}

## Ghiduri de cost si locuinta

${scenarioLinks}

## Nota

Rezultatele sunt estimative si pot varia in functie de modelul aparatului, setari, vechime, durata reala de utilizare, furnizor si pretul efectiv al energiei.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
