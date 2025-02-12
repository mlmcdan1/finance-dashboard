import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const expensesCollection=collection (db, "expenses");

interface Expense {
    id: string;
    userId: string;
    description: string;
    amount: number;
    type: "income" | "expense";
    createdAt: Date;
}

// Add Expenses
export const addExpense = async (userId: string, description: string, amount: number, type: "income" | "expense") => {
    await addDoc(expensesCollection, { userId, description, amount, type, createdAt: new Date() });
};

// Get Expenses
export const getExpenses = async (): Promise<Expense[]> => {
    const snapshot = await getDocs(expensesCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Expense, "id">; // ✅ Ensure `id` is NOT in `data`
      return { id: doc.id, ...data }; // ✅ Now `id` is added correctly
    });
};
  

// Delete Expenses
export const deleteExpense = async (id: string) => {
    await deleteDoc(doc(db, "expenses", id));
};

// Update Expenses
export const updateExpense = async (id: string, newData: {description?: string; amount?: number, type: "income" | "expense"}) => {
    await updateDoc(doc(db, "expenses", id), newData);
};