import type { calculateEnergyCost } from "@/lib/energy";

export type CalculatorState = {
  watts: string;
  hoursPerDay: string;
  daysPerMonth: string;
  pricePerKwh: string;
};

export type AdvancedState = {
  standbyWatts: string;
  seasonalMonths: string;
  dayPricePerKwh: string;
  nightPricePerKwh: string;
  dayUsagePercent: string;
  efficiencyPercent: string;
  quantity: string;
};

export type FieldError = Partial<Record<keyof CalculatorState | keyof AdvancedState, string>>;

export type ValidCalculatorInput = {
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  pricePerKwh: number;
};

export type ValidAdvancedInput = {
  standbyWatts: number;
  seasonalMonths: number;
  dayPricePerKwh: number;
  nightPricePerKwh: number;
  dayUsagePercent: number;
  efficiencyPercent: number;
  quantity: number;
};

export type ParsedCalculatorValues = Record<keyof CalculatorState, number | null>;
export type ParsedAdvancedValues = Record<keyof AdvancedState, number | null>;

export type CalculatorResult = ReturnType<typeof calculateEnergyCost>;

export type ComparisonDevice = {
  name: string;
  presetSlug: string;
  watts: string;
  hoursPerDay: string;
};

export type EnergyComparisonResult = {
  monthlyKwh: number;
  monthlyCost: number;
};
