"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type DatePickerProps = {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
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

const formatISO = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDisplay = (value: string | null) => {
  if (!value) return "Pick a date";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  const initialDate = value ? new Date(value) : new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

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

  const selectedValue = value;

  return (
    <div className="relative">
      <label className="text-sm font-medium">{label}</label>
      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full justify-between font-normal"
        onClick={() => setOpen(true)}
      >
        <span className={selectedValue ? "" : "text-zinc-500"}>
          {formatDisplay(selectedValue)}
        </span>
        <Calendar className="size-4 text-zinc-500" />
      </Button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-black">
            <div className="flex items-center justify-between">
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
                const isSelected = iso === selectedValue;

                return (
                  <button
                    key={iso}
                    type="button"
                    className={`h-9 rounded-md text-sm transition-colors ${
                      isSelected
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
