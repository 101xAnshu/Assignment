const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Expense Tracker API"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
