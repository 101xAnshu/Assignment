import { useState, useEffect } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api/expenses";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = async (expenseData) => {
    try {
      const { data } = await createExpense(expenseData);
      setExpenses([data, ...expenses]);
    } catch (err) {
      throw err.response?.data?.msg || "Failed to create expense";
    }
  };

  const editExpense = async (id, expenseData) => {
    try {
      const { data } = await updateExpense(id, expenseData);
      setExpenses(expenses.map((exp) => (exp._id === id ? data : exp)));
    } catch (err) {
      throw err.response?.data?.msg || "Failed to update expense";
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      throw err.response?.data?.msg || "Failed to delete expense";
    }
  };

  return {
    expenses,
    loading,
    error,
    createExpense: addExpense,
    updateExpense: editExpense,
    deleteExpense: removeExpense,
  };
};

export default useExpenses;
