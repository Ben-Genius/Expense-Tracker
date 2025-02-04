import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { DateSelector } from "@/components/stats/dateSelector";
import { StatsDisplay } from "@/components/stats/statsDisplay";
import { StatusBar } from "expo-status-bar";

import {
  calculateDailyTotals,
  calculateWeeklyTotals,
  calculateMonthlyTotals,
  calculateYearlyTotals,
} from "@/utils/calculateIncomeExpense";
import { AllTotals, DateRange } from "@/utils/type";
import CategoryChart from "@/components/stats/categoryChart";
import { COLOURS } from "@/constant/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { expenseData, incomeData } from "@/constant/dummy_data";
import { formatCurrency } from "@/components/home/wallet";
import { manageExpensesData, manageIncomeData } from "@/utils/storage";

type DateModeType = "single" | "range";
type TimeFilterType = "daily" | "weekly" | "monthly" | "yearly";

const Statistics = () => {
  const defaultDate = dayjs();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [dateMode, setDateMode] = useState<DateModeType>("single");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(defaultDate);
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>("weekly");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      const storedIncome = await AsyncStorage.getItem("income");

      if (!storedExpenses || !storedIncome) {
        await AsyncStorage.setItem("expenses", JSON.stringify(expenseData));
        await AsyncStorage.setItem("income", JSON.stringify(incomeData));
      }
    } catch (error) {
      console.error("Error initializing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (value: any) => {
    if (dateMode === "single" && value.date) {
      setSelectedDate(dayjs(value.date));
    } else if (dateMode === "range" && value.startDate && value.endDate) {
      setDateRange({
        startDate: dayjs(value.startDate),
        endDate: dayjs(value.endDate),
      });
    }
  };

  const handleFilterChange = (filter: TimeFilterType) => {
    setTimeFilter(filter);
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

    return {
      daily: { income: 0, expenses: 0 },
      weekly: { income: 0, expenses: 0 },
      monthly: { income: 0, expenses: 0 },
      yearly: { income: 0, expenses: 0 },
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch income and expenses data
        const incomeData = await manageIncomeData();
        const expensesData = await manageExpensesData();

        // Calculate total income
        const calculatedIncome = incomeData.reduce(
          (sum: number, item: any) => sum + parseFloat(item.amount),
          0
        );

        // Calculate total expenses
        const calculatedExpenses = expensesData.reduce(
          (sum: number, item: any) => sum + parseFloat(item.amount),
          0
        );

        // Set the states
        setTotalIncome(calculatedIncome);
        setTotalExpenses(calculatedExpenses);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor={COLOURS.primary} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.incomeExpenseContainer}>
          <View style={styles.incomeExpenseItem}>
            <Text style={styles.incomeExpenseLabel}>INCOME</Text>
            <Text style={styles.incomeExpenseAmount}>
              {formatCurrency(totalIncome)}
            </Text>
          </View>
          <View style={styles.incomeExpenseItem}>
            <Text style={styles.incomeExpenseLabel}>EXPENSES</Text>
            <Text style={styles.incomeExpenseAmount}>
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <StatsDisplay totals={getTotals()} mode={dateMode} />

          <CategoryChart />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOURS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
  },

  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 17,
  },
  incomeExpenseItem: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    borderRadius: 13,
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    gap: 4,
    marginHorizontal: 5,
    shadowColor: "rgba(255, 255, 255, 0.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  incomeExpenseLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  incomeExpenseAmount: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Statistics;
