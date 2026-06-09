import { siteConfig } from "@/lib/site";

export function GET() {
  return Response.json(
    {
      name: siteConfig.name,
      short_name: siteConfig.name,
      description: siteConfig.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#f0fdf4",
      theme_color: "#0f9f6e",
      lang: "ro-RO",
      orientation: "portrait-primary",
      categories: ["utilities", "finance", "education"],
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
