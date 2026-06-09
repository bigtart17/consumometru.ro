import type { AppliancePreset } from "@/types/energy";

export const appliancePresets: AppliancePreset[] = [
  {
    name: "Aer conditionat",
    slug: "aer-conditionat",
    watts: 1200,
    hoursPerDay: 5,
    category: "Climatizare",
    summary:
      "Consum estimativ pentru un aparat de aer conditionat folosit cateva ore pe zi."
  },
  {
    name: "Aer conditionat 9000 BTU",
    slug: "aer-conditionat-9000-btu",
    watts: 900,
    hoursPerDay: 5,
    category: "Climatizare",
    summary:
      "Estimare pentru camere mici sau dormitoare; consumul depinde de temperatura setata si izolatie."
  },
  {
    name: "Aer conditionat 18000 BTU",
    slug: "aer-conditionat-18000-btu",
    watts: 1800,
    hoursPerDay: 5,
    category: "Climatizare",
    summary:
      "Estimare pentru livinguri sau spatii mai mari, unde durata de functionare conteaza mult."
  },
  {
    name: "Ventilator",
    slug: "ventilator",
    watts: 50,
    hoursPerDay: 8,
    category: "Climatizare",
    summary:
      "Consum redus fata de racirea activa; ventilatorul misca aerul, dar nu scade temperatura camerei."
  },
  {
    name: "Dezumidificator",
    slug: "dezumidificator",
    watts: 300,
    hoursPerDay: 6,
    category: "Climatizare",
    summary:
      "Consum influentat de umiditatea camerei, capacitate si setarea dorita."
  },
  {
    name: "Frigider",
    slug: "frigider",
    watts: 120,
    hoursPerDay: 8,
    category: "Electrocasnice",
    summary:
      "Puterea compresorului variaza, iar consumul real depinde de clasa energetica si temperatura setata."
  },
  {
    name: "Frigider vechi",
    slug: "frigider-vechi",
    watts: 220,
    hoursPerDay: 10,
    category: "Electrocasnice",
    summary:
      "Estimare pentru un frigider mai vechi, utila pentru comparatii cu modele eficiente."
  },
  {
    name: "Frigider eficient",
    slug: "frigider-eficient",
    watts: 80,
    hoursPerDay: 8,
    category: "Electrocasnice",
    summary:
      "Consum orientativ pentru un frigider modern cu eficienta energetica mai buna."
  },
  {
    name: "Boiler electric",
    slug: "boiler-electric",
    watts: 2000,
    hoursPerDay: 2,
    category: "Incalzire apa",
    summary:
      "Estimare pentru un boiler electric uzual, cu durata zilnica ajustabila in functie de folosire."
  },
  {
    name: "Centrala electrica",
    slug: "centrala-electrica",
    watts: 6000,
    hoursPerDay: 3,
    category: "Incalzire",
    summary:
      "Estimare pentru o centrala electrica folosita la incalzire; consumul real depinde mult de locuinta."
  },
  {
    name: "PC gaming",
    slug: "pc-gaming",
    watts: 550,
    hoursPerDay: 4,
    category: "Electronice",
    summary:
      "Consum orientativ pentru un sistem de gaming; placa video si sursa pot schimba mult valoarea."
  },
  {
    name: "Desktop PC",
    slug: "desktop-pc",
    watts: 250,
    hoursPerDay: 6,
    category: "Electronice",
    summary:
      "Estimare pentru un desktop de birou; consumul creste daca are componente performante."
  },
  {
    name: "Televizor",
    slug: "televizor",
    watts: 90,
    hoursPerDay: 4,
    category: "Electronice",
    summary:
      "Estimare pentru un televizor LED modern, in functie de diagonala si luminozitate."
  },
  {
    name: "Calorifer electric",
    slug: "calorifer-electric",
    watts: 2000,
    hoursPerDay: 4,
    category: "Incalzire",
    summary:
      "Aparatele de incalzire electrica au de obicei putere mare si pot influenta rapid factura."
  },
  {
    name: "Aeroterma",
    slug: "aeroterma",
    watts: 2000,
    hoursPerDay: 2,
    category: "Incalzire",
    summary:
      "Incalzeste rapid, dar poate costa mult daca este folosita zilnic multe ore."
  },
  {
    name: "Convector electric",
    slug: "convector-electric",
    watts: 2000,
    hoursPerDay: 4,
    category: "Incalzire",
    summary:
      "Consum dependent de termostat, izolatie si durata reala de functionare."
  },
  {
    name: "Radiator cu ulei",
    slug: "radiator-ulei",
    watts: 2000,
    hoursPerDay: 4,
    category: "Incalzire",
    summary:
      "Are inertie termica, dar costul depinde de timpul in care rezistenta este alimentata."
  },
  {
    name: "Panou radiant",
    slug: "panou-radiant",
    watts: 800,
    hoursPerDay: 5,
    category: "Incalzire",
    summary:
      "Potrivit pentru incalzire locala; calculeaza separat daca folosesti mai multe panouri."
  },
  {
    name: "Masina de spalat",
    slug: "masina-de-spalat",
    watts: 700,
    hoursPerDay: 1,
    category: "Electrocasnice",
    summary:
      "Consum mediu pentru un ciclu de spalare; incalzirea apei poate creste consumul."
  },
  {
    name: "Congelator",
    slug: "congelator",
    watts: 100,
    hoursPerDay: 10,
    category: "Electrocasnice",
    summary:
      "Functioneaza permanent ca aparat, dar compresorul porneste intermitent."
  },
  {
    name: "Lada frigorifica",
    slug: "lada-frigorifica",
    watts: 120,
    hoursPerDay: 9,
    category: "Electrocasnice",
    summary:
      "Consum influentat de volum, temperatura ambientala si frecventa deschiderii capacului."
  },
  {
    name: "Masina de spalat vase",
    slug: "masina-spalat-vase",
    watts: 1200,
    hoursPerDay: 1,
    category: "Electrocasnice",
    summary:
      "Consumul depinde de program, temperatura apei si numarul de cicluri lunare."
  },
  {
    name: "Uscator rufe",
    slug: "uscator-rufe",
    watts: 2500,
    hoursPerDay: 1,
    category: "Electrocasnice",
    summary:
      "Estimare pentru un uscator de rufe clasic; modelele cu pompa de caldura pot consuma mai putin."
  },
  {
    name: "Cuptor electric",
    slug: "cuptor-electric",
    watts: 2200,
    hoursPerDay: 0.75,
    category: "Bucatarie",
    summary:
      "Consum orientativ pentru gatit la cuptor, cu durata ajustabila in functie de reteta."
  },
  {
    name: "Cuptor cu microunde",
    slug: "cuptor-microunde",
    watts: 1000,
    hoursPerDay: 0.25,
    category: "Bucatarie",
    summary:
      "Putere mare pe perioade scurte; costul depinde de minutele zilnice de folosire."
  },
  {
    name: "Fierbator electric",
    slug: "fierbator-electric",
    watts: 2000,
    hoursPerDay: 0.2,
    category: "Bucatarie",
    summary:
      "Consuma mult pe moment, dar functioneaza putin timp; cantitatea de apa conteaza."
  },
  {
    name: "Espressor",
    slug: "espressor",
    watts: 1400,
    hoursPerDay: 0.25,
    category: "Bucatarie",
    summary:
      "Consum influentat de incalzire, numarul de cafele, spumare si timpul in stand-by."
  },
  {
    name: "Laptop",
    slug: "laptop",
    watts: 65,
    hoursPerDay: 8,
    category: "Electronice",
    summary:
      "Consum estimativ pentru lucru zilnic; laptopurile de gaming sau statiile mobile pot consuma mai mult."
  },
  {
    name: "Bec LED",
    slug: "bec-led",
    watts: 10,
    hoursPerDay: 6,
    category: "Iluminat",
    summary:
      "Consum redus, potrivit pentru comparatii intre iluminat LED si becuri mai vechi."
  },
  {
    name: "Bec incandescent",
    slug: "bec-incandescent",
    watts: 60,
    hoursPerDay: 6,
    category: "Iluminat",
    summary:
      "Consum orientativ pentru un bec incandescent clasic, util pentru comparatii cu LED."
  },
  {
    name: "Plita electrica",
    slug: "plita-electrica",
    watts: 1800,
    hoursPerDay: 1,
    category: "Bucatarie",
    summary:
      "Estimare pentru o zona de gatit folosita zilnic; consumul depinde de treapta si durata."
  }
];
