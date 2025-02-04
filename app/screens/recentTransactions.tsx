import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLOURS } from "@/constant/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TransactionCard from "@/components/home/transactionCard";
import { expenseData, incomeData } from "@/constant/dummy_data";

import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Combine and process expense and income data
    const combinedTransactions = [
      ...expenseData.map((item) => ({ ...item, type: "expense" })),
      ...incomeData.map((item) => ({ ...item, type: "income" })),
    ];
        const recentTransactions = combinedTransactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

  
    setTransactions(recentTransactions as React.SetStateAction<never[]>);
  }, []);
const getCategoryIcon = (category: string): string => {
  const iconMap = {
    Bills: "cash",
    Health: "heart",
    Education: "book",
    Travel: "airplane",
    Entertainment: "television",
    Shopping: "cart",
    Groceries: "basket",
    Transport: "car",
    Bonus: "star",
    Freelance: "laptop",
    "Rental Income": "home",
    Salary: "cash-multiple",
    Investments: "chart-line-variant",
    Business: "office-building",
    Gift: "gift",
    Consulting: "account-group",
  };

  return iconMap[category] || "circle";
};

  const getCategoryColor = (category: string): string => {
    const colorMap = {
      Bills: "#FF6B6B",
      Health: "#4ECDC4",
      Education: "#45B7D1",
      Travel: "#96CEB4",
      Entertainment: "#9B59B6",
      Shopping: "#E74C3C",
      Groceries: "#2ECC71",
      Transport: "#F1C40F",
      Bonus: "#1ABC9C",
      Freelance: "#3498DB",
      "Rental Income": "#E67E22",
      Salary: "#27AE60",
      Investments: "#8E44AD",
      Business: "#2980B9",
      Gift: "#D35400",
      Consulting: "#16A085",
    };

    return colorMap[category] || COLOURS.primary;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
       
          <MaterialCommunityIcons
            name="chart-scatter-plot"
            color={COLOURS.primary}
            size={20}
          />

          <Text style={styles.titleText}>Recent Transactions</Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            router.push("/(tabs)/records");
          }}
        >
          <Text style={styles.viewText}>See all</Text>
        </TouchableOpacity>
      </View>

      {transactions.map(
        (
          item: {
            id: number;
            type: string;
            category: string;
            description: string;
            amount: number;
            date: string;
          },
          index
        ) => (
          <TransactionCard
            key={index}
            icon={getCategoryIcon(item.category)}
            title={item.category}
            description={item.description}
            amount={item.amount}
            iconColor={getCategoryColor(item.category)}
            date={item.date}
            onPress={() =>
              router.push({
                pathname: "/screens/detailScreen",
                params: {
                  id: item.id,
                  type: "income", // or whatever type you want to pass
                },
              })
            }
            type={item.type || "expense" || "income"}
            id={""}
            category={""}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 24,
    padding: 14,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },


  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  viewButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  viewText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
});
