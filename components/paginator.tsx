import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";
import { COLOURS } from "../constant/color";
import Button from "./button";
import { useRouter } from "expo-router";
import { setOnboardingCompleted } from "@/utils/storage";

interface PaginatorProps {
  data: any[];
  scrollX: Animated.Value;
  currentIndex: number;

}

const Paginator = ({
  data,
  scrollX,
  currentIndex,
}: PaginatorProps) => {
  const router = useRouter();
  const handlePress = async() => {
    await setOnboardingCompleted();
    router.replace("/screens/login");

   };
  const { width } = useWindowDimensions();
  const isLastScreen = currentIndex === data.length - 1;

  if (isLastScreen) {
    return (
      <Button
        name="Login"
        onPress={handlePress}
        buttonStyle={styles.loginButton}
      />
    );
  }

  return (
    <View style={styles.dotsContainer}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    height: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLOURS.primary,
    marginHorizontal: 8,
  },
  loginButton: {
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: COLOURS.primary,
    marginBottom: 40,
  },
});
