import type { SeoAppliancePage } from "@/data/seoAppliancePages";

type AdditionalPageInput = {
  slug: string;
  presetSlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  shortName: string;
  intro: string;
  watts: number;
  consumptionRange: string;
  hoursPerDay: number;
  daysPerMonth: number;
  tableRows: SeoAppliancePage["tableRows"];
  variationParagraphs: string[];
  reductionParagraphs: string[];
  practicalParagraphs: string[];
  costExamples: SeoAppliancePage["costExamples"];
  savingTips: SeoAppliancePage["savingTips"];
  faq: SeoAppliancePage["faq"];
};

const defaultPricePerKwh = 1.3;
const formattedDefaultPrice = defaultPricePerKwh.toFixed(2).replace(".", ",");

const interpretationTemplates = [
  (input: AdditionalPageInput) => [
    `Calculul pleaca de la ${input.watts} W, ${input.hoursPerDay} ore pe zi, ${input.daysPerMonth} zile pe luna si un pret de lucru de ${formattedDefaultPrice} lei/kWh. Schimba aceste valori cand programul tau de folosire este altul.`,
    `Pentru ${input.shortName}, intervalul realist este ${input.consumptionRange}. Nu este o valoare oficiala pentru un model anume, ci un reper practic pentru comparatii intre scenarii.`
  ],
  (input: AdditionalPageInput) => [
    `In acest exemplu sunt incluse ${input.watts} W, ${input.hoursPerDay} ore zilnice, ${input.daysPerMonth} zile intr-o luna si ${formattedDefaultPrice} lei/kWh. Daca aparatul merge mai rar sau mai des, totalul lunar se muta imediat in sus sau in jos.`,
    `${input.shortName} se incadreaza de regula in zona ${input.consumptionRange}. Pentru modelul tau, eticheta energetica sau manualul raman cele mai bune repere.`
  ],
  (input: AdditionalPageInput) => [
    `Scenariul de baza foloseste ${input.watts} W, ${input.hoursPerDay} ore pe zi si ${input.daysPerMonth} zile pe luna, la ${formattedDefaultPrice} lei/kWh. Asa poti vedea rapid ordinul de marime al costului.`,
    `Pentru ${input.shortName}, consumul poate sta in jurul intervalului ${input.consumptionRange}. Rezultatul nu tine loc de masurare directa la priza.`
  ],
  (input: AdditionalPageInput) => [
    `Pentru calcul au fost puse in formula ${input.watts} W, ${input.hoursPerDay} ore de utilizare pe zi, ${input.daysPerMonth} zile pe luna si ${formattedDefaultPrice} lei/kWh. Datele pot fi ajustate dupa rutina ta reala.`,
    `Intervalul ${input.consumptionRange} ajuta la compararea scenariilor pentru ${input.shortName}. Consumul unui produs concret poate fi verificat cel mai bine din fisa tehnica sau cu un wattmetru.`
  ],
  (input: AdditionalPageInput) => [
    `Exemplul ia in calcul ${input.watts} W, ${input.hoursPerDay} ore pe zi, ${input.daysPerMonth} zile pe luna si un pret al energiei de ${formattedDefaultPrice} lei/kWh. Este util mai ales cand vrei sa compari doua moduri de folosire.`,
    `Pentru ${input.shortName}, zona obisnuita de consum este ${input.consumptionRange}. Modelul, setarile si mediul in care este folosit aparatul pot muta rezultatul.`
  ]
];

function getInterpretationParagraphs(input: AdditionalPageInput): string[] {
  const variantIndex = input.slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % interpretationTemplates.length;

  return interpretationTemplates[variantIndex](input);
}

function createAdditionalPage(input: AdditionalPageInput): SeoAppliancePage {
  return {
    slug: input.slug,
    presetSlug: input.presetSlug,
    title: input.title,
    metaDescription: input.metaDescription,
    h1: input.h1,
    shortName: input.shortName,
    intro: input.intro,
    watts: input.watts,
    consumptionRange: input.consumptionRange,
    hoursPerDay: input.hoursPerDay,
    daysPerMonth: input.daysPerMonth,
    pricePerKwh: defaultPricePerKwh,
    tableRows: input.tableRows,
    contentSections: [
      {
        title: `Cum calculezi consumul pentru ${input.shortName}`,
        paragraphs: input.practicalParagraphs
      },
      {
        title: "De ce poate varia consumul?",
        paragraphs: input.variationParagraphs
      },
      {
        title: "Cum reduci consumul?",
        paragraphs: input.reductionParagraphs
      },
      {
        title: "Cum citesti costul rezultat",
        paragraphs: getInterpretationParagraphs(input)
      }
    ],
    costExamples: input.costExamples,
    savingTips: input.savingTips,
    faq: input.faq
  };
}

export const additionalSeoAppliancePages: SeoAppliancePage[] = [
  createAdditionalPage({
    slug: "aer-conditionat-9000-btu",
    presetSlug: "aer-conditionat-9000-btu",
    title: "Cat consuma un aer conditionat 9000 BTU? Cost lunar",
    metaDescription:
      "Afla cat consuma un aer conditionat de 9000 BTU, cu calculator precompletat, exemple de cost si sfaturi pentru reducerea consumului vara.",
    h1: "Cat consuma un aer conditionat 9000 BTU?",
    shortName: "aer conditionat 9000 BTU",
    intro:
      "Un aer conditionat de 9000 BTU poate consuma mai putin decat unul de 12000 sau 18000 BTU atunci cand raceste o camera mica. Intr-un dormitor folosit seara, costul ramane de obicei mai usor de controlat decat intr-un living mare. Orele de functionare, temperatura aleasa si izolatia camerei schimba totalul de pe factura.",
    watts: 900,
    consumptionRange: "aproximativ 0,6-1,4 kWh pe ora",
    hoursPerDay: 5,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Dormitor racit seara", hoursPerDay: 3, daysPerMonth: 20 },
      { scenario: "Folosire zilnica vara", hoursPerDay: 5, daysPerMonth: 30 },
      { scenario: "Canicula in camera mica", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Pentru un aparat de 9000 BTU, porneste de la puterea in W din specificatii sau de pe eticheta. Cand nu ai documentatia la indemana, 900 W este un reper practic pentru scenarii rapide.",
      "Formula ramane aceeasi: W / 1000 × ore × zile. Daca aparatul functioneaza 5 ore pe zi timp de 30 de zile, vezi imediat cat poate conta racirea unei singure camere."
    ],
    variationParagraphs: [
      "Un model inverter poate consuma mai putin dupa ce camera ajunge la temperatura dorita. Un model vechi sau subdimensionat poate functiona mai intens si mai mult timp.",
      "Conteaza orientarea camerei, umbrirea ferestrelor, temperatura exterioara si cat de des se deschide usa."
    ],
    reductionParagraphs: [
      "Seteaza temperatura la un nivel realist, de exemplu 24-26 de grade, si evita racirea agresiva a camerei.",
      "Foloseste perdele, rulouri sau ventilatie naturala cand temperatura exterioara scade, pentru a reduce orele de functionare."
    ],
    costExamples: [
      { title: "Folosire seara", description: "Racire dupa apus, in dormitor.", hoursPerDay: 3, daysPerMonth: 20 },
      { title: "Utilizare zilnica", description: "Scenariu obisnuit vara.", hoursPerDay: 5, daysPerMonth: 30 },
      { title: "Zile foarte calde", description: "Functionare extinsa in canicula.", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Nu cobori temperatura inutil", body: "Fiecare grad in minus poate creste timpul de lucru al compresorului." },
      { title: "Raceste camera potrivita", body: "Un aparat mic este mai eficient intr-o camera potrivita ca suprafata." },
      { title: "Curata filtrele", body: "Filtrele incarcate reduc fluxul de aer si confortul." },
      { title: "Limiteaza soarele direct", body: "Umbra la ferestre reduce sarcina aparatului." }
    ],
    faq: [
      { question: "Cat consuma lunar un aer conditionat 9000 BTU?", answer: "La 900 W, 5 ore pe zi si 30 de zile, consumul ajunge la 135 kWh pe luna." },
      { question: "Este mai ieftin decat unul de 12000 BTU?", answer: "De obicei poate consuma mai putin, dar doar daca este potrivit pentru camera si nu functioneaza fortat." },
      { question: "Pot calcula consumul pentru model inverter?", answer: "Da, dar introdu o putere medie daca stii ca aparatul nu merge constant la puterea nominala." },
      { question: "Valoarea este exacta?", answer: "Nu. Rezultatul se schimba dupa model, temperatura, izolatie si utilizare." }
    ]
  }),
  createAdditionalPage({
    slug: "aer-conditionat-18000-btu",
    presetSlug: "aer-conditionat-18000-btu",
    title: "Cat consuma un aer conditionat 18000 BTU? Consum si cost",
    metaDescription:
      "Calculator pentru consumul unui aer conditionat de 18000 BTU: cost zilnic, lunar si anual, exemple si recomandari pentru camere mari.",
    h1: "Cat consuma un aer conditionat 18000 BTU?",
    shortName: "aer conditionat 18000 BTU",
    intro:
      "Un aer conditionat de 18000 BTU poate consuma mult intr-un living mare sau intr-un spatiu deschis folosit zilnic vara. La multe ore de functionare, diferenta se vede rapid in costul lunar. Tehnologia aparatului, caldura care intra prin ferestre si setarile de temperatura pot schimba consumul de la o locuinta la alta.",
    watts: 1800,
    consumptionRange: "aproximativ 1,2-2,8 kWh pe ora",
    hoursPerDay: 5,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Living racit ocazional", hoursPerDay: 3, daysPerMonth: 20 },
      { scenario: "Folosire zilnica", hoursPerDay: 5, daysPerMonth: 30 },
      { scenario: "Spatiu mare in canicula", hoursPerDay: 9, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "La aparatele de 18000 BTU, puterea si durata conteaza mult. O ora in plus pe zi poate adauga vizibil la costul lunar.",
      "Daca aparatul raceste un spatiu deschis, estimeaza realist orele in care compresorul lucreaza intens, nu doar timpul in care telecomanda arata aparatul pornit."
    ],
    variationParagraphs: [
      "Consumul variaza dupa suprafata camerei, inaltimea tavanului, expunerea la soare si diferenta dintre temperatura setata si cea exterioara.",
      "Un aparat prea mic pentru spatiu poate functiona continuu, iar unul potrivit poate ajunge mai repede la temperatura dorita si apoi sa moduleze."
    ],
    reductionParagraphs: [
      "Inchide usile catre camerele nefolosite si limiteaza zonele racite inutil.",
      "Curata filtrele, verifica unitatea exterioara si evita setarile extreme care forteaza aparatul."
    ],
    costExamples: [
      { title: "Living seara", description: "Racire pentru cateva ore.", hoursPerDay: 3, daysPerMonth: 20 },
      { title: "Utilizare zilnica vara", description: "Scenariu de vara pentru spatiu mare.", hoursPerDay: 5, daysPerMonth: 30 },
      { title: "Utilizare intensa", description: "Canicula si spatiu deschis.", hoursPerDay: 9, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Raceste pe zone", body: "Nu raci camerele in care nu stai." },
      { title: "Foloseste modul auto", body: "Poate evita functionarea la putere mare mai mult decat este necesar." },
      { title: "Umbreste ferestrele", body: "Reduce incalzirea camerei in orele de varf." },
      { title: "Verifica dimensionarea", body: "Un aparat nepotrivit pentru spatiu poate consuma mai mult." }
    ],
    faq: [
      { question: "Cat consuma un aer conditionat 18000 BTU pe luna?", answer: "La 1800 W, 5 ore pe zi si 30 de zile, consumul ajunge la 270 kWh pe luna." },
      { question: "De ce poate fi costul mare?", answer: "Puterea este mai mare, iar aparatul este folosit de obicei in spatii mari sau perioade calde." },
      { question: "Inverter inseamna consum fix mic?", answer: "Nu. Inverterul moduleaza puterea, dar consumul depinde in continuare de temperatura si spatiu." },
      { question: "Cum il compar cu 12000 BTU?", answer: "Compara aceleasi ore, zile si pret kWh in calculator, tinand cont de camera deservita." }
    ]
  }),
  createAdditionalPage({
    slug: "ventilator",
    presetSlug: "ventilator",
    title: "Cat consuma un ventilator? Cost pe zi si pe luna",
    metaDescription:
      "Afla cat consuma un ventilator de camera, cu exemple pentru folosire zilnica, cost lunar si sfaturi pentru zile calde.",
    h1: "Cat consuma un ventilator?",
    shortName: "ventilator",
    intro:
      "Un ventilator consuma mult mai putin decat un aparat de aer conditionat, dar nu raceste aerul, ci il pune in miscare. Este o solutie buna cand ai nevoie de confort local cu cost mic. Puterea motorului, treapta aleasa si orele de functionare conteaza cel mai mult in zilele calde.",
    watts: 50,
    consumptionRange: "aproximativ 0,03-0,08 kWh pe ora",
    hoursPerDay: 8,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Folosire scurta", hoursPerDay: 3, daysPerMonth: 20 },
      { scenario: "Zilnic vara", hoursPerDay: 8, daysPerMonth: 30 },
      { scenario: "Aproape toata ziua", hoursPerDay: 14, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Pentru ventilator, calculul este simplu pentru ca puterea este de obicei relativ stabila pe trepte apropiate.",
      "Daca folosesti treapta maxima, introdu puterea mai mare din specificatii. Pentru trepte mici, consumul real poate fi sub valoarea nominala."
    ],
    variationParagraphs: [
      "Ventilatoarele de birou, de podea si cele tip turn pot avea puteri diferite. Modelele mari si treptele rapide consuma mai mult.",
      "Consumul creste cu durata. Chiar daca puterea este mica, un aparat lasat pornit 14 ore pe zi se aduna lunar."
    ],
    reductionParagraphs: [
      "Foloseste treapta potrivita, nu neaparat maxima, si opreste ventilatorul cand parasesti camera.",
      "Combina ventilatorul cu umbrirea camerei sau aerisirea seara pentru confort fara ore inutile de functionare."
    ],
    costExamples: [
      { title: "Birou cateva ore", description: "Ventilator folosit in timpul lucrului.", hoursPerDay: 3, daysPerMonth: 20 },
      { title: "Vara zilnic", description: "Folosire frecventa in zile calde.", hoursPerDay: 8, daysPerMonth: 30 },
      { title: "Utilizare lunga", description: "Aparat pornit mare parte din zi.", hoursPerDay: 14, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Foloseste treapta mica", body: "Daca este suficienta, reduce consumul si zgomotul." },
      { title: "Opreste cand pleci", body: "Ventilatorul nu raceste camera goala." },
      { title: "Curata paletele", body: "Praful poate reduce fluxul de aer." },
      { title: "Aeriseste seara", body: "Aerul mai rece poate reduce nevoia de functionare." }
    ],
    faq: [
      { question: "Ventilatorul consuma mult curent?", answer: "De obicei nu. Un ventilator de 50 W folosit 8 ore pe zi consuma aproximativ 12 kWh pe luna." },
      { question: "Raceste camera?", answer: "Nu raceste aerul ca un aparat de aer conditionat, ci creeaza miscare de aer si senzatie de confort." },
      { question: "Cat costa pe luna?", answer: "La scenariul de 50 W, 8 ore pe zi si 1,30 lei/kWh, costul este 15,6 lei pe luna." },
      { question: "Treapta influenteaza consumul?", answer: "Da. Treptele mai mari pot consuma mai mult, in functie de model." }
    ]
  }),
  createAdditionalPage({
    slug: "dezumidificator",
    presetSlug: "dezumidificator",
    title: "Cat consuma un dezumidificator? Consum si cost lunar",
    metaDescription:
      "Calculator pentru consumul unui dezumidificator: cost pe zi, luna si an, factori care influenteaza consumul si sfaturi utile.",
    h1: "Cat consuma un dezumidificator?",
    shortName: "dezumidificator",
    intro:
      "Un dezumidificator poate consuma vizibil daca merge zilnic intr-o baie, camera rece, subsol sau locuinta slab ventilata. La 300 W si 6 ore pe zi, consumul lunar poate deveni usor de observat pe factura. Capacitatea aparatului, umiditatea din camera, temperatura si setarea aleasa schimba durata de lucru.",
    watts: 300,
    consumptionRange: "aproximativ 0,18-0,55 kWh pe ora",
    hoursPerDay: 6,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Umiditate ocazionala", hoursPerDay: 3, daysPerMonth: 15 },
      { scenario: "Folosire zilnica", hoursPerDay: 6, daysPerMonth: 30 },
      { scenario: "Camera foarte umeda", hoursPerDay: 10, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Verifica puterea absorbita din specificatii si estimeaza cate ore pe zi compresorul lucreaza efectiv.",
      "Daca aparatul se opreste automat la umiditatea setata, consumul poate fi mai mic decat calculul la putere constanta."
    ],
    variationParagraphs: [
      "Umiditatea initiala, temperatura camerei si capacitatea rezervorului pot schimba durata de functionare.",
      "Modelele cu compresor si cele desicante pot avea comportament diferit, mai ales la temperaturi scazute."
    ],
    reductionParagraphs: [
      "Seteaza o tinta de umiditate rezonabila si aeriseste cand conditiile exterioare permit.",
      "Rezolva sursa umezelii daca exista infiltratii, condens excesiv sau ventilatie insuficienta."
    ],
    costExamples: [
      { title: "Folosire ocazionala", description: "Pentru perioade scurte cu umezeala.", hoursPerDay: 3, daysPerMonth: 15 },
      { title: "Utilizare zilnica", description: "Scenariu comun in camera umeda.", hoursPerDay: 6, daysPerMonth: 30 },
      { title: "Umiditate persistenta", description: "Functionare mai lunga in spatii problematice.", hoursPerDay: 10, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Seteaza umiditatea realist", body: "O tinta prea joasa poate tine aparatul pornit inutil." },
      { title: "Inchide usile", body: "Concentreaza dezumidificarea in camera necesara." },
      { title: "Curata filtrul", body: "Fluxul de aer bun ajuta aparatul sa lucreze corect." },
      { title: "Elimina sursa umezelii", body: "Aparatul nu rezolva singur cauza condensului." }
    ],
    faq: [
      { question: "Cat consuma un dezumidificator pe luna?", answer: "La 300 W, 6 ore pe zi si 30 de zile, consumul este 54 kWh pe luna." },
      { question: "Functioneaza mereu la puterea maxima?", answer: "Nu intotdeauna. Unele modele se opresc sau reduc activitatea cand ating umiditatea setata." },
      { question: "Conteaza temperatura camerei?", answer: "Da. Eficienta si durata pot varia la temperaturi mai scazute." },
      { question: "Este consumul exact?", answer: "Nu. Pentru masurare precisa, cel mai sigur reper este un wattmetru pus la priza." }
    ]
  }),
  createAdditionalPage({
    slug: "aeroterma",
    presetSlug: "aeroterma",
    title: "Cat consuma o aeroterma? Cost pe luna",
    metaDescription:
      "Afla cat consuma o aeroterma electrica, cu exemple de cost pentru folosire ocazionala sau zilnica si sfaturi pentru reducerea consumului.",
    h1: "Cat consuma o aeroterma?",
    shortName: "aeroterma",
    intro:
      "O aeroterma de 2000 W consuma aproximativ 2 kWh pentru fiecare ora la putere maxima. Este practica pentru incalzire rapida in baie, birou sau o camera mica, dar devine scumpa daca ramane pornita multe ore. Puterea de 2000 W este des intalnita la aparatele electrice de incalzire.",
    watts: 2000,
    consumptionRange: "aproximativ 1,0-2,5 kWh pe ora",
    hoursPerDay: 2,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Incalzire rapida", hoursPerDay: 1, daysPerMonth: 15 },
      { scenario: "Folosire zilnica", hoursPerDay: 2, daysPerMonth: 30 },
      { scenario: "Utilizare intensa", hoursPerDay: 5, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "La o aeroterma, consumul creste repede pentru ca puterea este mare. Doua ore pe zi la 2000 W inseamna 4 kWh pe zi.",
      "Daca aparatul are trepte de 1000 W si 2000 W, calculeaza scenariul apropiat de treapta folosita cel mai des."
    ],
    variationParagraphs: [
      "Termostatul poate opri rezistenta cand camera ajunge la temperatura setata, dar in camere reci aparatul poate functiona mult timp.",
      "Izolatia, dimensiunea camerei si curentii de aer influenteaza durata necesara pentru confort."
    ],
    reductionParagraphs: [
      "Foloseste aeroterma pentru incalzire scurta, nu ca solutie permanenta pentru camere mari.",
      "Inchide usile, elimina pierderile de caldura si foloseste treapta mica atunci cand este suficienta."
    ],
    costExamples: [
      { title: "Pornire rapida", description: "O ora in zile reci.", hoursPerDay: 1, daysPerMonth: 15 },
      { title: "Zilnic seara", description: "Doua ore pe zi.", hoursPerDay: 2, daysPerMonth: 30 },
      { title: "Incalzire frecventa", description: "Utilizare de lunga durata.", hoursPerDay: 5, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Limiteaza durata", body: "Orele sunt principalul factor de cost la 2000 W." },
      { title: "Foloseste termostatul", body: "Nu lasa aparatul sa mearga continuu fara nevoie." },
      { title: "Incalzeste camera mica", body: "Spatiile mari cresc durata de functionare." },
      { title: "Redu pierderile", body: "Usile si ferestrele neetanse cresc consumul." }
    ],
    faq: [
      { question: "Cat consuma o aeroterma de 2000 W?", answer: "Consuma aproximativ 2 kWh pentru fiecare ora de functionare la putere maxima." },
      { question: "Cat costa doua ore pe zi?", answer: "La 2000 W, 2 ore pe zi si 30 de zile, costul este 156 lei pe luna la 1,30 lei/kWh." },
      { question: "Aeroterma este potrivita pentru folosire zilnica?", answer: "Poate fi folosita, dar costul creste rapid daca functioneaza multe ore." },
      { question: "Treapta mica reduce consumul?", answer: "Da, daca aparatul foloseste o putere mai mica pe treapta respectiva." }
    ]
  }),
  createAdditionalPage({
    slug: "convector-electric",
    presetSlug: "convector-electric",
    title: "Cat consuma un convector electric? Consum si cost",
    metaDescription:
      "Calculator pentru convector electric: consum zilnic, lunar si anual, factori care schimba costul si recomandari de utilizare eficienta.",
    h1: "Cat consuma un convector electric?",
    shortName: "convector electric",
    intro:
      "Convectorul electric este folosit pentru incalzirea aerului din camera si are frecvent puteri de 1500-2500 W. Costul lunar depinde mai mult de durata de functionare decat de eticheta aparatului. Un convector cu termostat poate porni si opri rezistenta, dar intr-o camera rece sau slab izolata poate functiona mult timp.",
    watts: 2000,
    consumptionRange: "aproximativ 1,0-2,5 kWh pe ora",
    hoursPerDay: 4,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Supliment ocazional", hoursPerDay: 2, daysPerMonth: 15 },
      { scenario: "Zilnic in camera", hoursPerDay: 4, daysPerMonth: 30 },
      { scenario: "Iarna intensa", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Daca stii treapta folosita, introdu puterea corespunzatoare. La putere maxima, un convector de 2000 W consuma 2 kWh pe ora.",
      "Pentru calculul lunar, gandeste in ore reale de incalzire, nu doar in intervalul in care aparatul sta in priza."
    ],
    variationParagraphs: [
      "Termostatul, izolatia si temperatura exterioara pot schimba mult durata de functionare efectiva.",
      "Camerele cu pierderi mari de caldura pot cere porniri dese, chiar daca aparatul are aceeasi putere."
    ],
    reductionParagraphs: [
      "Seteaza o temperatura moderata si foloseste convectorul in camera in care stai efectiv.",
      "Imbunatateste etansarea ferestrelor si evita blocarea circulatiei aerului in jurul aparatului."
    ],
    costExamples: [
      { title: "Incalzire de sprijin", description: "Doua ore in zile reci.", hoursPerDay: 2, daysPerMonth: 15 },
      { title: "Utilizare zilnica", description: "Patru ore pe zi.", hoursPerDay: 4, daysPerMonth: 30 },
      { title: "Camera rece", description: "Functionare lunga in sezon rece.", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Nu incalzi holuri goale", body: "Concentreaza caldura in zona folosita." },
      { title: "Foloseste termostatul", body: "Temperatura constanta evita porniri inutile la maxim." },
      { title: "Elimina curentii", body: "Pierderile de aer rece cresc durata de incalzire." },
      { title: "Verifica puterea treptei", body: "O treapta mai mica poate fi suficienta in camere mici." }
    ],
    faq: [
      { question: "Cat consuma un convector de 2000 W?", answer: "La putere maxima, aproximativ 2 kWh pe ora." },
      { question: "Este diferit de un calorifer electric?", answer: "Principiul de cost este similar daca puterea si orele sunt aceleasi, dar modul de distribuire a caldurii difera." },
      { question: "Termostatul reduce factura?", answer: "Poate ajuta, pentru ca opreste rezistenta cand temperatura dorita este atinsa." },
      { question: "Cat costa pe luna?", answer: "La 2000 W, 4 ore pe zi si 30 de zile, costul este 312 lei pe luna la 1,30 lei/kWh." }
    ]
  }),
  createAdditionalPage({
    slug: "radiator-ulei",
    presetSlug: "radiator-ulei",
    title: "Cat consuma un radiator cu ulei? Cost lunar",
    metaDescription:
      "Afla cat consuma un radiator cu ulei, cum se calculeaza costul lunar si de ce termostatul si durata de folosire conteaza.",
    h1: "Cat consuma un radiator cu ulei?",
    shortName: "radiator cu ulei",
    intro:
      "Un radiator cu ulei de 2000 W consuma aproximativ 2 kWh pentru fiecare ora in care rezistenta lucreaza la putere maxima. Se incalzeste mai lent decat o aeroterma, dar pastreaza caldura o perioada dupa oprire. Pentru factura conteaza tot puterea aparatului si numarul real de ore de functionare.",
    watts: 2000,
    consumptionRange: "aproximativ 1,0-2,5 kWh pe ora",
    hoursPerDay: 4,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Camera mica", hoursPerDay: 2, daysPerMonth: 20 },
      { scenario: "Folosire zilnica", hoursPerDay: 4, daysPerMonth: 30 },
      { scenario: "Iarna, camera rece", hoursPerDay: 7, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Pentru cost, trateaza radiatorul cu ulei ca pe un aparat electric de incalzire: W / 1000 × ore × zile.",
      "Daca termostatul opreste rezistenta in anumite perioade, consumul real poate fi mai mic decat calculul la putere maxima continua."
    ],
    variationParagraphs: [
      "Numarul de elementi, treapta folosita si termostatul pot schimba puterea medie absorbita.",
      "Inertia termica ajuta la confort, dar nu inseamna consum zero cat timp rezistenta este pornita."
    ],
    reductionParagraphs: [
      "Seteaza termostatul la nivelul necesar si lasa aparatul intr-o camera inchisa, nu intr-un spatiu deschis mare.",
      "Evita acoperirea radiatorului si pastreaza circulatia aerului pentru functionare corecta."
    ],
    costExamples: [
      { title: "Folosire usoara", description: "Camera mica, cateva ore.", hoursPerDay: 2, daysPerMonth: 20 },
      { title: "Zilnic", description: "Patru ore pe zi.", hoursPerDay: 4, daysPerMonth: 30 },
      { title: "Camera rece", description: "Utilizare lunga in sezon rece.", hoursPerDay: 7, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Foloseste termostatul", body: "O setare moderata poate reduce pornirile inutile." },
      { title: "Incalzeste local", body: "Nu folosi radiatorul pentru zone mari deschise." },
      { title: "Nu il acoperi", body: "Acoperirea poate fi riscanta si reduce eficienta schimbului de caldura." },
      { title: "Verifica pierderile", body: "Ferestrele neetanse cresc durata de functionare." }
    ],
    faq: [
      { question: "Radiatorul cu ulei consuma mai putin decat convectorul?", answer: "Daca au aceeasi putere si functioneaza acelasi timp, consumul este apropiat." },
      { question: "Cat consuma la 2000 W?", answer: "Aproximativ 2 kWh pentru fiecare ora la putere maxima." },
      { question: "Inertia termica reduce costul?", answer: "Poate ajuta la confort, dar energia consumata este data de timpul in care rezistenta este alimentata." },
      { question: "Este calculul exact?", answer: "Nu. Termostatul si conditiile camerei pot modifica puterea medie reala." }
    ]
  }),
  createAdditionalPage({
    slug: "panou-radiant",
    presetSlug: "panou-radiant",
    title: "Cat consuma un panou radiant? Consum si cost",
    metaDescription:
      "Calculator pentru panou radiant electric: consum lunar, exemple de folosire si sfaturi pentru incalzire eficienta.",
    h1: "Cat consuma un panou radiant?",
    shortName: "panou radiant",
    intro:
      "Un panou radiant de 800 W consuma aproximativ 0,8 kWh pentru fiecare ora de functionare. Incalzeste mai ales zona din fata lui, de aceea poate fi potrivit pentru birou, colt de lucru sau o camera folosita punctual. Costul lunar este dat in continuare de puterea in W si de durata de functionare.",
    watts: 800,
    consumptionRange: "aproximativ 0,4-1,2 kWh pe ora",
    hoursPerDay: 5,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Zona de lucru", hoursPerDay: 3, daysPerMonth: 20 },
      { scenario: "Folosire zilnica", hoursPerDay: 5, daysPerMonth: 30 },
      { scenario: "Incalzire extinsa", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Calculeaza panoul radiant dupa puterea inscrisa pe aparat si orele in care este alimentat.",
      "Daca folosesti mai multe panouri, inmulteste consumul cu numarul de aparate sau foloseste simulatorul de factura."
    ],
    variationParagraphs: [
      "Pozitionarea panoului si zona acoperita influenteaza confortul; daca este montat nepotrivit, poate functiona mai mult fara efectul dorit.",
      "Termostatul, izolatia camerei si utilizarea ca sursa principala sau suplimentara schimba consumul lunar."
    ],
    reductionParagraphs: [
      "Foloseste panoul pentru zona in care stai, nu pentru a incalzi inutil incaperi mari.",
      "Programeaza functionarea si evita orele in care camera este goala."
    ],
    costExamples: [
      { title: "Birou acasa", description: "Trei ore de confort local.", hoursPerDay: 3, daysPerMonth: 20 },
      { title: "Utilizare zilnica", description: "Cinci ore pe zi.", hoursPerDay: 5, daysPerMonth: 30 },
      { title: "Program lung", description: "Opt ore pe zi in sezon rece.", hoursPerDay: 8, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Orienteaza corect panoul", body: "Confortul local bun reduce nevoia de ore suplimentare." },
      { title: "Foloseste programator", body: "Evita functionarea cand nu este nimeni in camera." },
      { title: "Calculeaza toate panourile", body: "Mai multe panouri pot schimba mult totalul lunar." },
      { title: "Izoleaza zona", body: "Pierderile de caldura reduc avantajul incalzirii locale." }
    ],
    faq: [
      { question: "Cat consuma un panou radiant de 800 W?", answer: "Aproximativ 0,8 kWh pentru fiecare ora de functionare." },
      { question: "Este mai economic decat un calorifer electric?", answer: "Poate fi mai potrivit pentru incalzire locala, dar costul se schimba dupa putere, ore si numarul de panouri." },
      { question: "Pot calcula mai multe panouri?", answer: "Da. Inmulteste consumul cu numarul de panouri sau foloseste simulatorul de factura." },
      { question: "Consumul este constant?", answer: "Daca panoul functioneaza fara termostat, consumul se apropie de puterea nominala pe ora." }
    ]
  }),
  createAdditionalPage({
    slug: "congelator",
    presetSlug: "congelator",
    title: "Cat consuma un congelator? Cost lunar si anual",
    metaDescription:
      "Afla cat consuma un congelator, de ce variaza consumul si cum estimezi costul lunar folosind puterea si pretul kWh.",
    h1: "Cat consuma un congelator?",
    shortName: "congelator",
    intro:
      "Un congelator nu consuma la putere maxima 24 de ore din 24, chiar daca ramane permanent in priza. Compresorul porneste in reprize, iar consumul lunar se schimba dupa clasa energetica, volum, temperatura setata si cat de des deschizi usa. Puterea medie folosita aici transforma acest comportament intermitent intr-un calcul usor de urmarit.",
    watts: 100,
    consumptionRange: "aproximativ 18-60 kWh pe luna pentru multe modele uzuale",
    hoursPerDay: 10,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Model eficient", hoursPerDay: 6, daysPerMonth: 30 },
      { scenario: "Scenariu mediu", hoursPerDay: 10, daysPerMonth: 30 },
      { scenario: "Model vechi sau incarcat", hoursPerDay: 14, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Pentru congelatoare, orele din calculator reprezinta echivalentul de functionare al compresorului, nu neaparat 24 de ore la putere maxima.",
      "Daca eticheta energetica indica un consum anual, imparte valoarea la 12 pentru o medie lunara mai apropiata de modelul tau."
    ],
    variationParagraphs: [
      "Consumul creste daca usa este deschisa des, garnitura nu etanseaza bine sau aparatul este pus langa o sursa de caldura.",
      "Modelele vechi, incarcarea excesiva si depunerile de gheata pot influenta consumul."
    ],
    reductionParagraphs: [
      "Pastreaza temperatura potrivita si evita deschiderea inutila a usii.",
      "Dezgheata aparatul cand este cazul si lasa spatiu pentru ventilatie in jurul lui."
    ],
    costExamples: [
      { title: "Model eficient", description: "Functionare echivalenta redusa.", hoursPerDay: 6, daysPerMonth: 30 },
      { title: "Scenariu mediu", description: "Congelator folosit normal.", hoursPerDay: 10, daysPerMonth: 30 },
      { title: "Consum ridicat", description: "Model vechi sau conditii dificile.", hoursPerDay: 14, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Verifica garnitura", body: "Aerul cald intrat in aparat creste pornirile compresorului." },
      { title: "Nu bloca ventilatia", body: "Aparatul are nevoie de spatiu in jur." },
      { title: "Dezgheata cand trebuie", body: "Gheata excesiva poate afecta eficienta." },
      { title: "Foloseste eticheta energetica", body: "Consumul anual de pe eticheta este cel mai bun reper pentru modelul tau." }
    ],
    faq: [
      { question: "Congelatorul consuma 24 de ore la puterea maxima?", answer: "Nu. Functioneaza permanent ca aparat, dar compresorul porneste intermitent." },
      { question: "Cat consuma lunar in scenariul mediu?", answer: "La 100 W echivalent, 10 ore pe zi si 30 de zile, consumul este 30 kWh pe luna." },
      { question: "Un congelator vechi consuma mai mult?", answer: "Poate consuma mai mult, mai ales daca are garnituri slabe, gheata sau eficienta redusa." },
      { question: "Cum folosesc eticheta energetica?", answer: "Daca ai consumul anual in kWh, imparte-l la 12 pentru media lunara." }
    ]
  }),
  createAdditionalPage({
    slug: "lada-frigorifica",
    presetSlug: "lada-frigorifica",
    title: "Cat consuma o lada frigorifica? Consum lunar",
    metaDescription:
      "Calculator pentru lada frigorifica: consum lunar, cost, factori care influenteaza consumul si recomandari de economie.",
    h1: "Cat consuma o lada frigorifica?",
    shortName: "lada frigorifica",
    intro:
      "O lada frigorifica poate consuma putin raportat la volumul pastrat rece, mai ales cand este deschisa rar. Pe termen lung, clasa energetica, volumul, temperatura din camera si frecventa deschiderii capacului se vad in factura. Diferentele mici de consum lunar pot deveni importante intr-un an intreg.",
    watts: 120,
    consumptionRange: "aproximativ 20-70 kWh pe luna pentru scenarii uzuale",
    hoursPerDay: 9,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Lada eficienta", hoursPerDay: 6, daysPerMonth: 30 },
      { scenario: "Utilizare normala", hoursPerDay: 9, daysPerMonth: 30 },
      { scenario: "Spatiu cald sau model vechi", hoursPerDay: 14, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "La lazile frigorifice, calculeaza un echivalent de functionare al compresorului, nu 24 de ore la puterea maxima.",
      "Daca ai consum anual din eticheta energetica, acela este mai potrivit decat o valoare generica in W."
    ],
    variationParagraphs: [
      "Temperatura din camera, volumul lazii si frecventa deschiderii capacului schimba consumul.",
      "O lada amplasata intr-un spatiu foarte cald poate porni mai des pentru a mentine temperatura."
    ],
    reductionParagraphs: [
      "Tine lada intr-un spatiu ventilat si evita sursele de caldura.",
      "Organizeaza alimentele ca sa gasesti rapid ce cauti si sa tii capacul deschis cat mai putin."
    ],
    costExamples: [
      { title: "Lada eficienta", description: "Consum echivalent redus.", hoursPerDay: 6, daysPerMonth: 30 },
      { title: "Scenariu obisnuit", description: "Functionare normala.", hoursPerDay: 9, daysPerMonth: 30 },
      { title: "Consum ridicat", description: "Spatiu cald sau model vechi.", hoursPerDay: 14, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Alege locul potrivit", body: "Caldura din jur creste efortul compresorului." },
      { title: "Nu tine capacul deschis", body: "Aerul cald intrat trebuie racit din nou." },
      { title: "Verifica etansarea", body: "Garnitura buna ajuta la mentinerea temperaturii." },
      { title: "Foloseste volumul corect", body: "Un aparat mult prea mare poate fi ineficient pentru nevoile tale." }
    ],
    faq: [
      { question: "Cat consuma o lada frigorifica pe luna?", answer: "In scenariul de 120 W echivalent, 9 ore pe zi si 30 de zile, consumul este 32,4 kWh pe luna." },
      { question: "Este mai eficienta decat un congelator vertical?", answer: "Poate fi, deoarece capacul reduce pierderea de aer rece, dar modelul si rutina de utilizare conteaza mult." },
      { question: "Conteaza camera in care sta?", answer: "Da. Un spatiu cald poate creste consumul." },
      { question: "Valoarea este oficiala?", answer: "Nu. Pentru modelul tau, verifica eticheta energetica." }
    ]
  }),
  createAdditionalPage({
    slug: "masina-spalat-vase",
    presetSlug: "masina-spalat-vase",
    title: "Cat consuma o masina de spalat vase? Cost pe ciclu si luna",
    metaDescription:
      "Afla cat consuma o masina de spalat vase, cum estimezi costul lunar si ce programe pot reduce consumul.",
    h1: "Cat consuma o masina de spalat vase?",
    shortName: "masina de spalat vase",
    intro:
      "O masina de spalat vase consuma energie mai ales cand incalzeste apa si ruleaza programul ales. Costul lunar creste odata cu numarul de cicluri, temperatura, durata programului si eficienta aparatului. Calculul pe ore face mai simpla comparatia intre folosire ocazionala, frecventa si zilnica.",
    watts: 1200,
    consumptionRange: "aproximativ 0,7-1,6 kWh pe ciclu",
    hoursPerDay: 1,
    daysPerMonth: 20,
    tableRows: [
      { scenario: "Cateva cicluri pe saptamana", hoursPerDay: 1, daysPerMonth: 12 },
      { scenario: "Utilizare frecventa", hoursPerDay: 1, daysPerMonth: 20 },
      { scenario: "Zilnic", hoursPerDay: 1.25, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Daca eticheta indica kWh pe 100 de cicluri, imparte la 100 pentru consumul pe ciclu si inmulteste cu numarul de cicluri lunare.",
      "In calculator, orele reprezinta echivalentul energetic al programului ales, nu neaparat durata completa afisata."
    ],
    variationParagraphs: [
      "Programul eco poate dura mai mult, dar consuma mai putina energie pentru incalzire.",
      "Incarcarea partiala, temperatura apei si uscarea intensiva pot schimba consumul."
    ],
    reductionParagraphs: [
      "Porneste masina cand este incarcata corespunzator si foloseste programul eco cand se potriveste.",
      "Curata filtrele si evita programele intensive pentru vase usor murdare."
    ],
    costExamples: [
      { title: "Utilizare redusa", description: "Cateva cicluri pe saptamana.", hoursPerDay: 1, daysPerMonth: 12 },
      { title: "Frecvent", description: "Aproape zilnic, dar nu permanent.", hoursPerDay: 1, daysPerMonth: 20 },
      { title: "Zilnic", description: "Program zilnic in familie.", hoursPerDay: 1.25, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Incarca eficient", body: "Evita ciclurile pentru cateva vase." },
      { title: "Alege eco", body: "Cand timpul permite, poate reduce energia folosita." },
      { title: "Curata filtrul", body: "Functionarea corecta ajuta rezultatul programului." },
      { title: "Evita uscarea intensiva", body: "Daca nu este necesara, poate reduce consumul." }
    ],
    faq: [
      { question: "Cat consuma o masina de spalat vase pe ciclu?", answer: "Multe scenarii se incadreaza intre 0,7 si 1,6 kWh pe ciclu." },
      { question: "Programul eco consuma mai putin?", answer: "De obicei este gandit sa reduca energia si apa, chiar daca dureaza mai mult." },
      { question: "Cum calculez lunar?", answer: "Inmulteste consumul pe ciclu cu numarul de cicluri lunare si cu pretul kWh." },
      { question: "De ce difera fata de factura?", answer: "Factura include toate aparatele si pretul exact al contractului tau." }
    ]
  }),
  createAdditionalPage({
    slug: "cuptor-microunde",
    presetSlug: "cuptor-microunde",
    title: "Cat consuma un cuptor cu microunde? Cost lunar",
    metaDescription:
      "Calculator pentru consumul cuptorului cu microunde: cost pentru utilizare zilnica, exemple si factori care influenteaza consumul.",
    h1: "Cat consuma un cuptor cu microunde?",
    shortName: "cuptor cu microunde",
    intro:
      "Un cuptor cu microunde are putere mare pe moment, dar consuma putin in total cand il folosesti doar cateva minute. De aceea, incalzirea unei portii sau a unei cani de lapte costa de obicei foarte putin. Minutele zilnice, treapta aleasa si functiile precum grill-ul schimba consumul lunar.",
    watts: 1000,
    consumptionRange: "aproximativ 0,05-0,25 kWh pe utilizare scurta",
    hoursPerDay: 0.25,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "Incalzire ocazionala", hoursPerDay: 0.1, daysPerMonth: 20 },
      { scenario: "Zilnic", hoursPerDay: 0.25, daysPerMonth: 30 },
      { scenario: "Utilizare frecventa", hoursPerDay: 0.5, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Pentru microunde, transforma minutele in ore. 15 minute inseamna 0,25 ore.",
      "Puterea de gatire si puterea absorbita din priza nu sunt intotdeauna identice, asa ca foloseste valoarea din specificatii cand o ai."
    ],
    variationParagraphs: [
      "Consumul variaza dupa treapta de putere, durata, cantitatea de mancare si functiile suplimentare.",
      "Functiile grill sau combinate pot consuma diferit fata de incalzirea simpla."
    ],
    reductionParagraphs: [
      "Foloseste durata potrivita si evita pornirile repetate inutile.",
      "Pentru portii mici, microundele pot fi mai eficiente decat incalzirea unui cuptor electric mare."
    ],
    costExamples: [
      { title: "Ocazional", description: "Cateva minute in unele zile.", hoursPerDay: 0.1, daysPerMonth: 20 },
      { title: "Zilnic", description: "Incalzire zilnica scurta.", hoursPerDay: 0.25, daysPerMonth: 30 },
      { title: "Frecvent", description: "Mai multe utilizari intr-o zi.", hoursPerDay: 0.5, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Calculeaza in minute", body: "Durata mica schimba mult costul final." },
      { title: "Acopera alimentele", body: "Incalzirea poate fi mai uniforma si mai rapida." },
      { title: "Evita functii inutile", body: "Grill-ul poate schimba consumul." },
      { title: "Alege vas potrivit", body: "Recipientele adecvate ajuta incalzirea eficienta." }
    ],
    faq: [
      { question: "Cuptorul cu microunde consuma mult?", answer: "Are putere mare, dar durata scurta face ca totalul lunar sa fie adesea moderat." },
      { question: "Cat inseamna 15 minute pe zi?", answer: "La 1000 W, 15 minute pe zi timp de 30 de zile inseamna aproximativ 7,5 kWh pe luna." },
      { question: "Grill-ul consuma mai mult?", answer: "Poate avea consum diferit fata de incalzirea simpla, in functie de model." },
      { question: "Este mai eficient decat cuptorul electric?", answer: "Pentru portii mici si incalzire scurta, poate fi mai potrivit decat incalzirea unui cuptor mare." }
    ]
  }),
  createAdditionalPage({
    slug: "fierbator-electric",
    presetSlug: "fierbator-electric",
    title: "Cat consuma un fierbator electric? Cost pe luna",
    metaDescription:
      "Afla cat consuma un fierbator electric, cum calculezi costul pentru folosire zilnica si cum reduci energia folosita.",
    h1: "Cat consuma un fierbator electric?",
    shortName: "fierbator electric",
    intro:
      "Un fierbator electric are putere mare, dar functioneaza putine minute la fiecare pornire. Costul lunar este influentat de cate ori il pornesti pe zi si de cantitatea de apa incalzita. Daca fierbi mereu mai multa apa decat ai nevoie, consumul creste fara beneficiu real.",
    watts: 2000,
    consumptionRange: "aproximativ 0,05-0,20 kWh pentru o fierbere obisnuita",
    hoursPerDay: 0.2,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "O cana pe zi", hoursPerDay: 0.08, daysPerMonth: 30 },
      { scenario: "Folosire zilnica", hoursPerDay: 0.2, daysPerMonth: 30 },
      { scenario: "Mai multe fierberi", hoursPerDay: 0.45, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "La 2000 W, 6 minute de functionare inseamna 0,2 kWh. De aceea minutele conteaza mai mult decat pare.",
      "Daca fierbatorul se opreste automat repede, durata efectiva poate fi mica, dar mai multe porniri pe zi se aduna."
    ],
    variationParagraphs: [
      "Cantitatea de apa, temperatura initiala si depunerile de calcar pot schimba durata pana la fierbere.",
      "Puterea difera intre modele, iar unele fierbatoare ajung mai repede la temperatura dorita."
    ],
    reductionParagraphs: [
      "Incalzeste doar cantitatea de apa de care ai nevoie.",
      "Curata depunerile de calcar si evita refierberea apei fara motiv."
    ],
    costExamples: [
      { title: "O cana pe zi", description: "Folosire scurta zilnica.", hoursPerDay: 0.08, daysPerMonth: 30 },
      { title: "Mai multe bauturi", description: "Folosire obisnuita intr-o zi.", hoursPerDay: 0.2, daysPerMonth: 30 },
      { title: "Utilizare intensa", description: "Mai multe fierberi zilnice.", hoursPerDay: 0.45, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Nu umple inutil", body: "Apa in plus inseamna energie in plus." },
      { title: "Curata calcarul", body: "Depunerile pot prelungi incalzirea." },
      { title: "Foloseste nivelul minim", body: "Respecta marcajele aparatului." },
      { title: "Evita refierberea", body: "Pornirile repetate cresc consumul lunar." }
    ],
    faq: [
      { question: "Fierbatorul consuma mult?", answer: "Are putere mare, dar functioneaza putin timp. Costul creste mai ales cand sunt multe fierberi pe zi." },
      { question: "Cat costa folosirea zilnica?", answer: "La 2000 W si 0,2 ore pe zi, consumul este 12 kWh pe luna, adica 15,6 lei la 1,30 lei/kWh." },
      { question: "Conteaza cantitatea de apa?", answer: "Da. Mai multa apa necesita mai multa energie pentru incalzire." },
      { question: "Calcarul influenteaza consumul?", answer: "Poate prelungi incalzirea si reduce eficienta transferului de caldura." }
    ]
  }),
  createAdditionalPage({
    slug: "espressor",
    presetSlug: "espressor",
    title: "Cat consuma un espressor? Consum si cost lunar",
    metaDescription:
      "Calculator pentru consumul unui espressor: cost pentru cafea zilnica, stand-by, incalzire si sfaturi de economie.",
    h1: "Cat consuma un espressor?",
    shortName: "espressor",
    intro:
      "Un espressor consuma energie mai ales cand incalzeste apa, mentine temperatura sau spumeaza laptele. Costul lunar ramane de obicei mic pentru una-doua cafele pe zi, dar creste daca aparatul sta pornit mult timp. Numarul de cafele, incalzirile repetate si functiile folosite fac diferenta.",
    watts: 1400,
    consumptionRange: "aproximativ 0,03-0,20 kWh pentru sesiuni scurte",
    hoursPerDay: 0.25,
    daysPerMonth: 30,
    tableRows: [
      { scenario: "O cafea pe zi", hoursPerDay: 0.12, daysPerMonth: 30 },
      { scenario: "Folosire zilnica", hoursPerDay: 0.25, daysPerMonth: 30 },
      { scenario: "Mai multe cafele", hoursPerDay: 0.6, daysPerMonth: 30 }
    ],
    practicalParagraphs: [
      "Pentru espressor, estimeaza timpul in care aparatul incalzeste si ramane pornit, nu doar secundele de extractie.",
      "Daca aparatul are oprire automata, consumul poate fi mai mic decat la un aparat lasat pornit mult timp."
    ],
    variationParagraphs: [
      "Numarul de cafele, spumarea laptelui, incalzirea initiala si mentinerea temperaturii schimba consumul.",
      "Aparatele automate, manuale si cele cu capsule pot avea profiluri diferite de consum."
    ],
    reductionParagraphs: [
      "Activeaza oprirea automata si evita sa lasi aparatul incalzit dupa ce ai terminat.",
      "Gruparea cafelelor intr-o singura sesiune poate reduce incalzirile repetate."
    ],
    costExamples: [
      { title: "O cafea", description: "Sesiune scurta zilnica.", hoursPerDay: 0.12, daysPerMonth: 30 },
      { title: "Doua cafele", description: "Utilizare casnica obisnuita.", hoursPerDay: 0.25, daysPerMonth: 30 },
      { title: "Folosire frecventa", description: "Mai multe cafele si spumare.", hoursPerDay: 0.6, daysPerMonth: 30 }
    ],
    savingTips: [
      { title: "Oprire automata", body: "Reduce timpul in care aparatul ramane cald fara folosire." },
      { title: "Evita incalzirile repetate", body: "Pregateste cafelele apropiat in timp cand are sens." },
      { title: "Decalcifiaza aparatul", body: "Intretinerea poate ajuta incalzirea corecta." },
      { title: "Nu lasa stand-by inutil", body: "Unele modele consuma putin, dar constant." }
    ],
    faq: [
      { question: "Cat consuma un espressor pe luna?", answer: "La 1400 W, 0,25 ore pe zi si 30 de zile, consumul este 10,5 kWh pe luna." },
      { question: "Consuma mult la pornire?", answer: "Poate avea consum mare pe termen scurt pentru incalzirea apei si a grupului." },
      { question: "Stand-by-ul conteaza?", answer: "Poate conta daca aparatul ramane pornit multe ore. Oprirea automata ajuta." },
      { question: "Spumarea laptelui schimba consumul?", answer: "Da, functiile de abur sau lapte pot adauga energie fata de o cafea simpla." }
    ]
  })
];
