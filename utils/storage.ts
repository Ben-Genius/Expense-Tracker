import { expenseData, incomeData } from "@/constant/dummy_data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "expo-router/build/global-state/router-store";

const ONBOARDING_COMPLETED_KEY = "onboarding_completed";

// Check if onboarding is completed
export const isOnboardingCompleted = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
  return value === "true";
};

// Set onboarding as completed
export const setOnboardingCompleted = async (): Promise<void> => {
  console.log("Setting onboarding completed");
  await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
};

const storeData = async () => {
  await AsyncStorage.setItem("expenses", JSON.stringify(expenseData));
  await AsyncStorage.setItem("income", JSON.stringify(incomeData));
};

storeData();

// Add function to manage expenses data
export const manageExpensesData = async () => {
  try {
    const storedExpenses = await AsyncStorage.getItem("expenses");
    if (!storedExpenses) {
      // Initialize with dummy data if no data exists
      await AsyncStorage.setItem("expenses", JSON.stringify(expenseData));
      return expenseData;
    }
    return JSON.parse(storedExpenses);
  } catch (error) {
    console.error("Error managing expenses data:", error);
    return expenseData;
  }
};

export const manageIncomeData = async () => {
  try {
    const storedIncome = await AsyncStorage.getItem("income");
    if (!storedIncome) {
      // Initialize with dummy data if no data exists
      await AsyncStorage.setItem("income", JSON.stringify(incomeData));
      return incomeData;
    }
    return JSON.parse(storedIncome);
  } catch (error) {
    console.error("Error managing income data:", error);
    return incomeData;
  }
};
