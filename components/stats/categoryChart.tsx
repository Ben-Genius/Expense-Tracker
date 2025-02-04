import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLOURS } from "@/constant/color";
import { chartConfig } from "@/constant/chartConfig";

interface Transaction {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  type: "income" | "expense";
}

const CategoryChart: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "expenses", title: "Expenses" },
    { key: "income", title: "Income" },
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const expenseData = await AsyncStorage.getItem("expenses");
      const incomeData = await AsyncStorage.getItem("income");

      const parsedExpenses = expenseData
        ? JSON.parse(expenseData).map((item: Transaction) => ({
            ...item,
            type: "expense",
          }))
        : [];
      const parsedIncome = incomeData
        ? JSON.parse(incomeData).map((item: Transaction) => ({
            ...item,
            type: "income",
          }))
        : [];

      const allTransactions = [...parsedExpenses, ...parsedIncome];

      processData(allTransactions);
    };

    fetchTransactions();
  }, []);

  const processData = (transactions: Transaction[]) => {
    setTransactions(transactions);

    // Calculate totals
    const incomeSum = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenseSum = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalIncome(incomeSum);
    setTotalExpenses(expenseSum);

    // Process category breakdown for Pie Chart
    const categoryMap: { [key: string]: number } = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!categoryMap[t.category]) categoryMap[t.category] = 0;
        categoryMap[t.category] += t.amount;
      });

    const formattedCategoryData = Object.keys(categoryMap).map(
      (category, index) => ({
        name: category,
        amount: categoryMap[category],
        color: `hsl(${index * 45}, 70%, 50%)`, // Assigns different colors
        legendFontColor: "#000",
        legendFontSize: 14,
      })
    );

    setCategoryData(formattedCategoryData);

    // Process monthly data for Bar Chart
    const monthlyMap: { [key: string]: number } = {};
    transactions.forEach((t) => {
      const month = t.date.substring(0, 7); // Extract YYYY-MM
      if (!monthlyMap[month]) monthlyMap[month] = 0;
      monthlyMap[month] += t.type === "expense" ? -t.amount : t.amount; // Expenses are negative
    });

    const sortedMonths = Object.keys(monthlyMap).sort();
    const formattedMonthlyData = sortedMonths.map((month) => monthlyMap[month]);

    setMonthlyData({ labels: sortedMonths, data: formattedMonthlyData });
  };

  const renderScene = SceneMap({
    expenses: () => (
      <ScrollView>
        {transactions
          .filter((t) => t.type === "expense")
          .map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.amountExpense}>
                - ${item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
      </ScrollView>
    ),
    income: () => (
      <ScrollView>
        {transactions
          .filter((t) => t.type === "income")
          .map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.amountIncome}>
                + ${item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
      </ScrollView>
    ),
  });

  return (
    <View style={styles.container}>
      {/* Total Income & Balance Header */}
      <View style={styles.header}>
        <Text style={styles.income}>
          Total Income: ${totalIncome.toFixed(2)}
        </Text>
        <Text style={styles.balance}>
          Total Balance: ${(totalIncome - totalExpenses).toFixed(2)}
        </Text>
      </View>

      <ScrollView>
        {/* Pie Chart: Expense Breakdown */}
        <Text style={styles.chartTitle}>Expense Breakdown</Text>
        <PieChart
          data={categoryData}
          width={Dimensions.get("window").width - 20}
          height={220}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={chartConfig}
          style={styles.chart}
        />

        {/* Bar Chart: Monthly Trends */}
        <Text style={styles.chartTitle}>Monthly Spending Trends</Text>
        <BarChart
          data={{
            labels: monthlyData.labels,
            datasets: [{ data: monthlyData.data }],
          }}
          width={Dimensions.get("window").width - 20}
          height={250}
          chartConfig={chartConfig}
          style={styles.chart}
          yAxisLabel="$"
          yAxisSuffix=""
        />

        {/* Tab View for Income & Expenses */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { backgroundColor: "#FFF", padding: 20, alignItems: "center" },
  income: { fontSize: 18, color: "green", fontWeight: "bold" },
  balance: { fontSize: 20, fontWeight: "bold" },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  chart: { borderRadius: 10, marginVertical: 10 },
  tabBar: { backgroundColor: "#FFF" },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  category: { fontSize: 16 },
  amountExpense: { fontSize: 16, color: "red" },
  amountIncome: { fontSize: 16, color: "green" },
});

export default CategoryChart;
