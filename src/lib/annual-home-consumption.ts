import { annualHomeConsumptionPresets } from "@/data/annualHomeConsumptionPresets";
import type {
  AnnualAppliancePreset,
  AnnualCalculatorInput,
  AnnualCalculatorResult,
  AnnualMonthlyApplianceResult,
  AnnualMonthlyBreakdown,
  AnnualTopConsumer,
  ConsumptionHabitProfile,
  DwellingType,
  MonthKey
} from "@/types/annual-home-consumption";

export const MONTHS: { key: MonthKey; label: string; days: number }[] = [
  { key: "ianuarie", label: "Ianuarie", days: 31 },
  { key: "februarie", label: "Februarie", days: 28 },
  { key: "martie", label: "Martie", days: 31 },
  { key: "aprilie", label: "Aprilie", days: 30 },
  { key: "mai", label: "Mai", days: 31 },
  { key: "iunie", label: "Iunie", days: 30 },
  { key: "iulie", label: "Iulie", days: 31 },
  { key: "august", label: "August", days: 31 },
  { key: "septembrie", label: "Septembrie", days: 30 },
  { key: "octombrie", label: "Octombrie", days: 31 },
  { key: "noiembrie", label: "Noiembrie", days: 30 },
  { key: "decembrie", label: "Decembrie", days: 31 }
];

export const DWELLING_TYPE_LABELS: Record<DwellingType, string> = {
  garsoniera: "Garsoniera",
  "apartament-2-camere": "Apartament cu 2 camere",
  "apartament-3-camere": "Apartament cu 3 camere",
  "apartament-4-camere": "Apartament cu 4 camere",
  "casa-sub-100-mp": "Casa sub 100 mp",
  "casa-100-150-mp": "Casa 100-150 mp",
  "casa-peste-150-mp": "Casa peste 150 mp"
};

export const HABIT_PROFILE_LABELS: Record<ConsumptionHabitProfile, string> = {
  economic: "Consum atent",
  normal: "Consum obisnuit",
  intens: "Consum ridicat"
};

const DEFAULT_PRICE_PER_KWH = 1.3;
const DEFAULT_PEOPLE_COUNT = 2;
const MAX_PEOPLE_COUNT = 10;
const MAX_PRICE_PER_KWH = 20;
const MAX_WATTS = 12000;
const MAX_HOURS_PER_DAY = 24;
const MAX_QUANTITY = 20;

const dwellingBaseFactors: Record<DwellingType, number> = {
  garsoniera: 0.78,
  "apartament-2-camere": 0.9,
  "apartament-3-camere": 1,
  "apartament-4-camere": 1.12,
  "casa-sub-100-mp": 1.18,
  "casa-100-150-mp": 1.32,
  "casa-peste-150-mp": 1.5
};

const habitBaseFactors: Record<ConsumptionHabitProfile, number> = {
  economic: 0.86,
  normal: 1,
  intens: 1.18
};

export function calculateAnnualHomeConsumption(
  input: AnnualCalculatorInput
): AnnualCalculatorResult {
  const normalizedInput = normalizeInput(input);
  const applianceAnnualTotals = new Map<string, AnnualTopConsumer>();

  const monthlyBreakdown = MONTHS.map((month) => {
    const appliances: AnnualMonthlyApplianceResult[] = normalizedInput.appliances.map(
      (appliance) => {
        const baseMonthlyKwh =
          (appliance.watts / 1000) * appliance.hoursPerDay * month.days * appliance.quantity;
        const monthlyKwh = roundToTwo(
          baseMonthlyKwh *
            getPeopleMultiplier(normalizedInput.peopleCount, appliance.peopleSensitivity) *
            getDwellingMultiplier(normalizedInput.dwellingType, appliance.dwellingSensitivity) *
            getHabitMultiplier(normalizedInput.habitProfile, appliance.habitSensitivity) *
            getMonthlyMultiplier(appliance, month.key)
        );
        const monthlyCost = roundToTwo(monthlyKwh * normalizedInput.pricePerKwh);

        addAnnualApplianceTotal(applianceAnnualTotals, appliance, monthlyKwh, monthlyCost);

        return {
          slug: appliance.slug,
          name: appliance.name,
          category: appliance.category,
          kwh: monthlyKwh,
          cost: monthlyCost
        };
      }
    );

    const totalKwh = roundToTwo(appliances.reduce((total, appliance) => total + appliance.kwh, 0));
    const totalCost = roundToTwo(
      appliances.reduce((total, appliance) => total + appliance.cost, 0)
    );

    return {
      month: month.key,
      label: month.label,
      days: month.days,
      totalKwh,
      totalCost,
      appliances
    };
  });

  const annualKwh = roundToTwo(
    monthlyBreakdown.reduce((total, month) => total + month.totalKwh, 0)
  );
  const annualCost = roundToTwo(
    monthlyBreakdown.reduce((total, month) => total + month.totalCost, 0)
  );
  const topConsumers = Array.from(applianceAnnualTotals.values())
    .map((consumer) => ({
      ...consumer,
      annualKwh: roundToTwo(consumer.annualKwh),
      annualCost: roundToTwo(consumer.annualCost),
      percentOfTotal: annualKwh > 0 ? roundToTwo((consumer.annualKwh / annualKwh) * 100) : 0
    }))
    .sort((first, second) => second.annualKwh - first.annualKwh);

  return {
    monthlyBreakdown,
    summary: {
      annualKwh,
      annualCost,
      averageMonthlyKwh: roundToTwo(annualKwh / 12),
      averageMonthlyCost: roundToTwo(annualCost / 12),
      highestMonth: getHighestMonth(monthlyBreakdown),
      lowestMonth: getLowestMonth(monthlyBreakdown),
      topConsumers
    }
  };
}

export function getDefaultAnnualConsumptionInput(): AnnualCalculatorInput {
  return {
    dwellingType: "apartament-3-camere",
    peopleCount: DEFAULT_PEOPLE_COUNT,
    habitProfile: "normal",
    pricePerKwh: DEFAULT_PRICE_PER_KWH,
    appliances: cloneAppliances(annualHomeConsumptionPresets.filter((preset) => preset.defaultEnabled))
  };
}

export function getAnnualApplianceBySlug(slug: string) {
  const appliance = annualHomeConsumptionPresets.find((preset) => preset.slug === slug);
  return appliance ? cloneAppliance(appliance) : null;
}

function normalizeInput(input: AnnualCalculatorInput): AnnualCalculatorInput {
  const appliances =
    input.appliances.length > 0
      ? input.appliances
      : annualHomeConsumptionPresets.filter((preset) => preset.defaultEnabled);

  return {
    dwellingType: isKnownDwellingType(input.dwellingType)
      ? input.dwellingType
      : "apartament-3-camere",
    peopleCount: normalizeNumber(input.peopleCount, DEFAULT_PEOPLE_COUNT, 1, MAX_PEOPLE_COUNT),
    habitProfile: isKnownHabitProfile(input.habitProfile) ? input.habitProfile : "normal",
    pricePerKwh: normalizeNumber(input.pricePerKwh, DEFAULT_PRICE_PER_KWH, 0.01, MAX_PRICE_PER_KWH),
    appliances: cloneAppliances(appliances).map(normalizeAppliance)
  };
}

function normalizeAppliance(appliance: AnnualAppliancePreset): AnnualAppliancePreset {
  return {
    ...appliance,
    watts: normalizeNumber(appliance.watts, 0, 0, MAX_WATTS),
    hoursPerDay: normalizeNumber(appliance.hoursPerDay, 0, 0, MAX_HOURS_PER_DAY),
    quantity: normalizeNumber(appliance.quantity, 1, 1, MAX_QUANTITY),
    peopleSensitivity: normalizeNumber(appliance.peopleSensitivity, 0, 0, 1),
    dwellingSensitivity: normalizeNumber(appliance.dwellingSensitivity, 0, 0, 1),
    habitSensitivity: normalizeNumber(appliance.habitSensitivity, 0, 0, 1)
  };
}

function normalizeNumber(value: number, fallback: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, min), max);
}

function getPeopleMultiplier(peopleCount: number, sensitivity: number) {
  const extraPeople = peopleCount - DEFAULT_PEOPLE_COUNT;
  return Math.max(0, 1 + extraPeople * sensitivity);
}

function getDwellingMultiplier(dwellingType: DwellingType, sensitivity: number) {
  const dwellingFactor = dwellingBaseFactors[dwellingType] ?? 1;
  return Math.max(0, 1 + (dwellingFactor - 1) * sensitivity);
}

function getHabitMultiplier(profile: ConsumptionHabitProfile, sensitivity: number) {
  const habitFactor = habitBaseFactors[profile] ?? 1;
  return Math.max(0, 1 + (habitFactor - 1) * sensitivity);
}

function getMonthlyMultiplier(appliance: AnnualAppliancePreset, month: MonthKey) {
  const multiplier = appliance.monthlyMultipliers?.[month] ?? 1;
  return Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 1;
}

function addAnnualApplianceTotal(
  totals: Map<string, AnnualTopConsumer>,
  appliance: AnnualAppliancePreset,
  kwh: number,
  cost: number
) {
  const existing = totals.get(appliance.slug);

  if (existing) {
    existing.annualKwh += kwh;
    existing.annualCost += cost;
    return;
  }

  totals.set(appliance.slug, {
    slug: appliance.slug,
    name: appliance.name,
    category: appliance.category,
    annualKwh: kwh,
    annualCost: cost,
    percentOfTotal: 0
  });
}

function getHighestMonth(months: AnnualMonthlyBreakdown[]) {
  return months.reduce((highest, month) =>
    month.totalKwh > highest.totalKwh ? month : highest
  );
}

function getLowestMonth(months: AnnualMonthlyBreakdown[]) {
  return months.reduce((lowest, month) => (month.totalKwh < lowest.totalKwh ? month : lowest));
}

function isKnownDwellingType(value: string): value is DwellingType {
  return value in DWELLING_TYPE_LABELS;
}

function isKnownHabitProfile(value: string): value is ConsumptionHabitProfile {
  return value in HABIT_PROFILE_LABELS;
}

function cloneAppliances(appliances: AnnualAppliancePreset[]) {
  return appliances.map(cloneAppliance);
}

function cloneAppliance(appliance: AnnualAppliancePreset): AnnualAppliancePreset {
  return {
    ...appliance,
    monthlyMultipliers: appliance.monthlyMultipliers
      ? { ...appliance.monthlyMultipliers }
      : undefined
  };
}

function roundToTwo(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
