import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS } from "@/constant/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  images?: string[];
  type: string;
}

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [income, setIncome] = useState<Expense | null>(null);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      if (storedExpenses) {
        const allExpense = JSON.parse(storedExpenses);
        const selectedExpense = allExpense.find((item: Expense) => item.id === id);
        setIncome(selectedExpense);
      }
    };
    fetchExpenseDetails();
  }, [id]);

  if (!income) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      
        <MaterialCommunityIcons name="cash" size={24} color={COLOURS.primary} />
        <Text style={styles.category}>{income.category}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>${income.amount.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{income.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{income.description}</Text>
        </View>

        {income.images && income.images.length > 0 && (
          <View style={styles.imagesContainer}>
            <Text style={styles.label}>Attachments</Text>
            <ScrollView horizontal>
              {income.images.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.image} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  category: {
    fontSize: 24,
    fontWeight: "600",
  },
  detailsContainer: {
    padding: 20,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  amount: {
    fontSize: 20,
    fontWeight: "600",
    color: COLOURS.primary,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  imagesContainer: {
    gap: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginRight: 12,
  },
});
