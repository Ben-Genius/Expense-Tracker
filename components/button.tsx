import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLOURS } from "../constant/color";
import { useRouter } from "expo-router";

interface ButtonProps {
  name: string;
  onPress: () => void;
  buttonStyle?: object;
  textStyle?: object;
}

export default function Button({
  name,
  onPress,
  buttonStyle,
  textStyle,
}: ButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.primary,
    // marginBottom: 80,
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
