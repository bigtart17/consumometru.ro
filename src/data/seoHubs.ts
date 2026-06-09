import { seoAppliancePages } from "@/data/seoAppliancePages";

export type SeoHubItem = {
  name: string;
  description: string;
  href?: string;
  status: "guide" | "calculator";
};

export type SeoHubFaq = {
  question: string;
  answer: string;
};

export type SeoHub = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  items: SeoHubItem[];
  tipsTitle: string;
  tips: string[];
  relatedHubSlugs: string[];
  faq: SeoHubFaq[];
};

const guideBySlug = new Map(seoAppliancePages.map((page) => [page.slug, page]));

function guide(name: string, slug: string, description: string): SeoHubItem {
  const page = guideBySlug.get(slug);

  return {
    name,
    description,
    href: page ? `/cat-consuma/${page.slug}` : undefined,
    status: page ? "guide" : "calculator"
  };
}

function calculator(name: string, description: string): SeoHubItem {
  return {
    name,
    description,
    href: "/#calculator",
    status: "calculator"
  };
}

export const seoHubs: SeoHub[] = [
  {
    slug: "climatizare",
    title: "Consum aparate de climatizare",
    metaDescription:
      "Ghid pentru consumul aparatelor de climatizare: aer conditionat, ventilator, dezumidificator, purificator de aer si sfaturi pentru reducerea costurilor vara.",
    h1: "Consum aparate de climatizare",
    eyebrow: "Climatizare",
    intro: [
      "Aparatele de climatizare pot schimba rapid confortul din locuinta, dar si consumul lunar de energie. Vara, aerul conditionat este de obicei cel mai important consumator din aceasta categorie, mai ales daca functioneaza multe ore pe zi sau daca temperatura setata este foarte joasa. Un ventilator consuma mult mai putin, dar nu raceste aerul, ci doar creeaza senzatia de circulatie. Dezumidificatorul si purificatorul de aer au consumuri diferite, in functie de capacitate, treapta si durata zilnica de functionare.",
      "Hub-ul acesta aduna calculele si explicatiile utile pentru aparatele folosite la racire, circularea aerului si imbunatatirea calitatii aerului din casa. Scopul nu este sa iti spuna o valoare fixa pentru orice locuinta, ci sa iti arate cum influenteaza puterea in W, numarul de ore si pretul kWh costul lunar. Daca ai eticheta aparatului sau manualul, introdu manual puterea in calculator. Daca nu, poti porni de la valorile orientative si apoi sa ajustezi scenariul dupa modul tau real de utilizare.",
      "Pentru costuri mai mici vara, conteaza setarea temperaturii, izolarea camerei, folosirea jaluzelelor sau perdelelor in orele fierbinti si curatarea filtrelor. Un aparat intretinut si folosit realist poate consuma mai previzibil decat unul lasat sa functioneze continuu la setari extreme."
    ],
    items: [
      guide("Aer conditionat", "aer-conditionat-12000-btu", "Calculator precompletat pentru un aparat de aer conditionat uzual, cu exemple de cost lunar."),
      guide("Ventilator", "ventilator", "Consum redus fata de aerul conditionat, util pentru scenarii de folosire zilnica in zile calde."),
      guide("Dezumidificator", "dezumidificator", "Consum variabil in functie de capacitate, umiditate si numarul de ore de functionare."),
      calculator("Purificator de aer", "Aparat cu putere moderata, dar care poate functiona multe ore pe zi.")
    ],
    tipsTitle: "Cum reduci consumul vara",
    tips: [
      "Seteaza aerul conditionat la o temperatura realista, de exemplu 24-26 de grade, in loc de valori foarte joase.",
      "Raceste camera inainte de varful de caldura si limiteaza intrarea aerului fierbinte prin perdele, rulouri sau jaluzele.",
      "Curata filtrele aparatelor de climatizare; un filtru incarcat poate reduce eficienta si confortul.",
      "Foloseste ventilatorul atunci cand ai nevoie doar de circularea aerului, nu de racire activa."
    ],
    relatedHubSlugs: ["eficienta-energetica"],
    faq: [
      {
        question: "Ce consuma mai mult, aerul conditionat sau ventilatorul?",
        answer:
          "Aerul conditionat consuma de obicei mult mai mult, deoarece raceste activ aerul. Ventilatorul are putere mai mica, dar nu scade temperatura camerei."
      },
      {
        question: "De ce variaza consumul aerului conditionat?",
        answer:
          "Consumul depinde de temperatura setata, izolatia camerei, temperatura exterioara, marimea aparatului si daca modelul este inverter."
      },
      {
        question: "Pot calcula un dezumidificator daca nu are pagina dedicata?",
        answer:
          "Da. Introdu puterea in W, orele de functionare si pretul kWh in calculatorul principal pentru o estimare rapida."
      }
    ]
  },
  {
    slug: "incalzire-electrica",
    title: "Consum aparate de incalzire electrica",
    metaDescription:
      "Ghid pentru consumul aparatelor de incalzire electrica: boiler, calorifer electric, convector, aeroterma, radiator cu ulei si panou radiant.",
    h1: "Consum aparate de incalzire electrica",
    eyebrow: "Incalzire electrica",
    intro: [
      "Aparatele de incalzire electrica sunt printre cele mai importante surse de consum dintr-o locuinta, pentru ca multe dintre ele au puteri mari: 1500 W, 2000 W sau chiar mai mult. Diferenta dintre un aparat folosit ocazional si unul folosit zilnic se vede imediat in kWh. Un calorifer electric de 2000 W folosit patru ore pe zi poate avea un impact mult mai mare decat un televizor sau un laptop folosit multe ore.",
      "Acest hub grupeaza aparatele folosite pentru incalzirea camerei si a apei, cu linkuri catre ghidurile deja disponibile si cu puncte de plecare pentru aparatele care pot fi calculate manual. Boilerul electric depinde mult de temperatura setata, izolarea rezervorului si consumul de apa calda. Caloriferul, convectorul, aeroterma si radiatorul cu ulei depind de durata de functionare, dimensiunea camerei, izolatie si pierderile de caldura.",
      "Pentru o estimare corecta, nu te uita doar la puterea aparatului. Timpul de utilizare este la fel de important. Un aparat puternic folosit scurt poate costa mai putin decat unul moderat lasat pornit toata ziua. Calculatorul principal te ajuta sa testezi scenarii concrete: doua ore pe zi, patru ore pe zi, zile putine pe luna sau utilizare zilnica in sezonul rece."
    ],
    items: [
      guide("Boiler electric", "boiler-electric-80l", "Estimare pentru incalzirea apei cu boiler electric si exemple de cost lunar."),
      guide("Calorifer electric", "calorifer-electric", "Ghid pentru unul dintre cei mai vizibili consumatori de iarna."),
      guide("Convector electric", "convector-electric", "Aparat de incalzire cu putere mare, potrivit pentru calcul dupa eticheta."),
      guide("Aeroterma", "aeroterma", "Consum ridicat cand functioneaza continuu, util de estimat inainte de folosire zilnica."),
      guide("Radiator cu ulei", "radiator-ulei", "Consum similar cu alte aparate rezistive, influentat de termostat si durata."),
      guide("Panou radiant", "panou-radiant", "Consum dependent de putere, suprafata acoperita si durata de functionare.")
    ],
    tipsTitle: "Cum reduci consumul iarna",
    tips: [
      "Incalzeste doar camerele folosite si inchide usile pentru a limita pierderile de caldura.",
      "Foloseste termostatul sau treptele aparatului; functionarea continua la putere maxima creste rapid costul.",
      "Verifica izolatia ferestrelor si pierderile de caldura inainte sa cresti durata de functionare.",
      "La boiler, testeaza o temperatura mai moderata si evita incalzirea apei peste nevoia reala."
    ],
    relatedHubSlugs: ["eficienta-energetica", "electrocasnice"],
    faq: [
      {
        question: "Care aparat de incalzire electrica poate consuma cel mai mult?",
        answer:
          "Aparatele de 2000 W sau mai mult, folosite zilnic mai multe ore, pot avea cel mai mare impact. Boilerul si caloriferul electric sunt exemple frecvente."
      },
      {
        question: "Un radiator cu ulei consuma mai putin decat un calorifer electric?",
        answer:
          "Nu neaparat. Daca au aceeasi putere si functioneaza acelasi timp, consumul estimativ este apropiat. Diferenta vine din termostat, inertie termica si utilizare."
      },
      {
        question: "Cum estimez costul unui convector electric?",
        answer:
          "Introdu puterea in W, orele de utilizare pe zi, zilele pe luna si pretul kWh in calculatorul principal."
      }
    ]
  },
  {
    slug: "electrocasnice",
    title: "Consum electrocasnice",
    metaDescription:
      "Ghid pentru consumul electrocasnicelor din casa: frigider, congelator, masina de spalat, uscator de rufe, masina de spalat vase, cuptor si plita electrica.",
    h1: "Consum electrocasnice",
    eyebrow: "Electrocasnice",
    intro: [
      "Electrocasnicele sunt aparatele pe care le folosim cel mai des, iar consumul lor se aduna luna de luna. Unele functioneaza permanent, cum este frigiderul. Altele consuma mai mult in cicluri scurte, cum sunt masina de spalat, uscatorul de rufe, cuptorul electric sau plita. De aceea, doua aparate cu puteri foarte diferite pot avea costuri lunare apropiate daca timpul de utilizare este diferit.",
      "Acest hub te ajuta sa compari electrocasnicele mari si aparatele de bucatarie care apar frecvent pe factura. Frigiderul are consum constant, dar compresorul porneste intermitent. Uscatorul de rufe poate avea consum mare pe ciclu, mai ales daca nu este un model eficient. Cuptorul si plita electrica depind de durata de gatire si de treapta folosita. Masina de spalat consuma mai mult cand incalzeste apa la temperaturi ridicate.",
      "Pentru estimari utile, introdu date cat mai apropiate de utilizarea ta reala. Daca folosesti un aparat doar de cateva ori pe saptamana, nu il calcula ca si cum ar functiona zilnic. Daca ai consumul pe ciclu din eticheta energetica, poti transforma scenariul in ore sau poti folosi pagina de ghid pentru a intelege ordinul de marime. Scopul este sa identifici aparatele care merita optimizate, nu sa obtii o factura identica la leu."
    ],
    items: [
      guide("Frigider", "frigider", "Ghid pentru consumul unui frigider si factori precum clasa energetica si temperatura."),
      guide("Congelator", "congelator", "Consum permanent sau intermitent, influentat de volum, clasa energetica si amplasare."),
      guide("Lada frigorifica", "lada-frigorifica", "Depozitare la rece pe termen lung, cu consum influentat de volum si amplasare."),
      guide("Masina de spalat", "masina-de-spalat", "Estimari pentru programe uzuale si impactul temperaturii apei."),
      guide("Uscator de rufe", "uscator-rufe", "Consum lunar pentru uscator si diferente intre scenarii de folosire."),
      guide("Masina de spalat vase", "masina-spalat-vase", "Consum pe ciclu, influentat de program, temperatura si frecventa folosirii."),
      guide("Cuptor electric", "cuptor-electric", "Cost pentru gatit la cuptor electric in scenarii obisnuite."),
      guide("Cuptor cu microunde", "cuptor-microunde", "Putere mare pe perioade scurte, util pentru incalzire rapida."),
      guide("Fierbator electric", "fierbator-electric", "Consum influentat de cantitatea de apa si numarul de fierberi zilnice."),
      guide("Espressor", "espressor", "Cost estimativ pentru incalzire, cafea zilnica si timp in stand-by."),
      calculator("Plita electrica", "Consum dependent de treapta, durata si numarul de zone folosite.")
    ],
    tipsTitle: "Cum reduci consumul electrocasnicelor",
    tips: [
      "Foloseste programe eco cand sunt potrivite si evita temperaturile mari daca nu sunt necesare.",
      "Nu lasa frigiderul langa surse de caldura si verifica garniturile usii.",
      "Porneste masina de spalat sau masina de spalat vase cu incarcatura potrivita, nu pentru cateva obiecte.",
      "La gatit, foloseste capacul si dimensiunea potrivita a vasului pentru plita."
    ],
    relatedHubSlugs: ["incalzire-electrica", "eficienta-energetica"],
    faq: [
      {
        question: "Ce electrocasnic consuma cel mai mult?",
        answer:
          "Depinde de utilizare. Uscatorul, cuptorul, plita si aparatele care incalzesc apa pot consuma mult, dar si frigiderul conteaza pentru ca functioneaza permanent."
      },
      {
        question: "Frigiderul consuma la puterea maxima toata ziua?",
        answer:
          "Nu. Compresorul porneste si se opreste in functie de temperatura, incarcare, deschiderea usii si eficienta aparatului."
      },
      {
        question: "Cum estimez un aparat fara pagina dedicata?",
        answer:
          "Foloseste calculatorul principal cu puterea din eticheta sau manual, durata de utilizare si pretul kWh din factura."
      }
    ]
  },
  {
    slug: "electronice",
    title: "Consum electronice",
    metaDescription:
      "Ghid pentru consumul electronicelor: laptop, PC desktop, PC gaming, televizor, monitor, router si consola de jocuri.",
    h1: "Consum electronice",
    eyebrow: "Electronice",
    intro: [
      "Electronicele par de multe ori consumatori mici, dar pot conta daca functioneaza multe ore pe zi sau raman in stand-by permanent. Un laptop obisnuit consuma mult mai putin decat un PC gaming, dar diferenta reala depinde de incarcator, procesor, placa video, monitor si modul de utilizare. Un televizor modern are consum moderat, insa diagonala, luminozitatea si timpul zilnic de functionare pot schimba costul lunar.",
      "Acest hub aduna aparatele electronice folosite frecvent in locuinta sau la birou: laptopuri, desktopuri, PC-uri de gaming, televizoare, monitoare, routere si console. Pentru multe dintre ele, puterea reala variaza in functie de activitate. Un PC gaming consuma mai mult in jocuri decat in browsing, iar o consola consuma diferit in joc, streaming sau stand-by. Routerul are putere mica, dar functioneaza aproape continuu.",
      "Pentru estimari bune, foloseste puterea de pe incarcator sau din specificatii ca punct de pornire, apoi ajusteaza in functie de utilizare. Daca ai un wattmetru, poti masura direct consumul in scenariile tale reale. In lipsa masuratorilor, calculatorul te ajuta sa vezi daca un aparat folosit zilnic merita optimizat, oprit complet sau comparat cu o alternativa mai eficienta."
    ],
    items: [
      calculator("Laptop", "Consum redus sau moderat, influentat de incarcator, sarcina si numarul de ore."),
      calculator("PC desktop", "Consum variabil in functie de procesor, sursa, monitor si tipul de utilizare."),
      guide("PC gaming", "pc-gaming", "Ghid pentru un sistem de gaming si scenarii cu jocuri solicitante."),
      guide("Televizor", "televizor", "Consum pentru televizor in functie de diagonala, luminozitate si ore de folosire."),
      calculator("Monitor", "Consum dependent de diagonala, luminozitate si tehnologia panoului."),
      calculator("Router", "Consum mic, dar permanent, util de inclus in estimarea lunara."),
      calculator("Consola jocuri", "Consum diferit in joc, streaming si stand-by.")
    ],
    tipsTitle: "Cum reduci consumul electronicelor",
    tips: [
      "Opreste complet aparatele pe care nu le folosesti mult timp, mai ales sistemele cu stand-by vizibil.",
      "Redu luminozitatea monitorului sau televizorului daca este setata inutil de sus.",
      "La PC, modul de economisire si oprirea monitorului pot conta in zilele lungi de lucru.",
      "Verifica incarcatoarele si alimentatoarele care raman permanent in priza."
    ],
    relatedHubSlugs: ["iluminat", "eficienta-energetica"],
    faq: [
      {
        question: "Un PC gaming consuma mult?",
        answer:
          "Poate consuma semnificativ in jocuri, mai ales cu placa video puternica. In activitati usoare, consumul este de obicei mai mic."
      },
      {
        question: "Routerul conteaza pe factura?",
        answer:
          "Are putere mica, dar functioneaza aproape permanent. Consumul lunar poate fi modest, dar merita inclus cand faci un total al locuintei."
      },
      {
        question: "Laptopul consuma mai putin decat desktopul?",
        answer:
          "De obicei da, dar depinde de model. Laptopurile de gaming sau statiile mobile pot consuma mai mult decat un laptop simplu de birou."
      }
    ]
  },
  {
    slug: "iluminat",
    title: "Consum iluminat",
    metaDescription:
      "Ghid pentru consumul iluminatului: bec LED, bec incandescent, bec halogen, banda LED si iluminat exterior.",
    h1: "Consum iluminat",
    eyebrow: "Iluminat",
    intro: [
      "Iluminatul are de obicei un consum mai mic decat incalzirea, racirea sau electrocasnicele mari, dar diferenta devine vizibila cand ai multe surse de lumina aprinse zilnic. Un singur bec LED consuma putin, insa zece becuri folosite seara in fiecare zi pot adauga un consum lunar masurabil. Becurile incandescente si halogene au puteri mai mari pentru aceeasi lumina utila, de aceea inlocuirea lor cu LED poate reduce costul fara sa schimbi obiceiurile principale.",
      "Acest hub grupeaza tipurile comune de iluminat: LED, incandescent, halogen, banda LED si iluminat exterior. Fiecare scenariu trebuie privit prin trei valori simple: puterea sursei, numarul de ore si numarul de corpuri aprinse. Un bec de 10 W folosit 5 ore pe zi este ieftin, dar o instalatie exterioara lasata pornita toata noaptea poate ajunge la un consum mai important.",
      "Cand estimezi iluminatul, calculeaza pe zone: sufragerie, dormitor, bucatarie, exterior sau birou. Asta te ajuta sa vezi unde merita schimbate becurile si unde este suficient sa reduci timpul de functionare. Daca folosesti banda LED decorativa sau iluminat de curte, verifica puterea totala in W, nu doar consumul pe metru sau pe corp."
    ],
    items: [
      guide("Bec LED", "bec-led", "Consum redus si exemple de cost lunar pentru folosire zilnica."),
      calculator("Bec incandescent", "Consum mai mare decat LED, util pentru comparatii rapide."),
      calculator("Bec halogen", "Consum de obicei mai mare decat LED, influentat de putere si durata."),
      calculator("Banda LED", "Consumul depinde de puterea pe metru si lungimea instalata."),
      calculator("Iluminat exterior", "Costul poate creste daca luminile raman aprinse multe ore pe noapte.")
    ],
    tipsTitle: "Cum reduci consumul pentru iluminat",
    tips: [
      "Inlocuieste becurile incandescente sau halogene folosite des cu LED-uri potrivite ca luminozitate.",
      "Stinge luminile in camerele nefolosite si evita iluminatul decorativ pornit fara nevoie.",
      "Pentru exterior, foloseste temporizator, senzor de miscare sau program adaptat sezonului.",
      "Calculeaza consumul pe numar de becuri, nu doar pentru o singura sursa de lumina."
    ],
    relatedHubSlugs: ["electronice", "eficienta-energetica"],
    faq: [
      {
        question: "Cat conteaza trecerea de la incandescent la LED?",
        answer:
          "Diferenta poate fi mare procentual, deoarece un LED poate oferi lumina similara la o putere mult mai mica. Economia creste cand ai multe becuri folosite zilnic."
      },
      {
        question: "Banda LED consuma mult?",
        answer:
          "Depinde de puterea pe metru si de lungimea instalata. O banda lunga folosita multe ore poate consuma mai mult decat pare la prima vedere."
      },
      {
        question: "Iluminatul exterior poate creste factura?",
        answer:
          "Da, mai ales daca ramane pornit toata noaptea. Temporizatoarele si senzorii pot reduce timpul de functionare."
      }
    ]
  },
  {
    slug: "eficienta-energetica",
    title: "Ghid de eficienta energetica",
    metaDescription:
      "Ghid practic de eficienta energetica: cum reduci consumul electric, cum citesti factura, cat costa 1 kWh, clase energetice si top consumatori.",
    h1: "Ghid de eficienta energetica",
    eyebrow: "Eficienta energetica",
    intro: [
      "Eficienta energetica nu inseamna sa renunti la confort, ci sa intelegi unde se duce energia si ce schimbari au cel mai mare efect. In multe locuinte, cele mai mari diferente vin de la aparatele care incalzesc, racesc sau functioneaza multe ore: boiler electric, calorifer electric, aer conditionat, uscator de rufe, plita, cuptor, frigider sau PC gaming. Becurile si electronicele mici conteaza mai ales cand sunt multe sau raman pornite permanent.",
      "Acest hub este punctul de pornire pentru utilizatorii care vor sa reduca factura fara promisiuni nerealiste. Primul pas este sa intelegi formula consumului: W / 1000 × ore × zile. Al doilea pas este sa folosesti pretul kWh din factura, pentru ca pretul real poate varia in functie de contract si perioada. Al treilea pas este sa compari scenarii: mai putine ore, temperatura diferita, program eco, aparat mai eficient sau utilizare doar in zilele necesare.",
      "Clasele energetice, etichetele si manualele sunt utile, dar nu spun singure cat vei plati in casa ta. Costul final depinde de obiceiuri. De aceea, calculatorul si ghidurile Consumometru sunt construite pentru estimari transparente: introduci valorile, vezi rezultatul si intelegi ce limite are calculul. Foloseste pagina aceasta ca harta pentru cele mai importante categorii de consum din locuinta."
    ],
    items: [
      { name: "Cum reduci consumul electric", href: "/eficienta-energetica", status: "guide", description: "Porneste de la aparatele mari, apoi ajusteaza orele de utilizare si setarile." },
      { name: "Cum citesti factura", href: "/ghiduri/cum-citesti-factura-la-curent", status: "guide", description: "Foloseste pretul kWh si consumul facturat pentru estimari mai apropiate de realitate." },
      { name: "Cat costa 1 kWh", href: "/cat-costa/1-kwh", status: "guide", description: "Pretul se verifica in factura sau contract si poate fi introdus manual in calculator." },
      { name: "Consum apartament 2 camere", href: "/consum-locuinta/apartament-2-camere", status: "guide", description: "Scenarii de consum pentru o locuinta mica sau medie." },
      { name: "Consum familie 4 persoane", href: "/consum-locuinta/familie-4-persoane", status: "guide", description: "Estimare pe categorii pentru o locuinta folosita intens." },
      calculator("Clase energetice", "Compara aparate similare tinand cont de consumul anual si modul tau de utilizare."),
      calculator("Aparate care consuma cel mai mult", "Boilerul, incalzirea electrica, racirea si uscarea rufelor pot avea impact major.")
    ],
    tipsTitle: "Prioritati pentru o factura mai usor de controlat",
    tips: [
      "Calculeaza intai aparatele de putere mare, nu cele mai mici consumuri din casa.",
      "Testeaza scenarii cu o ora mai putin pe zi; la aparatele mari diferenta se vede imediat.",
      "Foloseste pretul kWh din factura, nu o valoare generica, cand vrei o estimare apropiata.",
      "Verifica etichetele energetice si manualele inainte de a compara doua aparate."
    ],
    relatedHubSlugs: [
      "climatizare",
      "incalzire-electrica",
      "electrocasnice",
      "electronice",
      "iluminat"
    ],
    faq: [
      {
        question: "Care este primul pas pentru reducerea consumului electric?",
        answer:
          "Identifica aparatele cu putere mare sau utilizare lunga. Acolo schimbarile de timp, setare sau eficienta au cel mai mare impact."
      },
      {
        question: "De ce trebuie sa folosesc pretul kWh din factura?",
        answer:
          "Pentru ca pretul real poate varia in functie de furnizor, contract si perioada. O valoare gresita schimba direct estimarea costului."
      },
      {
        question: "Clasele energetice garanteaza costul lunar?",
        answer:
          "Nu. Ele ajuta la compararea aparatelor, dar costul lunar depinde de cat folosesti aparatul si de pretul energiei."
      }
    ]
  }
];

export const hubBySlug = new Map(seoHubs.map((hub) => [hub.slug, hub]));

export const applianceHubMap: Record<string, string> = {
  "aer-conditionat-12000-btu": "climatizare",
  "aer-conditionat-9000-btu": "climatizare",
  "aer-conditionat-18000-btu": "climatizare",
  ventilator: "climatizare",
  dezumidificator: "climatizare",
  frigider: "electrocasnice",
  congelator: "electrocasnice",
  "lada-frigorifica": "electrocasnice",
  "boiler-electric-80l": "incalzire-electrica",
  "calorifer-electric": "incalzire-electrica",
  aeroterma: "incalzire-electrica",
  "convector-electric": "incalzire-electrica",
  "radiator-ulei": "incalzire-electrica",
  "panou-radiant": "incalzire-electrica",
  "pc-gaming": "electronice",
  televizor: "electronice",
  "masina-de-spalat": "electrocasnice",
  "uscator-rufe": "electrocasnice",
  "masina-spalat-vase": "electrocasnice",
  "cuptor-electric": "electrocasnice",
  "cuptor-microunde": "electrocasnice",
  "fierbator-electric": "electrocasnice",
  espressor: "electrocasnice",
  "bec-led": "iluminat"
};
