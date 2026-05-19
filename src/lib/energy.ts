import type { EnergyInput, EnergyResult } from "@/types/energy";

export function calculateEnergyCost(input: EnergyInput): EnergyResult {
  const dailyKwh = (input.watts * input.hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * input.daysPerMonth;
  const yearlyKwh = dailyKwh * 365;

  return {
    dailyKwh,
    monthlyKwh,
    yearlyKwh,
    dailyCost: dailyKwh * input.pricePerKwh,
    monthlyCost: monthlyKwh * input.pricePerKwh,
    yearlyCost: yearlyKwh * input.pricePerKwh
  };
}

export function formatNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("ro-RO", {
    maximumFractionDigits,
    minimumFractionDigits:
      maximumFractionDigits === 0 ? 0 : value < 10 ? Math.min(2, maximumFractionDigits) : 0
  }).format(value);
}

export function formatCurrency(value: number) {
  return `${formatNumber(value)} lei`;
}
