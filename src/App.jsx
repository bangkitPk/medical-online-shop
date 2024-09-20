import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/Register";
import SearchProductPage from "./pages/SearchProductPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import Layout from "./Layout.jsx";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Layout>
//         <HomePage />
//       </Layout>
//     ),
//   },
//   { path: "/register", element: <RegisterPage /> },
//   { path: "/login", element: <LoginPage /> },
//   {
//     path: "/search-product",
//     element: (
//       <Layout>
//         <SearchProductPage />
//       </Layout>
//     ),
//   },
//   {
//     path: "/cart",
//     element: (
//       <Layout>
//         <CartPage />
//       </Layout>
//     ),
//   },
//   {
//     path: "/cart/payment",
//     element: (
//       <Layout>
//         <PaymentPage />
//       </Layout>
//     ),
//   },
// ]);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search-product", element: <SearchProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/cart/payment", element: <PaymentPage /> },
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
  return (
    <div className="font-nunito-sans">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
