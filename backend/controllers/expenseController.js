const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    const newExpense = new Expense({
      amount,
      category,
      description,
      date,
      user: req.user.id,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, description, date },
      { new: true }
    );
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });

    if (!expense.user || expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: "Expense removed" });
  } catch (err) {
    console.error("DELETE Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense };
