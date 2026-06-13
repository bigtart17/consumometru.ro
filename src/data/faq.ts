export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Cum se calculează consumul electric?",
    answer:
      "Pornești de la puterea aparatului în wați și o transformi în kW: W / 1000. Apoi înmulțești cu orele de folosire și cu zilele din lună: un boiler de 2000 W folosit 2 ore pe zi, 30 de zile, ajunge la 120 kWh pe lună. Dacă prețul este 1,30 lei/kWh, costul pentru acel scenariu este 156 lei."
  },
  {
    question: "Ce înseamnă kWh?",
    answer:
      "kWh înseamnă kilowatt-oră, adică unitatea în care furnizorul îți trece consumul pe factură. Un aparat de 1000 W consumă 1 kWh dacă merge o oră. La fel, un TV de 100 W consumă 1 kWh în aproximativ 10 ore de funcționare."
  },
  {
    question: "1 kWh câți lei costă?",
    answer:
      "Prețul unui kWh îl vezi cel mai bine în contract sau pe factura de energie, pentru că acolo intră tariful tău și componentele facturate. Ca reper simplu, la 1,30 lei/kWh, un consum de 60 kWh costă 78 lei. Asta poate însemna, de exemplu, un aparat de aer condiționat folosit moderat într-o lună de vară."
  },
  {
    question: "De ce diferă factura reală de estimarea calculatorului?",
    answer:
      "Factura reală adună tot ce merge în casă: frigider, router, lumini, TV, mașină de spălat, PC gaming, boiler sau aer condiționat. Mai apar și diferențe din setări, vechimea aparatelor, stand-by și prețul exact din contract. De aceea, un calcul pe un singur aparat este bun pentru înțelegere, dar factura lunară arată totalul locuinței."
  },
  {
    question: "Care aparate consumă cel mai mult curent?",
    answer:
      "Cele mai costisitoare sunt, de regulă, aparatele care încălzesc sau răcesc: boiler electric, calorifer electric, uscător de rufe, cuptor electric, plită și aer condiționat folosit multe ore. Frigiderul are putere mai mică, dar contează pentru că stă permanent în priză. Un PC gaming poate urca și el factura dacă este folosit zilnic în jocuri solicitante."
  },
  {
    question: "Consumul în stand-by contează?",
    answer:
      "Da, mai ales când ai multe aparate lăsate mereu în priză. Un router trebuie să funcționeze continuu, dar un TV, o consolă, boxele sau încărcătoarele uitate în priză pot adăuga consum mic, dar constant. Pe o lună nu pare dramatic pentru un singur dispozitiv, însă într-o locuință cu multe electronice se adună."
  },
  {
    question: "Cum pot reduce consumul lunar?",
    answer:
      "Începe cu aparatele care merg mult sau au putere mare. La boiler, o temperatură setată mai cumpătat și dușuri mai scurte pot conta; la aer condiționat, 24-26°C este de obicei mai prietenos cu factura decât setările foarte joase. La becuri, trecerea la LED ajută, iar la uscătorul de rufe poți reduce costul prin centrifugare bună și folosire doar când chiar ai nevoie."
  },
  {
    question: "Este calculatorul exact?",
    answer:
      "Calculatorul îți arată un calcul realist pe baza puterii, orelor, zilelor și prețului kWh introdus. Pentru o măsurare precisă a unui aparat concret, cel mai bun reper este un wattmetru pus la priză sau consumul anual de pe eticheta energetică. Gândește-l ca pe un mod rapid de a vedea unde se duc banii: boilerul, aerul condiționat, frigiderul, PC-ul sau luminile."
  }
];
