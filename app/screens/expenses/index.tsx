import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLOURS } from "@/constant/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TransactionCard from "@/components/home/transactionCard";
import { IconSymbol } from "@/components/IconSymbol";
import { useFocusEffect, useRouter } from "expo-router";
import { manageExpensesData } from "@/utils/storage";

interface Expense {
  id: string;
  category: keyof typeof categoryIcons;
  description: string;
  amount: number;
  date: string;
  type: string;
}

const categoryIcons = {
  Bills: "dollarsign.circle.fill",
  Health: "heart.fill",
  Education: "book.fill",
  Travel: "airplane",
  Entertainment: "tv.fill",
  Shopping: "cart.fill",
  Groceries: "basket.fill",
  Transport: "car.fill",
  Food: "fork.knife",
  Utilities: "bolt.fill",
  Insurance: "shield.fill",
  Clothing: "tshirt.fill",
  Other: "plus.circle.fill",
} as const;

const categoryColors = {
  Bills: "#FF6B6B",
  Health: "#4ECDC4",
  Education: "#45B7D1",
  Travel: "#96CEB4",
  Entertainment: "#9B59B6",
  Shopping: "#E74C3C",
  Groceries: "#2ECC71",
  Transport: "#F1C40F",
  Food: "#E67E22",
  Utilities: "#3498DB",
  Insurance: "#8E44AD",
  Clothing: "#D35400",
  Other: "#95A5A6",
} as const;

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const loadExpenses = async () => {
      const currentExpenses = await manageExpensesData();
      const sortedExpenses = currentExpenses.sort(
        (a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setExpenses(sortedExpenses);
    };
    loadExpenses();
  }, [refresh]);


useFocusEffect(
  React.useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, [])
);
  
  const getCategoryIcon = (category: keyof typeof categoryIcons): string => {
    return categoryIcons[category];
  };

  const getCategoryColor = (category: keyof typeof categoryColors): string => {
    return categoryColors[category] || COLOURS.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <IconSymbol
            name="chart.line.downtrend.xyaxis.circle"
            color={COLOURS.primary}
            size={24}
          />
          <Text style={styles.titleText}>All Expenses</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/screens/expenses/addExpense")}
        >
          <IconSymbol
            name="plus.circle.fill"
            color={COLOURS.primary}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {expenses.map((item) => (
          <TransactionCard
            key={item.id}
            id={item.id}
            icon={getCategoryIcon(item.category)}
            title={item.category}
            description={item.description}
            amount={item.amount}
            iconColor={getCategoryColor(item.category)}
            date={item.date}
            type={item.type}
            category={item.category}
            onPress={() =>
              router.push({
                pathname: "/screens/detailScreen",
                params: {
                  id: item.id,
                  type: "expense", // or whatever type you want to pass
                },
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  addButton: {
    padding: 8,
  },
});
