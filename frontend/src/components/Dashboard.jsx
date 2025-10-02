import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EditModal from "../components/EditModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null); // currently editing
  const [isModalOpen, setIsModalOpen] = useState(false); // modal visibility

  // Fetch initial employee data (could be from an API)

  const fetchEmployees = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/`);
    const { data } = await response.json();
    console.log(data);

    setEmployees(data);
  };
  useEffect(() => {
    fetchEmployees();
    console.log(employees);
  }, []);
  // When user clicks "Edit"
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true); // open modal
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  // Update employee after editing
  const handleUpdateEmployee = async (updatedEmployee) => {
    console.log(updatedEmployee);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${updatedEmployee._id}`,
        {
          method: "PUT", // backend expects PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const data = await response.json();
      console.log(data);

      fetchEmployees(); // refresh employee list
      handleCloseModal(); // close modal
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Add employee
  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
      fetchEmployees(); // refresh employee list
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

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      fetchEmployees(); // refresh employee list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  return (
    <div>
      {/* Add Employee Form */}
      <EmployeeForm onAdd={handleAddEmployee} />
      {/* Employee List */}
      <EmployeeList
        employees={employees}
        onEdit={handleEdit} // click edit triggers modal
        onDelete={handleDelete}
      />
      {/* Edit Modal */}
      {isModalOpen && editingEmployee && (
        <EditModal
          employee={editingEmployee}
          onUpdate={handleUpdateEmployee}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
