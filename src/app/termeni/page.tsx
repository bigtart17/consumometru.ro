import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Termeni si conditii",
  description:
    "Termeni si conditii pentru utilizarea Consumometru, inclusiv disclaimer pentru estimari, continut informativ si reclame."
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Termeni si conditii"
      intro="Acesti termeni descriu conditiile generale de utilizare pentru Consumometru. Site-ul are scop informativ si ofera instrumente orientative pentru estimarea consumului electric si a costurilor asociate."
      sections={[
        {
          title: "Rolul site-ului",
          body: "Consumometru este un proiect web informativ. Scopul sau este sa ajute utilizatorii sa inteleaga mai usor relatia dintre puterea unui aparat, timpul de utilizare, consumul in kWh si costul estimativ. Site-ul nu este furnizor de energie, consultant energetic autorizat sau serviciu de masurare certificata."
        },
        {
          title: "Rezultate estimative",
          body: "Rezultatele calculatorului sunt estimative si depind de valorile introduse de utilizator. Consumul real poate varia in functie de modelul aparatului, clasa energetica, vechime, setari, temperatura, modul de utilizare, instalatie si alti factori. Rezultatele nu inlocuiesc factura, contractul cu furnizorul, masuratorile cu wattmetru sau recomandarile unui specialist."
        },
        {
          title: "Pretul energiei",
          body: "Pretul kWh folosit in calculator poate fi modificat de utilizator. Pretul real al energiei poate varia in functie de furnizor, contract, perioada, taxe si conditii comerciale. Pentru estimari mai apropiate de realitate, foloseste pretul din factura sau contractul tau."
        },
        {
          title: "Publicitate",
          body: "Site-ul poate afisa reclame prin Google AdSense. Reclamele pot fi incarcate in functie de consimtamantul tau pentru categoria Marketing si de setarile tehnice disponibile. Prezenta reclamelor nu influenteaza formula de calcul si nu reprezinta recomandare pentru produsele sau serviciile promovate."
        },
        {
          title: "Cookies si servicii terte",
          body: "Site-ul poate folosi cookies necesare, analytics si marketing conform Politicii de cookies si Politicii de confidentialitate. Servicii precum Google AdSense sau Google Analytics pot prelucra anumite date in functie de consimtamant si de propriile politici."
        },
        {
          title: "Utilizare corecta",
          body: "Te rugam sa folosesti site-ul in scop informativ si legal. Nu este permisa incercarea de a afecta functionarea site-ului, de a accesa neautorizat sistemele tehnice sau de a bloca accesul altor utilizatori."
        },
        {
          title: "Continut si linkuri interne",
          body: "Continutul este redactat pentru informare generala si poate fi actualizat in timp. Paginile dedicate aparatelor, exemplele si recomandarile sunt orientative si trebuie verificate in raport cu datele tehnice ale aparatului tau."
        },
        {
          title: "Limitarea raspunderii",
          body: "Nu putem garanta ca estimarile vor coincide perfect cu factura ta lunara. Utilizarea informatiilor de pe site se face pe propria raspundere. Pentru decizii importante privind instalatii electrice, achizitii costisitoare sau siguranta, consulta un specialist autorizat."
        },
        {
          title: "Modificarea termenilor",
          body: "Acesti termeni pot fi actualizati pentru a reflecta schimbari ale site-ului, ale serviciilor folosite sau ale cerintelor legale. Versiunea publicata pe site este cea aplicabila la momentul accesarii."
        },
        {
          title: "Contact",
          body: "Pentru intrebari despre acesti termeni, foloseste pagina Contact. Pentru solicitari privind datele personale, consulta si Politica de confidentialitate."
        }
      ]}
    />
  );
}
