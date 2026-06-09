export type ScenarioRow = {
  label: string;
  monthlyKwh: number;
  note: string;
};

export type CategoryRow = {
  name: string;
  monthlyKwh: number;
  detail: string;
  href?: string;
};

export type SeoScenarioPage = {
  slug: string;
  basePath: "cat-costa" | "ghiduri" | "consum-locuinta";
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  practicalSections: Array<{
    title: string;
    body: string;
  }>;
  examples: Array<{
    title: string;
    formula: string;
    result: string;
  }>;
  scenarios: ScenarioRow[];
  categories: CategoryRow[];
  variationReasons: string[];
  reductionTips: string[];
  applianceLinks: Array<{
    label: string;
    href: string;
  }>;
  hubLinks: Array<{
    label: string;
    href: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const defaultScenarioPricePerKwh = 1.3;

function cost(kwh: number) {
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(
    kwh * defaultScenarioPricePerKwh
  )} lei`;
}

export const seoScenarioPages: SeoScenarioPage[] = [
  {
    basePath: "cat-costa",
    slug: "1-kwh",
    title: "Cat costa 1 kWh in Romania?",
    metaDescription:
      "Afla cum se estimeaza costul pentru 1 kWh, cum folosesti pretul din factura si cum transformi consumul aparatelor in cost lunar.",
    h1: "Cat costa 1 kWh in Romania?",
    eyebrow: "Cost energie",
    intro: [
      "Costul pentru 1 kWh este valoarea care transforma consumul electric in bani. Daca un aparat consuma 10 kWh pe luna, iar pretul folosit este 1,30 lei/kWh, costul estimativ este 13 lei. Aceasta pagina foloseste 1,30 lei/kWh ca valoare orientativa in exemple, dar pretul real poate varia in functie de furnizor, contract, perioada si componentele facturii.",
      "Pentru o estimare apropiata de situatia ta, verifica factura sau contractul si introdu pretul tau in calculatorul principal. Nu tratam valoarea implicita ca pret oficial; este doar un reper pentru calcule rapide si comparatii intre aparate."
    ],
    practicalSections: [
      {
        title: "Ce inseamna 1 kWh",
        body: "1 kWh inseamna consumul unui aparat de 1000 W folosit timp de o ora. Doua ore inseamna 2 kWh, iar un aparat de 500 W folosit doua ore inseamna tot 1 kWh."
      },
      {
        title: "Cum il folosesti in calcul",
        body: "Dupa ce estimezi consumul in kWh, inmultesti cu pretul energiei. Formula costului este simpla: cost = kWh × pret kWh."
      }
    ],
    examples: [
      { title: "10 kWh", formula: "10 kWh × 1,30 lei/kWh", result: cost(10) },
      { title: "50 kWh", formula: "50 kWh × 1,30 lei/kWh", result: cost(50) },
      { title: "100 kWh", formula: "100 kWh × 1,30 lei/kWh", result: cost(100) }
    ],
    scenarios: [
      { label: "Consum redus", monthlyKwh: 75, note: "Aparate putine si utilizare atenta." },
      { label: "Consum mediu", monthlyKwh: 150, note: "Locuinta obisnuita fara incalzire electrica intensa." },
      { label: "Consum ridicat", monthlyKwh: 300, note: "Aparate mari folosite des sau apa calda electrica." }
    ],
    categories: [
      { name: "Bec LED", monthlyKwh: 1.8, detail: "10 W, 6 ore/zi", href: "/cat-consuma/bec-led" },
      { name: "Frigider", monthlyKwh: 28.8, detail: "Estimare intermitenta", href: "/cat-consuma/frigider" },
      { name: "Boiler electric", monthlyKwh: 120, detail: "2000 W, 2 ore/zi", href: "/cat-consuma/boiler-electric-80l" }
    ],
    variationReasons: [
      "Pretul kWh poate include componente diferite in functie de contract.",
      "Factura poate include taxe, abonamente sau regularizari.",
      "Consumul total depinde de toate aparatele, nu de un singur dispozitiv."
    ],
    reductionTips: [
      "Foloseste pretul real din factura in calculator.",
      "Identifica aparatele cu multi kWh lunar, nu doar cele cu putere mare.",
      "Compara scenarii cu ore mai putine de utilizare."
    ],
    applianceLinks: [
      { label: "Cat consuma un boiler electric", href: "/cat-consuma/boiler-electric-80l" },
      { label: "Cat consuma un frigider", href: "/cat-consuma/frigider" },
      { label: "Cat consuma un aer conditionat", href: "/cat-consuma/aer-conditionat-12000-btu" }
    ],
    hubLinks: [{ label: "Ghid de eficienta energetica", href: "/eficienta-energetica" }],
    faq: [
      { question: "Este 1,30 lei/kWh pret oficial?", answer: "Nu. Este o valoare orientativa folosita in exemple. Verifica pretul real in factura sau contract." },
      { question: "Cum calculez costul lunar?", answer: "Inmultesti consumul lunar in kWh cu pretul tau pe kWh." },
      { question: "De ce factura poate fi diferita?", answer: "Factura poate include alte componente, regularizari si consumul tuturor aparatelor." }
    ]
  },
  {
    basePath: "ghiduri",
    slug: "cum-citesti-factura-la-curent",
    title: "Cum citesti factura la curent",
    metaDescription:
      "Ghid simplu pentru citirea facturii la curent: consum kWh, pret, perioada facturata si cum folosesti datele in calculator.",
    h1: "Cum citesti factura la curent",
    eyebrow: "Ghid factura",
    intro: [
      "Factura la curent poate parea greu de urmarit pentru ca include consum, preturi, perioada, taxe si uneori regularizari. Pentru estimarile din Consumometru, cele mai importante informatii sunt consumul in kWh si pretul aproximativ pe kWh pe care vrei sa il folosesti in calcule.",
      "Aceasta pagina te ajuta sa transformi factura intr-un reper practic. Nu oferim consultanta contractuala si nu interpretam toate liniile comerciale ale fiecarui furnizor, dar iti aratam ce valori sunt utile cand vrei sa estimezi cat contribuie aparatele la costul lunar."
    ],
    practicalSections: [
      { title: "Cauta perioada facturata", body: "Compara consumul doar pe perioade similare. O factura pe 28 de zile si una pe 35 de zile nu se compara direct fara ajustare." },
      { title: "Cauta totalul de kWh", body: "Consumul facturat iti arata energia folosita de intreaga locuinta in perioada respectiva." },
      { title: "Estimeaza pretul kWh", body: "Pentru calcule rapide, poti imparti suma relevanta la kWh facturati, dar tine cont ca factura poate avea si componente fixe." }
    ],
    examples: [
      { title: "Factura simplificata", formula: "195 lei / 150 kWh", result: "aproximativ 1,30 lei/kWh" },
      { title: "Consum zilnic mediu", formula: "150 kWh / 30 zile", result: "5 kWh/zi" },
      { title: "Consum anual estimat", formula: "150 kWh × 12 luni", result: "1800 kWh/an" }
    ],
    scenarios: [
      { label: "Apartament eficient", monthlyKwh: 90, note: "Fara boiler electric si cu aparate eficiente." },
      { label: "Locuinta medie", monthlyKwh: 160, note: "Electrocasnice obisnuite si folosire zilnica." },
      { label: "Consum mare", monthlyKwh: 350, note: "Apa calda sau incalzire electrica, aparate multe." }
    ],
    categories: [
      { name: "Frigider", monthlyKwh: 28.8, detail: "Merge permanent, dar intermitent.", href: "/cat-consuma/frigider" },
      { name: "Masina de spalat", monthlyKwh: 21, detail: "Depinde de temperatura programului.", href: "/cat-consuma/masina-de-spalat" },
      { name: "Electronice", monthlyKwh: 30, detail: "Laptop, TV, router, monitor." }
    ],
    variationReasons: [
      "Factura poate include estimari sau regularizari.",
      "Pretul mediu rezultat poate include componente fixe.",
      "Sezonul schimba consumul pentru racire, incalzire sau iluminat."
    ],
    reductionTips: [
      "Noteaza consumul lunar in kWh, nu doar suma de plata.",
      "Compara lunile similare, de exemplu iulie cu iulie.",
      "Calculeaza separat aparatele mari pentru a vedea ce merita optimizat."
    ],
    applianceLinks: [
      { label: "Simulator factura lunara", href: "/#simulator-factura" },
      { label: "Top consumatori din casa", href: "/#top-consumatori" },
      { label: "Cat costa 1 kWh", href: "/cat-costa/1-kwh" }
    ],
    hubLinks: [{ label: "Ghid de eficienta energetica", href: "/eficienta-energetica" }],
    faq: [
      { question: "Ce valoare introduc la pret kWh?", answer: "Foloseste pretul din contract sau o estimare calculata din factura ta." },
      { question: "Factura arata consumul fiecarui aparat?", answer: "Nu. Factura arata totalul locuintei; pentru aparate folosesti estimari sau masuratori." },
      { question: "De ce consumul variaza lunar?", answer: "Se schimba sezonul, durata de folosire si aparatele utilizate." }
    ]
  }
];

const housingPages: SeoScenarioPage[] = [
  {
    basePath: "consum-locuinta",
    slug: "apartament-2-camere",
    title: "Consum electric estimat pentru un apartament cu 2 camere",
    metaDescription:
      "Estimare consum electric pentru apartament cu 2 camere: categorii de aparate, scenarii lunare, costuri orientative si sfaturi practice.",
    h1: "Consum electric estimat pentru un apartament cu 2 camere",
    eyebrow: "Consum locuinta",
    intro: [
      "Un apartament cu 2 camere poate avea consum lunar foarte diferit in functie de aparate si obiceiuri. Un scenariu fara boiler electric si fara incalzire electrica intensa poate ramane relativ moderat, in timp ce apa calda electrica sau aerul conditionat folosit mult vara pot schimba rapid totalul.",
      "Estimarea de mai jos foloseste categorii uzuale: frigider, masina de spalat, televizor, laptop sau PC, iluminat si electrocasnice de bucatarie. Valorile sunt orientative, iar pretul folosit in exemple este 1,30 lei/kWh. Pentru cazul tau, introdu pretul real din factura."
    ],
    practicalSections: [
      { title: "Cum folosesti estimarea", body: "Priveste valorile pe categorii si ajusteaza aparatele care difera in locuinta ta: boiler, aer conditionat, PC gaming sau uscator de rufe." },
      { title: "Ce categorie conteaza cel mai mult", body: "In apartamente mici, aparatele cu incalzire electrica sau racire pot depasi rapid consumul iluminatului si al electronicelor." }
    ],
    examples: [
      { title: "Consum mediu", formula: "130 kWh × 1,30 lei/kWh", result: cost(130) },
      { title: "Consum cu aer conditionat", formula: "130 kWh + 60 kWh vara", result: `${cost(190)} estimativ` },
      { title: "Consum cu boiler", formula: "130 kWh + 120 kWh", result: `${cost(250)} estimativ` }
    ],
    scenarios: [
      { label: "Redus", monthlyKwh: 80, note: "Aparate eficiente, fara boiler electric." },
      { label: "Mediu", monthlyKwh: 130, note: "Utilizare obisnuita pentru 1-2 persoane." },
      { label: "Ridicat", monthlyKwh: 250, note: "Boiler, AC sau aparate folosite intens." }
    ],
    categories: [
      { name: "Frigider", monthlyKwh: 28.8, detail: "Consum constant, intermitent.", href: "/cat-consuma/frigider" },
      { name: "Masina de spalat", monthlyKwh: 16, detail: "Cateva cicluri pe saptamana.", href: "/cat-consuma/masina-de-spalat" },
      { name: "Televizor", monthlyKwh: 11, detail: "4 ore/zi.", href: "/cat-consuma/televizor" },
      { name: "Laptop/PC", monthlyKwh: 16, detail: "Lucru sau divertisment.", href: "/electronice" },
      { name: "Iluminat", monthlyKwh: 8, detail: "Becuri LED in camere.", href: "/iluminat" },
      { name: "Bucatarie", monthlyKwh: 25, detail: "Cuptor, microunde, fierbator.", href: "/electrocasnice" }
    ],
    variationReasons: ["Numarul de persoane schimba frecventa spalarii si gatitului.", "Boilerul electric poate dubla consumul in unele luni.", "Vara, aerul conditionat poate adauga zeci de kWh."],
    reductionTips: ["Calculeaza separat boilerul si aerul conditionat.", "Foloseste LED pentru camerele aprinse des.", "Porneste masina de spalat cu incarcatura potrivita."],
    applianceLinks: [
      { label: "Consum frigider", href: "/cat-consuma/frigider" },
      { label: "Consum masina de spalat", href: "/cat-consuma/masina-de-spalat" },
      { label: "Consum aer conditionat", href: "/cat-consuma/aer-conditionat-12000-btu" }
    ],
    hubLinks: [{ label: "Electrocasnice", href: "/electrocasnice" }, { label: "Electronice", href: "/electronice" }],
    faq: [
      { question: "Cat consuma lunar un apartament cu 2 camere?", answer: "Orientativ, poate fi intre 80 si 250 kWh, in functie de aparate si obiceiuri." },
      { question: "Boilerul conteaza mult?", answer: "Da. Un boiler electric folosit zilnic poate adauga peste 100 kWh pe luna." },
      { question: "Estimarea este exacta?", answer: "Nu. Este un punct de pornire; foloseste simulatorul pentru lista ta de aparate." }
    ]
  },
  {
    basePath: "consum-locuinta",
    slug: "apartament-3-camere",
    title: "Consum electric estimat pentru un apartament cu 3 camere",
    metaDescription:
      "Scenarii de consum pentru apartament cu 3 camere: aparate uzuale, cost lunar estimativ si metode de reducere a consumului.",
    h1: "Consum electric estimat pentru un apartament cu 3 camere",
    eyebrow: "Consum locuinta",
    intro: [
      "Un apartament cu 3 camere are, de obicei, mai multe surse de iluminat, mai multe electronice si o utilizare mai frecventa a electrocasnicelor. Consumul poate ramane moderat daca aparatele sunt eficiente, dar creste cand exista boiler electric, aer conditionat folosit zilnic sau PC-uri pornite multe ore.",
      "Pagina foloseste scenarii orientative pentru a te ajuta sa estimezi factura lunara. Nu exista o valoare universala corecta: fiecare familie are alte obiceiuri, alt pret kWh si alte aparate."
    ],
    practicalSections: [
      { title: "De unde pornesti", body: "Fa o lista cu aparatele permanente, apoi adauga aparatele folosite in cicluri: masina de spalat, cuptor, plita, uscator." },
      { title: "Ce aparate pot schimba totalul", body: "Boilerul, aerul conditionat si incalzirea electrica sunt factorii care pot muta apartamentul din consum mediu in consum ridicat." }
    ],
    examples: [
      { title: "Consum mediu", formula: "180 kWh × 1,30 lei/kWh", result: cost(180) },
      { title: "Cu AC vara", formula: "180 kWh + 90 kWh", result: cost(270) },
      { title: "Cu boiler", formula: "180 kWh + 120 kWh", result: cost(300) }
    ],
    scenarios: [
      { label: "Redus", monthlyKwh: 120, note: "Aparate eficiente si putine ore de AC." },
      { label: "Mediu", monthlyKwh: 180, note: "Familie mica sau utilizare obisnuita." },
      { label: "Ridicat", monthlyKwh: 320, note: "Boiler, AC, multe electronice." }
    ],
    categories: [
      { name: "Frigider", monthlyKwh: 30, detail: "Aparat permanent.", href: "/cat-consuma/frigider" },
      { name: "Masina de spalat", monthlyKwh: 22, detail: "Frecventa mai mare.", href: "/cat-consuma/masina-de-spalat" },
      { name: "Televizor", monthlyKwh: 15, detail: "Living si dormitor.", href: "/cat-consuma/televizor" },
      { name: "Laptop/PC", monthlyKwh: 30, detail: "Lucru, scoala, divertisment.", href: "/electronice" },
      { name: "Iluminat", monthlyKwh: 12, detail: "Mai multe camere.", href: "/iluminat" },
      { name: "Electrocasnice bucatarie", monthlyKwh: 40, detail: "Gatit si incalzire.", href: "/electrocasnice" }
    ],
    variationReasons: ["Numarul de persoane schimba ciclurile de spalare si gatit.", "Aparatele vechi pot consuma mai mult.", "Aerul conditionat si boilerul pot domina factura."],
    reductionTips: ["Prioritizeaza aparatele mari.", "Foloseste programe eco.", "Calculeaza separat fiecare aparat folosit zilnic."],
    applianceLinks: [
      { label: "Consum uscator rufe", href: "/cat-consuma/uscator-rufe" },
      { label: "Consum boiler electric", href: "/cat-consuma/boiler-electric-80l" },
      { label: "Consum cuptor electric", href: "/cat-consuma/cuptor-electric" }
    ],
    hubLinks: [{ label: "Electrocasnice", href: "/electrocasnice" }, { label: "Eficienta energetica", href: "/eficienta-energetica" }],
    faq: [
      { question: "Cat consuma un apartament cu 3 camere?", answer: "Orientativ intre 120 si 320 kWh lunar, dar poate fi mai mult cu incalzire sau apa calda electrica." },
      { question: "Conteaza numarul de camere?", answer: "Da, dar conteaza mai mult aparatele si orele de utilizare." },
      { question: "Cum obtin o estimare mai buna?", answer: "Foloseste simulatorul si introdu aparatele reale din locuinta." }
    ]
  }
];

export const allScenarioPages: SeoScenarioPage[] = [
  ...seoScenarioPages,
  ...housingPages,
  {
    ...housingPages[1],
    slug: "casa",
    title: "Consum electric estimat pentru o casa",
    h1: "Consum electric estimat pentru o casa",
    metaDescription:
      "Estimare consum electric pentru o casa: scenarii lunare, categorii de aparate, costuri orientative si sfaturi pentru reducerea consumului.",
    intro: [
      "Consumul electric al unei case poate varia mult mai mult decat cel al unui apartament, deoarece pot exista mai multe camere, electrocasnice suplimentare, iluminat exterior, pompe, scule sau aparate folosite in anexe. Daca exista incalzire electrica sau apa calda electrica, consumul poate creste semnificativ.",
      "Estimarea de mai jos nu este o valoare standard pentru toate casele. Este un cadru practic pentru a imparti consumul pe categorii si pentru a vedea unde merita sa faci calcule separate."
    ],
    scenarios: [
      { label: "Casa eficienta", monthlyKwh: 180, note: "Fara incalzire electrica intensa." },
      { label: "Casa medie", monthlyKwh: 320, note: "Mai multe camere si aparate." },
      { label: "Casa cu consum mare", monthlyKwh: 600, note: "Boiler, incalzire electrica, multe aparate." }
    ]
  },
  {
    ...housingPages[0],
    slug: "familie-2-persoane",
    title: "Consum electric estimat pentru o familie de 2 persoane",
    h1: "Consum electric estimat pentru o familie de 2 persoane",
    metaDescription:
      "Scenarii de consum electric pentru o familie de 2 persoane: aparate uzuale, cost lunar orientativ si recomandari practice.",
    intro: [
      "O familie de 2 persoane are, de obicei, consum moderat daca nu foloseste intens aparate de incalzire electrica sau boiler. Frigiderul ramane consumator permanent, iar restul consumului vine din gatit, spalat, electronice si iluminat.",
      "Diferenta dintre doua locuinte cu 2 persoane poate fi mare: lucrul de acasa, aerul conditionat, un PC desktop sau un boiler electric pot schimba rapid estimarea."
    ],
    scenarios: [
      { label: "Redus", monthlyKwh: 90, note: "Aparate eficiente si gatit moderat." },
      { label: "Mediu", monthlyKwh: 150, note: "Utilizare zilnica obisnuita." },
      { label: "Ridicat", monthlyKwh: 280, note: "Boiler, AC sau lucru de acasa." }
    ]
  },
  {
    ...housingPages[1],
    slug: "familie-4-persoane",
    title: "Consum electric estimat pentru o familie de 4 persoane",
    h1: "Consum electric estimat pentru o familie de 4 persoane",
    metaDescription:
      "Estimare consum electric pentru o familie de 4 persoane: categorii de aparate, scenarii lunare si sfaturi pentru reducerea facturii.",
    intro: [
      "La o familie de 4 persoane, consumul creste de obicei prin mai multe cicluri de spalat, gatit mai des, mai multe electronice si mai multe camere folosite seara. Daca locuinta are boiler electric sau uscator de rufe, aceste aparate pot deveni principalii consumatori.",
      "Pagina te ajuta sa imparti consumul pe categorii si sa vezi unde are sens sa optimizezi. Valorile sunt estimative si trebuie ajustate cu aparatele reale si pretul kWh din factura."
    ],
    scenarios: [
      { label: "Redus", monthlyKwh: 180, note: "Aparate eficiente si fara boiler electric." },
      { label: "Mediu", monthlyKwh: 280, note: "Utilizare zilnica pentru familie." },
      { label: "Ridicat", monthlyKwh: 500, note: "Boiler, uscator, AC sau gatit intens." }
    ]
  }
];

export const scenarioPageByPath = new Map(
  allScenarioPages.map((page) => [`/${page.basePath}/${page.slug}`, page])
);
