"use client";

import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../lib/expenses";
import { useAuth } from "../../lib/AuthContext";

export default function TransactionsPage() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h2>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">💳 Recent Transactions</h3>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-gray-600">Description</th>
              <th className="p-3 text-gray-600">Amount</th>
              <th className="p-3 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="p-3">{expense.description}</td>
                <td className="p-3 text-red-500 font-semibold">-${expense.amount}</td>
                <td className="p-3">
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
