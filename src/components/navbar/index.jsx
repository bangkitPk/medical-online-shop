import logo from "@/assets/images/logo.svg";
import { SearchInput } from "./SearchInput";
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";

function Navbar() {
  const navbar = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.remove("py-7");
        navbar.current.classList.add(
          "fixed",
          "z-50",
          "top-0",
          "animate-slide-down",
          "fill-mode-forwards",
          "py-3"
        );
      } else {
        navbar.current.classList.remove(
          "fixed",
          "z-50",
          "top-0",
          "animate-slide-down",
          "fill-mode-forwards",
          "py-3"
        );
        navbar.current.classList.add("py-7");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      ref={navbar}
      className="flex items-center justify-between w-full px-10 py-7 bg-background shadow-md"
    >
      <img src={logo} className="w-10" alt="logo" />
      <NavLink
        to="/"
        style={({ isActive }) => {
          return isActive ? { color: "plum" } : {};
        }}
      >
        Beranda
      </NavLink>
      <SearchInput />
      <ShoppingCart />
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.displayName}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className="px-3 py-2 rounded-md hover:bg-gray-200"
            >
              Daftar
            </NavLink>
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-md hover:bg-gray-200"
            >
              Masuk
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
