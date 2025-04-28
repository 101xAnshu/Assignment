const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const cron = require("node-cron");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://expense-assignment.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.get("/hello", (req, res) => {
  res.status(200).json({ status: "running" });
});

// Set up cron job to hit /hello every 10 minutes
const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
cron.schedule("*/10 * * * *", async () => {
  try {
    const response = await axios.get(`${serverUrl}/hello`);
    console.log(
      "Cron job executed successfully. Server status:",
      response.data.status
    );
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with error status:",
        error.response.status
      );
    } else if (error.request) {
      console.error("No response received:", error.message);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => res.send("Expense Tracker API"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
