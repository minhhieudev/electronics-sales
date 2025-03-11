import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Siderbar";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-[minmax(200px,_250px)_1fr] h-screen">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
