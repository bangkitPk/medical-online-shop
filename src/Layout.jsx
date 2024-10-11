import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="absolute top-0 left-0 pt-36 -z-50 w-full bg-[#f9f8f8] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
