import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { DateSelector } from "@/components/stats/dateSelector";
import { StatsDisplay } from "@/components/stats/statsDisplay";
import {
  calculateDailyTotals,
  calculateWeeklyTotals,
  calculateMonthlyTotals,
  calculateYearlyTotals,
} from "@/utils/calculateIncomeExpense";
import { AllTotals, DateRange } from "@/utils/type";

// Define the types for totals data

type DateModeType = "single" | "range";

const Statistics = () => {
  const defaultDate = dayjs(); // Create a default date
  const [dateMode, setDateMode] = useState<DateModeType>("single");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(defaultDate);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

 const handleDateChange = (
   value: Date | { startDate: Date | null; endDate: Date | null }
 ) => {
   if (dateMode === "single" && value instanceof Date) {
     setSelectedDate(dayjs(value));
   } else if (
     dateMode === "range" &&
     "startDate" in value &&
     value.startDate &&
     value.endDate
   ) {
     setDateRange({
       startDate: dayjs(value.startDate),
       endDate: dayjs(value.endDate),
     });
   }
 };


  const getTotals = (): AllTotals => {
    const currentDate = selectedDate || defaultDate;
    const formattedDate = currentDate.format("YYYY-MM-DD");

    if (dateMode === "single") {
      return {
        daily: calculateDailyTotals(formattedDate),
        weekly: calculateWeeklyTotals(formattedDate),
        monthly: calculateMonthlyTotals(formattedDate),
        yearly: calculateYearlyTotals(formattedDate),
      };
    }

    // Default totals for range mode or fallback
    return {
      daily: { income: 0, expenses: 0 },
      weekly: { income: 0, expenses: 0 },
      monthly: { income: 0, expenses: 0 },
      yearly: { income: 0, expenses: 0 },
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <DateSelector
        mode={dateMode}
        date={selectedDate?.toDate() ?? new Date()}
        startDate={dateRange.startDate?.toDate() ?? null}
        endDate={dateRange.endDate?.toDate() ?? null}
        onChange={handleDateChange}
      />

      <StatsDisplay totals={getTotals()} mode={dateMode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Statistics;
