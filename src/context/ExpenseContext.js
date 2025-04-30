import { createContext, useState, useContext } from "react";
import mockData from "../data/mockData";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(mockData.expenses);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: expenses.length + 1,
      settled: false,
    };
    setExpenses([...expenses, newExpense]);
  };

  const settleExpense = (expenseID) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === expenseID ? { ...exp, settled: true } : exp
    );
    setExpenses(updatedExpenses);
    mockData.expense = updatedExpenses; // Assuming you want to mutate mockData
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, settleExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
