import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SymbolView } from "expo-symbols";
import { COLOURS } from "@/constant/color";

interface ExpenseCardProps {
  expense: {
    id: number;
    category: string;
    amount: number;
    date: string;
    description: string;
    images: string[];
  };
  onPress: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <SymbolView
          name="dollarsign.circle"
          type="hierarchical"
          style={styles.icon}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.description}>{expense.description}</Text>
      </View>
      <Text style={styles.amount}>-${expense.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  iconContainer: { marginRight: 15 },
  icon: { width: 40, height: 40 },
  info: { flex: 1 },
  category: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  description: { fontSize: 14, color: "#ccc" },
  amount: { fontSize: 18, fontWeight: "bold", color: "red" },
});
