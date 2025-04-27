import { motion } from "framer-motion";
import ExpenseItem from "./ExpenseItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import { format } from "date-fns";

const ExpenseList = ({ expenses, onEdit, onDelete, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  if (expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-gray-500"
      >
        No expenses found. Add your first expense to get started!
      </motion.div>
    );
  }

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = format(new Date(expense.date), "MMMM d, yyyy");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedExpenses).map(([date, dailyExpenses]) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-2">{date}</h3>
          <div className="space-y-2">
            {dailyExpenses.map((expense) => (
              <ExpenseItem
                key={expense._id}
                expense={expense}
                onEdit={() => onEdit(expense)}
                onDelete={() => onDelete(expense._id)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExpenseList;
