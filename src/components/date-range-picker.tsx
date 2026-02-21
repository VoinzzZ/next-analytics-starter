"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type DateRange = {
  start: string | null;
  end: string | null;
};

type Preset = {
  label: string;
  days: number;
};

type DateRangePickerProps = {
  label: string;
  value: DateRange;
  onChange: (value: DateRange) => void;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const presets: Preset[] = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

const formatISO = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseISO = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDisplay = (value: DateRange) => {
  if (!value.start || !value.end) return "Pick a date range";
  const start = parseISO(value.start);
  const end = parseISO(value.end);
  return `${monthNames[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} — ${
    monthNames[end.getMonth()]
  } ${end.getDate()}, ${end.getFullYear()}`;
};

const getMonthDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startOffset = firstDay.getDay();

  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i += 1) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }
  return days;
};

export function DateRangePicker({ label, value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  const days = useMemo(
    () => getMonthDays(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((year) => year - 1);
    } else {
      setViewMonth((month) => month - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((year) => year + 1);
    } else {
      setViewMonth((month) => month + 1);
    }
  };

  const handleSelect = (iso: string) => {
    if (!value.start || (value.start && value.end)) {
      onChange({ start: iso, end: null });
      return;
    }
    const start = parseISO(value.start);
    const selected = parseISO(iso);
    if (selected < start) {
      onChange({ start: iso, end: value.start });
      return;
    }
    onChange({ start: value.start, end: iso });
  };

  const isInRange = (iso: string) => {
    if (!value.start || !value.end) return false;
    const date = parseISO(iso);
    return date >= parseISO(value.start) && date <= parseISO(value.end);
  };

  const isStart = (iso: string) => value.start === iso;
  const isEnd = (iso: string) => value.end === iso;

  const applyPreset = (preset: Preset) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (preset.days - 1));
    onChange({ start: formatISO(start), end: formatISO(end) });
    setOpen(false);
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium">{label}</label>
      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full justify-between font-normal"
        onClick={() => setOpen(true)}
      >
        <span className={value.start && value.end ? "" : "text-zinc-500"}>
          {formatDisplay(value)}
        </span>
        <Calendar className="size-4 text-zinc-500" />
      </Button>

      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-black">
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={goPrevMonth}>
                <ChevronLeft className="size-4" />
              </Button>
              <div className="text-sm font-semibold">
                {monthNames[viewMonth]} {viewYear}
              </div>
              <Button variant="ghost" size="icon" onClick={goNextMonth}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-xs text-zinc-500">
              {weekdays.map((day) => (
                <div key={day} className="text-center">
                  {day}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} />;
                }
                const iso = formatISO(day);
                const inRange = isInRange(iso);
                const start = isStart(iso);
                const end = isEnd(iso);

                return (
                  <button
                    key={iso}
                    type="button"
                    className={`h-9 rounded-md text-sm transition-colors ${
                      start || end
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : inRange
                        ? "bg-zinc-100 dark:bg-zinc-900"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                    onClick={() => handleSelect(iso)}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button
                className="bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                type="button"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
