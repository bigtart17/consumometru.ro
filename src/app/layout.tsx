import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ConsentManager } from "@/components/consent-manager";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Consumometru - calculator consum electric si cost energie",
    template: "%s | Consumometru"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Consumometru - calculator consum electric si cost energie",
    description:
      "Afla cat consuma aparatele din casa, compara costuri lunare si vezi exemple utile pentru factura de energie.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Consumometru - calculator consum electric si cost energie"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Consumometru - calculator consum electric",
    description:
      "Afla cat consuma aparatele din casa, compara costuri lunare si vezi exemple utile pentru factura de energie.",
    images: [absoluteUrl("/og-image.png")]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f9f6e"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ro-RO"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `}
        </Script>
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <ConsentManager />
      </body>
    </html>
  );
}
