import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import employeeRoutes from "./routes/employeeRoutes.js";

configDotenv();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} ${req.ip}`);
  next();
});

// Routes
app.use("/api/employees", employeeRoutes);

app.use((err, req, res, next) => {
  logger.warn("Unhandled Error Occured ", err);
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  logger.info(`Server running on port ${process.env.PORT || 4000}`)
);
