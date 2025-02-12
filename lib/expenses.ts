import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const expensesCollection=collection (db, "expenses");

interface Expense {
    id: string;
    userId: string;
    description: string;
    amount: number;
    createdAt: Date;
}

// Add Expenses
export const addExpense = async (userId: string, description: string, amount: number) => {
    await addDoc(expensesCollection, { userId, description, amount, createdAt: new Date() });
};

// Get Expenses
export const getExpenses = async (): Promise<Expense[]> => {
    const snapshot = await getDocs(expensesCollection);
    return snapshot.docs.map(doc => ({ 
        id: doc.id,
         ...doc.data() as Omit<Expense, "id">,
    }));
};

// Delete Expenses
export const deleteExpense = async (id: string) => {
    await deleteDoc(doc(db, "expenses", id));
};

// Update Expenses
export const updateExpense = async (id: string, newData: {description?: string; amount?: number}) => {
    await updateDoc(doc(db, "expenses", id), newData);
};