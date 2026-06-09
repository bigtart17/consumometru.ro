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
        title: "Cum interpretezi costul estimat",
        paragraphs: [
          `Estimarea foloseste ${input.watts} W, ${input.hoursPerDay} ore pe zi, ${input.daysPerMonth} zile pe luna si pretul orientativ de ${defaultPricePerKwh.toFixed(2).replace(".", ",")} lei/kWh. Daca folosesti aparatul diferit, modifica valorile in calculatorul principal.`,
          `Intervalul realist pentru ${input.shortName} este ${input.consumptionRange}. Valorile nu sunt oficiale pentru un anumit model; ele sunt puncte de plecare pentru comparatii si pentru intelegerea ordinului de marime.`
        ]
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
    title: "Cat consuma un aer conditionat 9000 BTU? Cost lunar estimativ",
    metaDescription:
      "Afla cat consuma un aer conditionat de 9000 BTU, cu calculator precompletat, exemple de cost si sfaturi pentru reducerea consumului vara.",
    h1: "Cat consuma un aer conditionat 9000 BTU?",
    shortName: "aer conditionat 9000 BTU",
    intro:
      "Un aer conditionat de 9000 BTU este folosit de obicei in camere mai mici, dormitoare sau birouri. Consumul sau poate fi mai redus decat al unui aparat de 12000 sau 18000 BTU, dar costul lunar depinde de orele de functionare, temperatura setata si cat de bine este izolata camera. Calculatorul este precompletat cu o valoare orientativa si poate fi ajustat dupa modelul tau.",
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
      "Pentru un aparat de 9000 BTU, porneste de la puterea in W din specificatii sau de pe eticheta. Daca nu o ai la indemana, 900 W este o valoare orientativa pentru scenarii rapide.",
      "Formula ramane aceeasi: W / 1000 × ore × zile. Daca aparatul functioneaza 5 ore pe zi timp de 30 de zile, estimarea lunara arata cat poate conta racirea unei singure camere."
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
      { question: "Cat consuma lunar un aer conditionat 9000 BTU?", answer: "La 900 W, 5 ore pe zi si 30 de zile, consumul estimativ este 135 kWh pe luna." },
      { question: "Este mai ieftin decat unul de 12000 BTU?", answer: "De obicei poate consuma mai putin, dar doar daca este potrivit pentru camera si nu functioneaza fortat." },
      { question: "Pot folosi calculatorul pentru model inverter?", answer: "Da, dar introdu o putere medie estimata daca stii ca aparatul nu merge constant la puterea nominala." },
      { question: "Valoarea este exacta?", answer: "Nu. Este o estimare care depinde de model, temperatura, izolatie si utilizare." }
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
      "Un aer conditionat de 18000 BTU este ales pentru camere mari, livinguri sau spatii deschise. Are o capacitate mai mare si poate avea un consum lunar semnificativ daca este folosit multe ore. Estimarea de mai jos porneste de la o putere orientativa, dar fiecare model poate avea consum diferit in functie de tehnologie, incarcare termica si setari.",
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
      { question: "Cat consuma un aer conditionat 18000 BTU pe luna?", answer: "La 1800 W, 5 ore pe zi si 30 de zile, estimarea este 270 kWh pe luna." },
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
      "Afla cat consuma un ventilator de camera, cu exemple pentru folosire zilnica, cost lunar estimativ si sfaturi pentru zile calde.",
    h1: "Cat consuma un ventilator?",
    shortName: "ventilator",
    intro:
      "Un ventilator consuma mult mai putin decat un aparat de aer conditionat, dar nu raceste aerul, ci il misca. Este util cand vrei confort local si cost redus. Consumul depinde de puterea motorului, treapta aleasa si numarul de ore de functionare, mai ales in perioadele calde cand poate ramane pornit mult timp.",
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
      { question: "Cat costa pe luna?", answer: "La scenariul de 50 W, 8 ore pe zi si 1,30 lei/kWh, costul estimativ este 15,6 lei pe luna." },
      { question: "Treapta influenteaza consumul?", answer: "Da. Treptele mai mari pot consuma mai mult, in functie de model." }
    ]
  }),
  createAdditionalPage({
    slug: "dezumidificator",
    presetSlug: "dezumidificator",
    title: "Cat consuma un dezumidificator? Consum si cost lunar",
    metaDescription:
      "Calculator pentru consumul unui dezumidificator: cost estimativ pe zi, luna si an, factori care influenteaza consumul si sfaturi utile.",
    h1: "Cat consuma un dezumidificator?",
    shortName: "dezumidificator",
    intro:
      "Un dezumidificator poate functiona cateva ore pe zi in camere cu umiditate ridicata, bai, subsoluri sau locuinte slab ventilate. Consumul sau depinde de capacitate, nivelul de umiditate, temperatura camerei si setarea dorita. Estimarea este utila mai ales cand aparatul functioneaza zilnic in sezonul rece sau in perioade umede.",
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
      { question: "Cat consuma un dezumidificator pe luna?", answer: "La 300 W, 6 ore pe zi si 30 de zile, consumul estimativ este 54 kWh pe luna." },
      { question: "Functioneaza mereu la puterea maxima?", answer: "Nu intotdeauna. Unele modele se opresc sau reduc activitatea cand ating umiditatea setata." },
      { question: "Conteaza temperatura camerei?", answer: "Da. Eficienta si durata pot varia la temperaturi mai scazute." },
      { question: "Este consumul exact?", answer: "Nu. Este o estimare orientativa; pentru exactitate foloseste un wattmetru." }
    ]
  }),
  createAdditionalPage({
    slug: "aeroterma",
    presetSlug: "aeroterma",
    title: "Cat consuma o aeroterma? Cost estimativ pe luna",
    metaDescription:
      "Afla cat consuma o aeroterma electrica, cu exemple de cost pentru folosire ocazionala sau zilnica si sfaturi pentru reducerea consumului.",
    h1: "Cat consuma o aeroterma?",
    shortName: "aeroterma",
    intro:
      "Aeroterma incalzeste rapid aerul, dar are de obicei putere mare. Este practica pentru perioade scurte sau camere mici, insa poate deveni scumpa daca ramane pornita zilnic multe ore. Calculatorul foloseste o putere orientativa de 2000 W, intalnita frecvent la aparatele electrice de incalzire.",
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
      { question: "Cat costa doua ore pe zi?", answer: "La 2000 W, 2 ore pe zi si 30 de zile, costul estimativ este 156 lei pe luna la 1,30 lei/kWh." },
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
      "Pentru estimarea lunara, gandeste in ore reale de incalzire, nu doar in intervalul in care aparatul sta in priza."
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
      { question: "Cat costa pe luna?", answer: "La 2000 W, 4 ore pe zi si 30 de zile, estimarea este 312 lei pe luna la 1,30 lei/kWh." }
    ]
  }),
  createAdditionalPage({
    slug: "radiator-ulei",
    presetSlug: "radiator-ulei",
    title: "Cat consuma un radiator cu ulei? Cost lunar estimativ",
    metaDescription:
      "Afla cat consuma un radiator cu ulei, cum se calculeaza costul lunar si de ce termostatul si durata de folosire conteaza.",
    h1: "Cat consuma un radiator cu ulei?",
    shortName: "radiator cu ulei",
    intro:
      "Radiatorul cu ulei este un aparat electric de incalzire cu inertie termica: se incalzeste mai lent, dar pastreaza caldura o perioada dupa oprire. Consumul electric vine tot din rezistenta interna, deci puterea si orele de functionare raman esentiale. Estimarea foloseste o valoare orientativa de 2000 W.",
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
      { question: "Radiatorul cu ulei consuma mai putin decat convectorul?", answer: "Daca au aceeasi putere si functioneaza acelasi timp, consumul estimativ este apropiat." },
      { question: "Cat consuma la 2000 W?", answer: "Aproximativ 2 kWh pentru fiecare ora la putere maxima." },
      { question: "Inertia termica reduce costul?", answer: "Poate ajuta la confort, dar energia consumata depinde de cat timp rezistenta este alimentata." },
      { question: "Este calculul exact?", answer: "Nu. Termostatul si conditiile camerei pot modifica puterea medie reala." }
    ]
  }),
  createAdditionalPage({
    slug: "panou-radiant",
    presetSlug: "panou-radiant",
    title: "Cat consuma un panou radiant? Consum si cost estimativ",
    metaDescription:
      "Calculator pentru panou radiant electric: consum lunar, exemple de folosire si sfaturi pentru incalzire eficienta.",
    h1: "Cat consuma un panou radiant?",
    shortName: "panou radiant",
    intro:
      "Panoul radiant incalzeste mai ales suprafetele si persoanele aflate in raza lui, nu doar aerul din camera. Poate fi eficient in anumite scenarii locale, dar costul depinde in continuare de puterea in W si durata de functionare. Estimarea de mai jos porneste de la un panou radiant orientativ de 800 W.",
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
      { question: "Este mai economic decat un calorifer electric?", answer: "Poate fi mai potrivit pentru incalzire locala, dar costul depinde de putere, ore si numarul de panouri." },
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
      "Congelatorul functioneaza permanent, dar compresorul porneste intermitent. Consumul lunar depinde de clasa energetica, volum, temperatura setata, amplasare si cat de des este deschisa usa. Estimarea foloseste o putere medie orientativa pentru a transforma functionarea intermitenta intr-un calcul usor de inteles.",
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
      "Daca eticheta energetica indica un consum anual, imparte valoarea la 12 pentru o estimare lunara mai apropiata."
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
      { question: "Cat consuma lunar in scenariul mediu?", answer: "La 100 W echivalent, 10 ore pe zi si 30 de zile, estimarea este 30 kWh pe luna." },
      { question: "Un congelator vechi consuma mai mult?", answer: "Poate consuma mai mult, mai ales daca are garnituri slabe, gheata sau eficienta redusa." },
      { question: "Cum folosesc eticheta energetica?", answer: "Daca ai consumul anual in kWh, imparte-l la 12 pentru media lunara." }
    ]
  }),
  createAdditionalPage({
    slug: "lada-frigorifica",
    presetSlug: "lada-frigorifica",
    title: "Cat consuma o lada frigorifica? Consum lunar estimativ",
    metaDescription:
      "Calculator pentru lada frigorifica: consum lunar, cost estimativ, factori care influenteaza consumul si recomandari de economie.",
    h1: "Cat consuma o lada frigorifica?",
    shortName: "lada frigorifica",
    intro:
      "Lada frigorifica poate fi eficienta pentru depozitare pe termen lung, dar consumul depinde de volum, clasa energetica, temperatura ambientala si cat de des este deschisa. Pentru ca functioneaza permanent, chiar si diferentele mici de eficienta pot conta pe parcursul unui an.",
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
      { question: "Cat consuma o lada frigorifica pe luna?", answer: "In scenariul de 120 W echivalent, 9 ore pe zi si 30 de zile, estimarea este 32,4 kWh pe luna." },
      { question: "Este mai eficienta decat un congelator vertical?", answer: "Poate fi, deoarece capacul reduce pierderea de aer rece, dar depinde de model si utilizare." },
      { question: "Conteaza camera in care sta?", answer: "Da. Un spatiu cald poate creste consumul." },
      { question: "Valoarea este oficiala?", answer: "Nu. Este orientativa; pentru modelul tau verifica eticheta energetica." }
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
      "Masina de spalat vase consuma energie mai ales pentru incalzirea apei si rularea programului ales. Costul lunar depinde de numarul de cicluri, temperatura, durata programului si eficienta aparatului. Calculatorul foloseste o transformare pe ore pentru a oferi o estimare usor de comparat.",
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
      { question: "Cat consuma o masina de spalat vase pe ciclu?", answer: "Multe scenarii se incadreaza orientativ intre 0,7 si 1,6 kWh pe ciclu." },
      { question: "Programul eco consuma mai putin?", answer: "De obicei este gandit sa reduca energia si apa, chiar daca dureaza mai mult." },
      { question: "Cum calculez lunar?", answer: "Inmulteste consumul pe ciclu cu numarul de cicluri lunare si cu pretul kWh." },
      { question: "De ce difera fata de factura?", answer: "Factura include toate aparatele si pretul exact al contractului tau." }
    ]
  }),
  createAdditionalPage({
    slug: "cuptor-microunde",
    presetSlug: "cuptor-microunde",
    title: "Cat consuma un cuptor cu microunde? Cost estimativ",
    metaDescription:
      "Calculator pentru consumul cuptorului cu microunde: cost pentru utilizare zilnica, exemple si factori care influenteaza consumul.",
    h1: "Cat consuma un cuptor cu microunde?",
    shortName: "cuptor cu microunde",
    intro:
      "Cuptorul cu microunde are putere relativ mare, dar este folosit de obicei perioade scurte. Din acest motiv, costul lunar poate fi modest chiar daca puterea instantanee pare ridicata. Estimarea depinde de minutele zilnice de utilizare, treapta aleasa si frecventa incalzirii alimentelor.",
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
      "Fierbatorul electric are putere mare, dar functioneaza perioade scurte. Costul lunar depinde de cate ori il folosesti pe zi si de cantitatea de apa incalzita. Daca fierbi mereu mai multa apa decat ai nevoie, consumul creste fara beneficiu real.",
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
      { question: "Fierbatorul consuma mult?", answer: "Are putere mare, dar functioneaza putin timp. Costul depinde de numarul de fierberi." },
      { question: "Cat costa folosirea zilnica?", answer: "La 2000 W si 0,2 ore pe zi, estimarea este 12 kWh pe luna, adica 15,6 lei la 1,30 lei/kWh." },
      { question: "Conteaza cantitatea de apa?", answer: "Da. Mai multa apa necesita mai multa energie pentru incalzire." },
      { question: "Calcarul influenteaza consumul?", answer: "Poate prelungi incalzirea si reduce eficienta transferului de caldura." }
    ]
  }),
  createAdditionalPage({
    slug: "espressor",
    presetSlug: "espressor",
    title: "Cat consuma un espressor? Consum si cost lunar",
    metaDescription:
      "Calculator pentru consumul unui espressor: cost estimativ pentru cafea zilnica, stand-by, incalzire si sfaturi de economie.",
    h1: "Cat consuma un espressor?",
    shortName: "espressor",
    intro:
      "Espressorul consuma energie mai ales cand incalzeste apa, mentine temperatura sau spumeaza laptele. Puterea poate fi mare pe termen scurt, dar costul lunar depinde de numarul de cafele, timpul in care aparatul ramane pornit si functiile folosite. Estimarea de mai jos foloseste o valoare orientativa pentru un aparat casnic.",
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
      { question: "Cat consuma un espressor pe luna?", answer: "La 1400 W, 0,25 ore pe zi si 30 de zile, estimarea este 10,5 kWh pe luna." },
      { question: "Consuma mult la pornire?", answer: "Poate avea consum mare pe termen scurt pentru incalzirea apei si a grupului." },
      { question: "Stand-by-ul conteaza?", answer: "Poate conta daca aparatul ramane pornit multe ore. Oprirea automata ajuta." },
      { question: "Spumarea laptelui schimba consumul?", answer: "Da, functiile de abur sau lapte pot adauga energie fata de o cafea simpla." }
    ]
  })
];
