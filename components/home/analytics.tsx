import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { IconSymbol } from "../IconSymbol.ios";
import { COLOURS } from "@/constant/color";
import { incomeData, expenseData } from "@/constant/dummy_data";

const AnalyticsCard = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const tabs = ["Weekly", "Monthly", "Yearly"];

  const calculations = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Get start and end of current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Weekly calculations
    const weeklyIncome = incomeData
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      })
      .reduce((sum, item) => sum + item.amount, 0);

    const weeklyExpense = expenseData
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      })
      .reduce((sum, item) => sum + item.amount, 0);

    // Monthly calculations
    const monthlyIncome = incomeData
      .filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() + 1 === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, item) => sum + item.amount, 0);

    const monthlyExpense = expenseData
      .filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() + 1 === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, item) => sum + item.amount, 0);

    // Yearly calculations
    const yearlyIncome = incomeData
      .filter((item) => new Date(item.date).getFullYear() === currentYear)
      .reduce((sum, item) => sum + item.amount, 0);

    const yearlyExpense = expenseData
      .filter((item) => new Date(item.date).getFullYear() === currentYear)
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      weekly: { income: weeklyIncome, expense: weeklyExpense },
      monthly: { income: monthlyIncome, expense: monthlyExpense },
      yearly: { income: yearlyIncome, expense: yearlyExpense },
    };
  }, []);

  const getCurrentValues = () => {
    switch (activeTab) {
      case "Weekly":
        return calculations.weekly;
      case "Monthly":
        return calculations.monthly;
      case "Yearly":
        return calculations.yearly;
      default:
        return calculations.monthly;
    }
  };

  const currentValues = getCurrentValues();

  return (
    <View style={styles.parentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <IconSymbol name="chart.bar.fill" color={COLOURS.grey} size={24} />
          <Text style={styles.titleText}>Analytics</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Section */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              console.log("Tab pressed:", tab); // Add this debug log
              setActiveTab(tab);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Analytics Data */}
      <View style={styles.dataContainer}>
        <View style={styles.dataSection}>
          <Text style={styles.dataLabel}>Income</Text>
          <View style={styles.valueContainer}>
            <View style={styles.arrowContainerGreen}>
              <IconSymbol name="arrow.up" color={COLOURS.green} size={17} />
            </View>
            <Text style={styles.valueText}>
              ${currentValues.income.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.dataSection}>
          <Text style={styles.dataLabel}>Expenses</Text>
          <View style={styles.valueContainer}>
            <View style={styles.arrowContainerOrange}>
              <IconSymbol name="arrow.down" color={COLOURS.orange} size={17} />
            </View>
            <Text style={styles.valueText}>
              ${currentValues.expense.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24, // Increased from 20
    margin: 20, // Increased from 16
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28, // Increased from 20
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    gap: 8,
    paddingVertical: 10, // Increased from 8
    paddingHorizontal: 16, // Increased from 12
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 6, // Increased from 4
    marginBottom: 24, // Increased from 14
  },
  analyticsIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#666666",
  },
  tab: {
    flex: 1,
    paddingVertical: 8, // Increased from 3
    paddingHorizontal: 8, // Increased from 4
    borderRadius: 12,
    alignItems: "center",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8, // Increased from 4
    marginTop: 10, // Added new spacing
  },
  dataSection: {
    flex: 1,
    padding: 10, // Added new padding
  },
  dataLabel: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16, // Increased from 12
    fontWeight: "500",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8, // Added new spacing
  },
  arrowContainerGreen: {
    backgroundColor: "#E8F5E9",
    borderRadius: 24,
    width: 42, // Increased from 36
    height: 42, // Increased from 36
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Increased from 12
  },
  arrowContainerOrange: {
    backgroundColor: "#FFF3E0",
    borderRadius: 24,
    width: 42, // Increased from 36
    height: 42, // Increased from 36
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Increased from 12
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  viewButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  viewText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 4,
    transform: [{ scale: 1.02 }], // Add slight scale effect
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "600",
  },

  tabText: {
    fontSize: 15,
    color: "#999999",
    fontWeight: "500",
  },

  arrowIcon: {
    width: 16,
    height: 16,
  },
  greenArrow: {
    tintColor: "#4CAF50",
  },
  orangeArrow: {
    tintColor: "#FF9800",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.5,
  },
});

export default AnalyticsCard;
