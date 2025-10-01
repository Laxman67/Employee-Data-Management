import express from "express";
const employeeRoutes = express.Router();
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

employeeRoutes.get("/", getEmployees);
employeeRoutes.get("/:id", getEmployee);
employeeRoutes.post("/", createEmployee);
employeeRoutes.put("/:id", updateEmployee);
employeeRoutes.delete("/:id", deleteEmployee);

export default employeeRoutes;
