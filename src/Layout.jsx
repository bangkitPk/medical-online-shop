import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="absolute top-0 pt-36 -z-50">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
