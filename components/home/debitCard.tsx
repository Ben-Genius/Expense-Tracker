import { COLOURS } from "@/constant/color";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DebitCardUI = () => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balanceAmount}>$ 100,000.00</Text>
      </View>
      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeExpenseItem}>
          <Text style={styles.incomeExpenseLabel}>INCOME</Text>
          <Text style={styles.incomeExpenseAmount}>$ 700,000</Text>
        </View>
        <View style={styles.incomeExpenseItem}>
          <Text style={styles.incomeExpenseLabel}>EXPENSES</Text>
          <Text style={styles.incomeExpenseAmount}>$ 700,000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.secondary,
    padding: 20,
    borderRadius: 14,
    marginHorizontal: 20,
    elevation: 20,
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  balanceAmount: {
    color: "white",
    fontSize: 33,
    fontWeight: "300",
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incomeExpenseItem: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    padding: 10,
    borderRadius: 13,
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    gap: 4,
    marginHorizontal: 5,
    shadowColor: "rgba(255, 255, 255, 0.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  incomeExpenseLabel: {
    color: COLOURS.darkGrey,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  incomeExpenseAmount: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DebitCardUI;
