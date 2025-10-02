import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({}) => {
  return (
    <div className="container mx-auto p-4">
      {/* <Navbar /> */}

      <header className="bg-blue-500 text-white p-4 flex justify-between items-center mb-6 rounded-lg">
        <h4 className="text-2xl font-bold">Employee Management</h4>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

// /**
//  *  <div>
//   *        {/* Add Employee Button */}
//  *        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
//  *          Add Employee
//  *        </button>
//  *      </div>
//  *
//  */
