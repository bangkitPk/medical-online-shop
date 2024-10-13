import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="absolute top-0 left-0 max-sm:pt-28 pt-36 bg-[#f5f3f3] -z-50 w-full min-h-screen">
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
