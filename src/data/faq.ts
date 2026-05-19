export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Cum se calculează consumul electric?",
    answer:
      "Consumul electric se calculează în kWh cu formula: puterea aparatului în W / 1000 × ore de utilizare × zile de utilizare. De exemplu, un aparat de 1000 W folosit 2 ore pe zi timp de 30 de zile consumă aproximativ 60 kWh pe lună."
  },
  {
    question: "Ce înseamnă kWh?",
    answer:
      "kWh înseamnă kilowatt-oră și este unitatea folosită pe factura de energie electrică. Un kWh înseamnă energia consumată de un aparat de 1000 W care funcționează timp de o oră."
  },
  {
    question: "1 kWh câți lei costă?",
    answer:
      "1 kWh costă cât prețul energiei din contractul tău. În România, prețul poate varia în funcție de furnizor, contract, taxe și perioada de facturare. Dacă prețul este 1,30 lei/kWh, atunci 60 kWh costă aproximativ 78 lei."
  },
  {
    question: "De ce diferă factura reală de estimarea calculatorului?",
    answer:
      "Factura reală include toate aparatele din locuință, nu doar aparatul calculat. În plus, consumul poate varia în funcție de model, vechime, setări, temperatură, stand-by, modul de utilizare și prețul exact pe kWh din contract."
  },
  {
    question: "Care aparate consumă cel mai mult curent?",
    answer:
      "De obicei, cei mai mari consumatori sunt aparatele care încălzesc sau răcesc: boiler electric, calorifer electric, aer condiționat folosit multe ore, uscător de rufe, plită electrică și cuptor electric. Frigiderul poate conta și el pentru că funcționează permanent."
  },
  {
    question: "Consumul în stand-by contează?",
    answer:
      "Da, mai ales la aparatele care rămân permanent în priză: televizoare, console, boxe, routere, încărcătoare sau electrocasnice cu afișaj. Consumul pe oră este mic, dar se poate aduna pe lună dacă ai multe dispozitive."
  },
  {
    question: "Cum pot reduce consumul lunar?",
    answer:
      "Începe cu aparatele mari și folosite des. Redu orele de utilizare, folosește programe eco, setează temperaturi moderate la boiler sau aer condiționat, evită stand-by-ul inutil și compară aparatele vechi cu modele mai eficiente."
  },
  {
    question: "Este calculatorul exact?",
    answer:
      "Calculatorul oferă o estimare, nu o măsurătoare certificată. Este util pentru comparații și scenarii rapide, dar pentru valori exacte ai nevoie de datele producătorului, de factura furnizorului sau de măsurare cu un wattmetru."
  }
];
