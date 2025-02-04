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
import { IconSymbol } from "@/components/IconSymbol";
import { useFocusEffect, useRouter } from "expo-router";
import { manageIncomeData } from "@/utils/storage";

interface Income {
  id: string;
  category: keyof typeof categoryIcons;
  description: string;
  amount: number;
  date: string;
  type: string;
}

const categoryIcons = {
  Salary: "banknote.fill",
  Freelance: "laptopcomputer",
  Investments: "chart.line.uptrend.xyaxis",
  Business: "building.2.fill",
  Rental: "house.fill",
  Bonus: "star.fill",
  Gift: "gift.fill",
  Other: "plus.circle.fill",
} as const;

const categoryColors = {
  Salary: "#27AE60",
  Freelance: "#3498DB",
  Investments: "#8E44AD",
  Business: "#2980B9",
  Rental: "#E67E22",
  Bonus: "#1ABC9C",
  Gift: "#D35400",
  Other: "#95A5A6",
} as const;

export default function IncomeScreen() {
  const [income, setIncome] = useState<Income[]>([]);
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const loadIncome = async () => {
      const currentIncome = await manageIncomeData();
      const sortedIncome = currentIncome.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setIncome(sortedIncome);
    };
    loadIncome();
  }, [refresh]);

  useFocusEffect(
    React.useCallback(() => {
      setRefresh((prev) => prev + 1);
    }, [])
  );

  const getCategoryIcon = (category: keyof typeof categoryIcons): string => {
    return categoryIcons[category] || "circle.fill";
  };

  const getCategoryColor = (category: keyof typeof categoryColors): string => {
    return categoryColors[category] || COLOURS.primary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <IconSymbol
            name="chart.dots.scatter"
            color={COLOURS.primary}
            size={24}
          />
          <Text style={styles.titleText}>All Income</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/screens/income/addIncome")}
        >
          <IconSymbol
            name="plus.circle.fill"
            color={COLOURS.primary}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {income.map((item) => (
          <TransactionCard
            key={item.id}
            id={item.id}
            icon={getCategoryIcon(item.category)}
            title={item.category}
            description={item.description}
            amount={item.amount}
            iconColor={getCategoryColor(item.category)}
            date={item.date}
            type="income"
            category={item.category}
            onPress={() =>
              router.push({
                pathname: "/screens/detailScreen",
                params: {
                  id: item.id,
                  type: "income"  // or whatever type you want to pass
                }
              })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
  addButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 8,
  },
});
