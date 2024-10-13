import { HandCoins, User } from "lucide-react";
import useFetchCustomers from "../admin-hooks/useFetchCustomers";
import { displayMoney } from "@/helpers/displayMoney";
import useFetchOrders from "../admin-hooks/useFetchOrders";
import useCountOrderTotal from "../admin-hooks/useCountOrderTotal";

// admin/AdminHomepage.jsx
export default function AdminHomepage() {
  const { customers } = useFetchCustomers();
  const { processedOrdersCount } = useFetchOrders();
  const { totalPenjualan } = useCountOrderTotal();

  return (
    <div className="admin-layout min-h-full flex flex-col bg-white p-6">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Selamat Datang, Admin!
        </h1>
      </header>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-primary text-white rounded-lg shadow-md p-4 flex items-center">
          <div className="flex-shrink-0">
            <User className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Total Pengguna</h2>
            <p className="text-2xl">{customers.length}</p>
          </div>
        </div>

        <div className="bg-success text-white rounded-lg shadow-md p-4 flex items-center">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12h10M7 12l5-5m0 0l5 5m-5-5v18"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Pesanan Diproses</h2>
            <p className="text-2xl">{processedOrdersCount}</p>
          </div>
        </div>

        <div className="bg-warning text-white rounded-lg shadow-md p-4 flex items-center">
          <div className="flex-shrink-0">
            <HandCoins className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Total Penjualan</h2>
            <p className="text-2xl">{displayMoney(totalPenjualan)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
