// admin-components/AdminNavbar.jsx
export default function AdminNavbar({ isSidebarOpen }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-7 bg-white shadow-md z-10 transition-all duration-300 ${
        isSidebarOpen ? "ml-48" : "ml-16"
      }`}
    >
      <h1 className="text-xl font-bold text-gray-800">
        Panel Admin MedCareShop
      </h1>
    </nav>
  );
}
