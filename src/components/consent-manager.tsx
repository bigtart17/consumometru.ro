"use client";

import { useEffect, useMemo, useState } from "react";

type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = "consum-electric-consent-v1";

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ConsentManager() {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [draft, setDraft] = useState<ConsentPreferences>(defaultPreferences);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const hasChoice = preferences !== null;
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (!saved) {
      setIsOpen(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as ConsentPreferences;
      const normalized = {
        necessary: true as const,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing)
      };
      setPreferences(normalized);
      setDraft(normalized);
      applyConsent(normalized);
    } catch {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!preferences?.analytics || !googleAnalyticsId) {
      return;
    }

    loadScript(
      "google-analytics",
      `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
    );
    window.gtag?.("js", new Date());
    window.gtag?.("config", googleAnalyticsId, {
      anonymize_ip: true
    });
  }, [googleAnalyticsId, preferences?.analytics]);

  useEffect(() => {
    if (!preferences?.marketing || !adsenseClient) {
      return;
    }

    loadScript(
      "adsense-auto-ads",
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`,
      true
    );
  }, [adsenseClient, preferences?.marketing]);

  const categories = useMemo(
    () => [
      {
        key: "necessary" as const,
        title: "Necesare",
        description:
          "Ajuta site-ul sa functioneze corect si sa pastreze alegerea ta privind cookies.",
        locked: true
      },
      {
        key: "analytics" as const,
        title: "Analytics",
        description:
          "Ne ajuta sa intelegem paginile folosite si sa imbunatatim calculatorul.",
        locked: false
      },
      {
        key: "marketing" as const,
        title: "Marketing",
        description:
          "Permite afisarea reclamelor prin servicii precum Google AdSense, conform acordului tau.",
        locked: false
      }
    ],
    []
  );

  function saveConsent(nextPreferences: ConsentPreferences) {
    window.localStorage.setItem(storageKey, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
    setDraft(nextPreferences);
    applyConsent(nextPreferences);
    setIsOpen(false);
    setShowDetails(false);
  }

  function acceptAll() {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true
    });
  }

  function rejectOptional() {
    saveConsent(defaultPreferences);
  }

  function saveDraft() {
    saveConsent({
      necessary: true,
      analytics: draft.analytics,
      marketing: draft.marketing
    });
  }

  return (
    <>
      {hasChoice ? (
        <button
          type="button"
          className="fixed bottom-4 left-4 z-40 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:text-emerald-700"
          onClick={() => {
            setShowDetails(true);
            setIsOpen(true);
          }}
        >
          Setari cookies
        </button>
      ) : null}

      {isOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-50 max-h-[calc(100vh-1rem)] overflow-y-auto border-t border-emerald-100 bg-white p-4 shadow-soft sm:p-5">
          <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Confidentialitate
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
                Alege cum folosim cookies
              </h2>
              <p className="mt-2 text-sm leading-5 text-slate-600 sm:leading-6">
                Folosim cookies necesare pentru functionarea site-ului. Cu acordul
                tau, putem folosi analytics si reclame. Poti schimba optiunile
                oricand din butonul Setari cookies.
              </p>
              {!showDetails ? (
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  {categories.map((category) => (
                    <span
                      key={category.key}
                      className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              {showDetails ? (
                <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {categories.map((category) => (
                    <label
                      key={category.key}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <input
                        className="mt-1 h-4 w-4 accent-emerald-700"
                        type="checkbox"
                        checked={draft[category.key]}
                        disabled={category.locked}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            [category.key]: event.target.checked
                          }))
                        }
                      />
                      <span>
                        <span className="block text-sm font-semibold text-slate-950">
                          {category.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                          {category.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              ) : null}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 sm:h-11"
                  onClick={() => setShowDetails((current) => !current)}
                >
                  {showDetails ? "Ascunde detalii" : "Personalizeaza"}
                </button>
                <button
                  type="button"
                  className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 sm:h-11"
                  onClick={rejectOptional}
                >
                  Respinge optionale
                </button>
                {showDetails ? (
                  <button
                    type="button"
                    className="h-12 rounded-lg border border-emerald-200 px-4 text-sm font-semibold text-emerald-800 sm:h-11"
                    onClick={saveDraft}
                  >
                    Salveaza preferintele
                  </button>
                ) : null}
                <button
                  type="button"
                  className="h-12 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white sm:h-11"
                  onClick={acceptAll}
                >
                  Accepta toate
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function applyConsent(preferences: ConsentPreferences) {
  window.gtag?.("consent", "update", {
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
    analytics_storage: preferences.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted"
  });
}

function loadScript(id: string, src: string, crossOrigin = false) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;

  if (crossOrigin) {
    script.crossOrigin = "anonymous";
  }

  document.head.appendChild(script);
}
