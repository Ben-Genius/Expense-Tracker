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
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Records = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "expenses" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("expenses")}
          >
            <MaterialCommunityIcons
              name="arrow-down-circle"
              size={24}
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
   
            <MaterialCommunityIcons
              name="arrow-up-circle"
              size={24}
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
    </>
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
    marginTop: 27,
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
