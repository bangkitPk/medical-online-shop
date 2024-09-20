import logo from "@/assets/images/logo.svg";
import { SearchInput } from "./SearchInput";
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between w-screen px-10 py-5 fixed z-50 top-0 bg-background shadow-md">
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
    </nav>
  );
}

export default Navbar;
