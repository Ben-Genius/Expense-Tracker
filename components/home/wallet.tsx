import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { IMAGES } from "@/assets/images";
import { IconSymbol } from "../IconSymbol.ios";
import { COLOURS } from "@/constant/color";
import { manageIncomeData, manageExpensesData } from "@/utils/storage";

// Format number to currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
const Wallet = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch income and expenses data
        const incomeData = await manageIncomeData();
        const expensesData = await manageExpensesData();

        // Calculate total income
        const calculatedIncome = incomeData.reduce(
          (sum: number, item: any) => sum + parseFloat(item.amount),
          0
        );

        // Calculate total expenses
        const calculatedExpenses = expensesData.reduce(
          (sum: number, item: any) => sum + parseFloat(item.amount),
          0
        );

        // Set the states
        setTotalIncome(calculatedIncome);
        setTotalExpenses(calculatedExpenses);
        setBalance(calculatedIncome - calculatedExpenses);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.parentContainer}>
      {/* Outer Card Header */}
      <View style={styles.outerHeader}>
        <View style={styles.walletWrapper}>
          <IconSymbol name="creditcard" color={COLOURS.grey} size={24} />
          <Text style={styles.titleText}>My Wallet</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceWrapper}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
        </View>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeExpenseItem}>
          <Text style={styles.incomeExpenseLabel}>INCOME</Text>
          <Text style={styles.incomeExpenseAmount}>
            {formatCurrency(totalIncome)}
          </Text>
        </View>
        <View style={styles.incomeExpenseItem}>
          <Text style={styles.incomeExpenseLabel}>EXPENSES</Text>
          <Text style={styles.incomeExpenseAmount}>
            {formatCurrency(totalExpenses)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1, // Add this
    borderColor: "#F7F2FA", // Add this
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  outerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  walletWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  walletIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#666666",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666666",
    paddingLeft: 8,
  },
  viewText: {
    fontSize: 15,
    color: "#666666",
    fontWeight: "500",
  },
  balanceWrapper: {
    backgroundColor: "#FFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    padding: 13,
    marginBottom: 16,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F7FF",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    paddingBottom: 8,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: "#666666",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  transferButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 2,
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incomeExpenseItem: {
    backgroundColor: COLOURS.secondary,
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
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  incomeExpenseAmount: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Wallet;
