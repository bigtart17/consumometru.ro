import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact pentru intrebari despre Consumometru, confidentialitate, cookies, GDPR sau corectarea informatiilor.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact",
    description:
      "Trimite intrebari despre Consumometru, confidentialitate, cookies, GDPR sau corectarea informatiilor.",
    url: "/contact",
    type: "article",
    locale: "ro_RO"
  }
};

export default function ContactPage() {
  return (
    <LegalPage
      breadcrumbPath="/contact"
      title="Contact"
      intro="Pentru intrebari despre site, continut, confidentialitate, cookies sau corectarea unei informatii, ne poti scrie prin email. Consumometru este un proiect web informativ, iar mesajele sunt tratate in functie de natura solicitarii si volumul primit."
      sections={[
        {
          title: "Adresa de contact",
          body: "Ne poti contacta la contact@consumometru.ro. Aceasta adresa poate fi folosita pentru intrebari generale, observatii despre continut, solicitari privind confidentialitatea sau sesizari legate de functionarea site-ului."
        },
        {
          title: "Ce informatii sa incluzi",
          body: "Pentru o intrebare despre un calcul, include pagina accesata, aparatul analizat, puterea introdusa in W, orele de utilizare, zilele pe luna si pretul kWh folosit. Nu trimite date sensibile sau informatii care nu sunt necesare pentru intelegerea solicitarii."
        },
        {
          title: "Solicitari privind datele personale",
          body: "Pentru cereri legate de GDPR, confidentialitate sau cookies, mentioneaza clar solicitarea: acces, stergere, rectificare, opozitie, restrictionare sau retragerea consimtamantului. Vom raspunde in limitele informatiilor disponibile si ale obligatiilor legale aplicabile."
        },
        {
          title: "Google AdSense si cookies",
          body: "Daca mesajul tau se refera la reclame, cookies sau consimtamant, mentioneaza dispozitivul, browserul si optiunile alese in bannerul de cookies. Site-ul poate folosi Google AdSense si, daca este configurat, Google Analytics, doar conform preferintelor exprimate."
        },
        {
          title: "Despre acuratetea calculelor",
          body: "Rezultatele calculatorului sunt estimative. Daca semnalezi o diferenta fata de factura ta, tine cont ca factura include toate aparatele din locuinta si ca pretul kWh poate varia in functie de furnizor, contract si perioada."
        },
        {
          title: "Date de firma",
          body: "Nu inventam date de firma sau sediu daca acestea nu sunt asociate proiectului. Daca in viitor proiectul va fi operat printr-o entitate juridica, informatiile relevante vor fi actualizate pe aceasta pagina si in documentele legale."
        },
        {
          title: "Timp de raspuns",
          body: "Incercam sa raspundem intr-un timp rezonabil, dar nu putem garanta raspuns imediat pentru toate mesajele. Solicitarile legate de confidentialitate si date personale sunt tratate cu prioritate."
        }
      ]}
    />
  );
}
