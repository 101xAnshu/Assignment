import { useState } from "react";
import { motion } from "framer-motion";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpenseStats from "../components/expenses/ExpenseStats";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import useExpenses from "../hooks/useExpenses";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const {
    expenses,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleSubmit = async (expenseData) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, expenseData);
      } else {
        await createExpense(expenseData);
      }
      setShowForm(false);
      setEditingExpense(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  console.log("This is user object : ", user);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome,{" "}
            {user?.name || (user?.email ? user.email.split("@")[0] : "Guest")}
          </h1>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>Add Expense</Button>
          )}
        </div>

        {showForm && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <ExpenseForm
              expense={editingExpense}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </motion.div>
        )}

        <ExpenseStats expenses={expenses} />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Expenses
          </h2>
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={deleteExpense}
            loading={loading}
            error={error}
          />
        </div>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
