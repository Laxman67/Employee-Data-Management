const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.contactNumber}</td>
              <td className="border px-4 py-2">{emp.position}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(emp)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(emp._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
