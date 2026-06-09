import { calculateEnergyCost } from "@/lib/energy";
import type { AppliancePreset } from "@/types/energy";
import type {
  AdvancedState,
  CalculatorState,
  ComparisonDevice,
  EnergyComparisonResult,
  FieldError,
  ParsedAdvancedValues,
  ParsedCalculatorValues,
  ValidAdvancedInput,
  ValidCalculatorInput
} from "@/types/calculator";

export const defaultCalculatorState: CalculatorState = {
  watts: "1000",
  hoursPerDay: "2",
  daysPerMonth: "30",
  pricePerKwh: "1,30"
};

export const defaultAdvancedState: AdvancedState = {
  standbyWatts: "0",
  seasonalMonths: "12",
  dayPricePerKwh: "1,30",
  nightPricePerKwh: "0,90",
  dayUsagePercent: "70",
  efficiencyPercent: "100",
  quantity: "1"
};

export function parseInputValue(value: string) {
  const normalizedValue = value.trim().replace(",", ".");

  if (!normalizedValue) {
    return null;
  }

  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : null;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function formatSliderValue(value: number) {
  return String(Number(value.toFixed(2))).replace(".", ",");
}

export function validateAndCalculateEnergy({
  values,
  advancedValues,
  isAdvancedMode
}: {
  values: CalculatorState;
  advancedValues: AdvancedState;
  isAdvancedMode: boolean;
}) {
  const errors: FieldError = {};
  const parsedValues: ParsedCalculatorValues = {
    watts: parseInputValue(values.watts),
    hoursPerDay: parseInputValue(values.hoursPerDay),
    daysPerMonth: parseInputValue(values.daysPerMonth),
    pricePerKwh: parseInputValue(values.pricePerKwh)
  };
  const parsedAdvancedValues: ParsedAdvancedValues = {
    standbyWatts: parseInputValue(advancedValues.standbyWatts),
    seasonalMonths: parseInputValue(advancedValues.seasonalMonths),
    dayPricePerKwh: parseInputValue(advancedValues.dayPricePerKwh),
    nightPricePerKwh: parseInputValue(advancedValues.nightPricePerKwh),
    dayUsagePercent: parseInputValue(advancedValues.dayUsagePercent),
    efficiencyPercent: parseInputValue(advancedValues.efficiencyPercent),
    quantity: parseInputValue(advancedValues.quantity)
  };

  if (parsedValues.watts === null) {
    errors.watts = "Introdu puterea aparatului.";
  } else if (parsedValues.watts < 0) {
    errors.watts = "Puterea nu poate fi negativa.";
  }

  if (parsedValues.hoursPerDay === null) {
    errors.hoursPerDay = "Introdu cate ore il folosesti pe zi.";
  } else if (parsedValues.hoursPerDay < 0) {
    errors.hoursPerDay = "Orele nu pot fi negative.";
  } else if (parsedValues.hoursPerDay > 24) {
    errors.hoursPerDay = "O zi are maximum 24 de ore.";
  }

  if (parsedValues.daysPerMonth === null) {
    errors.daysPerMonth = "Introdu numarul de zile pe luna.";
  } else if (parsedValues.daysPerMonth < 0) {
    errors.daysPerMonth = "Zilele nu pot fi negative.";
  } else if (parsedValues.daysPerMonth > 31) {
    errors.daysPerMonth = "O luna are maximum 31 de zile.";
  }

  if (parsedValues.pricePerKwh === null) {
    errors.pricePerKwh = "Introdu pretul energiei.";
  } else if (parsedValues.pricePerKwh < 0) {
    errors.pricePerKwh = "Pretul nu poate fi negativ.";
  }

  if (isAdvancedMode) {
    validateAdvancedValues(parsedAdvancedValues, errors);
  }

  const hasErrors = Object.keys(errors).length > 0;
  const validInput =
    hasErrors ||
    parsedValues.watts === null ||
    parsedValues.hoursPerDay === null ||
    parsedValues.daysPerMonth === null ||
    parsedValues.pricePerKwh === null
      ? null
      : {
          watts: parsedValues.watts,
          hoursPerDay: parsedValues.hoursPerDay,
          daysPerMonth: parsedValues.daysPerMonth,
          pricePerKwh: parsedValues.pricePerKwh
        };

  return {
    errors,
    parsedValues,
    parsedAdvancedValues,
    result: validInput
      ? isAdvancedMode
        ? calculateAdvancedEnergyCost(validInput, {
            standbyWatts: parsedAdvancedValues.standbyWatts ?? 0,
            seasonalMonths: parsedAdvancedValues.seasonalMonths ?? 12,
            dayPricePerKwh: parsedAdvancedValues.dayPricePerKwh ?? validInput.pricePerKwh,
            nightPricePerKwh: parsedAdvancedValues.nightPricePerKwh ?? validInput.pricePerKwh,
            dayUsagePercent: parsedAdvancedValues.dayUsagePercent ?? 100,
            efficiencyPercent: parsedAdvancedValues.efficiencyPercent ?? 100,
            quantity: parsedAdvancedValues.quantity ?? 1
          })
        : calculateEnergyCost(validInput)
      : null
  };
}

function validateAdvancedValues(
  parsedAdvancedValues: ParsedAdvancedValues,
  errors: FieldError
) {
  if (parsedAdvancedValues.standbyWatts === null) {
    errors.standbyWatts = "Introdu consumul stand-by sau 0.";
  } else if (parsedAdvancedValues.standbyWatts < 0) {
    errors.standbyWatts = "Stand-by nu poate fi negativ.";
  }

  if (parsedAdvancedValues.seasonalMonths === null) {
    errors.seasonalMonths = "Introdu cate luni pe an folosesti aparatul.";
  } else if (
    parsedAdvancedValues.seasonalMonths < 0 ||
    parsedAdvancedValues.seasonalMonths > 12
  ) {
    errors.seasonalMonths = "Alege o valoare intre 0 si 12 luni.";
  }

  if (parsedAdvancedValues.dayPricePerKwh === null) {
    errors.dayPricePerKwh = "Introdu tariful de zi.";
  } else if (parsedAdvancedValues.dayPricePerKwh < 0) {
    errors.dayPricePerKwh = "Tariful de zi nu poate fi negativ.";
  }

  if (parsedAdvancedValues.nightPricePerKwh === null) {
    errors.nightPricePerKwh = "Introdu tariful de noapte.";
  } else if (parsedAdvancedValues.nightPricePerKwh < 0) {
    errors.nightPricePerKwh = "Tariful de noapte nu poate fi negativ.";
  }

  if (parsedAdvancedValues.dayUsagePercent === null) {
    errors.dayUsagePercent = "Introdu cat la suta folosesti ziua.";
  } else if (
    parsedAdvancedValues.dayUsagePercent < 0 ||
    parsedAdvancedValues.dayUsagePercent > 100
  ) {
    errors.dayUsagePercent = "Procentul trebuie sa fie intre 0 si 100.";
  }

  if (parsedAdvancedValues.efficiencyPercent === null) {
    errors.efficiencyPercent = "Introdu eficienta estimata.";
  } else if (
    parsedAdvancedValues.efficiencyPercent < 10 ||
    parsedAdvancedValues.efficiencyPercent > 200
  ) {
    errors.efficiencyPercent = "Foloseste o valoare intre 10% si 200%.";
  }

  if (parsedAdvancedValues.quantity === null) {
    errors.quantity = "Introdu numarul de aparate.";
  } else if (parsedAdvancedValues.quantity < 1) {
    errors.quantity = "Trebuie sa fie cel putin 1 aparat.";
  }
}

export function calculateAdvancedEnergyCost(
  input: ValidCalculatorInput,
  advanced: ValidAdvancedInput
) {
  const weightedPrice = getWeightedPrice(advanced);
  const efficiencyFactor = advanced.efficiencyPercent / 100;
  const quantity = advanced.quantity;
  const activeDailyKwh =
    ((input.watts * input.hoursPerDay) / 1000) * efficiencyFactor * quantity;
  const standbyHours = Math.max(24 - input.hoursPerDay, 0);
  const standbyDailyKwh = (advanced.standbyWatts * standbyHours * quantity) / 1000;
  const dailyKwh = activeDailyKwh + standbyDailyKwh;
  const monthlyKwh = dailyKwh * input.daysPerMonth;
  const yearlyKwh = monthlyKwh * advanced.seasonalMonths;

  return {
    dailyKwh,
    monthlyKwh,
    yearlyKwh,
    dailyCost: dailyKwh * weightedPrice,
    monthlyCost: monthlyKwh * weightedPrice,
    yearlyCost: yearlyKwh * weightedPrice
  };
}

export function getWeightedPrice({
  dayPricePerKwh,
  nightPricePerKwh,
  dayUsagePercent
}: Pick<
  ValidAdvancedInput,
  "dayPricePerKwh" | "nightPricePerKwh" | "dayUsagePercent"
>) {
  const dayShare = clamp(dayUsagePercent, 0, 100) / 100;
  return dayPricePerKwh * dayShare + nightPricePerKwh * (1 - dayShare);
}

export function calculateReducedHoursSaving({
  watts,
  hoursPerDay,
  pricePerKwh,
  reducedHours
}: {
  watts: number;
  hoursPerDay: number;
  pricePerKwh: number;
  reducedHours: number;
}) {
  const savedHoursPerDay = Math.min(reducedHours, hoursPerDay);
  return (watts / 1000) * savedHoursPerDay * 365 * pricePerKwh;
}

export function createComparisonDevice(preset: AppliancePreset): ComparisonDevice {
  return {
    name: preset.name,
    presetSlug: preset.slug,
    watts: String(preset.watts),
    hoursPerDay: String(preset.hoursPerDay).replace(".", ",")
  };
}

export function getComparisonResult(
  device: ComparisonDevice,
  daysPerMonth: number,
  pricePerKwh: number
): EnergyComparisonResult | null {
  const watts = parseInputValue(device.watts);
  const hoursPerDay = parseInputValue(device.hoursPerDay);

  if (
    watts === null ||
    hoursPerDay === null ||
    watts < 0 ||
    hoursPerDay < 0 ||
    daysPerMonth < 0 ||
    pricePerKwh < 0
  ) {
    return null;
  }

  const monthlyKwh = (watts / 1000) * hoursPerDay * daysPerMonth;

  return {
    monthlyKwh,
    monthlyCost: monthlyKwh * pricePerKwh
  };
}

export type ShareUrlInput = {
  values: CalculatorState;
  advancedValues: AdvancedState;
  selectedPresetSlug: string;
  isAdvancedMode: boolean;
};

export function createShareUrl({
  values,
  advancedValues,
  selectedPresetSlug,
  isAdvancedMode
}: ShareUrlInput) {
  const url = new URL(window.location.href);

  url.hash = "calculator";
  url.searchParams.set("w", values.watts);
  url.searchParams.set("ore", values.hoursPerDay);
  url.searchParams.set("zile", values.daysPerMonth);
  url.searchParams.set("pret", values.pricePerKwh);

  if (selectedPresetSlug) {
    url.searchParams.set("aparat", selectedPresetSlug);
  } else {
    url.searchParams.delete("aparat");
  }

  if (isAdvancedMode) {
    url.searchParams.set("mod", "avansat");
    url.searchParams.set("standby", advancedValues.standbyWatts);
    url.searchParams.set("luni", advancedValues.seasonalMonths);
    url.searchParams.set("tarifZi", advancedValues.dayPricePerKwh);
    url.searchParams.set("tarifNoapte", advancedValues.nightPricePerKwh);
    url.searchParams.set("utilizareZi", advancedValues.dayUsagePercent);
    url.searchParams.set("eficienta", advancedValues.efficiencyPercent);
    url.searchParams.set("numar", advancedValues.quantity);
  } else {
    [
      "mod",
      "standby",
      "luni",
      "tarifZi",
      "tarifNoapte",
      "utilizareZi",
      "eficienta",
      "numar"
    ].forEach((key) => url.searchParams.delete(key));
  }

  return url.toString();
}

export function getValuesFromUrl(searchParams: URLSearchParams) {
  const values: Partial<CalculatorState> = {};
  const advancedValues: Partial<AdvancedState> = {};
  const watts = searchParams.get("w");
  const hoursPerDay = searchParams.get("ore");
  const daysPerMonth = searchParams.get("zile");
  const pricePerKwh = searchParams.get("pret");
  const presetSlug = searchParams.get("aparat") ?? "";

  if (watts) values.watts = watts;
  if (hoursPerDay) values.hoursPerDay = hoursPerDay;
  if (daysPerMonth) values.daysPerMonth = daysPerMonth;
  if (pricePerKwh) values.pricePerKwh = pricePerKwh;

  const advancedMap: Array<[keyof AdvancedState, string]> = [
    ["standbyWatts", "standby"],
    ["seasonalMonths", "luni"],
    ["dayPricePerKwh", "tarifZi"],
    ["nightPricePerKwh", "tarifNoapte"],
    ["dayUsagePercent", "utilizareZi"],
    ["efficiencyPercent", "eficienta"],
    ["quantity", "numar"]
  ];

  advancedMap.forEach(([stateKey, paramKey]) => {
    const value = searchParams.get(paramKey);
    if (value) {
      advancedValues[stateKey] = value;
    }
  });

  return {
    values: Object.keys(values).length > 0 ? values : null,
    advancedValues: Object.keys(advancedValues).length > 0 ? advancedValues : null,
    presetSlug,
    isAdvancedMode: searchParams.get("mod") === "avansat"
  };
}

export async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
