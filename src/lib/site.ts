export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Consumometru",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://consumometru.ro",
  contactEmail: "contact@consumometru.ro",
  description:
    "Calculeaza consumul electric si costul lunar pentru aparatele din casa. Include formula kWh, exemple reale, ghiduri pe aparate si recomandari pentru reducerea facturii."
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
