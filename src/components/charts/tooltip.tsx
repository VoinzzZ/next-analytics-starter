"use client";

type ValueType = number | string;
type NameType = string;
type TooltipEntry = {
  value?: ValueType;
  dataKey?: string | number;
  name?: NameType;
  color?: string;
};
type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
};

const monthLabels = new Set([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]);

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatValue = (label: string | number | undefined, entry: TooltipEntry) => {
  const value = entry.value as number | string;
  if (typeof value === "string") {
    return value;
  }

  const dataKey = String(entry.dataKey ?? "").toLowerCase();
  const name = String(entry.name ?? "").toLowerCase();
  const labelText = typeof label === "string" ? label : "";

  const isMonth = monthLabels.has(labelText);
  const isRate = dataKey.includes("rate") || name.includes("rate");

  if (isRate) {
    return `${value}%`;
  }

  if (!isMonth && value <= 100) {
    return `${value}%`;
  }

  if (isMonth && dataKey === "value") {
    return `$${compactNumber.format(value)}`;
  }

  return compactNumber.format(value);
};

export function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 text-xs text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-black/90 dark:text-zinc-200">
      {label ? (
        <p className="mb-1 text-xs uppercase tracking-widest text-zinc-500">
          {label}
        </p>
      ) : null}
      <div className="space-y-1">
        {payload.map((entry: TooltipEntry, idx: number) => (
          <div
            key={`${String(entry.dataKey)}-${entry.color ?? idx}`}
            className="flex items-center gap-2"
          >
            <span
              className="size-2 rounded-full"
              style={{ background: entry.color ?? "#0a0a0a" }}
            />
            <span className="text-zinc-500 dark:text-zinc-400">
              {entry.name}
            </span>
            <span className="ml-auto font-semibold text-zinc-900 dark:text-zinc-50">
              {formatValue(label, entry)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
