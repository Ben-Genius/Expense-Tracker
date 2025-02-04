import { router, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { isOnboardingCompleted } from "../utils/storage";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   

    checkOnboardingStatus();
  }, []);

   const checkOnboardingStatus = async () => {
     const onboardingCompleted = await isOnboardingCompleted();
     console.log("Onboarding Completed:", onboardingCompleted);
     if (onboardingCompleted) {
       setIsLoading(false);
        router.replace("/screens/login");
       router.replace("/screens/login"); // ✅ Go to login if onboarding is completed
     } else {
       setIsLoading(false);
       router.replace("/"); // ✅ Show onboarding only once
     }
   };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {/* ✅ Register Tabs Layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* ✅ Register Individual Screens */}
      <Stack.Screen name="screens/login" options={{ headerShown: false }} />
      <Stack.Screen name="screens/logout" options={{ headerShown: false }} />

      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/detailScreen"
        options={{ title: " Detailed Overview" }}
      />
      <Stack.Screen
        name="screens/expenses/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/expenses/addExpense"
        options={{ title: "Add Expense" }}
      />
      <Stack.Screen
        name="screens/expenses/detailedExpenses"
        options={{ title: "Expense Details" }}
      />
      <Stack.Screen
        name="screens/expenses/editExpense"
        options={{ title: "Edit Expense" }}
      />
      <Stack.Screen
        name="screens/income/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/income/addIncome"
        options={{ title: "Add Income" }}
      />

      <Stack.Screen
        name="screens/income/editIncome"
        options={{ title: "Edit Income" }}
      />
    </Stack>
  );
}
