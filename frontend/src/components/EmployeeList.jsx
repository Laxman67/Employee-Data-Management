const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (!employees.length) {
    return (
      <p className="text-gray-500 text-center py-6">
        No employees found. Add some employees to get started.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Sno.
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Position
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((emp, index) => (
            <tr key={emp._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{emp.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{emp.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {emp.position}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(emp)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(emp._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
