import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EditModal from "./components/EditModal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }, []);
  // Open modal to edit employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  // Add employee
  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  // Update employee
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
    handleCloseModal();
  };

  // Delete employee
  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp._id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Employee Management</h1>

      {/* Add Employee Form */}
      <EmployeeForm onAdd={handleAddEmployee} />

      {/* Employee List */}
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
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
}

export default App;
