import logo from "@/assets/images/logo.svg";
import { SearchInput } from "./SearchInput";
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase.config";
import { navLinks } from "./navLinks";

function Navbar() {
  const navbar = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const cartProducts = useSelector((state) => state.cart.products);
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

  const handleLogout = async () => {
    // dispatch(logoutUser());

    try {
      await auth.signOut();
      dispatch(logoutUser());
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav
      ref={navbar}
      className="flex items-center justify-between w-full px-10 py-7 bg-background shadow-md"
    >
      <img src={logo} className="w-10" alt="logo" />
      {navLinks.map((link) => (
        <NavLink
          key={link.key}
          to={link.path}
          style={({ isActive }) => {
            return isActive ? { color: "plum" } : {};
          }}
          className="hover:bg-accent px-3 py-3"
        >
          {link.text}
        </NavLink>
      ))}
      <SearchInput />
      <NavLink to="/keranjang" className="relative hover:bg-accent px-3 py-3">
        {user && cartProducts.length > 0 ? (
          <>
            <span className="bg-primary w-4 h-4 rounded-full text-xs flex items-center justify-center text-white absolute -top-1 -right-1">
              {cartProducts.length}
            </span>
          </>
        ) : null}
        <ShoppingCart />
      </NavLink>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.displayName}</span>
            <Button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md bg-destructive text-white hover:bg-destructive/70"
            >
              Logout
            </Button>
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
