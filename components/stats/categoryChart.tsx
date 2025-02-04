import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS } from "@/constant/color";
import { chartConfig } from "@/constant/chartConfig";
import moment from "moment";

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
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState<any[]>([]);
  const [weeklyExpenses, setWeeklyExpenses] = useState<{
    labels: string[];
    expenses: number[];
  }>({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    expenses: [0, 0, 0, 0, 0, 0, 0],
  });
  const [monthlyExpenses, setMonthlyExpenses] = useState<{
    labels: string[];
    expenses: number[];
  }>({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    expenses: new Array(12).fill(0),
  });
  const [selectedChart, setSelectedChart] = useState<"weekly" | "monthly">(
    "weekly"
  );

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

      processData(parsedExpenses, parsedIncome);
    };

    fetchTransactions();
  }, []);

  const processData = (expenses: Transaction[], income: Transaction[]) => {
    const expenseSum = Math.ceil(
      expenses.reduce((sum, t) => sum + t.amount, 0)
    );
    setTotalExpenses(expenseSum);

    const incomeSum = Math.ceil(income.reduce((sum, t) => sum + t.amount, 0));
    setTotalIncome(incomeSum);

    setTransactions([...expenses, ...income]);

    // Process category breakdown for Expense Pie Chart
    const expenseCategoryMap: { [key: string]: number } = {};
    expenses.forEach((t) => {
      if (!expenseCategoryMap[t.category]) expenseCategoryMap[t.category] = 0;
      expenseCategoryMap[t.category] += t.amount;
    });

    setCategoryData(
      Object.keys(expenseCategoryMap).map((category, index) => ({
        name: category,
        amount: expenseCategoryMap[category],
        color: `hsl(${index * 45}, 70%, 50%)`,
        legendFontColor: "#000",
        legendFontSize: 14,
      }))
    );

    // Process category breakdown for Income Pie Chart
    const incomeCategoryMap: { [key: string]: number } = {};
    income.forEach((t) => {
      if (!incomeCategoryMap[t.category]) incomeCategoryMap[t.category] = 0;
      incomeCategoryMap[t.category] += t.amount;
    });

    setIncomeCategoryData(
      Object.keys(incomeCategoryMap).map((category, index) => ({
        name: category,
        amount: incomeCategoryMap[category],
        color: `hsl(${index * 45}, 70%, 50%)`,
        legendFontColor: "#000",
        legendFontSize: 14,
      }))
    );

    let weeklyData = [0, 0, 0, 0, 0, 0, 0];
    let monthlyData = new Array(12).fill(0);

    expenses.forEach((t) => {
      const dayOfWeek = moment(t.date).isoWeekday() - 1;
      const monthIndex = moment(t.date).month();

      weeklyData[dayOfWeek] = Math.ceil(weeklyData[dayOfWeek] + t.amount);
      monthlyData[monthIndex] = Math.ceil(monthlyData[monthIndex] + t.amount);
    });

    setWeeklyExpenses({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      expenses: weeklyData,
    });
    setMonthlyExpenses({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      expenses: monthlyData,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.chartTitle}>Expense Breakdown</Text>
        <View style={styles.chartCard}>
          <PieChart
            data={categoryData}
            width={Dimensions.get("window").width - 17}
            height={250}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="2"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        <Text style={styles.chartTitle}>Income Breakdown</Text>
        <View style={styles.chartCard}>
          <PieChart
            data={incomeCategoryData}
            width={Dimensions.get("window").width - 17}
            height={250}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="2"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        <View style={styles.chartCard}>
          {/* Chart Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setSelectedChart("weekly")}
              style={[
                styles.toggleButton,
                selectedChart === "weekly" && styles.activeButton,
              ]}
            >
              <Text
                style={
                  selectedChart === "weekly"
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedChart("monthly")}
              style={[
                styles.toggleButton,
                selectedChart === "monthly" && styles.activeButton,
              ]}
            >
              <Text
                style={
                  selectedChart === "monthly"
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
          {/* Bar Chart */}
          <Text style={styles.chartTitle}>
            {selectedChart === "weekly" ? "Weekly" : "Monthly"} Expenses
          </Text>
          <BarChart
            yAxisSuffix=""
            yAxisLabel=""
            data={{
              labels:
                selectedChart === "weekly"
                  ? weeklyExpenses.labels
                  : monthlyExpenses.labels,
              datasets: [
                {
                  data:
                    selectedChart === "weekly"
                      ? weeklyExpenses.expenses
                      : monthlyExpenses.expenses,
                  color: () => "red",
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={250}
            chartConfig={{
              ...chartConfig,
              formatYLabel: (y) => `${Math.ceil(parseFloat(y) / 1000)}K`,
            }}
            style={styles.chart}
            showValuesOnTopOfBars={true}
            withHorizontalLabels={true}
            fromZero={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOURS.white },
  header: {
    backgroundColor: "#FFF",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F7F2FA",
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
  expense: { fontSize: 18, color: "red", fontWeight: "bold" },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  chart: { borderRadius: 10, marginVertical: 10 },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  activeButton: { backgroundColor: COLOURS.primary },
  buttonText: { fontSize: 16 },
  activeButtonText: { fontSize: 16, color: "#FFF", fontWeight: "bold" },
});

export default CategoryChart;
