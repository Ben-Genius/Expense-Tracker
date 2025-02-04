import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SymbolView } from "expo-symbols";
import { COLOURS } from "@/constant/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface TransactionCardProps {
  id: string;
  icon: any;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: string;
  iconColor: string;
  onPress?: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  icon,
  title,
  description,
  amount,
  date,
  type,
  iconColor,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Left Side Icon */}
      <View style={styles.iconContainer}>

        <MaterialCommunityIcons name={icon} color={iconColor} size={20} />
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
    </TouchableOpacity>
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
   

    borderWidth: 1,
    borderColor: COLOURS.secondary,
  
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
