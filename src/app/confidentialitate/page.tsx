import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Politica de confidentialitate",
  description:
    "Politica de confidentialitate pentru Consumometru: date prelucrate, cookies, Google AdSense, Google Analytics si drepturi GDPR.",
  alternates: {
    canonical: "/confidentialitate"
  },
  openGraph: {
    title: "Politica de confidentialitate",
    description:
      "Vezi cum trateaza Consumometru datele, cookies, Google AdSense, Google Analytics si drepturile GDPR.",
    url: "/confidentialitate",
    type: "article",
    locale: "ro_RO"
  }
};

export default function PrivacyPage() {
  return (
    <LegalPage
      breadcrumbPath="/confidentialitate"
      title="Politica de confidentialitate"
      intro="Aceasta politica explica modul in care pot fi prelucrate datele atunci cand folosesti Consumometru. Site-ul este un proiect web informativ, destinat estimarii consumului aparatelor electrice. Nu este necesar sa iti creezi cont pentru a folosi calculatorul."
      sections={[
        {
          title: "Cine opereaza acest site",
          body: "Consumometru este un proiect web informativ. Nu afisam date de firma daca acestea nu exista sau nu sunt necesare pentru prezentarea proiectului. Pentru intrebari despre confidentialitate, poti folosi datele din pagina Contact."
        },
        {
          title: "Ce date pot fi colectate",
          body: "Poti folosi calculatorul fara cont si fara sa introduci nume, adresa sau alte date personale directe. Pot fi prelucrate date tehnice obisnuite, cum ar fi adresa IP, tipul browserului, dispozitivul folosit, paginile accesate, ora vizitei, sursa traficului, preferintele pentru cookies si interactiunile de baza cu site-ul. Valorile introduse in calculator sunt folosite pentru afisarea rezultatului si, in mod obisnuit, nu identifica o persoana."
        },
        {
          title: "Scopurile prelucrarii",
          body: "Datele necesare sunt folosite pentru functionarea site-ului, salvarea preferintelor de consimtamant si securitate. Datele analytics, daca accepti aceasta categorie, ne pot ajuta sa intelegem ce pagini sunt utile, ce functionalitati sunt folosite si unde trebuie imbunatatita experienta. Datele de marketing, daca accepti aceasta categorie, pot permite afisarea si masurarea reclamelor."
        },
        {
          title: "Cookies si consimtamant",
          body: "Site-ul foloseste cookies necesare pentru functionare si pentru pastrarea optiunilor tale. Cookies analytics si marketing sunt optionale si se activeaza doar in functie de consimtamantul tau. Poti modifica oricand preferintele din butonul Setari cookies disponibil pe site."
        },
        {
          title: "Google AdSense",
          body: "Site-ul este pregatit pentru monetizare prin Google AdSense. Daca accepti categoria Marketing, Google si partenerii sai pot folosi cookies sau identificatori similari pentru afisarea, personalizarea si masurarea reclamelor, conform propriilor politici. Daca nu accepti marketingul, scripturile publicitare non-esentiale nu ar trebui incarcate de site."
        },
        {
          title: "Google Analytics",
          body: "Site-ul este pregatit sa foloseasca Google Analytics daca este configurat un identificator Google Analytics. In acest caz, analytics se incarca doar dupa acordul tau pentru categoria Analytics. Configuratia foloseste anonimizarea IP acolo unde este disponibila si Google Consent Mode pentru transmiterea starii consimtamantului."
        },
        {
          title: "Google Consent Mode v2",
          body: "Inainte de alegerea ta, semnalele pentru stocare publicitara, date publicitare, personalizare reclame si analytics sunt setate implicit pe denied. Dupa ce iti exprimi optiunile, site-ul actualizeaza starea consimtamantului pentru categoriile acceptate."
        },
        {
          title: "Temeiuri legale",
          body: "Pentru cookies necesare si securitatea site-ului, prelucrarea se bazeaza pe interes legitim sau pe necesitatea furnizarii serviciului cerut. Pentru analytics si marketing, prelucrarea se bazeaza pe consimtamantul tau, pe care il poti retrage oricand."
        },
        {
          title: "Servicii terte",
          body: "Anumite servicii, precum Google AdSense sau Google Analytics, pot prelucra date in calitate de furnizori terti. Aceste servicii au propriile politici de confidentialitate si pot prelucra date conform setarilor tale de consimtamant si politicilor Google."
        },
        {
          title: "Cat timp sunt pastrate datele",
          body: "Preferintele pentru cookies sunt pastrate local in browser pentru a nu te intreba la fiecare vizita. Durata de pastrare a datelor procesate de servicii terte, precum Google, este stabilita conform politicilor acestor furnizori si setarilor serviciilor respective."
        },
        {
          title: "Drepturile tale conform GDPR",
          body: "In conditiile GDPR, poti avea dreptul de acces, rectificare, stergere, restrictionare, portabilitate, opozitie si retragere a consimtamantului. De asemenea, ai dreptul sa depui o plangere la autoritatea de supraveghere competenta. Pentru solicitari privind datele personale, foloseste pagina Contact."
        },
        {
          title: "Disclaimer privind calculatorul",
          body: "Rezultatele generate de calculator sunt estimative. Consumul real poate varia in functie de modelul aparatului, setari, vechime, temperatura, utilizare si pretul exact al energiei. Pretul kWh poate varia in functie de furnizor, contract si perioada."
        }
      ]}
    />
  );
}
