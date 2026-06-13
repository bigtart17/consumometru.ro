import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Politica de cookies",
  description:
    "Politica de cookies pentru Consumometru: cookies necesare, analytics, marketing, Google AdSense si Google Consent Mode v2.",
  alternates: {
    canonical: "/cookies"
  },
  openGraph: {
    title: "Politica de cookies",
    description:
      "Afla ce cookies foloseste Consumometru si cum sunt tratate analytics, marketing, AdSense si Consent Mode v2.",
    url: "/cookies",
    type: "article",
    locale: "ro_RO"
  }
};

export default function CookiesPage() {
  return (
    <LegalPage
      breadcrumbPath="/cookies"
      title="Politica de cookies"
      intro="Aceasta pagina explica ce tipuri de cookies si tehnologii similare pot fi folosite pe Consumometru. Cookies necesare ajuta site-ul sa functioneze, iar cookies analytics si marketing se activeaza doar in functie de optiunile tale."
      sections={[
        {
          title: "Ce sunt cookies",
          body: "Cookies sunt fisiere mici sau identificatori stocati in browser, folositi pentru functionarea site-ului, pastrarea preferintelor sau masurarea interactiunilor. Tehnologii similare pot include local storage, pixeli sau identificatori folositi de servicii terte."
        },
        {
          title: "Cookies necesare",
          body: "Acestea sunt folosite pentru functionarea site-ului, afisarea corecta a calculatorului si pastrarea preferintelor tale de consimtamant. De exemplu, site-ul poate salva local alegerea ta privind categoriile de cookies. Cookies necesare nu pot fi dezactivate din banner, deoarece sunt importante pentru functionarea de baza."
        },
        {
          title: "Cookies analytics",
          body: "Cookies analytics pot fi folosite pentru a intelege cum este utilizat site-ul: pagini vizitate, tipuri de dispozitive, surse de trafic si interactiuni generale. Acestea se activeaza doar daca alegi categoria Analytics. Site-ul este pregatit pentru Google Analytics daca exista o configurare activa."
        },
        {
          title: "Cookies marketing si Google AdSense",
          body: "Cookies marketing pot fi folosite pentru afisarea si masurarea reclamelor prin servicii precum Google AdSense Auto Ads. Acestea se activeaza doar daca accepti categoria Marketing. Google si partenerii sai pot folosi cookies sau identificatori similari conform politicilor proprii."
        },
        {
          title: "Google Consent Mode v2",
          body: "Site-ul transmite catre Google starea consimtamantului pentru analytics si reclame. Implicit, semnalele pentru analytics si publicitate sunt setate pe denied pana cand alegi altceva. Dupa actualizarea preferintelor, starea consimtamantului este transmisa corespunzator."
        },
        {
          title: "Cum schimbi preferintele",
          body: "Poti apasa oricand butonul Setari cookies din coltul paginii pentru a modifica acordul. Daca respingi optiunile analytics si marketing, scripturile non-esentiale nu sunt incarcate de site."
        },
        {
          title: "Cum poti sterge cookies",
          body: "Poti sterge cookies si datele locale direct din setarile browserului. Pasii difera in functie de browser, dar de obicei se gasesc in sectiunea Confidentialitate, Privacy sau Site data."
        },
        {
          title: "Legatura cu estimarile calculatorului",
          body: "Valorile introduse in calculator sunt folosite pentru afisarea rezultatului estimativ. Ele nu garanteaza consumul real si nu inlocuiesc factura de energie, masuratori exacte sau datele producatorului aparatului."
        }
      ]}
    />
  );
}
