import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ExpenseStats = ({ expenses }) => {
  const [stats, setStats] = useState({
    total: 0,
    categories: {},
    monthlyExpenses: {},
  });
  const [view, setView] = useState("category");

  useEffect(() => {
    if (expenses.length > 0) {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const categories = {};
      const monthlyExpenses = {};

      expenses.forEach((expense) => {
        categories[expense.category] =
          (categories[expense.category] || 0) + expense.amount;

        const month = new Date(expense.date).toLocaleString("default", {
          month: "long",
        });
        monthlyExpenses[month] = (monthlyExpenses[month] || 0) + expense.amount;
      });

      setStats({ total, categories, monthlyExpenses });
    }
  }, [expenses]);

  const categoryData = {
    labels: Object.keys(stats.categories),
    datasets: [
      {
        data: Object.values(stats.categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const monthlyData = {
    labels: Object.keys(stats.monthlyExpenses),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(stats.monthlyExpenses),
        backgroundColor: "#4BC0C0",
        borderColor: "#36A2EB",
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-2/3">
          <div className="flex flex-row items-center justify-between px-6 pt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Expense Visualization
            </h3>
            <div className="relative w-40 sm:w-48 md:w-56">
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="
      w-full
      rounded-md border border-gray-300 bg-white
      py-2 pr-10 pl-4 text-gray-700 text-base
      focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500
      transition duration-150 ease-in-out
      appearance-none
    "
              >
                <option value="category">By Category</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6">
            {view === "category" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-md">
                  <div className="h-72">
                    <Pie data={categoryData} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-md">
                  <div className="h-72">
                    <Bar
                      data={monthlyData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </Card>

        <Card className="w-full md:w-1/3">
          <div className="px-6 pt-6">
            <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
          </div>
          <div className="p-6">
            <p className="text-lg text-gray-700">
              <span className="font-medium text-gray-900">Total Expenses:</span>{" "}
              ${stats.total.toFixed(2)}
            </p>
            <div className="space-y-4 mt-4">
              <p className="font-medium text-gray-800 mb-2">By Category:</p>
              <ul className="space-y-2">
                {Object.entries(stats.categories).map(([category, amount]) => (
                  <li
                    key={category}
                    className="flex justify-between text-gray-600 text-lg"
                  >
                    <span>{category}:</span>
                    <span>${amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseStats;
