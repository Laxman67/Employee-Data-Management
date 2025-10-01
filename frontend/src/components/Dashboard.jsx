import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EditModal from "../components/EditModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null); // currently editing
  const [isModalOpen, setIsModalOpen] = useState(false); // modal visibility

  useEffect(() => {
    // Fetch initial employee data (could be from an API)

    const fetchEmployees = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`);
      const { data } = await response.json();
      console.log(data);

      setEmployees(data);
    };
    fetchEmployees();
    console.log(employees);
  }, [setEmployees]);
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
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
    handleCloseModal();
  };

  // Add employee
  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  // Delete employee
  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp._id !== id));
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
