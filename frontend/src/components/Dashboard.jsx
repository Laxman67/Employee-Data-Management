import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EditModal from "../components/EditModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`);
      const { data } = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Edit handlers
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  // Update employee
  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${updatedEmployee._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );
      if (!response.ok) throw new Error("Failed to update employee");
      await response.json();
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Add employee
  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error("Failed to add employee");
      fetchEmployees();
      setAddEmployeeModal(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete employee");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">
            Total Employees: {employees.length}
          </span>
        </header>

        {/* Add Employee */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="bg-blue-500 text-2xl font-semibold mb-4">
            Add New Employee
          </h2>
          {addEmployeeModal && (
            <EmployeeForm
              onAdd={handleAddEmployee}
              addEmployeeModal={addEmployeeModal}
            />
          )}
          <button
            onClick={() => setAddEmployeeModal(!addEmployeeModal)}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            {addEmployeeModal ? "Close Form" : "Add Employee"}
          </button>
        </div>

        {/* Employee List */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Employee List</h2>
          <EmployeeList
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
            <EditModal
              employee={editingEmployee}
              onUpdate={handleUpdateEmployee}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
