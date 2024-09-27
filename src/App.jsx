import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/Register";
import SearchProductPage from "./pages/SearchProductPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import Layout from "./Layout.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.config.js";
import { setUser } from "./redux/slices/authSlice.js";
import BelanjaPage from "./pages/BelanjaPage.jsx";
import { fetchCart } from "./redux/thunks/cartThunk.js";
import { SeedingProducts } from "./seeding/seedingProducts.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/belanja", element: <BelanjaPage /> },
      { path: "/cari-produk", element: <SearchProductPage /> },
      { path: "/keranjang", element: <CartPage /> },
      { path: "/keranjang/pembayaran", element: <PaymentPage /> },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  // SeedingProducts();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        };
        dispatch(setUser(userData));
        dispatch(fetchCart(user.uid));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="font-nunito-sans">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
