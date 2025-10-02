import React, { useState } from "react";

const EmployeeForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // reset all fields
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      position: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Position</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="QA">QA</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
