"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip , Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [chartData, setChartData] = useState<any>({
        labels: ["Food", "Rent", "Entertainment", "Bills"],
        datasets: [
            {
                label: "Expenses",
                data: [200, 800, 150, 400],
                backgroundColor: ["#3b82f6", "#f87171", "#fbbf24", "#10b981"],
                borderWidth: 2,
            },
        ],
    });

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-gray-600">💰 Total Balance</h3>
                <p className="text-3xl font-bold text-green-500">$5,250</p>
                </div>

                <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-gray-600">📈 Monthly Income</h3>
                <p className="text-3xl font-bold text-blue-500">$3,400</p>
                </div>
            </div>

            {/* Spending Overview Chart */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-gray-600 mb-4">📊 Spending Overview</h3>
                <Bar data={chartData} />
            </div>
        </div>
    )
}