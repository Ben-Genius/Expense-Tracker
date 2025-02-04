import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ExpensesScreen from "../screens/expenses";
import IncomeScreen from "../screens/income";
import { COLOURS } from "@/constant/color";
import { IconSymbol } from "@/components/IconSymbol";

const Records = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "expenses" && styles.activeTab]}
          onPress={() => setActiveTab("expenses")}
        >
          <IconSymbol
            name="arrow.down.circle.fill"
            size={20}
            color={activeTab === "expenses" ? COLOURS.primary : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "expenses" && styles.activeTabText,
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "income" && styles.activeTab]}
          onPress={() => setActiveTab("income")}
        >
          <IconSymbol
            name="arrow.up.circle.fill"
            size={20}
            color={activeTab === "income" ? COLOURS.primary : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "income" && styles.activeTabText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "expenses" ? <ExpensesScreen /> : <IncomeScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: COLOURS.primary,
    fontWeight: "600",
  },
});

export default Records;
