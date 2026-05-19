export type AppliancePreset = {
  name: string;
  slug: string;
  watts: number;
  hoursPerDay: number;
  category: string;
  summary: string;
};

export type EnergyInput = {
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  pricePerKwh: number;
};

export type EnergyResult = {
  dailyKwh: number;
  monthlyKwh: number;
  yearlyKwh: number;
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
};
