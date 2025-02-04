import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { COLOURS } from "@/constant/color";
import { SymbolView, SymbolViewProps, SFSymbol } from "expo-symbols";
import { IconSymbol } from "@/components/IconSymbol.ios";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOURS.primary,
        tabBarInactiveTintColor: COLOURS.grey,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house" color={color} />
          ),

        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Statistics",
          tabBarIcon: ({ focused }) => (
            <SymbolView
              name="chart.xyaxis.line"
              style={styles.symbol}
              type="hierarchical"
              resizeMode="scaleAspectFit"
              tintColor={focused ? COLOURS.primary : COLOURS.grey}
              colors={[focused ? COLOURS.primary : COLOURS.grey]} // Fix here!
            />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: "Records",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="banknote" color={color} />
          ),
  
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="filemenu.and.selection" color={color} />
          ),
    
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  symbol: {
    width: 35,
    height: 35,
    margin: 5,
  },
});
