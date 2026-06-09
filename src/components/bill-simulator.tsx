"use client";

import { useMemo, useState } from "react";
import { Plus, ReceiptText, Trash2 } from "lucide-react";
import { appliancePresets } from "@/data/appliancePresets";
import { formatCurrency, formatNumber } from "@/lib/energy";

type BillItem = {
  id: string;
  presetSlug: string;
  name: string;
  watts: string;
  hoursPerDay: string;
  daysPerMonth: string;
  quantity: string;
};

type BillItemErrors = Partial<Record<"watts" | "hoursPerDay" | "daysPerMonth" | "quantity", string>>;

type BillItemValidation = {
  errors: BillItemErrors;
  isValid: boolean;
  values: {
    watts: number;
    hoursPerDay: number;
    daysPerMonth: number;
    quantity: number;
  };
};

const MAX_REALISTIC_WATTS = 10000;
const MAX_REALISTIC_QUANTITY = 50;
const MAX_REALISTIC_PRICE = 10;

const initialItems: BillItem[] = [
  createBillItem("frigider", "initial-frigider"),
  createBillItem("boiler-electric", "initial-boiler-electric"),
  createBillItem("laptop", "initial-laptop")
];

export function BillSimulator() {
  const [items, setItems] = useState(initialItems);
  const [pricePerKwh, setPricePerKwh] = useState("1,30");

  const priceError = validatePrice(pricePerKwh);
  const parsedPrice = parseInputValue(pricePerKwh);
  const validPrice = !priceError && parsedPrice !== null ? parsedPrice : 0;
  const itemValidations = useMemo(
    () =>
      items.reduce<Record<string, BillItemValidation>>((accumulator, item) => {
        accumulator[item.id] = validateBillItem(item);
        return accumulator;
      }, {}),
    [items]
  );

  const results = useMemo(() => {
    const rows = items.map((item) => {
      const validation = itemValidations[item.id];
      const monthlyKwh = validation?.isValid
        ? (validation.values.watts / 1000) *
          validation.values.hoursPerDay *
          validation.values.daysPerMonth *
          validation.values.quantity
        : 0;

      return {
        ...item,
        monthlyKwh,
        monthlyCost: monthlyKwh * validPrice,
        percentOfTotal: 0
      };
    });
    const totalKwh = rows.reduce((sum, item) => sum + item.monthlyKwh, 0);

    return rows.map((item) => ({
      ...item,
      percentOfTotal: totalKwh > 0 ? (item.monthlyKwh / totalKwh) * 100 : 0
    }));
  }, [itemValidations, items, validPrice]);

  const totalKwh = results.reduce((sum, item) => sum + item.monthlyKwh, 0);
  const totalCost = results.reduce((sum, item) => sum + item.monthlyCost, 0);
  const topConsumers = [...results]
    .sort((first, second) => second.monthlyKwh - first.monthlyKwh)
    .slice(0, 3);

  function addItem() {
    setItems((current) => [
      ...current,
      createBillItem("aer-conditionat", `item-${Date.now()}`)
    ]);
  }

  function removeItem(id: string) {
    setItems((current) =>
      current.length > 1 ? current.filter((item) => item.id !== id) : current
    );
  }

  function updateItem(id: string, key: keyof BillItem, value: string) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (key === "presetSlug") {
          const preset = appliancePresets.find((entry) => entry.slug === value);
          return preset
            ? {
                ...item,
                presetSlug: preset.slug,
                name: preset.name,
                watts: String(preset.watts),
                hoursPerDay: String(preset.hoursPerDay).replace(".", ",")
              }
            : {
                ...item,
                presetSlug: value
              };
        }

        return {
          ...item,
          presetSlug: key === "name" || key === "watts" || key === "hoursPerDay" ? "" : item.presetSlug,
          [key]: value
        };
      })
    );
  }

  return (
    <section id="simulator-factura" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] xl:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              <ReceiptText size={16} aria-hidden="true" />
              Simulator factura lunara
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Calculeaza consumul total al locuintei
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Adauga aparatele pe care le folosesti, ajusteaza orele si vezi
              instant consumul lunar, costul estimat si cine consuma cel mai mult.
            </p>
          </div>

          <div className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <label className="grid gap-2" htmlFor="bill-simulator-price">
              <span className="text-sm font-medium text-slate-700">
                Pret energie folosit in simulare
              </span>
              <div className="flex items-center gap-2">
                <input
                  id="bill-simulator-price"
                  className="h-12 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-lg font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:bg-red-50"
                  inputMode="decimal"
                  value={pricePerKwh}
                  aria-invalid={Boolean(priceError)}
                  aria-describedby={priceError ? "bill-simulator-price-error" : undefined}
                  onChange={(event) => setPricePerKwh(event.target.value)}
                />
                <span className="text-sm font-medium text-slate-500">lei/kWh</span>
              </div>
              {priceError ? (
                <p
                  id="bill-simulator-price-error"
                  className="text-sm font-medium text-red-700"
                  role="alert"
                >
                  {priceError}
                </p>
              ) : null}
            </label>
          </div>
        </div>

        <div className="mt-6 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.55fr)]">
          <div className="min-w-0 rounded-lg border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
            <div className="grid gap-3">
              {items.map((item, index) => (
                <BillSimulatorRow
                  key={item.id}
                  item={item}
                  index={index}
                  errors={itemValidations[item.id]?.errors ?? {}}
                  canRemove={items.length > 1}
                  onChange={(key, value) => updateItem(item.id, key, value)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            <button
              type="button"
              className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
              onClick={addItem}
            >
              <Plus size={17} aria-hidden="true" />
              Adauga aparat
            </button>
          </div>

          <aside className="grid min-w-0 gap-4">
            <div className="rounded-lg bg-emerald-950 p-5 text-white shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
                Total estimat
              </p>
              <p className="mt-4 text-sm text-emerald-50">Consum lunar</p>
              <p className="text-3xl font-semibold">{formatNumber(totalKwh)} kWh</p>
              <p className="mt-4 text-sm text-emerald-50">Cost lunar</p>
              <p className="text-3xl font-semibold">{formatCurrency(totalCost)}</p>
            </div>

            <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">
                Top 3 consumatori
              </h3>
              <div className="mt-4 grid gap-3">
                {topConsumers.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <span className="font-semibold text-slate-950">
                        {formatNumber(item.percentOfTotal, 0)}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-600"
                        style={{ width: `${item.percentOfTotal}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatNumber(item.monthlyKwh)} kWh/luna
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

type BillSimulatorRowProps = {
  item: BillItem;
  index: number;
  errors: BillItemErrors;
  canRemove: boolean;
  onChange: (key: keyof BillItem, value: string) => void;
  onRemove: () => void;
};

function BillSimulatorRow({
  item,
  index,
  errors,
  canRemove,
  onChange,
  onRemove
}: BillSimulatorRowProps) {
  const rowHasErrors = Object.keys(errors).length > 0;
  const rowErrorId = `${item.id}-row-errors`;

  return (
    <article
      className="rounded-lg border border-slate-200 bg-slate-50 p-3"
      aria-describedby={rowHasErrors ? rowErrorId : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-950">Aparat {index + 1}</p>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canRemove}
          aria-label={`Sterge ${item.name}`}
          onClick={onRemove}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(13rem,1.6fr)_repeat(4,minmax(0,1fr))]">
        <label className="grid min-w-0 gap-2 md:col-span-2 xl:col-span-1" htmlFor={`${item.id}-preset`}>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Aparat
          </span>
          <select
            id={`${item.id}-preset`}
            className="h-12 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-base text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
            value={item.presetSlug}
            onChange={(event) => onChange("presetSlug", event.target.value)}
          >
            <option value="">Manual</option>
            {appliancePresets.map((preset) => (
              <option key={preset.slug} value={preset.slug}>
                {preset.name}
              </option>
            ))}
          </select>
        </label>

        <CompactInput
          label="Putere"
          suffix="W"
          value={item.watts}
          error={errors.watts}
          id={`${item.id}-watts`}
          onChange={(value) => onChange("watts", value)}
        />
        <CompactInput
          label="Ore/zi"
          suffix="h"
          value={item.hoursPerDay}
          error={errors.hoursPerDay}
          id={`${item.id}-hours`}
          onChange={(value) => onChange("hoursPerDay", value)}
        />
        <CompactInput
          label="Zile/luna"
          suffix="zile"
          value={item.daysPerMonth}
          error={errors.daysPerMonth}
          id={`${item.id}-days`}
          onChange={(value) => onChange("daysPerMonth", value)}
        />
        <CompactInput
          label="Numar"
          suffix="buc."
          value={item.quantity}
          error={errors.quantity}
          id={`${item.id}-quantity`}
          onChange={(value) => onChange("quantity", value)}
        />
      </div>
      {rowHasErrors ? (
        <div
          id={rowErrorId}
          className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
          role="alert"
          aria-live="polite"
        >
          Verifica valorile marcate pentru Aparat {index + 1}. Rezultatul acestui aparat nu este inclus pana cand datele sunt valide.
        </div>
      ) : null}
    </article>
  );
}

type CompactInputProps = {
  label: string;
  suffix: string;
  value: string;
  error?: string;
  id: string;
  onChange: (value: string) => void;
};

function CompactInput({ label, suffix, value, error, id, onChange }: CompactInputProps) {
  const errorId = `${id}-error`;

  return (
    <label className="grid min-w-0 gap-2" htmlFor={id}>
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <div className="flex min-w-0 items-center gap-2">
        <input
          id={id}
          className="h-12 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-base font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:bg-red-50"
          inputMode="decimal"
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="shrink-0 text-xs font-medium text-slate-500">{suffix}</span>
      </div>
      {error ? (
        <p id={errorId} className="text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

function createBillItem(slug: string, id: string): BillItem {
  const preset = appliancePresets.find((item) => item.slug === slug) ?? appliancePresets[0];

  return {
    id,
    presetSlug: preset.slug,
    name: preset.name,
    watts: String(preset.watts),
    hoursPerDay: String(preset.hoursPerDay).replace(".", ","),
    daysPerMonth: "30",
    quantity: "1"
  };
}

function parseInputValue(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function validatePrice(value: string) {
  const parsed = parseInputValue(value);

  if (value.trim() === "" || parsed === null) {
    return "Introdu un pret kWh valid.";
  }

  if (parsed <= 0) {
    return "Pretul kWh trebuie sa fie mai mare decat 0.";
  }

  if (parsed > MAX_REALISTIC_PRICE) {
    return "Pretul kWh pare nerealist de mare. Verifica valoarea din factura.";
  }

  return "";
}

function validateBillItem(item: BillItem): BillItemValidation {
  const watts = parseInputValue(item.watts);
  const hoursPerDay = parseInputValue(item.hoursPerDay);
  const daysPerMonth = parseInputValue(item.daysPerMonth);
  const quantity = parseInputValue(item.quantity);
  const errors: BillItemErrors = {};

  if (item.watts.trim() === "" || watts === null) {
    errors.watts = "Introdu puterea aparatului in W.";
  } else if (watts <= 0) {
    errors.watts = "Puterea aparatului trebuie sa fie mai mare decat 0 W.";
  } else if (watts > MAX_REALISTIC_WATTS) {
    errors.watts = "Puterea pare nerealist de mare pentru un aparat casnic.";
  }

  if (item.hoursPerDay.trim() === "" || hoursPerDay === null) {
    errors.hoursPerDay = "Introdu cate ore folosesti aparatul pe zi.";
  } else if (hoursPerDay < 0) {
    errors.hoursPerDay = "Orele de utilizare nu pot fi negative.";
  } else if (hoursPerDay > 24) {
    errors.hoursPerDay = "Orele de utilizare nu pot depasi 24 pe zi.";
  }

  if (item.daysPerMonth.trim() === "" || daysPerMonth === null) {
    errors.daysPerMonth = "Introdu cate zile pe luna folosesti aparatul.";
  } else if (daysPerMonth < 0) {
    errors.daysPerMonth = "Zilele de utilizare nu pot fi negative.";
  } else if (daysPerMonth > 31) {
    errors.daysPerMonth = "Zilele de utilizare nu pot depasi 31 pe luna.";
  }

  if (item.quantity.trim() === "" || quantity === null) {
    errors.quantity = "Introdu numarul de aparate.";
  } else if (quantity <= 0) {
    errors.quantity = "Numarul de aparate trebuie sa fie mai mare decat 0.";
  } else if (quantity > MAX_REALISTIC_QUANTITY) {
    errors.quantity = "Numarul de aparate pare nerealist de mare pentru o locuinta.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: {
      watts: watts ?? 0,
      hoursPerDay: hoursPerDay ?? 0,
      daysPerMonth: daysPerMonth ?? 0,
      quantity: quantity ?? 0
    }
  };
}
