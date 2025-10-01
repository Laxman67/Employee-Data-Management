import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

export const getEmployees = (search) =>
  api.get("/employees", { params: { search } }).then((res) => res.data);
export const createEmployee = (emp) =>
  api.post("/employees", emp).then((res) => res.data);
export const updateEmployee = (id, emp) =>
  api.put(`/employees/${id}`, emp).then((res) => res.data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
