import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ConsentManager } from "@/components/consent-manager";
import { siteConfig } from "@/lib/site";
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
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Consumometru - calculator consum electric",
    description:
      "Afla cat consuma aparatele din casa, compara costuri lunare si vezi exemple utile pentru factura de energie."
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
