import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({}) => {
  return (
    <div className="container mx-auto p-4">
      {/* <Navbar /> */}
      <h1>Navbar</h1>

      <header className="bg-blue-500 text-white p-4">
        <h4 className="text-2xl font-bold">Employee Management</h4>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
