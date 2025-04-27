export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Other",
];

export const EXPENSE_FORM_INITIAL_STATE = {
  amount: "",
  category: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};
