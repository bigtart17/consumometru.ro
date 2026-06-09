export type ComparisonOption = {
  name: string;
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  description: string;
  href: string;
  advantages: string[];
  disadvantages: string[];
  bestWhen: string[];
  reduceTips: string[];
};

export type SeoComparison = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  shortSummary: string;
  pricePerKwh: number;
  hubHref: string;
  hubLabel: string;
  options: [ComparisonOption, ComparisonOption];
  practicalRecommendation: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedApplianceSlugs: string[];
};

const defaultPricePerKwh = 1.3;

export const seoComparisons: SeoComparison[] = [
  {
    slug: "calorifer-electric-vs-aer-conditionat",
    title: "Calorifer electric vs aer conditionat: consum si cost",
    metaDescription:
      "Compara consumul unui calorifer electric cu un aer conditionat: cost lunar, cost anual, avantaje, dezavantaje si recomandari practice.",
    h1: "Consum calorifer electric vs aer conditionat: care consuma mai mult?",
    intro: [
      "Caloriferul electric si aerul conditionat sunt comparate des atunci cand utilizatorii vor sa incalzeasca sau sa mentina confortul intr-o camera. Diferenta principala este modul in care folosesc energia. Caloriferul electric transforma energia electrica direct in caldura, in timp ce aerul conditionat folosit pe incalzire poate muta caldura si poate avea consum electric mai mic pentru acelasi confort, in functie de model si temperatura exterioara.",
      "Comparația de mai jos foloseste valori orientative, nu promite o economie garantata. Costul real depinde de puterea aparatului, durata de utilizare, izolatia camerei, temperatura dorita si pretul kWh din contractul tau. Foloseste tabelul ca punct de pornire si modifica valorile in calculatorul principal daca ai date exacte."
    ],
    shortSummary:
      "In scenariul orientativ, caloriferul electric ajunge la cost lunar mai mare deoarece are 2000 W si este folosit 4 ore pe zi. Aerul conditionat poate fi mai eficient, dar depinde mult de model si de conditiile din camera.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/incalzire-electrica",
    hubLabel: "Incalzire electrica",
    options: [
      {
        name: "Calorifer electric",
        watts: 2000,
        hoursPerDay: 4,
        daysPerMonth: 30,
        description: "Aparat simplu, cu rezistenta electrica, folosit frecvent pentru incalzire locala.",
        href: "/cat-consuma/calorifer-electric",
        advantages: ["Pret de achizitie accesibil", "Usor de mutat intre camere", "Nu necesita instalare complexa"],
        disadvantages: ["Consum mare la folosire zilnica", "Incalzeste lent camerele mari", "Costul creste rapid cu fiecare ora in plus"],
        bestWhen: ["Ai nevoie de caldura ocazionala", "Camera este mica si bine izolata", "Vrei o solutie temporara"],
        reduceTips: ["Foloseste termostatul", "Inchide usa camerei", "Nu il lasa pornit cand nu esti in camera"]
      },
      {
        name: "Aer conditionat",
        watts: 1200,
        hoursPerDay: 5,
        daysPerMonth: 30,
        description: "Aparat folosit pentru racire si, la multe modele, pentru incalzire cu pompa de caldura.",
        href: "/cat-consuma/aer-conditionat-12000-btu",
        advantages: ["Poate avea consum mai mic pe incalzire", "Raceste vara si poate incalzi in sezoane intermediare", "Modelele inverter moduleaza puterea"],
        disadvantages: ["Cost initial mai mare", "Eficienta scade la temperaturi exterioare dificile", "Necesita montaj si intretinere"],
        bestWhen: ["Ai deja aparat montat", "Vrei si racire vara", "Camera este potrivita pentru capacitatea aparatului"],
        reduceTips: ["Curata filtrele", "Seteaza temperatura moderata", "Evita usile si ferestrele deschise"]
      }
    ],
    practicalRecommendation:
      "Pentru folosire zilnica, aerul conditionat poate fi mai avantajos daca este potrivit camerei si functioneaza eficient. Caloriferul electric ramane util pentru incalzire ocazionala sau temporara.",
    faq: [
      { question: "Caloriferul electric consuma mai mult decat aerul conditionat?", answer: "In multe scenarii, da, mai ales daca functioneaza zilnic multe ore. Comparatia depinde totusi de putere, camera si temperatura." },
      { question: "Aerul conditionat este mereu mai economic pe incalzire?", answer: "Nu mereu. Eficienta depinde de model, temperatura exterioara, dimensionare si setari." },
      { question: "Ce conteaza cel mai mult in calcul?", answer: "Puterea in W, orele de folosire, zilele pe luna si pretul kWh." }
    ],
    relatedApplianceSlugs: ["calorifer-electric", "aer-conditionat-12000-btu", "convector-electric", "radiator-ulei"]
  },
  {
    slug: "laptop-vs-desktop",
    title: "Laptop vs desktop: consum electric si cost lunar",
    metaDescription:
      "Compara consumul unui laptop cu un PC desktop: cost lunar, cost anual, avantaje, dezavantaje si cand merita fiecare varianta.",
    h1: "Consum laptop vs desktop: care consuma mai mult?",
    intro: [
      "Laptopul si desktopul pot face activitati similare, dar consumul lor este de obicei diferit. Laptopurile sunt proiectate pentru eficienta si autonomie, in timp ce un desktop poate avea sursa mai mare, componente mai puternice si monitor separat. Diferenta devine importanta daca lucrezi zilnic multe ore sau ai mai multe calculatoare in casa sau birou.",
      "Valorile de mai jos sunt orientative. Un laptop de birou poate consuma mult mai putin decat un laptop de gaming, iar un desktop simplu poate consuma mai putin decat un sistem performant. Foloseste comparatia pentru ordinul de marime si calculatorul pentru datele aparatului tau."
    ],
    shortSummary:
      "In scenariul estimativ, laptopul are cost lunar mai mic deoarece foloseste 65 W, in timp ce desktopul este calculat la 250 W si include consumul sistemului principal.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/electronice",
    hubLabel: "Electronice",
    options: [
      {
        name: "Laptop",
        watts: 65,
        hoursPerDay: 8,
        daysPerMonth: 30,
        description: "Calculator portabil, optimizat de obicei pentru consum redus si autonomie.",
        href: "/#calculator",
        advantages: ["Consum redus", "Portabil", "Nu necesita monitor separat pentru folosire de baza"],
        disadvantages: ["Performanta limitata la unele modele", "Reparatii sau upgrade mai dificile", "Laptopurile de gaming pot consuma mult mai mult"],
        bestWhen: ["Lucrezi multe ore zilnic", "Ai nevoie de mobilitate", "Vrei consum redus pentru taskuri obisnuite"],
        reduceTips: ["Redu luminozitatea", "Activeaza modul economisire", "Scoate perifericele nefolosite"]
      },
      {
        name: "Desktop PC",
        watts: 250,
        hoursPerDay: 6,
        daysPerMonth: 30,
        description: "Calculator fix, cu performanta si upgrade mai flexibile, dar consum adesea mai mare.",
        href: "/cat-consuma/pc-gaming",
        advantages: ["Performanta buna pentru cost", "Upgrade mai usor", "Potrivit pentru lucru intens sau gaming"],
        disadvantages: ["Consum mai mare", "Monitorul adauga consum separat", "Ocupa mai mult spatiu"],
        bestWhen: ["Ai nevoie de performanta", "Lucrezi cu aplicatii solicitante", "Vrei upgrade-uri pe termen lung"],
        reduceTips: ["Opreste monitorul cand nu il folosesti", "Foloseste mod sleep", "Alege componente eficiente"]
      }
    ],
    practicalRecommendation:
      "Pentru munca de birou si consum mic, laptopul este de obicei varianta mai eficienta. Desktopul merita cand ai nevoie de performanta, upgrade sau lucru intens.",
    faq: [
      { question: "Laptopul consuma mereu mai putin?", answer: "De obicei da pentru taskuri obisnuite, dar laptopurile de gaming pot consuma semnificativ." },
      { question: "Desktopul include monitorul in calcul?", answer: "In scenariul orientativ nu adaugam separat monitorul. Daca vrei estimare exacta, adauga si monitorul in simulator." },
      { question: "Cum compar calculatorul meu real?", answer: "Introdu puterea sursei sau consumul masurat, orele zilnice si pretul kWh in calculator." }
    ],
    relatedApplianceSlugs: ["pc-gaming", "televizor"]
  },
  {
    slug: "boiler-electric-vs-instant",
    title: "Boiler electric vs instant: consum si cost",
    metaDescription:
      "Compara boilerul electric cu instantul electric: consum estimat, cost lunar, avantaje, dezavantaje si recomandari practice.",
    h1: "Consum boiler electric vs instant: care consuma mai mult?",
    intro: [
      "Boilerul electric si instantul electric incalzesc apa in moduri diferite. Boilerul stocheaza apa calda intr-un rezervor si poate avea pierderi de mentinere a temperaturii. Instantul incalzeste apa cand curge, cu putere mare pe perioade scurte. De aceea, comparatia nu se rezuma la W, ci la durata de folosire si obiceiurile de consum.",
      "Valorile sunt orientative si nu tin loc de proiectare sau recomandare tehnica. Instalarea unui instant electric poate necesita putere disponibila si circuit potrivit, iar boilerul poate fi mai comod pentru mai multe puncte de consum. Pentru cost, conteaza energia folosita efectiv pentru apa calda."
    ],
    shortSummary:
      "Instantul are putere mult mai mare, dar functioneaza mai putin timp. Boilerul poate consuma mai mult lunar daca incalzeste si mentine apa zilnic.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/incalzire-electrica",
    hubLabel: "Incalzire electrica",
    options: [
      {
        name: "Boiler electric",
        watts: 2000,
        hoursPerDay: 2,
        daysPerMonth: 30,
        description: "Rezervor care incalzeste si pastreaza apa calda pentru utilizare ulterioara.",
        href: "/cat-consuma/boiler-electric-80l",
        advantages: ["Confort pentru mai multe utilizari", "Putere instantanee mai usor de gestionat", "Apa calda disponibila rapid dupa incalzire"],
        disadvantages: ["Pierderi de caldura din rezervor", "Ocupa spatiu", "Poate consuma inutil daca apa este tinuta prea fierbinte"],
        bestWhen: ["Ai consum constant de apa calda", "Ai nevoie de rezervor", "Instalatia nu suporta puteri foarte mari"],
        reduceTips: ["Seteaza temperatura moderata", "Izoleaza conductele expuse", "Evita supradimensionarea"]
      },
      {
        name: "Instant electric",
        watts: 5500,
        hoursPerDay: 0.35,
        daysPerMonth: 30,
        description: "Incalzeste apa la cerere, cu putere mare, fara rezervor.",
        href: "/#calculator",
        advantages: ["Nu mentine apa calda in rezervor", "Ocupa mai putin spatiu", "Consum legat direct de folosire"],
        disadvantages: ["Necesita putere electrica mare", "Debit si temperatura pot varia", "Poate cere instalatie dedicata"],
        bestWhen: ["Ai utilizari scurte", "Ai instalatie potrivita", "Nu vrei pierderi de stocare"],
        reduceTips: ["Redu debitul inutil", "Foloseste dusuri mai scurte", "Verifica puterea instalatiei cu specialist"]
      }
    ],
    practicalRecommendation:
      "Boilerul este mai comod pentru consum constant, iar instantul poate fi eficient pentru utilizari scurte. Alegerea trebuie facuta si dupa instalatia electrica, nu doar dupa costul estimativ.",
    faq: [
      { question: "Instantul consuma mai putin decat boilerul?", answer: "Poate consuma mai putin daca este folosit scurt, dar are putere mare si depinde de debit si durata." },
      { question: "Boilerul consuma si cand nu folosesc apa?", answer: "Poate consuma pentru mentinerea temperaturii, in functie de izolatie si setari." },
      { question: "Pot instala orice instant electric?", answer: "Nu. Puterea mare poate necesita circuit si protectii potrivite; verifica instalatia cu un specialist." }
    ],
    relatedApplianceSlugs: ["boiler-electric-80l", "masina-de-spalat", "masina-spalat-vase"]
  },
  {
    slug: "bec-led-vs-bec-incandescent",
    title: "Bec LED vs bec incandescent: consum si economie estimativa",
    metaDescription:
      "Compara consumul unui bec LED cu un bec incandescent: cost lunar, cost anual, avantaje, dezavantaje si recomandari practice.",
    h1: "Consum bec LED vs bec incandescent: care consuma mai mult?",
    intro: [
      "Comparația dintre bec LED si bec incandescent este una dintre cele mai clare cand vorbim despre consum electric. Un bec LED poate oferi lumina similara la o putere mult mai mica, in timp ce becul incandescent transforma o parte mare din energie in caldura. Diferenta pe un singur bec poate parea mica lunar, dar devine vizibila cand ai multe becuri aprinse zilnic.",
      "Estimarea de mai jos compara un LED de 10 W cu un bec incandescent de 60 W, folosite acelasi numar de ore. Costul real depinde de numarul de becuri, durata de folosire si pretul kWh."
    ],
    shortSummary:
      "Becul incandescent consuma de aproximativ sase ori mai mult in acest scenariu, deoarece are 60 W fata de 10 W pentru LED.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/iluminat",
    hubLabel: "Iluminat",
    options: [
      {
        name: "Bec LED",
        watts: 10,
        hoursPerDay: 6,
        daysPerMonth: 30,
        description: "Sursa de iluminat eficienta, cu putere mica pentru lumina utila.",
        href: "/cat-consuma/bec-led",
        advantages: ["Consum redus", "Durata de viata mare", "Se incalzeste mai putin"],
        disadvantages: ["Pret initial mai mare decat becurile vechi", "Calitatea luminii difera intre modele", "Becurile smart pot avea stand-by mic"],
        bestWhen: ["Lumina sta aprinsa zilnic", "Ai mai multe becuri in casa", "Vrei reducere de consum fara schimbarea obiceiurilor"],
        reduceTips: ["Alege lumeni potriviti", "Stinge luminile inutile", "Evita iluminatul decorativ pornit continuu"]
      },
      {
        name: "Bec incandescent",
        watts: 60,
        hoursPerDay: 6,
        daysPerMonth: 30,
        description: "Bec clasic cu consum mai mare si eficienta luminoasa redusa.",
        href: "/#calculator",
        advantages: ["Lumina calda familiara", "Cost initial mic acolo unde mai exista", "Compatibilitate simpla"],
        disadvantages: ["Consum mult mai mare", "Produce multa caldura", "Durata de viata mai mica"],
        bestWhen: ["Este folosit rar", "Ai nevoie temporar de o solutie existenta", "Nu merita inlocuirea pentru un punct folosit foarte putin"],
        reduceTips: ["Inlocuieste becurile folosite des", "Redu orele de functionare", "Foloseste senzori pe holuri"]
      }
    ],
    practicalRecommendation:
      "Pentru becurile folosite zilnic, LED-ul este aproape mereu varianta mai eficienta energetic. Becurile incandescente merita pastrate doar in utilizari rare sau temporare.",
    faq: [
      { question: "Cat economisesc cu un bec LED?", answer: "Depinde de ore si pret kWh. In scenariul de 6 ore pe zi, diferenta lunara este mica pe un bec, dar creste cu numarul de becuri." },
      { question: "LED-ul consuma zero cand e oprit?", answer: "Un LED simplu oprit nu consuma. Modelele smart pot avea consum mic in stand-by." },
      { question: "Trebuie sa compar W sau lumeni?", answer: "W arata consumul, lumeni arata lumina. Pentru alegere corecta, compara ambele." }
    ],
    relatedApplianceSlugs: ["bec-led"]
  },
  {
    slug: "plita-inductie-vs-plita-electrica",
    title: "Plita inductie vs plita electrica: consum si cost",
    metaDescription:
      "Compara plita cu inductie si plita electrica clasica: consum estimativ, cost lunar, avantaje, dezavantaje si recomandari practice.",
    h1: "Consum plita inductie vs plita electrica: care consuma mai mult?",
    intro: [
      "Plita cu inductie si plita electrica clasica pot avea puteri apropiate pe zona de gatit, dar modul in care transfera caldura este diferit. Inductia incalzeste direct vasul compatibil, in timp ce plita electrica clasica incalzeste suprafata si apoi vasul. De aceea, inductia poate termina unele preparate mai repede, chiar daca puterea instantanee pare mare.",
      "Comparatia foloseste scenarii orientative pentru o zona de gatit folosita zilnic. Rezultatul real depinde de vas, treapta, durata, cantitatea de mancare si obiceiurile de gatit. Nu este o promisiune de economie, ci un mod practic de a vedea diferentele posibile."
    ],
    shortSummary:
      "In scenariul estimativ, plita cu inductie are cost mai mic pentru ca foloseste o durata mai scurta. Plita electrica poate consuma mai mult daca incalzirea si racirea suprafetei prelungesc gatitul.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/electrocasnice",
    hubLabel: "Electrocasnice",
    options: [
      {
        name: "Plita cu inductie",
        watts: 1800,
        hoursPerDay: 0.75,
        daysPerMonth: 30,
        description: "Incalzeste direct vasul compatibil si poate reduce timpul de gatire.",
        href: "/#calculator",
        advantages: ["Incalzire rapida", "Control bun al temperaturii", "Pierderi mai mici catre suprafata"],
        disadvantages: ["Necesita vase compatibile", "Cost initial mai mare", "Putere instantanee ridicata"],
        bestWhen: ["Gatesti des", "Ai vase compatibile", "Vrei timp mai scurt de preparare"],
        reduceTips: ["Foloseste vase potrivite", "Alege zona corecta", "Opreste cand mancarea este gata"]
      },
      {
        name: "Plita electrica",
        watts: 1800,
        hoursPerDay: 1,
        daysPerMonth: 30,
        description: "Plita clasica incalzeste suprafata, apoi vasul, cu inertie termica mai mare.",
        href: "/#calculator",
        advantages: ["Compatibilitate larga cu vase", "Utilizare simpla", "Poate fi mai accesibila la achizitie"],
        disadvantages: ["Incalzire mai lenta", "Pierderi prin suprafata fierbinte", "Racire mai lenta dupa oprire"],
        bestWhen: ["Gatesti ocazional", "Folosesti vase diverse", "Ai deja plita instalata"],
        reduceTips: ["Foloseste capac", "Potriveste vasul cu zona", "Profita de caldura reziduala"]
      }
    ],
    practicalRecommendation:
      "Daca gatesti des si ai vase potrivite, inductia poate fi mai eficienta prin timp mai scurt si control mai bun. Pentru folosire ocazionala, diferenta poate fi mai mica decat costul schimbarii aparatului.",
    faq: [
      { question: "Plita cu inductie consuma mai putin?", answer: "Poate consuma mai putin pentru aceeasi preparare daca reduce timpul de gatire si transfera energia mai eficient catre vas." },
      { question: "Puterea mare inseamna cost mare automat?", answer: "Nu automat. Costul depinde de putere inmultita cu durata de utilizare." },
      { question: "Conteaza vasele?", answer: "Da. La inductie ai nevoie de vase compatibile, iar la orice plita dimensiunea si capacul influenteaza consumul." }
    ],
    relatedApplianceSlugs: ["cuptor-electric", "cuptor-microunde", "fierbator-electric"]
  },
  {
    slug: "consum-aer-conditionat-vs-ventilator",
    title: "Consum aer conditionat vs ventilator: cost lunar si eficienta",
    metaDescription:
      "Compara consumul unui aer conditionat cu un ventilator: kWh lunar, cost estimat, avantaje, dezavantaje si recomandari pentru zilele calde.",
    h1: "Consum aer conditionat vs ventilator: care te costa mai mult?",
    intro: [
      "Aerul conditionat si ventilatorul rezolva aceeasi problema doar partial: confortul in zilele calde. Aerul conditionat raceste efectiv camera si poate controla temperatura, dar foloseste compresor si are consum mai mare. Ventilatorul nu scade temperatura aerului, insa misca aerul si poate face caldura mai suportabila cu un consum mult mai mic.",
      "Comparatia de mai jos foloseste valori orientative pentru o camera obisnuita. Costul real depinde de puterea aparatului, setarea de temperatura, izolatie, orele de folosire si pretul kWh din contractul tau."
    ],
    shortSummary:
      "Ventilatorul are cost lunar mult mai mic, dar nu raceste camera. Aerul conditionat consuma mai mult, insa ofera control real al temperaturii.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/climatizare",
    hubLabel: "Climatizare",
    options: [
      {
        name: "Aer conditionat",
        watts: 1200,
        hoursPerDay: 5,
        daysPerMonth: 30,
        description: "Aparat de climatizare care raceste camera si mentine temperatura setata.",
        href: "/cat-consuma/aer-conditionat-12000-btu",
        advantages: ["Raceste efectiv incaperea", "Poate dezumidifica aerul", "Modelele inverter moduleaza consumul"],
        disadvantages: ["Consum mai mare decat un ventilator", "Necesita montaj si intretinere", "Costul creste daca temperatura setata este foarte joasa"],
        bestWhen: ["Ai temperaturi ridicate multe ore", "Camera este bine izolata", "Ai nevoie de confort termic real"],
        reduceTips: ["Seteaza 24-26 grade", "Curata filtrele", "Trage draperiile in orele cu soare puternic"]
      },
      {
        name: "Ventilator",
        watts: 50,
        hoursPerDay: 8,
        daysPerMonth: 30,
        description: "Aparat simplu care pune aerul in miscare si imbunatateste senzatia de confort.",
        href: "/cat-consuma/ventilator",
        advantages: ["Consum foarte mic", "Pret de achizitie redus", "Nu necesita instalare"],
        disadvantages: ["Nu raceste aerul", "Eficienta scade in camere foarte calde", "Poate deranja prin zgomot sau curent de aer"],
        bestWhen: ["Vrei cost minim", "Caldura este moderata", "Ai nevoie de ventilatie locala"],
        reduceTips: ["Foloseste treapta potrivita", "Opreste-l cand nu esti in camera", "Combina-l cu umbrirea ferestrelor"]
      }
    ],
    practicalRecommendation:
      "Pentru cost minim, ventilatorul este clar mai economic. Pentru confort in canicula, aerul conditionat merita, dar este bine sa fie folosit cu temperatura moderata si camera bine inchisa.",
    faq: [
      { question: "Ventilatorul consuma mult mai putin decat aerul conditionat?", answer: "Da. In scenariul orientativ, ventilatorul are putere de 50 W, iar aerul conditionat 1200 W." },
      { question: "Pot inlocui aerul conditionat cu ventilatorul?", answer: "Doar daca ai nevoie de senzatie de racoare, nu de scaderea reala a temperaturii." },
      { question: "Ce setare reduce consumul aerului conditionat?", answer: "O temperatura moderata, in jur de 24-26 grade, ajuta de obicei la reducerea consumului." }
    ],
    relatedApplianceSlugs: ["aer-conditionat-12000-btu", "ventilator", "dezumidificator"]
  },
  {
    slug: "consum-aeroterma-vs-convector",
    title: "Consum aeroterma vs convector: cost pentru incalzire electrica",
    metaDescription:
      "Afla diferenta de consum intre aeroterma si convector electric: cost lunar, avantaje, dezavantaje si cand merita fiecare aparat.",
    h1: "Consum aeroterma vs convector: care consuma mai mult?",
    intro: [
      "Aeroterma si convectorul folosesc rezistenta electrica pentru incalzire, deci la aceeasi energie consumata produc aproximativ aceeasi cantitate de caldura. Diferenta practica vine din modul in care distribuie caldura: aeroterma sufla aer cald rapid, iar convectorul incalzeste mai uniform si mai linistit.",
      "Estimarea compara un scenariu de utilizare zilnica, nu o garantie. In camere mari, neizolate sau folosite multe ore, costul poate creste rapid indiferent de aparat."
    ],
    shortSummary:
      "Aeroterma incalzeste rapid, dar poate fi folosita intens pe perioade scurte. Convectorul este mai potrivit pentru confort constant, insa costul depinde direct de orele de functionare.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/incalzire-electrica",
    hubLabel: "Incalzire electrica",
    options: [
      {
        name: "Aeroterma",
        watts: 2000,
        hoursPerDay: 3,
        daysPerMonth: 30,
        description: "Incalzeste rapid prin suflare de aer cald, utila pentru perioade scurte.",
        href: "/cat-consuma/aeroterma",
        advantages: ["Incalzire rapida", "Usor de mutat", "Buna pentru baie sau camera mica pe termen scurt"],
        disadvantages: ["Poate fi zgomotoasa", "Usuca si misca aerul", "Cost mare daca ramane pornita multe ore"],
        bestWhen: ["Ai nevoie de caldura rapida", "Folosirea este scurta", "Camera este mica"],
        reduceTips: ["Foloseste timer", "Opreste dupa incalzirea camerei", "Evita treapta maxima fara nevoie"]
      },
      {
        name: "Convector electric",
        watts: 1800,
        hoursPerDay: 4,
        daysPerMonth: 30,
        description: "Incalzeste aerul prin convectie si poate fi mai confortabil pentru folosire mai lunga.",
        href: "/cat-consuma/convector-electric",
        advantages: ["Functionare mai linistita", "Distributie mai uniforma", "Poate avea termostat util"],
        disadvantages: ["Incalzire initiala mai lenta", "Consum ridicat la folosire continua", "Nu compenseaza izolatia slaba"],
        bestWhen: ["Vrei temperatura constanta", "Ai camera mica sau medie", "Folosesti termostatul"],
        reduceTips: ["Seteaza termostat moderat", "Inchide usile", "Nu bloca circulatia aerului"]
      }
    ],
    practicalRecommendation:
      "Alege aeroterma pentru incalzire rapida si scurta. Alege convectorul pentru confort mai linistit, dar controleaza atent orele de utilizare.",
    faq: [
      { question: "Aeroterma este mai economica decat convectorul?", answer: "Nu neaparat. La incalzire electrica directa, costul depinde mai ales de putere si durata." },
      { question: "De ce pare aeroterma mai eficienta?", answer: "Pentru ca simti caldura rapid, dar daca functioneaza mult timp consumul ramane ridicat." },
      { question: "Ce reduce cel mai mult costul?", answer: "Termostatul, folosirea pe perioade scurte si reducerea pierderilor de caldura din camera." }
    ],
    relatedApplianceSlugs: ["aeroterma", "convector-electric", "calorifer-electric", "radiator-ulei"]
  },
  {
    slug: "consum-radiator-ulei-vs-calorifer-electric",
    title: "Consum radiator cu ulei vs calorifer electric: comparatie cost",
    metaDescription:
      "Compara radiatorul cu ulei cu un calorifer electric: consum lunar estimat, cost anual, avantaje, limite si recomandari de folosire.",
    h1: "Consum radiator cu ulei vs calorifer electric: care este mai eficient?",
    intro: [
      "Radiatorul cu ulei si caloriferul electric sunt deseori percepute ca aparate foarte diferite, dar ambele transforma curentul electric in caldura. Radiatorul cu ulei are inertie termica mai mare: se incalzeste mai lent, dar continua sa cedeze caldura dupa oprire. Caloriferul electric sau panoul cu rezistenta poate raspunde mai rapid, dar se raceste mai repede.",
      "Pentru un calcul corect, nu ajunge sa compari doar puterea inscrisa pe aparat. Conteaza cat timp sta efectiv alimentat, daca are termostat si cat de bine pastreaza camera caldura."
    ],
    shortSummary:
      "La aceeasi putere si aceleasi ore, costul este foarte apropiat. Diferenta vine din termostat, inertie termica si modul de folosire.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/incalzire-electrica",
    hubLabel: "Incalzire electrica",
    options: [
      {
        name: "Radiator cu ulei",
        watts: 2000,
        hoursPerDay: 4,
        daysPerMonth: 30,
        description: "Aparat cu ulei termic, util pentru caldura mai stabila dupa incalzire.",
        href: "/cat-consuma/radiator-ulei",
        advantages: ["Caldura mai uniforma", "Inertie termica placuta", "Functionare de obicei silentioasa"],
        disadvantages: ["Pornire mai lenta", "Greu de mutat la unele modele", "Consum mare daca este lasat continuu"],
        bestWhen: ["Vrei confort pe cateva ore", "Camera este bine izolata", "Folosesti termostatul"],
        reduceTips: ["Nu acoperi radiatorul", "Seteaza treapta potrivita", "Opreste-l inainte ca incaperea sa se supraincalzeasca"]
      },
      {
        name: "Calorifer electric",
        watts: 2000,
        hoursPerDay: 4,
        daysPerMonth: 30,
        description: "Aparat electric pentru incalzire locala, cu raspuns rapid in functie de model.",
        href: "/cat-consuma/calorifer-electric",
        advantages: ["Disponibil in multe variante", "Poate incalzi rapid local", "Usor de folosit"],
        disadvantages: ["Cost ridicat la utilizare zilnica", "Depinde mult de termostat", "Poate incalzi neuniform"],
        bestWhen: ["Ai nevoie de solutie temporara", "Camera este mica", "Nu il folosesti multe ore pe zi"],
        reduceTips: ["Foloseste programare", "Inchide camera", "Evita functionarea peste noapte fara control"]
      }
    ],
    practicalRecommendation:
      "Daca aparatele au aceeasi putere, nu te astepta la diferente mari de cost doar din tipul aparatului. Alege dupa confort, termostat si durata de folosire.",
    faq: [
      { question: "Radiatorul cu ulei consuma mai putin?", answer: "Nu automat. Poate parea mai economic datorita inertiei, dar energia consumata depinde de timpul alimentat." },
      { question: "Care este mai bun pentru camera mica?", answer: "Ambele pot functiona, dar un termostat bun si izolatia camerei conteaza mai mult." },
      { question: "Cum evit o factura mare?", answer: "Limiteaza orele de functionare, foloseste termostat si incalzeste doar camera folosita." }
    ],
    relatedApplianceSlugs: ["radiator-ulei", "calorifer-electric", "convector-electric", "aeroterma"]
  },
  {
    slug: "consum-plita-inductie-vs-plita-electrica",
    title: "Consum plita inductie vs plita electrica: costuri la gatit",
    metaDescription:
      "Vezi cat consuma plita cu inductie fata de plita electrica clasica, cu exemple de cost lunar, avantaje, dezavantaje si recomandari.",
    h1: "Consum plita inductie vs plita electrica: ce alegi pentru cost mai mic?",
    intro: [
      "La gatit, consumul nu este dat doar de puterea zonei de incalzire. O plita cu inductie poate avea putere mare, dar incalzeste vasul direct si poate termina mai repede aceeasi preparare. O plita electrica clasica incalzeste intai suprafata, apoi vasul, iar o parte din energie ramane in placa fierbinte.",
      "Exemplul foloseste o ora de gatit zilnic ca reper pentru plita electrica si o durata mai scurta pentru inductie. Daca gatesti rar, diferenta lunara poate fi mica; daca gatesti zilnic, timpul si vasele folosite devin importante."
    ],
    shortSummary:
      "Inductia poate avea cost mai mic cand reduce durata de gatire. Plita electrica este simpla si compatibila cu multe vase, dar poate pierde mai multa caldura.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/electrocasnice",
    hubLabel: "Electrocasnice",
    options: [
      {
        name: "Plita cu inductie",
        watts: 1800,
        hoursPerDay: 0.75,
        daysPerMonth: 30,
        description: "Transfera energia direct catre vasul compatibil, cu incalzire rapida.",
        href: "/#calculator",
        advantages: ["Timp de gatire mai scurt", "Control precis", "Mai putina caldura pierduta in bucatarie"],
        disadvantages: ["Necesita vase compatibile", "Cost initial mai mare", "Poate solicita instalatia la putere mare"],
        bestWhen: ["Gatesti frecvent", "Vrei control bun", "Ai sau poti cumpara vase compatibile"],
        reduceTips: ["Foloseste capac", "Alege vase cu baza potrivita", "Nu folosi treapta maxima mai mult decat este nevoie"]
      },
      {
        name: "Plita electrica",
        watts: 1800,
        hoursPerDay: 1,
        daysPerMonth: 30,
        description: "Incalzeste placa si apoi vasul, cu inertie termica vizibila.",
        href: "/#calculator",
        advantages: ["Functionare familiara", "Compatibilitate larga", "Poate fi mai accesibila"],
        disadvantages: ["Incalzire si racire mai lente", "Pierderi prin suprafata fierbinte", "Control mai putin rapid"],
        bestWhen: ["Gatesti ocazional", "Ai deja aparat functional", "Nu vrei sa schimbi vasele"],
        reduceTips: ["Potriveste diametrul vasului", "Foloseste caldura reziduala", "Opreste zona inainte de final cand se poate"]
      }
    ],
    practicalRecommendation:
      "Pentru gatit des, inductia poate fi alegerea mai eficienta si mai comoda. Pentru folosire rara, schimbarea plitei doar pentru economie poate avea recuperare lenta.",
    faq: [
      { question: "Inductia consuma mai putin la orice reteta?", answer: "Nu la orice reteta, dar poate reduce consumul cand scurteaza timpul de incalzire si gatire." },
      { question: "Trebuie sa adaug si cuptorul in calcul?", answer: "Da, daca il folosesti in aceeasi luna. Plita si cuptorul trebuie calculate separat." },
      { question: "Pretul kWh schimba comparatia?", answer: "Pretul nu schimba kWh consumati, dar schimba costul in lei." }
    ],
    relatedApplianceSlugs: ["cuptor-electric", "cuptor-microunde", "fierbator-electric"]
  },
  {
    slug: "consum-frigider-vechi-vs-frigider-nou",
    title: "Consum frigider vechi vs frigider nou: diferenta la factura",
    metaDescription:
      "Compara consumul unui frigider vechi cu un frigider nou eficient: kWh lunar, cost estimat, avantaje, dezavantaje si semne utile.",
    h1: "Consum frigider vechi vs frigider nou: cat poti plati in plus?",
    intro: [
      "Frigiderul functioneaza permanent, deci diferentele mici de consum se aduna luna de luna. Un frigider vechi, cu garnituri uzate, compresor obosit sau clasa energetica slaba, poate consuma mult mai mult decat un model nou si eficient. Totusi, nu orice frigider vechi este automat foarte scump, iar consumul real se verifica cel mai bine cu o priza de masurare.",
      "Scenariul de mai jos compara doua valori orientative: un frigider vechi care porneste mai des si un frigider nou eficient. Foloseste rezultatul ca reper, nu ca verdict absolut despre aparatul tau."
    ],
    shortSummary:
      "Un frigider nou eficient poate reduce costul lunar, mai ales daca aparatul vechi functioneaza aproape continuu sau are garnituri deteriorate.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/electrocasnice",
    hubLabel: "Electrocasnice",
    options: [
      {
        name: "Frigider vechi",
        watts: 180,
        hoursPerDay: 10,
        daysPerMonth: 30,
        description: "Model mai vechi sau uzat, care poate porni des pentru a mentine temperatura.",
        href: "/cat-consuma/frigider",
        advantages: ["Nu necesita investitie imediata", "Poate fi suficient daca functioneaza corect", "Cost zero de inlocuire pe termen scurt"],
        disadvantages: ["Consum posibil mai mare", "Risc de garnituri uzate", "Poate raci neuniform sau porni des"],
        bestWhen: ["Consum masurat este rezonabil", "Este folosit ca aparat secundar rar", "Nu apar semne de defect"],
        reduceTips: ["Verifica garnitura", "Curata spatele aparatului", "Nu il tine langa surse de caldura"]
      },
      {
        name: "Frigider nou eficient",
        watts: 80,
        hoursPerDay: 8,
        daysPerMonth: 30,
        description: "Model modern, de obicei mai bine izolat si cu compresor mai eficient.",
        href: "/cat-consuma/frigider",
        advantages: ["Consum mai mic", "Temperatura mai stabila", "Risc mai mic de defecte in primii ani"],
        disadvantages: ["Cost de achizitie", "Economia depinde de model", "Volumul si dotarile pot schimba consumul"],
        bestWhen: ["Frigiderul vechi consuma mult masurat", "Ai nevoie oricum de inlocuire", "Aparatul functioneaza permanent in locuinta"],
        reduceTips: ["Alege volum potrivit", "Seteaza temperatura recomandata", "Lasa spatiu pentru ventilatie"]
      }
    ],
    practicalRecommendation:
      "Inainte de inlocuire, masoara consumul frigiderului vechi cateva zile. Daca diferenta este mare si aparatul are probleme, un model eficient poate reduce costul lunar.",
    faq: [
      { question: "Cum stiu daca frigiderul vechi consuma prea mult?", answer: "Semnele includ functionare aproape continua, gheata excesiva, garnituri slabite si temperatura instabila." },
      { question: "Un frigider nou merita doar pentru economie?", answer: "Depinde de diferenta masurata si de pretul aparatului. Economia poate conta, dar nu este singurul criteriu." },
      { question: "Frigiderul consuma 24 de ore pe zi?", answer: "Este conectat permanent, dar compresorul porneste in cicluri. De aceea folosim ore echivalente de functionare." }
    ],
    relatedApplianceSlugs: ["frigider", "congelator", "lada-frigorifica"]
  },
  {
    slug: "consum-laptop-vs-pc-gaming",
    title: "Consum laptop vs PC gaming: cost lunar pentru lucru si jocuri",
    metaDescription:
      "Compara consumul unui laptop cu un PC gaming: cost lunar, cost anual, avantaje, dezavantaje si recomandari pentru utilizare zilnica.",
    h1: "Consum laptop vs PC gaming: cat costa diferenta de performanta?",
    intro: [
      "Laptopul este gandit pentru eficienta si autonomie, in timp ce un PC gaming prioritizeaza performanta. Diferenta de consum poate fi mare, mai ales cand PC-ul are placa video dedicata, monitor separat si sesiuni lungi de joc. Pentru browsing, munca de birou sau scoala, laptopul ramane de obicei mult mai economic.",
      "Estimarea nu compara performanta, ci costul energiei. Un laptop de gaming poate consuma mai mult decat un laptop obisnuit, iar un PC gaming consuma diferit in idle fata de jocuri solicitante."
    ],
    shortSummary:
      "Laptopul are cost lunar redus pentru utilizare zilnica. PC-ul gaming costa mai mult la energie, dar ofera performanta pe care laptopul simplu nu o poate inlocui.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/electronice",
    hubLabel: "Electronice",
    options: [
      {
        name: "Laptop",
        watts: 65,
        hoursPerDay: 8,
        daysPerMonth: 30,
        description: "Potrivit pentru lucru, scoala, browsing si consum redus de energie.",
        href: "/#calculator",
        advantages: ["Consum mic", "Portabil", "Bun pentru utilizare zilnica lunga"],
        disadvantages: ["Performanta limitata la jocuri", "Upgrade dificil", "Racire mai sensibila"],
        bestWhen: ["Lucrezi multe ore", "Nu ai nevoie de gaming intens", "Vrei consum redus"],
        reduceTips: ["Activeaza battery saver", "Redu luminozitatea", "Inchide aplicatiile nefolosite"]
      },
      {
        name: "PC gaming",
        watts: 550,
        hoursPerDay: 4,
        daysPerMonth: 30,
        description: "Sistem performant pentru jocuri si aplicatii solicitante, cu consum mai mare in sarcina.",
        href: "/cat-consuma/pc-gaming",
        advantages: ["Performanta ridicata", "Upgrade flexibil", "Experienta buna in jocuri"],
        disadvantages: ["Consum mare in jocuri", "Monitorul adauga cost", "Caldura si zgomot mai mari"],
        bestWhen: ["Joci frecvent", "Ai nevoie de placa video puternica", "Folosesti aplicatii grafice sau randare"],
        reduceTips: ["Limiteaza FPS cand se poate", "Foloseste mod sleep", "Alege sursa si componente eficiente"]
      }
    ],
    practicalRecommendation:
      "Pentru taskuri obisnuite, laptopul este mai economic. PC-ul gaming merita cand performanta conteaza, dar este bine sa ii calculezi separat costul lunar.",
    faq: [
      { question: "PC-ul gaming consuma mult si cand nu joc?", answer: "Consumul in idle este mai mic decat in jocuri, dar poate ramane peste un laptop obisnuit." },
      { question: "Monitorul este inclus?", answer: "Nu in scenariul principal. Adauga monitorul separat in simulator pentru o factura mai realista." },
      { question: "Pot reduce costul fara sa renunt la PC?", answer: "Da, prin limitarea FPS, mod sleep si oprirea sistemului cand nu este folosit." }
    ],
    relatedApplianceSlugs: ["pc-gaming", "televizor"]
  },
  {
    slug: "consum-led-vs-halogen",
    title: "Consum LED vs halogen: cat costa iluminatul lunar",
    metaDescription:
      "Compara consumul unui bec LED cu un bec halogen: cost lunar, cost anual, avantaje, dezavantaje si recomandari pentru iluminat eficient.",
    h1: "Consum LED vs halogen: care bec te costa mai putin?",
    intro: [
      "Becurile halogen au fost o alternativa mai eficienta la incandescent, dar LED-ul a schimbat radical costul iluminatului. Un LED poate oferi lumina similara cu putere mult mai mica, ceea ce conteaza in camere unde lumina sta aprinsa seara de seara.",
      "In exemplul de mai jos comparam un LED de 10 W cu un halogen de 42 W, folosite 6 ore pe zi. Daca ai multe spoturi sau lustre cu mai multe becuri, inmulteste diferenta cu numarul de surse de lumina."
    ],
    shortSummary:
      "LED-ul are cost lunar mult mai mic decat halogenul la aceleasi ore de utilizare, mai ales cand sunt mai multe becuri aprinse zilnic.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/iluminat",
    hubLabel: "Iluminat",
    options: [
      {
        name: "Bec LED",
        watts: 10,
        hoursPerDay: 6,
        daysPerMonth: 30,
        description: "Sursa eficienta pentru iluminat zilnic, cu consum redus.",
        href: "/cat-consuma/bec-led",
        advantages: ["Consum mic", "Durata de viata mare", "Disponibil in multe temperaturi de culoare"],
        disadvantages: ["Calitatea variaza intre modele", "Pret initial mai mare", "Unele modele ieftine pot palpa"],
        bestWhen: ["Lumina este folosita zilnic", "Ai multe corpuri de iluminat", "Vrei cost redus constant"],
        reduceTips: ["Alege lumeni potriviti", "Stinge luminile inutile", "Foloseste senzori unde are sens"]
      },
      {
        name: "Bec halogen",
        watts: 42,
        hoursPerDay: 6,
        daysPerMonth: 30,
        description: "Bec cu lumina placuta, dar consum mai mare decat LED-ul.",
        href: "/#calculator",
        advantages: ["Redare buna a culorilor", "Lumina calda", "Compatibilitate simpla in unele corpuri"],
        disadvantages: ["Consum mai mare", "Se incalzeste puternic", "Durata de viata mai mica decat LED"],
        bestWhen: ["Este folosit rar", "Ai nevoie temporar de acea lumina", "Nu exista alternativa LED compatibila imediat"],
        reduceTips: ["Inlocuieste spoturile folosite des", "Redu durata de aprindere", "Evita halogenul in iluminat decorativ permanent"]
      }
    ],
    practicalRecommendation:
      "Pentru iluminatul folosit zilnic, LED-ul este varianta practica si economica. Halogenul poate ramane doar in zone rare sau pana gasesti un LED compatibil.",
    faq: [
      { question: "LED-ul lumineaza la fel ca halogenul?", answer: "Poate lumina similar daca alegi lumeni si temperatura de culoare potrivite." },
      { question: "Diferenta conteaza la un singur bec?", answer: "La un bec diferenta lunara este mica, dar la multe becuri aprinse zilnic devine vizibila." },
      { question: "Halogenul consuma mai putin decat incandescentul?", answer: "De obicei da, dar consuma mult mai mult decat LED-ul." }
    ],
    relatedApplianceSlugs: ["bec-led"]
  },
  {
    slug: "consum-boiler-50l-vs-80l",
    title: "Consum boiler 50L vs 80L: cost lunar estimat",
    metaDescription:
      "Compara consumul unui boiler electric de 50L cu unul de 80L: cost lunar, cost anual, avantaje, dezavantaje si recomandari.",
    h1: "Consum boiler 50L vs 80L: ce capacitate te costa mai mult?",
    intro: [
      "Capacitatea boilerului influenteaza confortul si consumul, dar nu inseamna automat ca un boiler mai mare consuma proportional mai mult. Conteaza temperatura setata, izolatia rezervorului, cate persoane folosesc apa calda si cat de des rezistenta porneste pentru reincalzire.",
      "Comparatia foloseste scenarii orientative pentru o locuinta. Un boiler de 50L poate fi suficient pentru una sau doua persoane cu dusuri scurte, iar unul de 80L poate fi mai confortabil pentru mai multe utilizari, dar poate mentine mai multa apa calda."
    ],
    shortSummary:
      "Boilerul de 80L poate avea cost mai mare daca incalzeste mai multa apa zilnic. Boilerul de 50L poate fi mai economic, dar poate fi insuficient pentru consum mare.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/incalzire-electrica",
    hubLabel: "Incalzire electrica",
    options: [
      {
        name: "Boiler 50L",
        watts: 1500,
        hoursPerDay: 1.5,
        daysPerMonth: 30,
        description: "Rezervor mai mic, potrivit pentru consum redus sau spatiu limitat.",
        href: "/cat-consuma/boiler-electric-80l",
        advantages: ["Incalzeste mai putina apa", "Ocupa mai putin spatiu", "Poate fi suficient pentru consum moderat"],
        disadvantages: ["Apa calda se poate termina mai repede", "Poate reporni des daca este solicitat intens", "Confort limitat pentru familie"],
        bestWhen: ["Locuieste o persoana sau doua", "Dusurile sunt scurte", "Spatiul este limitat"],
        reduceTips: ["Seteaza temperatura moderata", "Evita dusurile foarte lungi", "Repara pierderile de apa calda"]
      },
      {
        name: "Boiler 80L",
        watts: 2000,
        hoursPerDay: 2,
        daysPerMonth: 30,
        description: "Rezervor mai mare, folosit frecvent pentru confort mai bun in locuinte cu consum mai mare.",
        href: "/cat-consuma/boiler-electric-80l",
        advantages: ["Mai multa apa calda disponibila", "Mai potrivit pentru familie", "Confort mai bun la utilizari succesive"],
        disadvantages: ["Poate consuma mai mult", "Ocupa mai mult spatiu", "Pierderile de mentinere pot fi mai mari"],
        bestWhen: ["Sunt mai multi utilizatori", "Ai consum constant", "Ai nevoie de rezerva de apa calda"],
        reduceTips: ["Nu seta temperatura inutil de sus", "Foloseste programare daca exista", "Alege capacitatea potrivita consumului real"]
      }
    ],
    practicalRecommendation:
      "Alege capacitatea dupa consumul real, nu doar dupa pret. Un boiler prea mare poate costa inutil, iar unul prea mic poate porni des si oferi confort slab.",
    faq: [
      { question: "Boilerul de 80L consuma mereu mai mult?", answer: "Nu mereu, dar poate consuma mai mult daca incalzeste si mentine mai multa apa decat folosesti." },
      { question: "Ce temperatura este potrivita?", answer: "O setare moderata reduce pierderile, dar trebuie sa respecti recomandarile aparatului pentru igiena si siguranta." },
      { question: "Capacitatea influenteaza factura?", answer: "Da, mai ales prin cantitatea de apa incalzita si pierderile de mentinere." }
    ],
    relatedApplianceSlugs: ["boiler-electric-80l", "masina-de-spalat", "masina-spalat-vase"]
  },
  {
    slug: "consum-boiler-vs-instant",
    title: "Consum boiler vs instant electric: cost lunar si alegere practica",
    metaDescription:
      "Compara boilerul electric cu instantul electric pentru apa calda: consum lunar, cost anual, avantaje, dezavantaje si recomandari.",
    h1: "Consum boiler vs instant: ce varianta este mai potrivita pentru apa calda?",
    intro: [
      "Boilerul si instantul electric folosesc energia diferit. Boilerul incalzeste un volum de apa si il pastreaza cald, in timp ce instantul consuma putere mare doar cand curge apa. Din acest motiv, instantul poate parea scump din cauza puterii, dar durata scurta poate echilibra calculul.",
      "Alegerea nu trebuie facuta doar dupa costul estimat. Conteaza instalatia electrica, debitul dorit, numarul de persoane si modul in care folosesti apa calda in fiecare zi."
    ],
    shortSummary:
      "Boilerul este confortabil pentru consum constant, instantul reduce pierderile de stocare, dar cere putere mare si instalatie potrivita.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/incalzire-electrica",
    hubLabel: "Incalzire electrica",
    options: [
      {
        name: "Boiler electric",
        watts: 2000,
        hoursPerDay: 2,
        daysPerMonth: 30,
        description: "Incalzeste apa intr-un rezervor si o mentine la temperatura setata.",
        href: "/cat-consuma/boiler-electric-80l",
        advantages: ["Confort bun", "Apa calda disponibila pentru utilizari succesive", "Putere instantanee mai mica decat instantul"],
        disadvantages: ["Pierderi de mentinere", "Ocupa spatiu", "Capacitate limitata de rezervor"],
        bestWhen: ["Ai consum constant", "Sunt mai multe persoane", "Instalatia nu permite puteri foarte mari"],
        reduceTips: ["Alege capacitate potrivita", "Redu temperatura excesiva", "Izoleaza traseele expuse"]
      },
      {
        name: "Instant electric",
        watts: 5500,
        hoursPerDay: 0.35,
        daysPerMonth: 30,
        description: "Incalzeste apa pe loc, fara rezervor, cu putere instantanee ridicata.",
        href: "/#calculator",
        advantages: ["Fara pierderi de stocare", "Dimensiuni compacte", "Consum legat de folosirea efectiva"],
        disadvantages: ["Necesita putere mare", "Debit limitat in functie de model", "Instalare mai sensibila"],
        bestWhen: ["Ai utilizari scurte", "Ai circuit electric potrivit", "Vrei apa calda la cerere"],
        reduceTips: ["Controleaza debitul", "Scurteaza durata de utilizare", "Verifica instalatia inainte de achizitie"]
      }
    ],
    practicalRecommendation:
      "Pentru familie si consum repetat, boilerul este adesea mai comod. Pentru utilizari scurte si instalatie adecvata, instantul poate evita pierderile de mentinere.",
    faq: [
      { question: "Instantul electric este mai ieftin la factura?", answer: "Poate fi, daca folosesti apa calda putin timp. La utilizare lunga, puterea mare se simte in cost." },
      { question: "Boilerul consuma noaptea?", answer: "Poate porni pentru mentinerea temperaturii, in functie de izolatie si setari." },
      { question: "Ce trebuie verificat inainte de instant?", answer: "Puterea disponibila, circuitul electric, protectiile si debitul dorit." }
    ],
    relatedApplianceSlugs: ["boiler-electric-80l", "masina-de-spalat", "masina-spalat-vase"]
  },
  {
    slug: "consum-uscator-rufe-vs-uscare-naturala",
    title: "Consum uscator rufe vs uscare naturala: cost si confort",
    metaDescription:
      "Compara uscatorul de rufe cu uscarea naturala: consum lunar, cost anual, avantaje, dezavantaje si recomandari pentru locuinta.",
    h1: "Consum uscator rufe vs uscare naturala: cat platesti pentru confort?",
    intro: [
      "Uscatorul de rufe aduce confort clar: haine uscate rapid, mai putina dependenta de vreme si mai putin spatiu ocupat. Uscarea naturala nu consuma energie electrica pentru uscare, dar poate dura mai mult, poate ocupa balconul sau camera si poate creste umiditatea in locuinta daca nu exista ventilatie buna.",
      "Comparatia arata costul energiei pentru uscator fata de alternativa fara consum electric direct. Nu include costuri indirecte, cum ar fi dezumidificarea camerei sau timpul necesar pentru intinsul rufelor."
    ],
    shortSummary:
      "Uscarea naturala are cost electric direct zero. Uscatorul de rufe costa lunar, dar ofera timp castigat, confort si predictibilitate.",
    pricePerKwh: defaultPricePerKwh,
    hubHref: "/electrocasnice",
    hubLabel: "Electrocasnice",
    options: [
      {
        name: "Uscator de rufe",
        watts: 2500,
        hoursPerDay: 1.5,
        daysPerMonth: 12,
        description: "Aparat care usuca rapid rufele, cu consum vizibil la fiecare ciclu.",
        href: "/cat-consuma/uscator-rufe",
        advantages: ["Rufe uscate rapid", "Confort in sezon rece", "Mai putina dependenta de spatiu si vreme"],
        disadvantages: ["Consum electric semnificativ", "Poate uza unele textile", "Necesita curatarea filtrelor"],
        bestWhen: ["Ai multe spalari", "Nu ai balcon sau spatiu de uscare", "Ai nevoie de rufe uscate rapid"],
        reduceTips: ["Centrifugheaza bine la spalare", "Curata filtrele", "Foloseste program potrivit incarcaturii"]
      },
      {
        name: "Uscare naturala",
        watts: 0,
        hoursPerDay: 0,
        daysPerMonth: 0,
        description: "Uscare fara consum electric direct, folosind aer, balcon sau suport de rufe.",
        href: "/#calculator",
        advantages: ["Cost electric direct zero", "Blanzime mai mare pentru textile", "Nu necesita aparat dedicat"],
        disadvantages: ["Dureaza mai mult", "Ocupa spatiu", "Poate creste umiditatea in interior"],
        bestWhen: ["Ai balcon sau spatiu ventilat", "Nu te grabesti", "Vrei cost minim la energie"],
        reduceTips: ["Usuca in spatiu ventilat", "Evita camerele deja umede", "Scutura rufele inainte de intindere"]
      }
    ],
    practicalRecommendation:
      "Pentru economie pura, uscarea naturala castiga. Uscatorul merita cand confortul, timpul si lipsa spatiului de uscare sunt mai importante decat costul lunar.",
    faq: [
      { question: "Uscarea naturala are cost zero?", answer: "Are cost electric direct zero pentru uscare, dar poate avea efecte indirecte daca folosesti dezumidificator sau incalzire suplimentara." },
      { question: "Uscatorul de rufe consuma mult?", answer: "Da, poate fi unul dintre electrocasnicele cu consum vizibil, mai ales la multe cicluri pe luna." },
      { question: "Cum reduc consumul uscatorului?", answer: "Centrifugheaza rufele bine, curata filtrele si foloseste programe potrivite pentru incarcatura." }
    ],
    relatedApplianceSlugs: ["uscator-rufe", "masina-de-spalat", "dezumidificator"]
  }
];

export const comparisonBySlug = new Map(
  seoComparisons.map((comparison) => [comparison.slug, comparison])
);
