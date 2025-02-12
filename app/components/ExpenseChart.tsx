"use client";

"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { getExpenses } from "../../lib/expenses";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenses();

      // Group expenses by category
      const categoryTotals: Record<string, number> = {};
      expenses.forEach((expense) => {
        if (categoryTotals[expense.description]) {
          categoryTotals[expense.description] += expense.amount;
        } else {
          categoryTotals[expense.description] = expense.amount;
        }
      });

      // Prepare Chart.js data
      setChartData({
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            label: "Total Spending",
            data: Object.values(categoryTotals),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchExpenses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Breakdown</h2>
      <Bar data={chartData} />
    </div>
  );
}
