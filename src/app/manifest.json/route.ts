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
      categories: ["utilities", "finance", "education"]
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
