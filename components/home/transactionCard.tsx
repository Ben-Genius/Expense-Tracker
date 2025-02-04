import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SymbolView } from "expo-symbols";
import { COLOURS } from "@/constant/color";
import { IconSymbol } from "../IconSymbol.ios";

export interface TransactionCardProps {
  icon: any;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: string;
  iconColor: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  icon,
  title,
  description,
  amount,
  date,
  type,
  iconColor,
}) => {
  return (
    <View style={styles.card}>
      {/* Left Side Icon */}
      <View style={styles.iconContainer}>
        <IconSymbol name={icon} color={iconColor} size={24} />
      </View>

      {/* Transaction Details */}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Transaction Amount & Date */}
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: type === "income" ? "green" : "red" },
          ]}
        >
          {type === "income" ? `+ $${amount}` : `- $${amount}`}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(10px)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(241, 243, 245, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    opacity: 0.9,
  },
  description: {
    fontSize: 14,
    color: "rgba(102, 102, 102, 0.9)",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "rgba(102, 102, 102, 0.8)",
  },
});

export default TransactionCard;
