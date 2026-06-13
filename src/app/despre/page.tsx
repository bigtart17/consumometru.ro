import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Despre Consumometru",
  description:
    "Afla de ce exista Consumometru, cui ii este util, cum sunt facute estimarile si ce limitari au calculele de consum electric.",
  alternates: {
    canonical: "/despre"
  },
  openGraph: {
    title: "Despre Consumometru",
    description:
      "Afla de ce exista Consumometru, cum sunt facute estimarile si ce limitari au calculele de consum electric.",
    url: "/despre",
    type: "article",
    locale: "ro_RO"
  }
};

export default function AboutPage() {
  return (
    <LegalPage
      breadcrumbPath="/despre"
      title="Despre Consumometru"
      intro="Consumometru este o aplicatie web pentru oamenii din Romania care vor sa inteleaga mai usor cat consuma aparatele electrice din locuinta si cum se transforma acest consum in cost lunar. Nu inlocuieste factura sau datele furnizorului, dar ofera un calcul clar, rapid si usor de verificat."
      sections={[
        {
          title: "De ce exista acest calculator",
          body: "Facturile la energie arata consumul total al locuintei, dar nu explica intotdeauna cat contribuie fiecare aparat. Multi utilizatori vor sa stie daca un boiler, un calorifer electric, un aer conditionat, un frigider vechi sau un PC gaming are un impact mare asupra costului lunar. Calculatorul exista pentru a face aceasta estimare mai accesibila, pornind de la valori simple: puterea aparatului, orele de folosire, zilele de utilizare si pretul energiei."
        },
        {
          title: "Cui ii este util",
          body: "Aplicatia este utila persoanelor care vor sa isi estimeze costurile inainte de a folosi mai mult un aparat, celor care compara doua solutii de incalzire sau racire, chiriasilor care vor sa inteleaga consumul din locuinta si familiilor care incearca sa identifice aparatele cu impact mai mare pe factura. Poate fi folosita si inainte de achizitia unui aparat nou, pentru a compara scenarii realiste de utilizare."
        },
        {
          title: "Cum sunt facute estimarile",
          body: "Calculele folosesc formula standard kWh = W / 1000 × ore × zile. Puterea aparatului este exprimata in W, iar rezultatul este transformat in kWh, unitatea folosita pe factura de energie. Costul se obtine inmultind consumul in kWh cu pretul introdus pentru energia electrica. Preset-urile sunt repere pentru aparate comune si pot fi modificate manual cand ai date mai exacte de pe eticheta, manual sau factura."
        },
        {
          title: "Ce limitari au calculele",
          body: "Rezultatele trebuie citite ca punct de pornire, nu ca valoare garantata. Consumul real este influentat de model, vechime, clasa energetica, temperatura setata, modul de utilizare, izolatia locuintei, ciclurile de functionare ale aparatului si conditiile din incapere. De exemplu, un frigider nu consuma la putere maxima 24 de ore pe zi, iar un aer conditionat inverter isi poate ajusta puterea in timpul functionarii."
        },
        {
          title: "Pretul kWh poate varia",
          body: "Pretul energiei electrice nu este acelasi pentru toata lumea. El este influentat de furnizor, contract, perioada, taxe, tarife reglementate sau conditii comerciale. De aceea, calculatorul permite modificarea pretului pe kWh. Pentru un calcul apropiat de situatia ta, introdu valoarea din factura sau din contractul de energie electrica."
        },
        {
          title: "Cum trebuie folosite rezultatele",
          body: "Rezultatele sunt utile pentru comparatii si decizii practice: cat se schimba costul daca reduci utilizarea cu o ora pe zi, cat poate costa un aparat folosit zilnic sau ce diferente apar intre doua aparate similare. Pentru masuratori exacte, cea mai buna solutie ramane un wattmetru sau datele oficiale ale producatorului si ale furnizorului de energie."
        },
        {
          title: "Transparenta si responsabilitate",
          body: "Aplicatia evita promisiunile absolute. Nu sustinem ca rezultatele vor coincide perfect cu factura lunara, deoarece factura include consumul tuturor aparatelor si poate include tarife sau componente care nu tin de un singur dispozitiv. Obiectivul este sa oferim explicatii clare, calcule verificabile si continut util pentru utilizatorii care vor sa inteleaga mai bine consumul electric din casa."
        }
      ]}
    />
  );
}
