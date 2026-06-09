import { Check, Copy, Link as LinkIcon, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ShareResultsPanelProps = {
  canShare: boolean;
  message: string;
  status: string | null;
  onCopyLink: () => void;
  onCopyText: () => void;
  onShare: () => void;
};

export function ShareResultsPanel({
  canShare,
  message,
  status,
  onCopyLink,
  onCopyText,
  onShare
}: ShareResultsPanelProps) {
  return (
    <section className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-emerald-800">
            Salveaza sau trimite rezultatul
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Copiaza un link cu valorile introduse sau trimite estimarea catre
            cineva.
          </p>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:min-w-[28rem] xl:max-w-[32rem]">
          <ActionButton
            icon={LinkIcon}
            label="Copiaza link"
            disabled={!canShare}
            onClick={onCopyLink}
          />
          <ActionButton
            icon={Copy}
            label="Copiaza rezultat"
            disabled={!canShare}
            onClick={onCopyText}
          />
          <ActionButton
            icon={Share2}
            label="Distribuie"
            disabled={!canShare}
            onClick={onShare}
          />
        </div>
      </div>

      {message ? (
        <p className="mt-3 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700">
          {message}
        </p>
      ) : null}

      <p
        className="mt-3 flex min-h-5 items-center gap-2 text-sm font-medium text-emerald-800"
        aria-live="polite"
      >
        {status ? (
          <>
            <Check size={16} aria-hidden="true" />
            {status}
          </>
        ) : (
          <span className="text-slate-500">
            Linkul share-uit pastreaza puterea, orele, zilele si pretul kWh.
          </span>
        )}
      </p>
    </section>
  );
}

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function ActionButton({
  icon: Icon,
  label,
  disabled = false,
  onClick
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size={17} aria-hidden="true" />
      {label}
    </button>
  );
}
