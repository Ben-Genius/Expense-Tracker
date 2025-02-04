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
  await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
};

const storeData = async () => {
  await AsyncStorage.setItem("expenses", JSON.stringify(expenseData));
    await AsyncStorage.setItem("expenses", JSON.stringify(incomeData));

};

storeData();