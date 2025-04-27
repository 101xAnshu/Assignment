import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../ui/Button";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const { amount, category, description, date } = expense;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center"
    >
      <div>
        <div className="flex items-center space-x-4">
          <div
            className={`w-3 h-3 rounded-full ${
              amount > 100 ? "bg-red-500" : "bg-green-500"
            }`}
          ></div>
          <div>
            <h4 className="font-medium text-gray-800">{category}</h4>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-semibold">${amount.toFixed(2)}</span>
        <div className="flex space-x-2">
          <Button variant="icon" onClick={onEdit}>
            <FaEdit className="text-blue-500" />
          </Button>
          <Button variant="icon" onClick={onDelete}>
            <FaTrash className="text-red-500" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseItem;
