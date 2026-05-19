import { appliancePresets } from "@/data/appliancePresets";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoContentSection = {
  title: string;
  paragraphs: string[];
};

export type SeoCostExample = {
  title: string;
  description: string;
  hoursPerDay: number;
  daysPerMonth: number;
  watts?: number;
};

export type SeoSavingTip = {
  title: string;
  body: string;
};

export type SeoAppliancePage = {
  slug: string;
  presetSlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  shortName: string;
  intro: string;
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  pricePerKwh: number;
  tableRows: Array<{
    scenario: string;
    hoursPerDay: number;
    daysPerMonth: number;
  }>;
  contentSections: SeoContentSection[];
  costExamples: SeoCostExample[];
  savingTips: SeoSavingTip[];
  faq: SeoFaqItem[];
};

const defaultPricePerKwh = 1.3;

function preset(slug: string) {
  const item = appliancePresets.find((entry) => entry.slug === slug);

  if (!item) {
    throw new Error(`Missing appliance preset: ${slug}`);
  }

  return item;
}

export const seoAppliancePages: SeoAppliancePage[] = [
  {
    slug: "aer-conditionat-12000-btu",
    presetSlug: "aer-conditionat",
    title: "Cat consuma un aer conditionat? Consum si cost lunar",
    metaDescription:
      "Afla cat consuma un aer conditionat in Romania, cu calculator precompletat, tabel de consum, exemple de cost lunar si recomandari de economie.",
    h1: "Cat consuma un aer conditionat?",
    shortName: "aer conditionat",
    intro:
      "Un aer conditionat poate fi un consumator important vara, dar costul real depinde mult de modul in care este folosit. Calculatorul este precompletat pentru un aparat de aproximativ 12000 BTU si poate fi ajustat dupa modelul tau.",
    watts: 1200,
    hoursPerDay: 5,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Racire ocazionala", hoursPerDay: 2, daysPerMonth: 20 },
      { scenario: "Folosire zilnica vara", hoursPerDay: 5, daysPerMonth: 30 },
      { scenario: "Canicula, utilizare intensa", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce consumul unui aer conditionat nu este fix",
        paragraphs: [
          "Puterea trecuta in specificatii nu inseamna ca aparatul consuma aceeasi energie in fiecare minut. Un model inverter isi ajusteaza turatia si poate functiona mult timp la o putere mai mica dupa ce camera ajunge la temperatura dorita.",
          "Conteaza foarte mult diferenta dintre temperatura exterioara si temperatura setata in camera. Daca afara sunt 36 de grade si setezi 19 grade, compresorul va lucra mai intens decat la o setare de 24-25 de grade."
        ]
      },
      {
        title: "Cum interpretezi formula pentru aer conditionat",
        paragraphs: [
          "Formula folosita este W / 1000 × ore pe zi × zile pe luna. Pentru un aparat estimat la 1200 W folosit 5 ore pe zi timp de 30 de zile, consumul ajunge la aproximativ 180 kWh pe luna.",
          "Acest calcul este orientativ. In realitate, un aparat inverter eficient poate consuma mai putin in anumite conditii, iar un aparat vechi, murdar sau subdimensionat pentru camera poate consuma mai mult."
        ]
      },
      {
        title: "Ce factori cresc factura vara",
        paragraphs: [
          "Izolatia locuintei este decisiva. O camera cu geamuri mari, soare direct si usi deschise pierde rapid aerul rece, iar aparatul porneste mai des. Filtrele murdare pot reduce randamentul si cresc timpul de functionare.",
          "Si pozitionarea conteaza. Daca unitatea interioara bate spre o zona blocata de mobilier sau perdele, racirea se face mai greu. Un aparat corect dimensionat pentru camera va ajunge mai repede la temperatura dorita."
        ]
      },
      {
        title: "Cand merita comparat cu alte solutii",
        paragraphs: [
          "Pentru racire, aerul conditionat este de obicei solutia principala. Pentru incalzire de tranzitie, merita comparat cu un calorifer electric, deoarece un aparat cu pompa de caldura poate livra mai multa caldura pe kWh consumat.",
          "Daca folosesti aerul conditionat zilnic, merita sa testezi scenarii: 4 ore in loc de 6, temperatura setata la 24 de grade in loc de 21 sau folosirea modului eco. Diferentele lunare pot fi vizibile."
        ]
      }
    ],
    costExamples: [
      {
        title: "Apartament racit seara",
        description: "Aparatul functioneaza dupa-amiaza si seara, nu toata ziua.",
        hoursPerDay: 3,
        daysPerMonth: 25
      },
      {
        title: "Utilizare zilnica vara",
        description: "Scenariu des intalnit in lunile calde, cu folosire constanta.",
        hoursPerDay: 5,
        daysPerMonth: 30
      },
      {
        title: "Canicula si lucru de acasa",
        description: "Aparatul porneste multe ore pentru confort pe timpul zilei.",
        hoursPerDay: 8,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Seteaza temperatura moderat",
        body: "O setare de 24-25 de grade poate reduce consumul fata de 19-20 de grade si este de obicei mai confortabila pe termen lung."
      },
      {
        title: "Curata filtrele",
        body: "Filtrele incarcate ingreuneaza circulatia aerului si pot face aparatul sa functioneze mai mult pentru acelasi rezultat."
      },
      {
        title: "Raceste camera, nu toata casa",
        body: "Inchide usile catre zonele nefolosite si trage jaluzelele in orele cu soare direct."
      },
      {
        title: "Foloseste timerul",
        body: "Programarea opririi te ajuta sa eviti functionarea inutila peste noapte sau cand pleci de acasa."
      }
    ],
    faq: [
      {
        question: "Cat consuma un aer conditionat pe luna?",
        answer:
          "Un aparat de 1200 W folosit 5 ore pe zi timp de 30 de zile poate consuma aproximativ 180 kWh pe luna."
      },
      {
        question: "Un aer conditionat inverter consuma mai putin?",
        answer:
          "In multe cazuri da, pentru ca isi reduce puterea dupa ce camera ajunge la temperatura setata."
      },
      {
        question: "Temperatura setata influenteaza mult consumul?",
        answer:
          "Da. Cu cat ceri o temperatura mai joasa vara, cu atat compresorul lucreaza mai mult."
      },
      {
        question: "Pot folosi aerul conditionat pentru incalzire?",
        answer:
          "Da, multe modele au functie de incalzire. Costul depinde de eficienta aparatului si temperatura exterioara."
      }
    ]
  },
  {
    slug: "frigider",
    presetSlug: "frigider",
    title: "Cat consuma un frigider? Consum lunar si cost estimativ",
    metaDescription:
      "Vezi cat consuma un frigider pe luna, ce influenteaza consumul real, exemple de cost si sfaturi pentru reducerea facturii.",
    h1: "Cat consuma un frigider?",
    shortName: "frigider",
    intro:
      "Frigiderul este pornit permanent, dar nu consuma la putere maxima 24 de ore din 24. Estimarea de mai jos foloseste ore echivalente de functionare a compresorului si poate fi ajustata dupa aparatul tau.",
    watts: preset("frigider").watts,
    hoursPerDay: preset("frigider").hoursPerDay,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Frigider eficient", hoursPerDay: 6, daysPerMonth: 30 },
      { scenario: "Frigider mediu", hoursPerDay: 8, daysPerMonth: 30 },
      { scenario: "Frigider vechi sau solicitat", hoursPerDay: 10, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce frigiderul este diferit fata de alte aparate",
        paragraphs: [
          "Un frigider sta in priza tot timpul, dar compresorul porneste si se opreste in cicluri. De aceea, calculul pe baza de ore echivalente este mai realist decat ideea ca ar consuma puterea nominala timp de 24 de ore.",
          "Un model modern poate mentine temperatura cu perioade mai scurte de functionare, in timp ce un frigider vechi sau cu garnituri uzate poate porni mai des. Diferenta se vede mai ales pe parcursul unui an."
        ]
      },
      {
        title: "Ce inseamna consum lunar pentru un frigider",
        paragraphs: [
          "Daca folosim o estimare de 120 W si 8 ore echivalente pe zi, consumul ajunge la aproximativ 28,8 kWh pe luna. La 1,30 lei/kWh, costul estimativ este in jur de 37 lei pe luna.",
          "Aceasta valoare nu este o promisiune. Eticheta energetica, volumul frigiderului, congelatorul inclus, temperatura din bucatarie si felul in care este folosit pot schimba rezultatul."
        ]
      },
      {
        title: "Obiceiuri care cresc consumul",
        paragraphs: [
          "Deschiderea frecventa a usii introduce aer cald si umed in interior. Frigiderul trebuie apoi sa consume energie pentru a reveni la temperatura setata. Acelasi lucru se intampla cand pui mancare fierbinte direct in frigider.",
          "Un frigider lipit de perete, asezat langa cuptor sau expus la soare elimina mai greu caldura. Ventilatia slaba poate face compresorul sa functioneze mai mult decat ar fi necesar."
        ]
      },
      {
        title: "Cand merita inlocuit un frigider vechi",
        paragraphs: [
          "Daca un frigider vechi porneste foarte des, face gheata, are garnituri deteriorate sau incalzeste mult in spate, poate consuma mai mult decat un model eficient. Diferenta lunara poate parea mica, dar se aduna in mai multi ani.",
          "Inainte de a cumpara unul nou, compara costul estimat cu pretul aparatului. Calculatorul te ajuta sa vezi daca economia lunara justifica schimbarea sau daca sunt suficiente reglaje simple."
        ]
      }
    ],
    costExamples: [
      {
        title: "Frigider eficient",
        description: "Model modern, bine ventilat, cu usa deschisa rar.",
        hoursPerDay: 6,
        daysPerMonth: 30
      },
      {
        title: "Frigider obisnuit",
        description: "Scenariu mediu pentru o familie care foloseste aparatul zilnic.",
        hoursPerDay: 8,
        daysPerMonth: 30
      },
      {
        title: "Frigider vechi",
        description: "Compresorul porneste mai des sau aparatul este tinut intr-o zona calda.",
        hoursPerDay: 10,
        daysPerMonth: 30,
        watts: 220
      }
    ],
    savingTips: [
      {
        title: "Lasa spatiu pentru ventilatie",
        body: "Nu lipi frigiderul complet de perete si evita zonele foarte calde din bucatarie."
      },
      {
        title: "Verifica garniturile",
        body: "O garnitura care nu inchide bine lasa aer cald in interior si creste timpul de functionare."
      },
      {
        title: "Nu pune mancare fierbinte",
        body: "Lasa mancarea sa se raceasca inainte de depozitare, altfel frigiderul consuma mai mult pentru racire."
      },
      {
        title: "Dezgheata cand este cazul",
        body: "Straturile de gheata reduc eficienta, mai ales la congelatoarele si frigiderele mai vechi."
      }
    ],
    faq: [
      {
        question: "Frigiderul consuma curent 24 de ore pe zi?",
        answer:
          "Este alimentat permanent, dar compresorul functioneaza in cicluri. De aceea folosim ore echivalente de functionare."
      },
      {
        question: "Cat costa lunar un frigider?",
        answer:
          "La 120 W si 8 ore echivalente pe zi, costul este aproximativ 37 lei pe luna la 1,30 lei/kWh."
      },
      {
        question: "Un frigider vechi consuma mult mai mult?",
        answer:
          "Poate consuma semnificativ mai mult daca are garnituri uzate, gheata sau compresor ineficient."
      },
      {
        question: "Ce temperatura este potrivita pentru frigider?",
        answer:
          "De obicei 3-5 grade Celsius pentru frigider si aproximativ -18 grade pentru congelator sunt valori uzuale."
      }
    ]
  },
  {
    slug: "boiler-electric-80l",
    presetSlug: "boiler-electric",
    title: "Cat consuma un boiler electric? Cost lunar pentru 80L",
    metaDescription:
      "Calculeaza cat consuma un boiler electric de 80L, vezi exemple de cost lunar, tabel de consum si recomandari pentru apa calda mai ieftina.",
    h1: "Cat consuma un boiler electric?",
    shortName: "boiler electric",
    intro:
      "Boilerul electric este adesea unul dintre cei mai mari consumatori din locuinta. Calculatorul este precompletat pentru un boiler uzual de 2000 W si 80 litri, dar poti modifica durata de incalzire si pretul energiei.",
    watts: preset("boiler-electric").watts,
    hoursPerDay: preset("boiler-electric").hoursPerDay,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Consum redus", hoursPerDay: 1, daysPerMonth: 30 },
      { scenario: "Consum mediu", hoursPerDay: 2, daysPerMonth: 30 },
      { scenario: "Consum ridicat", hoursPerDay: 4, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce boilerul electric poate ridica factura",
        paragraphs: [
          "Boilerul incalzeste apa cu o rezistenta electrica, iar puterea este de obicei mare. Un aparat de 2000 W folosit doua ore pe zi ajunge la 120 kWh pe luna, adica o suma vizibila pe factura.",
          "Consumul nu depinde doar de volum. Conteaza temperatura setata, cat de rece intra apa, cat de bine este izolat rezervorul si cata apa calda foloseste familia intr-o zi obisnuita."
        ]
      },
      {
        title: "Cum se calculeaza consumul unui boiler",
        paragraphs: [
          "Formula ramane aceeasi: W / 1000 × ore × zile. Pentru 2000 W, fiecare ora de functionare inseamna aproximativ 2 kWh. Daca boilerul incalzeste zilnic doua ore, vorbim de 4 kWh pe zi.",
          "Este important sa estimezi orele reale de functionare, nu timpul in care boilerul ramane in priza. Termostatul opreste rezistenta cand apa ajunge la temperatura setata, apoi porneste din nou cand temperatura scade."
        ]
      },
      {
        title: "Ce influenteaza costul apei calde",
        paragraphs: [
          "Dusurile lungi, cada plina si apa setata foarte fierbinte cresc consumul. Daca boilerul este montat intr-un spatiu rece, pierde mai multa caldura si porneste mai des pentru a mentine temperatura.",
          "Depunerile de calcar pot reduce eficienta rezistentei. In zonele cu apa dura, intretinerea periodica poate ajuta aparatul sa incalzeasca mai bine si sa nu lucreze inutil."
        ]
      },
      {
        title: "Cand apar diferente mari intre locuinte",
        paragraphs: [
          "Doua boilere de aceeasi putere pot avea costuri diferite daca intr-o locuinta sunt doua persoane, iar in alta sunt patru. Programul de folosire si volumul de apa calda sunt mai importante decat simpla putere nominala.",
          "Pentru o estimare corecta, testeaza in calculator scenariile tale: o ora pe zi, doua ore pe zi sau patru ore pe zi. Diferenta lunara iti arata rapid cat conteaza fiecare obicei."
        ]
      }
    ],
    costExamples: [
      {
        title: "O persoana, consum atent",
        description: "Boilerul incalzeste aproximativ o ora pe zi.",
        hoursPerDay: 1,
        daysPerMonth: 30
      },
      {
        title: "Familie mica",
        description: "Scenariu mediu cu folosire zilnica pentru dusuri si chiuveta.",
        hoursPerDay: 2,
        daysPerMonth: 30
      },
      {
        title: "Consum mare de apa calda",
        description: "Dusuri lungi sau mai multe persoane in locuinta.",
        hoursPerDay: 4,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Seteaza o temperatura rezonabila",
        body: "O temperatura foarte ridicata inseamna pierderi mai mari si mai multa energie pentru incalzire."
      },
      {
        title: "Izoleaza traseele expuse",
        body: "Daca tevile trec prin zone reci, apa pierde caldura pana ajunge la punctul de consum."
      },
      {
        title: "Foloseste programare",
        body: "Un timer poate evita incalzirea apei in perioade in care nu o folosesti."
      },
      {
        title: "Verifica depunerile de calcar",
        body: "Intretinerea periodica poate ajuta boilerul sa functioneze mai eficient, mai ales in zone cu apa dura."
      }
    ],
    faq: [
      {
        question: "Cat consuma un boiler electric de 80L pe luna?",
        answer:
          "La 2000 W si doua ore de functionare pe zi, consumul este aproximativ 120 kWh pe luna."
      },
      {
        question: "Boilerul consuma cat timp sta in priza?",
        answer:
          "Nu la putere maxima. Rezistenta porneste cand temperatura apei scade sub setarea termostatului."
      },
      {
        question: "Merita oprit boilerul noaptea?",
        answer:
          "Depinde de izolare si program. Pentru unele locuinte, programarea poate reduce pierderile inutile."
      },
      {
        question: "Ce conteaza mai mult: puterea sau durata?",
        answer:
          "Ambele conteaza, dar durata zilnica are impact direct: fiecare ora la 2000 W inseamna aproximativ 2 kWh."
      }
    ]
  },
  {
    slug: "calorifer-electric",
    presetSlug: "calorifer-electric",
    title: "Cat consuma un calorifer electric? Cost lunar la incalzire",
    metaDescription:
      "Afla cat consuma un calorifer electric de 2000 W, vezi cost lunar estimativ si recomandari pentru incalzire electrica mai eficienta.",
    h1: "Cat consuma un calorifer electric?",
    shortName: "calorifer electric",
    intro:
      "Caloriferul electric este simplu de folosit, dar poate deveni scump daca incalzeste zilnic o camera. Calculatorul foloseste o putere orientativa de 2000 W si iti arata rapid impactul orelor de functionare.",
    watts: preset("calorifer-electric").watts,
    hoursPerDay: preset("calorifer-electric").hoursPerDay,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Supliment ocazional", hoursPerDay: 2, daysPerMonth: 20 },
      { scenario: "Folosire zilnica", hoursPerDay: 4, daysPerMonth: 30 },
      { scenario: "Incalzire intensa", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce incalzirea electrica directa costa mult",
        paragraphs: [
          "Un calorifer electric transforma energia electrica in caldura. Daca are 2000 W, o ora de functionare inseamna aproximativ 2 kWh. La folosire zilnica, acest lucru se vede rapid in factura.",
          "Spre deosebire de un aer conditionat folosit pe incalzire, care poate functiona ca pompa de caldura, un calorifer electric livreaza in principiu caldura direct din energia consumata. De aceea durata de functionare este foarte importanta."
        ]
      },
      {
        title: "Cum interpretezi costul lunar",
        paragraphs: [
          "La 2000 W si 4 ore pe zi, consumul ajunge la aproximativ 240 kWh pe luna. La 1,30 lei/kWh, costul estimativ este de 312 lei pe luna doar pentru acel aparat.",
          "Daca il folosesti ocazional, de exemplu doua ore pe zi in 20 de zile, costul scade mult. Calculatorul te ajuta sa vezi diferenta dintre incalzire de completare si incalzire principala."
        ]
      },
      {
        title: "Rolul izolatiei si al termostatului",
        paragraphs: [
          "O camera neizolata pierde caldura repede, iar caloriferul trebuie sa porneasca des. Ferestrele vechi, usile neetanse si peretii reci pot transforma un aparat comod intr-un consumator costisitor.",
          "Termostatul ajuta pentru ca opreste rezistenta cand temperatura este atinsa. Fara termostat sau cu temperatura setata prea sus, aparatul poate functiona mai mult decat ai nevoie."
        ]
      },
      {
        title: "Cand are sens un calorifer electric",
        paragraphs: [
          "Poate fi util pentru incalzire temporara intr-o camera mica, pentru perioade scurte sau ca solutie de urgenta. Devine mai greu de justificat ca sursa principala pentru camere mari sau pentru multe ore pe zi.",
          "Compara intotdeauna cu alternativele disponibile: aer conditionat pe incalzire, centrala, panou radiant sau imbunatatiri de izolatie. Uneori economia vine mai degraba din reducerea pierderilor decat din schimbarea aparatului."
        ]
      }
    ],
    costExamples: [
      {
        title: "Camera incalzita ocazional",
        description: "Aparatul completeaza incalzirea in zile reci.",
        hoursPerDay: 2,
        daysPerMonth: 20
      },
      {
        title: "Folosire zilnica seara",
        description: "Caloriferul functioneaza cateva ore dupa-amiaza si seara.",
        hoursPerDay: 4,
        daysPerMonth: 30
      },
      {
        title: "Incalzire principala",
        description: "Scenariu costisitor, cu functionare multe ore in fiecare zi.",
        hoursPerDay: 8,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Foloseste termostatul",
        body: "Seteaza o temperatura realista si lasa aparatul sa se opreasca automat cand camera este incalzita."
      },
      {
        title: "Incalzeste doar camera folosita",
        body: "Inchide usile catre zonele nefolosite pentru a reduce volumul de aer incalzit."
      },
      {
        title: "Redu pierderile",
        body: "Etanseaza ferestrele si usile. O camera care pastreaza caldura cere mai putine ore de functionare."
      },
      {
        title: "Evita functionarea nesupravegheata",
        body: "Pe langa cost, aparatele de incalzire trebuie folosite responsabil si conform instructiunilor producatorului."
      }
    ],
    faq: [
      {
        question: "Cat costa un calorifer electric folosit 4 ore pe zi?",
        answer:
          "La 2000 W si 1,30 lei/kWh, costul este aproximativ 312 lei pe luna pentru 30 de zile."
      },
      {
        question: "Caloriferul electric consuma mai mult decat aerul conditionat?",
        answer:
          "Pentru incalzire, de multe ori da, deoarece aerul conditionat cu pompa de caldura poate fi mai eficient."
      },
      {
        question: "Termostatul reduce factura?",
        answer:
          "Da, daca opreste aparatul cand temperatura dorita este atinsa."
      },
      {
        question: "Este bun pentru incalzire permanenta?",
        answer:
          "Poate fi scump ca solutie permanenta, mai ales in camere mari sau slab izolate."
      }
    ]
  },
  {
    slug: "pc-gaming",
    presetSlug: "pc-gaming",
    title: "Cat consuma un PC gaming? Consum si cost lunar",
    metaDescription:
      "Calculeaza consumul unui PC gaming, costul lunar estimativ, exemple pentru gaming zilnic si sfaturi pentru reducerea consumului.",
    h1: "Cat consuma un PC gaming?",
    shortName: "PC gaming",
    intro:
      "Un PC gaming poate consuma foarte diferit in functie de placa video, procesor si jocurile rulate. Calculatorul foloseste o estimare de 550 W pentru sistem, fara monitor, si poate fi ajustat manual.",
    watts: preset("pc-gaming").watts,
    hoursPerDay: preset("pc-gaming").hoursPerDay,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Gaming ocazional", hoursPerDay: 2, daysPerMonth: 20 },
      { scenario: "Gaming zilnic", hoursPerDay: 4, daysPerMonth: 30 },
      { scenario: "Gaming si streaming", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce un PC gaming nu consuma constant",
        paragraphs: [
          "Consumul unui PC gaming creste mult in jocuri, randare sau streaming si scade in browsing, filme sau idle. Placa video este de obicei componenta care schimba cel mai mult consumul total.",
          "Sursa de 750 W nu inseamna ca PC-ul consuma 750 W permanent. Aceasta este capacitatea maxima pe care sursa o poate livra. Consumul real depinde de componente si de sarcina din acel moment."
        ]
      },
      {
        title: "Ce include estimarea de 550 W",
        paragraphs: [
          "Valoarea de 550 W este o estimare pentru un sistem performant in sarcina, nu pentru orice PC. Un sistem entry-level poate consuma mult mai putin, iar un PC high-end cu placa video puternica poate depasi aceasta valoare.",
          "Monitorul, boxele, routerul, luminile RGB externe sau consola de captură nu sunt incluse automat. Pentru o estimare completa, adauga separat fiecare aparat in simulatorul de factura lunara."
        ]
      },
      {
        title: "Cum se traduce gamingul in cost lunar",
        paragraphs: [
          "La 550 W si 4 ore pe zi, consumul ajunge la aproximativ 66 kWh pe luna. La 1,30 lei/kWh, costul estimativ este in jur de 86 lei pe luna pentru unitatea PC.",
          "Daca joci doar in weekend, costul poate fi mult mai mic. Daca PC-ul ramane pornit zilnic pentru download, streaming sau lucrari grafice, consumul creste chiar daca nu esti mereu in joc."
        ]
      },
      {
        title: "Cand merita comparat cu laptop sau consola",
        paragraphs: [
          "Un laptop consuma de obicei mai putin decat un desktop gaming, dar are alta performanta si alta experienta. O consola poate fi mai eficienta in unele jocuri, insa depinde de televizorul folosit.",
          "Comparatia este utila daca folosesti sistemul multe ore pe zi. Diferenta de consum poate conta pentru cine lucreaza si se joaca pe acelasi PC, mai ales intr-o locuinta cu mai multe dispozitive pornite."
        ]
      }
    ],
    costExamples: [
      {
        title: "Gaming in weekend",
        description: "Doua ore pe zi in aproximativ 12 zile pe luna.",
        hoursPerDay: 2,
        daysPerMonth: 12
      },
      {
        title: "Gaming zilnic",
        description: "Patru ore de jocuri sau sarcini grafice in fiecare zi.",
        hoursPerDay: 4,
        daysPerMonth: 30
      },
      {
        title: "PC high-end",
        description: "Sistem mai puternic, folosit intens pentru jocuri si streaming.",
        watts: 750,
        hoursPerDay: 5,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Activeaza limitarea FPS",
        body: "Limitarea cadrelor pe secunda poate reduce solicitarea placii video in jocurile care ruleaza peste nevoia monitorului."
      },
      {
        title: "Opreste PC-ul cand nu il folosesti",
        body: "Idle-ul zilnic se aduna, mai ales daca sistemul ramane pornit pentru ore intregi."
      },
      {
        title: "Foloseste setari echilibrate",
        body: "Uneori diferenta vizuala intre ultra si high este mica, dar consumul si zgomotul pot scadea."
      },
      {
        title: "Include monitorul in calcul",
        body: "Un monitor mare sau foarte luminos poate adauga consum relevant la costul total al setupului."
      }
    ],
    faq: [
      {
        question: "Un PC gaming consuma 550 W tot timpul?",
        answer:
          "Nu. 550 W este o estimare in sarcina. In browsing sau idle, consumul poate fi mult mai mic."
      },
      {
        question: "Sursa de 750 W inseamna consum de 750 W?",
        answer:
          "Nu. Sursa indica puterea maxima disponibila, nu consumul constant."
      },
      {
        question: "Monitorul este inclus?",
        answer:
          "Nu in estimarea de baza. Pentru cost complet, adauga monitorul separat."
      },
      {
        question: "Cum reduc consumul fara sa schimb PC-ul?",
        answer:
          "Limiteaza FPS-ul, foloseste setari grafice echilibrate si opreste PC-ul cand nu il folosesti."
      }
    ]
  },
  {
    slug: "televizor",
    presetSlug: "televizor",
    title: "Cat consuma un televizor? Consum lunar si cost estimativ",
    metaDescription:
      "Afla cat consuma un televizor LED sau Smart TV, vezi exemple de cost lunar, factori importanti si recomandari de economie.",
    h1: "Cat consuma un televizor?",
    shortName: "televizor",
    intro:
      "Televizorul nu este de obicei cel mai mare consumator din casa, dar poate conta daca este pornit multe ore pe zi. Estimarea foloseste un televizor LED modern de 90 W.",
    watts: preset("televizor").watts,
    hoursPerDay: preset("televizor").hoursPerDay,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Folosire usoara", hoursPerDay: 2, daysPerMonth: 30 },
      { scenario: "Folosire zilnica", hoursPerDay: 4, daysPerMonth: 30 },
      { scenario: "Televizor pornit mult", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "Ce influenteaza consumul unui televizor",
        paragraphs: [
          "Consumul depinde de diagonala, tehnologia ecranului, luminozitate si modul de imagine. Un televizor mare, setat pe luminozitate maxima, consuma mai mult decat unul mai mic folosit in mod eco.",
          "Smart TV-ul mai consuma si in stand-by, de obicei putin, dar permanent. Daca ai si soundbar, consola, receiver sau media box, costul total al zonei TV poate fi mai mare decat consumul televizorului singur."
        ]
      },
      {
        title: "Cum calculezi costul lunar",
        paragraphs: [
          "Pentru un televizor de 90 W folosit 4 ore pe zi, consumul este de aproximativ 10,8 kWh pe luna. La 1,30 lei/kWh, costul estimativ este de aproximativ 14 lei pe luna.",
          "Daca televizorul ramane pornit ca fundal multe ore, consumul se dubleaza sau chiar se tripleaza. Timpul de utilizare este mai important decat diferenta dintre doua moduri de imagine."
        ]
      },
      {
        title: "Diferente intre LED, OLED si televizoare vechi",
        paragraphs: [
          "Televizoarele LED moderne sunt de obicei eficiente. Modelele OLED pot varia in functie de imaginea afisata, iar televizoarele vechi cu plasma pot consuma mult mai mult decat un Smart TV actual.",
          "Eticheta energetica este utila, dar este bine sa o compari cu obiceiurile tale. Un televizor eficient pornit opt ore pe zi poate costa mai mult decat unul mai putin eficient folosit rar."
        ]
      },
      {
        title: "Cand conteaza consumul televizorului",
        paragraphs: [
          "Pentru o familie care foloseste televizorul cateva ore seara, costul este moderat. Pentru spatii comerciale, sali de asteptare sau locuinte unde televizorul sta pornit aproape toata ziua, consumul devine mai vizibil.",
          "Daca vrei o estimare completa, include si aparatele conectate. O consola de jocuri sau un sistem audio poate consuma mai mult decat televizorul in anumite scenarii."
        ]
      }
    ],
    costExamples: [
      {
        title: "Filme seara",
        description: "Televizor folosit aproximativ doua ore pe zi.",
        hoursPerDay: 2,
        daysPerMonth: 30
      },
      {
        title: "Folosire zilnica normala",
        description: "Patru ore pe zi pentru stiri, filme si streaming.",
        hoursPerDay: 4,
        daysPerMonth: 30
      },
      {
        title: "TV pornit multe ore",
        description: "Televizor lasat deschis ca fundal in timpul zilei.",
        hoursPerDay: 8,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Activeaza modul eco",
        body: "Reducerea luminozitatii poate scadea consumul fara sa afecteze mult confortul vizual."
      },
      {
        title: "Opreste ecranul cand asculti muzica",
        body: "Unele televizoare permit oprirea imaginii atunci cand folosesti doar sunetul."
      },
      {
        title: "Nu il lasa pornit ca fundal",
        body: "Orele in plus cantaresc mai mult decat diferentele mici de putere intre modele."
      },
      {
        title: "Verifica aparatele conectate",
        body: "Consolele, receiverul si soundbarul pot adauga cost lunar separat."
      }
    ],
    faq: [
      {
        question: "Cat consuma un televizor pe luna?",
        answer:
          "Un televizor de 90 W folosit 4 ore pe zi consuma aproximativ 10,8 kWh pe luna."
      },
      {
        question: "Un televizor mare consuma mai mult?",
        answer:
          "In general da, dar tehnologia ecranului si luminozitatea pot conta la fel de mult."
      },
      {
        question: "Stand-by-ul televizorului conteaza?",
        answer:
          "De obicei este mic, dar se poate aduna daca ai multe dispozitive conectate permanent."
      },
      {
        question: "Modul eco reduce consumul?",
        answer:
          "Da, de regula reduce luminozitatea si poate scadea consumul."
      }
    ]
  },
  {
    slug: "masina-de-spalat",
    presetSlug: "masina-de-spalat",
    title: "Cat consuma o masina de spalat? Cost lunar estimativ",
    metaDescription:
      "Afla cat consuma o masina de spalat, cum influenteaza temperatura programului costul lunar si ce poti face pentru economie.",
    h1: "Cat consuma o masina de spalat?",
    shortName: "masina de spalat",
    intro:
      "Masina de spalat consuma diferit in functie de program, temperatura apei si numarul de cicluri. Calculatorul este precompletat cu o estimare medie si poate fi ajustat dupa rutina ta.",
    watts: preset("masina-de-spalat").watts,
    hoursPerDay: preset("masina-de-spalat").hoursPerDay,
    daysPerMonth: 16,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "2 spalari pe saptamana", hoursPerDay: 1, daysPerMonth: 8 },
      { scenario: "4 spalari pe saptamana", hoursPerDay: 1, daysPerMonth: 16 },
      { scenario: "Spalari frecvente", hoursPerDay: 1.5, daysPerMonth: 24 }
    ],
    contentSections: [
      {
        title: "Ce consuma cel mai mult la masina de spalat",
        paragraphs: [
          "Incalzirea apei este una dintre cele mai importante surse de consum. Un program la 60 de grade consuma de obicei mai mult decat unul la 30 sau 40 de grade, chiar daca durata pare similara.",
          "Motorul, pompa si electronica au si ele consum, dar diferenta mare vine de obicei din temperatura si durata. De aceea doua programe de spalare pot avea costuri diferite chiar pe aceeasi masina."
        ]
      },
      {
        title: "Cum estimezi costul lunar",
        paragraphs: [
          "Daca folosim 700 W pentru o ora si 16 spalari pe luna, consumul ajunge la aproximativ 11,2 kWh. La 1,30 lei/kWh, costul estimativ este in jur de 15 lei pe luna.",
          "In practica, unele cicluri consuma mai putin, altele mai mult. Pentru o estimare mai apropiata, poti folosi durata programului tau obisnuit si numarul real de spalari dintr-o luna."
        ]
      },
      {
        title: "De ce programele eco dureaza mai mult",
        paragraphs: [
          "Un program eco poate dura mai mult, dar foloseste temperatura si miscari optimizate pentru a reduce energia consumata. Durata mai lunga nu inseamna automat cost mai mare.",
          "Daca rufele nu sunt foarte murdare, spalarea la temperatura mai mica poate fi suficienta. Pentru igienizare sau pete dificile, programele calde au sens, dar nu trebuie folosite din reflex la fiecare ciclu."
        ]
      },
      {
        title: "Cand conteaza numarul de spalari",
        paragraphs: [
          "Pentru o persoana, doua spalari pe saptamana pot avea un cost mic. Pentru o familie, mai multe cicluri pe saptamana schimba calculul, mai ales daca se folosesc programe lungi si temperaturi ridicate.",
          "Consumul de apa si detergent nu este inclus in calculul electric, dar face parte din costul real de utilizare. Pagina se concentreaza pe energia electrica, adica partea care apare in kWh."
        ]
      }
    ],
    costExamples: [
      {
        title: "Doua spalari pe saptamana",
        description: "Rutina usoara pentru o persoana sau cuplu.",
        hoursPerDay: 1,
        daysPerMonth: 8
      },
      {
        title: "Familie, spalari regulate",
        description: "Aproximativ patru cicluri de spalare pe saptamana.",
        hoursPerDay: 1,
        daysPerMonth: 16
      },
      {
        title: "Programe lungi si dese",
        description: "Mai multe cicluri si durate mai mari, cu haine multe.",
        hoursPerDay: 1.5,
        daysPerMonth: 24
      }
    ],
    savingTips: [
      {
        title: "Spala la temperaturi potrivite",
        body: "30-40 de grade pot fi suficiente pentru multe haine si reduc energia folosita pentru incalzirea apei."
      },
      {
        title: "Incarca masina corect",
        body: "Evita ciclurile aproape goale, dar nu supraincarca tamburul, pentru ca spalarea devine mai slaba."
      },
      {
        title: "Foloseste eco cand are sens",
        body: "Programul eco este proiectat pentru consum redus, chiar daca poate dura mai mult."
      },
      {
        title: "Curata filtrul",
        body: "Intretinerea simpla ajuta masina sa evacueze apa corect si sa functioneze eficient."
      }
    ],
    faq: [
      {
        question: "Cat consuma o masina de spalat la un ciclu?",
        answer:
          "Depinde de program. O estimare simpla pentru 700 W si o ora este 0,7 kWh pe ciclu."
      },
      {
        question: "Temperatura apei conteaza?",
        answer:
          "Da. Incalzirea apei este una dintre principalele surse de consum."
      },
      {
        question: "Programul eco consuma mai putin?",
        answer:
          "De obicei da, chiar daca dureaza mai mult decat un program rapid."
      },
      {
        question: "Este mai ieftin sa spal la 30 de grade?",
        answer:
          "In multe cazuri da, pentru ca masina foloseste mai putina energie pentru incalzire."
      }
    ]
  },
  {
    slug: "uscator-rufe",
    presetSlug: "uscator-rufe",
    title: "Cat consuma un uscator de rufe? Cost lunar estimativ",
    metaDescription:
      "Calculeaza consumul unui uscator de rufe, vezi costuri lunare pentru folosire rara sau frecventa si recomandari de economie.",
    h1: "Cat consuma un uscator de rufe?",
    shortName: "uscator de rufe",
    intro:
      "Uscatorul de rufe poate fi foarte comod, dar consumul depinde mult de tehnologie si de cat de des il folosesti. Estimarea foloseste un uscator clasic de 2500 W.",
    watts: preset("uscator-rufe").watts,
    hoursPerDay: preset("uscator-rufe").hoursPerDay,
    daysPerMonth: 12,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Utilizare rara", hoursPerDay: 1, daysPerMonth: 6 },
      { scenario: "Utilizare medie", hoursPerDay: 1, daysPerMonth: 12 },
      { scenario: "Utilizare frecventa", hoursPerDay: 1.5, daysPerMonth: 20 }
    ],
    contentSections: [
      {
        title: "De ce uscatorul poate consuma mult",
        paragraphs: [
          "Uscatorul foloseste energie pentru incalzirea aerului si rotirea tamburului. Un model clasic poate avea putere mare, iar un ciclu lung se traduce rapid in kWh consumati.",
          "Modelele cu pompa de caldura sunt de obicei mai eficiente, deoarece recupereaza o parte din caldura. Diferenta de consum poate fi importanta daca folosesti uscatorul de mai multe ori pe saptamana."
        ]
      },
      {
        title: "Cum estimezi costul unui ciclu",
        paragraphs: [
          "La 2500 W, o ora de functionare inseamna aproximativ 2,5 kWh. Daca folosesti uscatorul de 12 ori pe luna cate o ora, consumul estimativ este de 30 kWh lunar.",
          "La 1,30 lei/kWh, acest scenariu ajunge la aproximativ 39 lei pe luna. Pentru cicluri de 90 de minute sau folosire frecventa, costul urca vizibil."
        ]
      },
      {
        title: "Ce influenteaza durata uscarii",
        paragraphs: [
          "Rufele stoarse slab pastreaza multa apa, iar uscatorul are nevoie de mai mult timp. Viteza de centrifugare a masinii de spalat poate influenta direct consumul uscatorului.",
          "Filtrul plin de scame ingreuneaza circulatia aerului. Daca filtrul si condensatorul nu sunt curatate, aparatul poate usca mai greu si poate consuma mai mult."
        ]
      },
      {
        title: "Cand merita folosit uscatorul",
        paragraphs: [
          "Uscatorul este util in apartamente fara balcon, iarna sau cand ai nevoie rapid de haine uscate. Pentru utilizare ocazionala, costul lunar poate ramane moderat.",
          "Daca il folosesti dupa aproape fiecare spalare, merita comparat un model cu pompa de caldura sau programe mai eficiente. Economia lunara poate conta in timp."
        ]
      }
    ],
    costExamples: [
      {
        title: "Cateva cicluri pe luna",
        description: "Uscator folosit doar cand vremea nu permite uscarea naturala.",
        hoursPerDay: 1,
        daysPerMonth: 6
      },
      {
        title: "Folosire saptamanala",
        description: "Aproximativ trei cicluri pe saptamana.",
        hoursPerDay: 1,
        daysPerMonth: 12
      },
      {
        title: "Familie, utilizare frecventa",
        description: "Cicluri mai lungi si multe rufe in fiecare luna.",
        hoursPerDay: 1.5,
        daysPerMonth: 20
      }
    ],
    savingTips: [
      {
        title: "Centrifugheaza bine rufele",
        body: "Cu cat hainele intra mai uscate, cu atat uscatorul are mai putina apa de eliminat."
      },
      {
        title: "Curata filtrul dupa fiecare ciclu",
        body: "Fluxul bun de aer reduce durata uscarii si ajuta aparatul sa functioneze corect."
      },
      {
        title: "Nu supraincarca tamburul",
        body: "Rufele au nevoie de spatiu pentru circulatia aerului cald."
      },
      {
        title: "Compara modelele cu pompa de caldura",
        body: "Pentru utilizare frecventa, diferenta de consum poate justifica pretul mai mare."
      }
    ],
    faq: [
      {
        question: "Cat consuma un uscator de rufe pe ciclu?",
        answer:
          "Un uscator clasic de 2500 W poate consuma aproximativ 2,5 kWh intr-o ora de functionare."
      },
      {
        question: "Uscatorul cu pompa de caldura consuma mai putin?",
        answer:
          "In general da, mai ales comparativ cu un uscator clasic cu rezistenta."
      },
      {
        question: "Filtrul murdar creste consumul?",
        answer:
          "Da, poate prelungi uscarea si reduce eficienta aparatului."
      },
      {
        question: "Merita uscatorul daca il folosesc rar?",
        answer:
          "Costul lunar poate fi moderat daca este folosit ocazional, dar depinde de durata ciclurilor."
      }
    ]
  },
  {
    slug: "cuptor-electric",
    presetSlug: "cuptor-electric",
    title: "Cat consuma un cuptor electric? Cost lunar la gatit",
    metaDescription:
      "Afla cat consuma un cuptor electric, cum influenteaza preincalzirea factura si vezi exemple de cost lunar pentru gatit.",
    h1: "Cat consuma un cuptor electric?",
    shortName: "cuptor electric",
    intro:
      "Cuptorul electric are putere mare, dar rezistentele nu functioneaza permanent la putere maxima. Calculatorul foloseste 2200 W si o durata orientativa de 45 de minute.",
    watts: preset("cuptor-electric").watts,
    hoursPerDay: preset("cuptor-electric").hoursPerDay,
    daysPerMonth: 20,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Gatit ocazional", hoursPerDay: 0.75, daysPerMonth: 8 },
      { scenario: "Gatit des", hoursPerDay: 0.75, daysPerMonth: 20 },
      { scenario: "Gatit zilnic", hoursPerDay: 1, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce puterea cuptorului nu spune tot",
        paragraphs: [
          "Un cuptor electric poate avea 2000-2500 W, dar termostatul porneste si opreste rezistentele pentru a mentine temperatura. De aceea, consumul real depinde de reteta, temperatura si durata.",
          "Preincalzirea consuma energie inainte ca mancarea sa intre in cuptor. Pentru unele retete este necesara, pentru altele poate fi redusa sau evitata, in functie de recomandarea retetei."
        ]
      },
      {
        title: "Cum se calculeaza costul la gatit",
        paragraphs: [
          "La 2200 W, 45 de minute inseamna aproximativ 1,65 kWh daca estimam functionare la putere nominala. Folosit de 20 de ori pe luna, ajunge la aproximativ 33 kWh.",
          "La 1,30 lei/kWh, costul este in jur de 43 lei pe luna pentru acest scenariu. Gatitul zilnic, temperaturile mari si retetele lungi pot creste costul."
        ]
      },
      {
        title: "Ce creste consumul cuptorului",
        paragraphs: [
          "Deschiderea usii in timpul gatitului pierde caldura si poate face rezistentele sa porneasca din nou. Vasele reci, cantitatile mari si temperatura foarte ridicata pot prelungi timpul necesar.",
          "Functia de convectie poate ajuta in unele cazuri, deoarece distribuie mai bine caldura. Totusi, rezultatul depinde de reteta si de modul in care este folosit cuptorul."
        ]
      },
      {
        title: "Cum compari cu alte aparate de gatit",
        paragraphs: [
          "Pentru portii mici, uneori o friteuza cu aer cald, un multicooker sau o plita pot consuma mai putin deoarece incalzesc un volum mai mic. Pentru tavi mari, cuptorul ramane practic.",
          "Daca gatesti mai multe feluri consecutiv, poti folosi caldura deja acumulata. Diferenta nu este uriasa la o singura utilizare, dar se aduna cand gatesti des."
        ]
      }
    ],
    costExamples: [
      {
        title: "Gatit ocazional",
        description: "Cuptor folosit de cateva ori pe luna pentru retete scurte.",
        hoursPerDay: 0.75,
        daysPerMonth: 8
      },
      {
        title: "Gatit de cateva ori pe saptamana",
        description: "Scenariu obisnuit pentru mese pregatite acasa.",
        hoursPerDay: 0.75,
        daysPerMonth: 20
      },
      {
        title: "Gatit zilnic",
        description: "Cuptor folosit aproape in fiecare zi, aproximativ o ora.",
        hoursPerDay: 1,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Preincalzeste doar cand este necesar",
        body: "Unele retete permit pornirea cuptorului direct, fara preincalzire lunga."
      },
      {
        title: "Evita deschiderea repetata a usii",
        body: "Fiecare deschidere pierde caldura si poate prelungi timpul de gatire."
      },
      {
        title: "Gateste mai multe preparate",
        body: "Daca folosesti cuptorul pentru mai multe tavi, profiti de caldura deja acumulata."
      },
      {
        title: "Alege vasul potrivit",
        body: "Vasele potrivite si dimensiunea corecta pot reduce timpul pana la gatire."
      }
    ],
    faq: [
      {
        question: "Cat consuma un cuptor electric intr-o ora?",
        answer:
          "La 2200 W, o ora poate insemna pana la 2,2 kWh, dar termostatul poate reduce consumul real."
      },
      {
        question: "Preincalzirea consuma mult?",
        answer:
          "Consuma energie, iar impactul creste daca este lunga sau repetata des."
      },
      {
        question: "Convectia reduce consumul?",
        answer:
          "Poate ajuta in unele retete prin distribuirea mai buna a caldurii si temperaturi mai mici."
      },
      {
        question: "Cuptorul consuma mai mult decat plita?",
        answer:
          "Depinde de reteta si durata. Cuptorul incalzeste un volum mai mare, dar poate gati mai multe portii simultan."
      }
    ]
  },
  {
    slug: "bec-led",
    presetSlug: "bec-led",
    title: "Cat consuma un bec LED? Cost lunar si comparatii",
    metaDescription:
      "Vezi cat consuma un bec LED pe luna, cat costa la factura si de ce diferenta fata de becurile incandescente conteaza.",
    h1: "Cat consuma un bec LED?",
    shortName: "bec LED",
    intro:
      "Un bec LED consuma putin, dar calculul devine interesant cand ai multe becuri aprinse zilnic. Calculatorul foloseste un bec LED de 10 W si poate fi ajustat dupa puterea de pe ambalaj.",
    watts: preset("bec-led").watts,
    hoursPerDay: preset("bec-led").hoursPerDay,
    daysPerMonth: 30,
    pricePerKwh: defaultPricePerKwh,
    tableRows: [
      { scenario: "Hol sau baie", hoursPerDay: 2, daysPerMonth: 30 },
      { scenario: "Camera folosita zilnic", hoursPerDay: 6, daysPerMonth: 30 },
      { scenario: "Lumina aprinsa mult timp", hoursPerDay: 10, daysPerMonth: 30 }
    ],
    contentSections: [
      {
        title: "De ce becurile LED au cost mic",
        paragraphs: [
          "Un bec LED de 10 W folosit 6 ore pe zi consuma doar 1,8 kWh pe luna. La 1,30 lei/kWh, costul estimativ este putin peste 2 lei pe luna pentru un singur bec.",
          "Diferenta fata de un bec incandescent apare din eficienta. Pentru lumina similara, un LED poate folosi de cateva ori mai putina energie, ceea ce conteaza mai ales in camerele folosite zilnic."
        ]
      },
      {
        title: "Cand devine important consumul iluminatului",
        paragraphs: [
          "Un singur bec LED nu schimba factura major. Dar intr-o locuinta cu 10-15 becuri, aprinse seara cateva ore, diferenta fata de becurile vechi poate deveni vizibila.",
          "Iluminatul exterior, scara, holurile sau camerele unde lumina ramane aprinsa mult timp sunt zonele in care LED-ul aduce cea mai clara economie."
        ]
      },
      {
        title: "Cum alegi corect un bec LED",
        paragraphs: [
          "Nu te uita doar la W. Luminozitatea se compara in lumeni, iar temperatura de culoare influenteaza confortul. Un bec prea slab poate fi inlocuit cu mai multe becuri, anuland o parte din economie.",
          "Pentru zone de lucru, alege lumina potrivita si un bec de calitate. Palpairea, redarea slaba a culorilor sau durata mica de viata pot face un bec ieftin mai putin avantajos."
        ]
      },
      {
        title: "Comparatie cu bec incandescent",
        paragraphs: [
          "Un bec incandescent de 60 W folosit 6 ore pe zi consuma aproximativ 10,8 kWh pe luna. Un LED de 10 W in acelasi scenariu consuma aproximativ 1,8 kWh.",
          "Diferenta de 9 kWh pe luna inseamna aproximativ 11,7 lei la 1,30 lei/kWh pentru fiecare punct de lumina folosit intens. In cateva camere, economia se aduna repede."
        ]
      }
    ],
    costExamples: [
      {
        title: "Bec aprins putin",
        description: "Doua ore pe zi intr-un hol sau baie.",
        hoursPerDay: 2,
        daysPerMonth: 30
      },
      {
        title: "Camera folosita zilnic",
        description: "Sase ore pe zi seara sau in sezonul rece.",
        hoursPerDay: 6,
        daysPerMonth: 30
      },
      {
        title: "Comparatie cu incandescent",
        description: "Acelasi program, dar pentru un bec incandescent de 60 W.",
        watts: 60,
        hoursPerDay: 6,
        daysPerMonth: 30
      }
    ],
    savingTips: [
      {
        title: "Inlocuieste becurile folosite des",
        body: "Prioritizeaza camerele unde lumina sta aprinsa multe ore, nu becurile folosite rar."
      },
      {
        title: "Alege lumeni potriviti",
        body: "Un bec eficient trebuie sa ofere suficienta lumina, altfel vei aprinde surse suplimentare."
      },
      {
        title: "Foloseste senzori unde are sens",
        body: "Pe holuri sau in spatii de trecere, senzorii pot reduce luminile uitate aprinse."
      },
      {
        title: "Stinge luminile inutile",
        body: "Chiar si la LED, orele de functionare raman in formula de calcul."
      }
    ],
    faq: [
      {
        question: "Cat consuma un bec LED pe luna?",
        answer:
          "Un bec LED de 10 W folosit 6 ore pe zi consuma aproximativ 1,8 kWh pe luna."
      },
      {
        question: "Merita schimbate becurile incandescente?",
        answer:
          "Da, mai ales in camere unde lumina sta aprinsa multe ore."
      },
      {
        question: "W sau lumeni: ce conteaza?",
        answer:
          "W arata consumul, lumeni arata lumina produsa. Pentru comparatie corecta, uita-te la ambele."
      },
      {
        question: "Un bec LED consuma in stand-by?",
        answer:
          "Un bec simplu nu consuma daca este oprit. Becurile smart pot avea consum mic in stand-by."
      }
    ]
  }
];
