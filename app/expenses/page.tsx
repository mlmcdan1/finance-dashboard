"use client";

import { useState, useEffect } from "react";
import { addExpense, getExpenses, deleteExpense } from "../../lib/expenses";
import { useAuth } from "../../lib/AuthContext";
import ExpensesChart from "../components/ExpenseChart";

// Define the Expense type
interface Expense {
    id: string;
    description: string;
    amount: number;
}

export default function ExpensesPage() {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if(user) {
            fetchExpenses();
        }
    }, [user]);

    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
    }

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const type: "income" | "expense" = "expense";
        await addExpense(user.uid, description, parseFloat(amount), type);
        setDescription("");
        setAmount("");
        fetchExpenses();
    };

    const handleDelete = async (id: string) => {
        await deleteExpense(id);
        fetchExpenses();
    }

    return (
        <div className="p-6 bg-white text-black"> {/* Ensured background is always white, text is black */}
            <h2 className="text-2xl font-bold mb-4">
                Expense Tracker
            </h2>

            {/* Expense Form */}
            <form onSubmit={handleAddExpense} className="mb-4">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 mr-2 bg-white text-black" 
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 mr-2 bg-white text-black"  
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Add Expense
                </button>
            </form>

            {/* Expense List */}
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} className="flex justify-between p-2 border">
                        <span>{expense.description} - ${expense.amount}</span>
                        <button
                            onClick={() => handleDelete(expense.id)}
                            className="bg-red-500 text-white px-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Expense Chart */}
            <ExpensesChart />
        </div>
    );
}
