import { StatsDisplayProps, StatCardProps, PeriodTotals, RangeTotals } from "@/utils/type";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const isPeriodTotals = (
  totals: PeriodTotals | RangeTotals
): totals is PeriodTotals => {
  return "daily" in totals;
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ totals, mode }) => {
  if (mode === "single" && isPeriodTotals(totals)) {
    return (
      <View style={styles.container}>
        <StatCard title="Daily" data={totals.daily} />
        <StatCard title="Weekly" data={totals.weekly} />
        <StatCard title="Monthly" data={totals.monthly} />
        <StatCard title="Yearly" data={totals.yearly} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatCard title="Range" data={totals as RangeTotals} />
    </View>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, data }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.amount}>Income: ${data.income?.toFixed(2)}</Text>
    <Text style={styles.amount}>Expenses: ${data.expenses?.toFixed(2)}</Text>
    <Text style={styles.balance}>
      Balance: ${(data.income - data.expenses).toFixed(2)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    marginBottom: 4,
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});
