// admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin-components/AdminSidebar";
import AdminNavbar from "./admin-components/AdminNavbar";
import { useState } from "react";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3f3]">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-grow flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-48" : "ml-16"
        }`}
      >
        <AdminNavbar isSidebarOpen={isSidebarOpen} />
        <div className="flex-grow overflow-y-auto max-w-full p-6 pt-20">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
