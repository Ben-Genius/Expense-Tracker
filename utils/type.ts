import dayjs, { Dayjs } from "dayjs";

// types.ts
export interface TotalData {
  income: number;
  expenses: number;
}

export interface PeriodTotals {
  daily: TotalData;
  weekly: TotalData;
  monthly: TotalData;
  yearly: TotalData;
}

export interface RangeTotals {
  income: number;
  expenses: number;
}

export interface StatsDisplayProps {
  totals: PeriodTotals | RangeTotals;
  mode: "single" | "range";
}

export interface StatCardProps {
  title: string;
  data: TotalData;
}
export interface TotalData {
  income: number;
  expenses: number;
}

export interface StatsDisplayProps {
  totals:
    | {
        daily: TotalData;
        weekly: TotalData;
        monthly: TotalData;
        yearly: TotalData;
      }
    | TotalData;
  mode: "single" | "range";
}

export interface StatCardProps {
  title: string;
  data: TotalData;
}
export interface DateSelectorProps {
  mode?: 'single' | 'range';
  date?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (value: Date | { startDate: Date | null; endDate: Date | null }) => void;
}

export interface TotalData {
  expenses: number;
  income: number;
}

export interface AllTotals {
  daily: TotalData;
  weekly: TotalData;
  monthly: TotalData;
  yearly: TotalData;
}

// Define the date range export interface
export interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
