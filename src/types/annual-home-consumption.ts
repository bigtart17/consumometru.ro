export type MonthKey =
  | "ianuarie"
  | "februarie"
  | "martie"
  | "aprilie"
  | "mai"
  | "iunie"
  | "iulie"
  | "august"
  | "septembrie"
  | "octombrie"
  | "noiembrie"
  | "decembrie";

export type DwellingType =
  | "garsoniera"
  | "apartament-2-camere"
  | "apartament-3-camere"
  | "apartament-4-camere"
  | "casa-sub-100-mp"
  | "casa-100-150-mp"
  | "casa-peste-150-mp";

export type ConsumptionHabitProfile = "economic" | "normal" | "intens";

export type AnnualApplianceCategory =
  | "climatizare"
  | "incalzire"
  | "apa-calda"
  | "frig"
  | "spalare"
  | "bucatarie"
  | "electronice"
  | "iluminat"
  | "standby";

export type MonthlyMultiplierMap = Record<MonthKey, number>;

export type AnnualAppliancePreset = {
  slug: string;
  name: string;
  category: AnnualApplianceCategory;
  watts: number;
  hoursPerDay: number;
  quantity: number;
  peopleSensitivity: number;
  dwellingSensitivity: number;
  habitSensitivity: number;
  monthlyMultipliers?: Partial<MonthlyMultiplierMap>;
  defaultEnabled: boolean;
  note: string;
};

export type AnnualCalculatorInput = {
  dwellingType: DwellingType;
  peopleCount: number;
  habitProfile: ConsumptionHabitProfile;
  pricePerKwh: number;
  appliances: AnnualAppliancePreset[];
};

export type AnnualMonthlyApplianceResult = {
  slug: string;
  name: string;
  category: AnnualApplianceCategory;
  kwh: number;
  cost: number;
};

export type AnnualMonthlyBreakdown = {
  month: MonthKey;
  label: string;
  days: number;
  totalKwh: number;
  totalCost: number;
  appliances: AnnualMonthlyApplianceResult[];
};

export type AnnualTopConsumer = {
  slug: string;
  name: string;
  category: AnnualApplianceCategory;
  annualKwh: number;
  annualCost: number;
  percentOfTotal: number;
};

export type AnnualCalculatorResult = {
  monthlyBreakdown: AnnualMonthlyBreakdown[];
  summary: {
    annualKwh: number;
    annualCost: number;
    averageMonthlyKwh: number;
    averageMonthlyCost: number;
    highestMonth: AnnualMonthlyBreakdown;
    lowestMonth: AnnualMonthlyBreakdown;
    topConsumers: AnnualTopConsumer[];
  };
};
