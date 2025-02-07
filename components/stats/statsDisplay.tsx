import {
  StatsDisplayProps,
  StatCardProps,
  PeriodTotals,
  RangeTotals,
} from "@/utils/type";
import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing Expo Icons
import { BlurView } from "expo-blur"; // Add this import
import { COLOURS } from "@/constant/color";


// Utility function to check if totals is of type PeriodTotals
const isPeriodTotals = (
  totals: PeriodTotals | RangeTotals
): totals is PeriodTotals => {
  return "daily" in totals;
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ totals, mode }) => {
  if (mode === "single" && isPeriodTotals(totals)) {
    return (
      <ScrollView
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={Dimensions.get("window").width - 40} // Adjusted for better snap
        decelerationRate={0.9}
        pagingEnabled
      >
        <StatCard title="Daily" data={totals.daily} />
        <StatCard title="Weekly" data={totals.weekly} />
        <StatCard title="Monthly" data={totals.monthly} />
        <StatCard title="Yearly" data={totals.yearly} />
      </ScrollView>
    );
  }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={Dimensions.get("window").width - 40}
      decelerationRate={0.9}
      pagingEnabled
      style={styles.container}
    >
      <StatCard title="Range" data={totals as RangeTotals} />
    </ScrollView>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, data }) => {
  const balance = data.income - data.expenses;

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Ionicons name="calendar" size={18} color="#3498DB" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.dataRow}>
        <Ionicons name="cash" size={18} color="#2ECC71" />
        <Text style={styles.amount}>
          Income: ${data.income?.toFixed(2) || "N/A"}
        </Text>
      </View>

      <View style={styles.dataRow}>
        <Ionicons name="cart" size={18} color="#E74C3C" />
        <Text style={styles.amount}>
          Expenses: ${data.expenses?.toFixed(2) || "N/A"}
        </Text>
      </View>

      <View style={styles.balanceRow}>
        <Ionicons name="wallet" size={18} color={COLOURS.primary} />
        <Text style={styles.balance}>Balance: ${balance.toFixed(2)}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  container: {
    marginTop: 20,
    backgroundColor: "white",
  },

  card: {
    width: Dimensions.get("window").width - 150,
    marginHorizontal: 10,
    padding: 16,
    borderColor: COLOURS.primary,
    borderWidth: 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
   
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    marginLeft: 8,
    color: "#555",
  },

  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  balance: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 8,
  },

  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginTop: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});
