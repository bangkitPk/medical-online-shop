import logo from "@/assets/images/logo.svg";
import { SearchInput } from "./SearchInput";
import { User, LogOut, ShoppingCart, CreditCard, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase.config";
import { navLinks } from "./navLinks";
import { resetCart } from "@/redux/slices/cartSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { resetOrder } from "@/redux/slices/orderSlice";

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [hide, setHide] = useState(false);
  const [onTop, setOnTop] = useState(true);
  const navbar = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const scrollHandler = () => {
  //   if (navbar.current && window.screen.width > 480) {
  //     if (window.pageYOffset >= 70) {
  //       navbar.current.classList.remove("py-7");
  //       navbar.current.classList.add(
  //         "fixed",
  //         "z-50",
  //         "top-0",
  //         "animate-slide-down",
  //         "fill-mode-forwards",
  //         "py-3",
  //         "shadow-md"
  //       );
  //     } else {
  //       navbar.current.classList.remove(
  //         "fixed",
  //         "z-50",
  //         "top-0",
  //         "animate-slide-down",
  //         "fill-mode-forwards",
  //         "py-3",
  //         "shadow-md"
  //       );
  //       navbar.current.classList.add("py-7");
  //     }
  //   }
  // };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos === 0) {
      // At the top of the page, reset to original state with no animation
      navbar.current.classList.remove(
        "animate-slide-up",
        "animate-slide-down",
        "fill-mode-forwards",
        "fixed",
        "top-0",
        "z-40",
        "shadow-md",
        "py-3"
      );
      navbar.current.classList.add("py-7");
    } else if (prevScrollPos > currentScrollPos && currentScrollPos > 70) {
      // Scrolling up, show navbar with animation
      navbar.current.classList.add(
        "fixed",
        "top-0",
        "z-40",
        "shadow-md",
        "animate-slide-down",
        "fill-mode-forwards",
        "py-3"
      );
      navbar.current.classList.remove("animate-slide-up", "py-7");
    } else if (prevScrollPos < currentScrollPos && currentScrollPos > 70) {
      // Scrolling down, hide navbar with animation
      navbar.current.classList.add("animate-slide-up");
      navbar.current.classList.remove(
        "animate-slide-down",
        "py-7",
        "shadow-md"
      );
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = async () => {
    // dispatch(logoutUser());

    try {
      await auth.signOut();
      localStorage.removeItem("auth");
      dispatch(logoutUser());
      dispatch(resetCart());
      dispatch(resetOrder());
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav
      ref={navbar}
      className={`flex items-center justify-between w-full max-sm:px-5 px-10 py-7 bg-background`}
    >
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((link) => (
              <DropdownMenuItem>
                <NavLink
                  key={link.key}
                  to={link.path}
                  style={({ isActive }) => {
                    return isActive ? { color: "plum" } : {};
                  }}
                  className="hover:bg-accent px-3 py-3 sm:hidden w-full"
                >
                  {link.text}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img src={logo} className="w-10 max-sm:hidden" alt="logo" />
      {navLinks.map((link) => (
        <NavLink
          key={link.key}
          to={link.path}
          style={({ isActive }) => {
            return isActive ? { color: "plum" } : {};
          }}
          className="hover:bg-accent px-3 py-3 max-sm:hidden"
        >
          {link.text}
        </NavLink>
      ))}
      <SearchInput />
      <NavLink to="/keranjang" className="relative hover:bg-accent px-3 py-3 ">
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
            {/* <span>Welcome, {user.displayName}</span> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/pesanan")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Riwayat Pesanan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer bg-destructive text-destructive-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md bg-destructive text-white hover:bg-destructive/70"
            >
              Logout
            </Button> */}
          </>
        ) : (
          <div className="max-sm:flex max-sm:flex-col">
            <NavLink
              to="/register"
              className="px-3 py-2 max-sm:p-1 rounded-md hover:bg-gray-200"
            >
              Daftar
            </NavLink>
            <NavLink
              to="/login"
              className="px-3 py-2 max-sm:p-1 rounded-md hover:bg-gray-200"
            >
              Masuk
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
