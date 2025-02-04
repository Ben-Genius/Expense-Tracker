import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { isOnboardingCompleted } from "../utils/storage";

export default function RootLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingCompleted = await isOnboardingCompleted();
      if (onboardingCompleted) {
              setIsLoading(false);

        router.replace("/screens/login"); // Redirect to login if onboarding is completed
      }
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
