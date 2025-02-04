import dayjs from "dayjs";
import { expenseData, incomeData } from "../constant/dummy_data";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);


export const calculateDailyTotals = (selectedDate: string) => {
  const date = dayjs(selectedDate).format("YYYY-MM-DD");

  const expenses = expenseData.filter(item => item.date === date).reduce((sum, item) => sum + item.amount, 0);

  const income = incomeData.filter(item => item.date === date).reduce((sum, item) => sum + item.amount, 0);

  return { expenses, income };
};

export const calculateWeeklyTotals = (selectedDate: string) => {
  const startOfWeek = dayjs(selectedDate).startOf("week");
  const endOfWeek = dayjs(selectedDate).endOf("week");

  const expenses = expenseData
    .filter(item => dayjs(item.date).isBetween(startOfWeek, endOfWeek, null, "[]"))
    .reduce((sum, item) => sum + item.amount, 0);

  const income = incomeData
    .filter(item => dayjs(item.date).isBetween(startOfWeek, endOfWeek, null, "[]"))
    .reduce((sum, item) => sum + item.amount, 0);

  return { expenses, income };
};

export const calculateMonthlyTotals = (selectedDate: string) => {
  const month = dayjs(selectedDate).format("YYYY-MM");

  const expenses = expenseData.filter(item => item.date.startsWith(month)).reduce((sum, item) => sum + item.amount, 0);

  const income = incomeData.filter(item => item.date.startsWith(month)).reduce((sum, item) => sum + item.amount, 0);

  return { expenses, income };
};

export const calculateYearlyTotals = (selectedDate: string) => {
  const year = dayjs(selectedDate).format("YYYY");

  const expenses = expenseData.filter(item => item.date.startsWith(year)).reduce((sum, item) => sum + item.amount, 0);

  const income = incomeData.filter(item => item.date.startsWith(year)).reduce((sum, item) => sum + item.amount, 0);

  return { expenses, income };
};

export const calculateRangeTotals = (startDate:string, endDate:string) => {
  const expenses = expenseData
    .filter(item => dayjs(item.date).isBetween(startDate, endDate, null, "[]"))
    .reduce((sum, item) => sum + item.amount, 0);

  const income = incomeData
    .filter(item => dayjs(item.date).isBetween(startDate, endDate, null, "[]"))
    .reduce((sum, item) => sum + item.amount, 0);

  return { expenses, income };
};
