"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getExpenses } from "../../lib/expenses";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Expense {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

export default function Dashboard() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Total Spending",
        data: [],
        backgroundColor: ["#3b82f6", "#f87171", "#fbbf24", "#10b981"],
        borderWidth: 2,
      },
    ],
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Check dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);

    // Calculate totals
    const income = data
      .filter((exp: Expense) => exp.type === "income")
      .reduce((acc: number, exp: Expense) => acc + exp.amount, 0);
    const expensesTotal = data
      .filter((exp: Expense) => exp.type === "expense")
      .reduce((acc: number, exp: Expense) => acc + Math.abs(exp.amount), 0);

    setTotalIncome(income);
    setTotalExpenses(expensesTotal);

    // Prepare Chart.js Data
    const categoryTotals: Record<string, number> = {};
    data.forEach((expense: Expense) => {
      if (categoryTotals[expense.description]) {
        categoryTotals[expense.description] += Math.abs(expense.amount);
      } else {
        categoryTotals[expense.description] = Math.abs(expense.amount);
      }
    });

    setChartData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Total Spending",
          data: Object.values(categoryTotals),
          backgroundColor: ["#3b82f6", "#f87171", "#fbbf24", "#10b981"],
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <div className={`p-6 space-y-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-3xl font-bold">📊 Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 shadow-md rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold">💰 Total Balance</h3>
          <p className={`text-3xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-500" : "text-red-500"}`}>
            ${totalIncome - totalExpenses}
          </p>
        </div>

        <div className={`p-6 shadow-md rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold">📈 Income vs Expenses</h3>
          <p className="text-xl font-bold text-green-500">Income: ${totalIncome}</p>
          <p className="text-xl font-bold text-red-500">Expenses: ${totalExpenses}</p>
          <p className="text-lg">Total Transactions: {expenses.length}</p>
        </div>

        <div className={`p-6 shadow-md rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold">📊 Spending by Category</h3>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
