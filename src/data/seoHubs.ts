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
      "Aici gasesti aparatele care schimba confortul vara: aer conditionat, ventilator, dezumidificator si purificator de aer. Aerul conditionat poate deveni principalul consumator cand merge zilnic mai multe ore, mai ales in camere insorite sau slab izolate. Ventilatorul consuma mult mai putin, dar nu raceste aerul; doar il misca si face caldura mai suportabila.",
      "Pentru fiecare aparat conteaza aceleasi lucruri simple: puterea in W, cate ore il tii pornit si pretul kWh din factura. Un aer conditionat folosit 5 ore pe zi poate adauga zeci sau sute de kWh intr-o luna calda, in timp ce un ventilator lasat peste noapte ramane de obicei un cost mic. Daca ai eticheta aparatului, introdu puterea reala in calculator.",
      "Poti economisi cel mai mult reducand orele in care aparatul lucreaza greu. Seteaza aerul conditionat la 24-26 de grade, trage jaluzelele in orele cu soare direct, inchide usa camerei racite si curata filtrele. O camera umbrita si un aparat intretinut cer mai putina energie pentru acelasi confort."
    ],
    items: [
      guide("Aer conditionat", "aer-conditionat-12000-btu", "Vezi cat poate costa racirea unei camere in zile obisnuite si in perioade de canicula."),
      guide("Ventilator", "ventilator", "Compara un consum mic, dar repetat zilnic, cu racirea activa oferita de aerul conditionat."),
      guide("Dezumidificator", "dezumidificator", "Calculeaza costul pentru camere umede, bai, subsoluri sau locuinte aerisite greu."),
      calculator("Purificator de aer", "Merita calculat separat daca ramane pornit multe ore pe zi, chiar daca are putere moderata.")
    ],
    tipsTitle: "Cum reduci consumul vara",
    tips: [
      "Seteaza aerul conditionat la 24-26 de grade. Diferenta fata de 19-20 de grade se vede in orele de lucru ale compresorului.",
      "Umbreste camera inainte sa se incinga. Perdelele, rulourile sau jaluzelele pot reduce timpul de racire.",
      "Curata filtrele. Un filtru incarcat lasa aerul sa circule mai greu si aparatul lucreaza mai mult.",
      "Foloseste ventilatorul cand ai nevoie doar de circularea aerului, nu de racire reala."
    ],
    relatedHubSlugs: ["eficienta-energetica"],
    faq: [
      {
        question: "Ce consuma mai mult, aerul conditionat sau ventilatorul?",
        answer:
          "Aerul conditionat consuma mai mult pentru ca raceste efectiv camera. Ventilatorul are putere mica si poate fi ieftin de folosit, dar nu scade temperatura aerului."
      },
      {
        question: "De ce variaza consumul aerului conditionat?",
        answer:
          "Conteaza temperatura setata, soarele direct, izolatia, marimea camerei si starea filtrelor. Un aparat inverter poate reduce puterea dupa ce camera s-a racit."
      },
      {
        question: "Pot calcula un dezumidificator daca nu are pagina dedicata?",
        answer:
          "Da. Foloseste puterea in W de pe eticheta, estimeaza cate ore merge pe zi si introdu pretul kWh din factura."
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
      "Incalzirea electrica merita verificata prima atunci cand factura creste iarna. Multe aparate din aceasta categorie au 1500-2000 W sau mai mult, iar cateva ore pe zi pot insemna sute de kWh intr-o luna rece. Un calorifer electric de 2000 W folosit patru ore pe zi consuma mult mai mult decat un laptop, un televizor sau iluminatul obisnuit.",
      "Aici gasesti boilerul electric, caloriferul, convectorul, aeroterma, radiatorul cu ulei si panoul radiant. Boilerul tine de apa calda: temperatura setata, izolarea rezervorului si numarul de dusuri conteaza enorm. Aparatele pentru camera depind de dimensiunea spatiului, pierderile de caldura si cat timp ramane rezistenta alimentata.",
      "Poti economisi mai ales din orele de functionare si din pierderile de caldura. Un aparat puternic folosit o ora poate costa mai putin decat unul lasat pornit toata seara. Testeaza scenarii simple: doua ore pe zi, patru ore pe zi, doar in zilele reci sau doar in camera folosita."
    ],
    items: [
      guide("Boiler electric", "boiler-electric-80l", "Vezi cat costa apa calda cand boilerul incalzeste zilnic."),
      guide("Calorifer electric", "calorifer-electric", "Calculeaza impactul unui aparat de 2000 W folosit seara sau zilnic."),
      guide("Convector electric", "convector-electric", "Potrivit pentru camere incalzite mai multe ore, mai ales daca ai termostat."),
      guide("Aeroterma", "aeroterma", "Utila pe termen scurt, dar costisitoare daca merge continuu."),
      guide("Radiator cu ulei", "radiator-ulei", "Verifica separat durata de alimentare, nu doar caldura pastrata dupa oprire."),
      guide("Panou radiant", "panou-radiant", "Calculeaza costul pe zona incalzita si pe numarul de ore folosite.")
    ],
    tipsTitle: "Cum reduci consumul iarna",
    tips: [
      "Incalzeste doar camera folosita si inchide usile catre spatiile reci.",
      "Foloseste termostatul. Functionarea continua la putere maxima se simte imediat in cost.",
      "Etanseaza ferestrele si usile inainte sa maresti numarul de ore de incalzire.",
      "La boiler, testeaza o temperatura mai moderata si incalzeste apa cand ai nevoie de ea."
    ],
    relatedHubSlugs: ["eficienta-energetica", "electrocasnice"],
    faq: [
      {
        question: "Care aparat de incalzire electrica poate consuma cel mai mult?",
        answer:
          "Boilerul si aparatele de camera de 2000 W sunt de obicei primele de verificat, mai ales daca merg zilnic cateva ore."
      },
      {
        question: "Un radiator cu ulei consuma mai putin decat un calorifer electric?",
        answer:
          "Nu neaparat. Daca doua aparate au aceeasi putere si merg la fel de mult, consumul este apropiat. Diferenta vine din termostat si din felul in care le folosesti."
      },
      {
        question: "Cum estimez costul unui convector electric?",
        answer:
          "Ia puterea de pe eticheta, estimeaza cate ore il folosesti pe zi si calculeaza cu pretul kWh din factura."
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
      "Electrocasnicele sunt folosite zilnic sau saptamanal, iar consumul lor se aduna fara sa fie mereu vizibil. Frigiderul sta in priza permanent, dar porneste intermitent. Masina de spalat, uscatorul, cuptorul si plita consuma mai mult in cicluri scurte. De aceea un aparat de putere mare nu este automat cel mai scump, daca il folosesti rar.",
      "Aici gasesti aparatele care apar frecvent intr-o locuinta: frigider, congelator, masina de spalat, uscator, masina de spalat vase, cuptor, fierbator si espressor. Uscatorul de rufe poate costa mult pe ciclu, la cuptor conteaza durata gatirii, iar masina de spalat consuma mai mult cand incalzeste apa la temperaturi ridicate.",
      "Poti economisi cand schimbi obiceiurile care se repeta. Porneste masina de spalat cu incarcatura potrivita, foloseste programe eco cand ai timp, nu pune frigiderul langa surse de caldura si evita sa incalzesti cuptorul pentru portii foarte mici. Calculeaza aparatele folosite des, nu doar pe cele cu putere mare."
    ],
    items: [
      guide("Frigider", "frigider", "Vezi costul unui aparat care sta pornit permanent, dar consuma in cicluri."),
      guide("Congelator", "congelator", "Calculeaza consumul pentru depozitare la rece, in functie de volum si amplasare."),
      guide("Lada frigorifica", "lada-frigorifica", "Utile pentru stocare pe termen lung, dar merita verificate anual."),
      guide("Masina de spalat", "masina-de-spalat", "Compara programe reci, calde si frecventa ciclurilor lunare."),
      guide("Uscator de rufe", "uscator-rufe", "Vezi cat costa confortul unui ciclu rapid fata de uscarea naturala."),
      guide("Masina de spalat vase", "masina-spalat-vase", "Calculeaza costul in functie de cate cicluri faci intr-o luna."),
      guide("Cuptor electric", "cuptor-electric", "Estimeaza costul pentru gatit, coacere si folosire de weekend."),
      guide("Cuptor cu microunde", "cuptor-microunde", "Putere mare, dar timp scurt: bun pentru incalziri rapide."),
      guide("Fierbator electric", "fierbator-electric", "Costul creste cand fierbi mai multa apa decat ai nevoie."),
      guide("Espressor", "espressor", "Calculeaza cafeaua zilnica, incalzirea apei si timpul lasat pornit."),
      calculator("Plita electrica", "Verifica separat treapta, durata si cate zone folosesti la gatit.")
    ],
    tipsTitle: "Cum reduci consumul electrocasnicelor",
    tips: [
      "Alege programe eco cand timpul nu te preseaza si evita temperaturile mari fara motiv.",
      "Tine frigiderul departe de cuptor, calorifer sau soare direct si verifica garniturile usii.",
      "Porneste masina de spalat sau masina de vase cand este incarcata potrivit.",
      "La gatit, foloseste capacul si potriveste vasul cu zona de pe plita."
    ],
    relatedHubSlugs: ["incalzire-electrica", "eficienta-energetica"],
    faq: [
      {
        question: "Ce electrocasnic consuma cel mai mult?",
        answer:
          "Uscatorul, cuptorul, plita si aparatele care incalzesc apa pot urca factura rapid. Frigiderul conteaza prin folosire permanenta."
      },
      {
        question: "Frigiderul consuma la puterea maxima toata ziua?",
        answer:
          "Nu. Compresorul porneste si se opreste. Usa deschisa des, mancarea calda si amplasarea langa surse de caldura il fac sa porneasca mai mult."
      },
      {
        question: "Cum estimez un aparat fara pagina dedicata?",
        answer:
          "Ia puterea din eticheta sau manual, estimeaza durata reala de folosire si introdu pretul kWh din factura."
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
      "Electronicele par consumatori mici, dar conteaza cand merg multe ore sau raman permanent in priza. Un laptop de birou consuma putin fata de un PC gaming, iar diferenta se vede daca lucrezi sau te joci zilnic. La televizor conteaza diagonala si luminozitatea, iar la monitor conteaza cate ore sta aprins langa calculator.",
      "Aici gasesti laptopuri, desktopuri, PC-uri de gaming, televizoare, monitoare, routere si console. Multe nu consuma la fel tot timpul: un PC gaming cere mai multa energie in jocuri decat in browsing, o consola consuma diferit in joc fata de streaming, iar routerul are putere mica, dar merge aproape fara pauza.",
      "Poti economisi prin oprirea aparatelor care stau degeaba, reducerea luminozitatii si folosirea modului sleep. Daca lucrezi opt ore pe zi, diferenta dintre laptop si desktop poate conta lunar. Daca ai un wattmetru, masoara direct consumul in joc, in lucru si in stand-by."
    ],
    items: [
      calculator("Laptop", "Bun de calculat cand lucrezi zilnic multe ore sau folosesti un model de gaming."),
      calculator("PC desktop", "Include si monitorul daca vrei sa vezi costul complet al biroului."),
      guide("PC gaming", "pc-gaming", "Vezi diferenta dintre gaming, browsing si un sistem lasat pornit inutil."),
      guide("Televizor", "televizor", "Calculeaza consumul dupa diagonala, luminozitate si orele de seara."),
      calculator("Monitor", "Merita inclus separat daca sta aprins langa laptop sau desktop."),
      calculator("Router", "Putere mica, dar functionare aproape continua in fiecare luna."),
      calculator("Consola jocuri", "Consumul se schimba intre joc, streaming si stand-by.")
    ],
    tipsTitle: "Cum reduci consumul electronicelor",
    tips: [
      "Opreste complet aparatele pe care nu le folosesti ore intregi.",
      "Redu luminozitatea monitorului sau televizorului cand este setata inutil de sus.",
      "La PC, foloseste sleep si opreste monitorul in pauzele lungi.",
      "Verifica alimentatoarele si incarcatoarele care raman permanent in priza."
    ],
    relatedHubSlugs: ["iluminat", "eficienta-energetica"],
    faq: [
      {
        question: "Un PC gaming consuma mult?",
        answer:
          "Da, mai ales in jocuri solicitante si cu placa video puternica. In browsing sau filme, acelasi sistem consuma de obicei mai putin."
      },
      {
        question: "Routerul conteaza pe factura?",
        answer:
          "Da, dar de obicei nu este printre marii consumatori. Conteaza pentru ca merge zi si noapte."
      },
      {
        question: "Laptopul consuma mai putin decat desktopul?",
        answer:
          "De obicei da pentru lucru obisnuit. Laptopurile de gaming sunt alta discutie si pot consuma mult mai mult."
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
      "Iluminatul consuma mai putin decat incalzirea, racirea sau electrocasnicele mari, dar se aduna cand ai multe becuri aprinse zilnic. Un singur LED este ieftin de folosit. Zece becuri aprinse in fiecare seara sau o instalatie exterioara lasata toata noaptea pot deveni vizibile in consumul lunar.",
      "Aici gasesti bec LED, incandescent, halogen, banda LED si iluminat exterior. Calculeaza mereu trei lucruri: puterea sursei, numarul de ore si cate corpuri sunt aprinse. Un bec de 10 W folosit 5 ore pe zi consuma putin, dar 12 becuri folosite la fel inseamna alt rezultat.",
      "Poti economisi usor daca inlocuiesti becurile incandescente sau halogene folosite des cu LED-uri potrivite. Pentru exterior, temporizatorul si senzorul de miscare pot reduce orele inutile. La banda LED, verifica puterea totala in W, nu doar consumul pe metru."
    ],
    items: [
      guide("Bec LED", "bec-led", "Calculeaza costul pentru unul sau mai multe becuri folosite zilnic."),
      calculator("Bec incandescent", "Compara rapid un bec vechi cu un LED de luminozitate apropiata."),
      calculator("Bec halogen", "Verifica diferenta fata de LED cand ai spoturi folosite multe ore."),
      calculator("Banda LED", "Introdu puterea totala si lungimea instalata, nu doar consumul pe metru."),
      calculator("Iluminat exterior", "Costul creste cand luminile raman aprinse toata noaptea.")
    ],
    tipsTitle: "Cum reduci consumul pentru iluminat",
    tips: [
      "Inlocuieste becurile incandescente sau halogene folosite des cu LED-uri potrivite ca lumina.",
      "Stinge luminile in camerele goale si evita decorul luminos pornit fara nevoie.",
      "Pentru exterior, foloseste temporizator, senzor de miscare sau program diferit vara/iarna.",
      "Calculeaza consumul pentru toate becurile aprinse, nu doar pentru unul singur."
    ],
    relatedHubSlugs: ["electronice", "eficienta-energetica"],
    faq: [
      {
        question: "Cat conteaza trecerea de la incandescent la LED?",
        answer:
          "Conteaza mult daca becurile sunt folosite zilnic. Un LED poate oferi lumina apropiata cu mult mai putini W."
      },
      {
        question: "Banda LED consuma mult?",
        answer:
          "Conteaza puterea pe metru si lungimea instalata. O banda lunga, folosita seara de seara, poate costa mai mult decat pare."
      },
      {
        question: "Iluminatul exterior poate creste factura?",
        answer:
          "Da, mai ales daca ramane aprins toata noaptea. Un temporizator sau un senzor reduce orele platite degeaba."
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
      "Eficienta energetica inseamna sa vezi unde se duc kWh, nu sa renunti la confort. In multe locuinte, cele mai mari diferente vin de la aparatele care incalzesc, racesc sau merg multe ore: boiler electric, calorifer, aer conditionat, uscator de rufe, plita, cuptor, frigider sau PC gaming. Becurile si electronicele mici conteaza mai ales cand sunt multe sau raman pornite permanent.",
      "Daca vrei sa reduci factura, incepe cu formula simpla: W / 1000 × ore × zile. Apoi foloseste pretul kWh din factura, nu o valoare aleasa la intamplare. Compara scenarii concrete: o ora mai putin pe zi, temperatura mai moderata, program eco, aparat folosit doar cand este nevoie sau inlocuirea unui consumator vechi.",
      "Etichetele energetice si manualele sunt utile, dar nu spun singure cat vei plati in casa ta. Obiceiurile fac diferenta. Un uscator folosit de trei ori pe saptamana, un boiler setat prea sus sau un aer conditionat tinut la 19 grade pot conta mai mult decat aparatele mici pe care le verifici prima data."
    ],
    items: [
      { name: "Cum reduci consumul electric", href: "/eficienta-energetica", status: "guide", description: "Incepe cu aparatele mari si cu cele care merg multe ore." },
      { name: "Cum citesti factura", href: "/ghiduri/cum-citesti-factura-la-curent", status: "guide", description: "Gaseste consumul in kWh si pretul pe care il folosesti in calcule." },
      { name: "Cat costa 1 kWh", href: "/cat-costa/1-kwh", status: "guide", description: "Vezi cum transformi kWh in lei si de ce pretul din factura conteaza." },
      { name: "Consum apartament 2 camere", href: "/consum-locuinta/apartament-2-camere", status: "guide", description: "Repere pentru o locuinta mica, cu aparate folosite zilnic." },
      { name: "Consum familie 4 persoane", href: "/consum-locuinta/familie-4-persoane", status: "guide", description: "Scenarii pentru spalare, gatit, electronice si apa calda." },
      calculator("Clase energetice", "Compara aparate similare impreuna cu orele reale de folosire."),
      calculator("Aparate care consuma cel mai mult", "Verifica boilerul, incalzirea electrica, racirea, uscatorul si plita.")
    ],
    tipsTitle: "Prioritati pentru o factura mai usor de controlat",
    tips: [
      "Calculeaza intai aparatele de putere mare: boiler, calorifer, AC, uscator, plita.",
      "Testeaza ce se intampla cu o ora mai putin pe zi. La aparatele mari diferenta apare imediat.",
      "Foloseste pretul kWh din factura cand vrei o estimare apropiata de suma reala.",
      "Verifica eticheta sau manualul inainte sa compari doua aparate asemanatoare."
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
          "Uita-te intai la aparatele cu putere mare sau multe ore de folosire. Acolo o ora in minus sau o setare mai moderata conteaza cel mai mult."
      },
      {
        question: "De ce trebuie sa folosesc pretul kWh din factura?",
        answer:
          "Pentru ca pretul difera dupa contract si perioada. Daca introduci un pret gresit, si costul lunar iese gresit."
      },
      {
        question: "Clasele energetice garanteaza costul lunar?",
        answer:
          "Nu. Clasa energetica ajuta la comparatie, dar factura tine si de orele de folosire si de pretul energiei."
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
