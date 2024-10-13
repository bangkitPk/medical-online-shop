// admin-components/AdminSidebar.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation for routing
import {
  Home,
  User,
  Store,
  ShoppingCart,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/config/firebase.config";
import { logoutUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function AdminSidebar({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation(); // Get the current location
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // dispatch(logoutUser());

    try {
      await auth.signOut();
      localStorage.removeItem("auth");
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  const menus = [
    {
      name: "Home",
      icon: <Home size={15} className="mr-2" />,
      href: "/admin",
    },
    {
      name: "Customer",
      icon: <User size={15} className="mr-2" />,
      href: "/admin/customer",
    },
    {
      name: "Toko",
      icon: <Store size={15} className="mr-2" />,
      href: "/admin/toko",
    },
    {
      name: "Pesanan",
      icon: <ShoppingCart size={15} className="mr-2" />,
      href: "/admin/pesanan",
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-secondary border-r-2 border-r-primary ${
        isSidebarOpen ? "w-48" : "w-16"
      }`}
    >
      {/* Sidebar Menu */}
      <div className="md:px-4 sm:p-0 mt-5 overflow-y-auto h-full">
        {menus.map((menu) => (
          <div key={menu.name}>
            <a
              href={menu.href}
              className={`flex text-xs h-10 my-2 items-center p-4 rounded-md ${
                location.pathname === menu.href
                  ? "bg-primary text-white" // Active style
                  : "bg-white dark:bg-background hover:bg-gray-200" // Default hover style
              }`}
            >
              <div className={`w-6 ${!isSidebarOpen && "-translate-x-2"}`}>
                {menu.icon}
              </div>
              {isSidebarOpen && <span>{menu.name}</span>}
            </a>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-0 p-4 w-full">
        <Button
          onClick={handleLogout}
          className="w-full flex justify-start text-xs font-normal h-10 bg-destructive text-white items-center p-4 hover:bg-red-600 transition-colors rounded-md"
        >
          <LogOut
            size={15}
            className={`mr-2 ${!isSidebarOpen && "-translate-x-2"} `}
          />
          {isSidebarOpen && <span>Logout</span>}
        </Button>
      </div>

      {/* Toggle button aligned to the right */}
      <Button
        variant="ghost"
        className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 -right-0 translate-x-full
         p-2 bg-white rounded-md m-4`}
        onClick={toggleSidebar}
      >
        <ChevronRight
          size={24}
          className={`transition-transform duration-300 ${
            isSidebarOpen ? "rotate-180" : ""
          }`}
        />
      </Button>
    </div>
  );
}
