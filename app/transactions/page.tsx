"use client";

import { useEffect, useState } from "react";
import { addExpense, getExpenses, deleteExpense, updateExpense } from "../../lib/expenses";
import { useAuth } from "../../lib/AuthContext";

export default function TransactionsPage() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add("dark");
    }
  }, [user]);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const amountValue = parseFloat(amount);
    const finalAmount = type === "expense" ? -Math.abs(amountValue) : Math.abs(amountValue);

    if (editingId) {
      await updateExpense(editingId, { description, amount: finalAmount, type });
      setEditingId(null);
    } else {
      await addExpense(user.uid, description, finalAmount, type);
    }

    setDescription("");
    setAmount("");
    setType("income"); // Reset type
    fetchExpenses();
  };

  const handleEdit = (expense: any) => {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setType(expense.type);
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className={`p-6 space-y-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Transactions</h2>

      {/* Transaction Form */}
      <form onSubmit={handleAddExpense} className={`p-6 shadow-md rounded-lg space-y-4 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`border p-2 w-full rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`border p-2 w-full rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className={`border p-2 w-full rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-3 rounded-md`}
        >
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      {/* Transaction List */}
      <div className={`p-6 shadow-md rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-600"}`}>💳 Recent Transactions</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className={`p-3 ${darkMode ? "text-white" : "text-gray-600"}`}>Description</th>
              <th className={`p-3 ${darkMode ? "text-white" : "text-gray-600"}`}>Amount</th>
              <th className={`p-3 ${darkMode ? "text-white" : "text-gray-600"}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="p-3">{expense.description}</td>
                <td className={`p-3 font-semibold ${expense.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                  ${Math.abs(expense.amount)}
                </td>
                <td className="p-3 space-x-3">
                  <button onClick={() => handleEdit(expense)} className="text-blue-600 hover:underline">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:underline">
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
