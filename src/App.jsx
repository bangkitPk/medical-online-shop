// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
//   useNavigate,
// } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/login.jsx";
// import RegisterPage from "./pages/Register";
// import SearchProductPage from "./pages/SearchProductPage";
// import CartPage from "./pages/CartPage";
// import PaymentPage from "./pages/PaymentPage";
// import Layout from "./Layout.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./config/firebase.config.js";
// import { logoutUser, setUser } from "./redux/slices/authSlice.js";
// import BelanjaPage from "./pages/BelanjaPage.jsx";
// import { fetchCart } from "./redux/thunks/cartThunk.js";
// import { SeedingProducts } from "./seeding/seedingProducts.js";
// import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
// import { fetchOrder } from "./redux/thunks/orderThunk.js";
// import { doc, getDoc } from "firebase/firestore";

// // Import Admin Components
// import AdminLayout from "./admin/AdminLayout.jsx";
// import AdminHomepage from "./admin/admin-pages/AdminHomepage.jsx";
// import CustomerPage from "./admin/admin-pages/CustomerPage.jsx";
// import TokoPage from "./admin/admin-pages/TokoPage.jsx";
// import PesananPage from "./admin/admin-pages/PesananPage.jsx";

// function App() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   // SeedingProducts();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, "Users", user.uid);
//           const userDocSnap = await getDoc(userDocRef);

//           if (userDocSnap.exists()) {
//             const firestoreUserData = userDocSnap.data();
//             const completeUserData = {
//               uid: user.uid,
//               email: user.email,
//               photoURL: user.photoURL,
//               ...firestoreUserData,
//             };
//             dispatch(setUser(completeUserData));
//             dispatch(fetchCart(user.uid));
//             dispatch(fetchOrder(user.uid));

//             // if (firestoreUserData.role === "admin") {
//             //   navigate("/admin");
//             // } else if (firestoreUserData.role === "customer") {
//             //   navigate("/");
//             // }
//           }
//         } catch (error) {
//           console.error("Error fetching user data: ", error);
//         }
//       } else {
//         dispatch(logoutUser());
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   // Fungsi untuk melindungi route admin
//   const adminProtectedRoute = (element) => {
//     if (!user) {
//       // jika user gk ada, alihkan ke login
//       return <Navigate to="/login" />;
//     }

//     if (user.role === "admin") {
//       // jika user admin, buka element
//       return element;
//     }

//     return <Navigate to="/admin" />;
//   };

//   // Fungsi untuk melindungi route customer
//   const customerProtectedRoute = (element) => {
//     if (!user) {
//       // jika user gk ada, alihkan ke login
//       return <Navigate to="/login" />;
//     }

//     if (user.role === "customer") {
//       // jika user customer, buka element
//       return element;
//     }

//     return <Navigate to="/admin" />; // jika user admin, buka admin route
//   };

//   const routes = createBrowserRouter([
//     // Routing untuk customer
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         { path: "/", element: customerProtectedRoute(<HomePage />) },
//         { path: "/belanja", element: customerProtectedRoute(<BelanjaPage />) },
//         {
//           path: "/cari-produk",
//           element: customerProtectedRoute(<SearchProductPage />),
//         },
//         { path: "/keranjang", element: customerProtectedRoute(<CartPage />) },
//         {
//           path: "/keranjang/pembayaran",
//           element: customerProtectedRoute(<PaymentPage />),
//         },
//         {
//           path: "/pesanan",
//           element: customerProtectedRoute(<OrderHistoryPage />),
//         },
//       ],
//     },
//     // Routing untuk admin
//     {
//       path: "/admin",
//       element: adminProtectedRoute(<AdminLayout />),
//       children: [
//         { path: "/admin", element: adminProtectedRoute(<AdminHomepage />) },
//         {
//           path: "/admin/customer",
//           element: adminProtectedRoute(<CustomerPage />),
//         },
//         { path: "/admin/toko", element: adminProtectedRoute(<TokoPage />) },
//         {
//           path: "/admin/pesanan",
//           element: adminProtectedRoute(<PesananPage />),
//         },
//       ],
//     },
//     // Routing umum (Login dan Register)
//     {
//       path: "/login",
//       element: <LoginPage />,
//     },
//     {
//       path: "/register",
//       element: <RegisterPage />,
//     },
//   ]);

//   return (
//     <div className="font-nunito-sans">
//       {user && user.role === "admin" && <Navigate to="/admin" />}
//       {user && user.role === "customer" && <Navigate to="/" />}
//       <RouterProvider router={routes} />
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import SearchProductPage from "./pages/SearchProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import Layout from "./Layout.jsx";
import BelanjaPage from "./pages/BelanjaPage.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminHomepage from "./admin/admin-pages/AdminHomepage.jsx";
import CustomerPage from "./admin/admin-pages/CustomerPage.jsx";
import TokoPage from "./admin/admin-pages/TokoPage.jsx";
import PesananPage from "./admin/admin-pages/PesananPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebase.config.js";
import { logoutUser, setUser } from "./redux/slices/authSlice.js";
import { fetchCart } from "./redux/thunks/cartThunk.js";
import { fetchOrder } from "./redux/thunks/orderThunk.js";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const firestoreUserData = userDocSnap.data();
            const completeUserData = {
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              ...firestoreUserData,
            };
            dispatch(setUser(completeUserData));
            console.log(firestoreUserData.role);
            if (firestoreUserData.role === "customer") {
              dispatch(fetchCart(user.uid));
              dispatch(fetchOrder(user.uid));
            }
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const ProtectedRoute = ({ element, role }) => {
    const authInfo = JSON.parse(localStorage.getItem("auth"));

    if (!authInfo || !authInfo.isAuth) {
      return <Navigate to="/login" />;
    }

    if (role && authInfo.role !== role) {
      return <Navigate to="/unauthorized" />;
    }

    return element;
  };

  return (
    <Router>
      <div className="font-nunito-sans">
        <Routes>
          {/* Routing untuk umum (Guest atau User) */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/belanja"
            element={
              <Layout>
                <BelanjaPage />
              </Layout>
            }
          />
          <Route
            path="/cari-produk"
            element={
              <Layout>
                <SearchProductPage />
              </Layout>
            }
          />

          {/* Routing untuk customer yang diproteksi */}
          <Route
            path="/keranjang"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <CartPage />
                  </Layout>
                }
                role="customer"
              />
            }
          />
          <Route
            path="/keranjang/pembayaran"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <PaymentPage />
                  </Layout>
                }
                role="customer"
              />
            }
          />
          <Route
            path="/pesanan"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <OrderHistoryPage />
                  </Layout>
                }
                role="customer"
              />
            }
          />

          {/* Routing untuk admin yang diproteksi */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={
                  <AdminLayout>
                    <AdminHomepage />
                  </AdminLayout>
                }
                role="admin"
              />
            }
          />
          <Route
            path="/admin/customer"
            element={
              <ProtectedRoute
                element={
                  <AdminLayout>
                    <CustomerPage />
                  </AdminLayout>
                }
                role="admin"
              />
            }
          />
          <Route
            path="/admin/toko"
            element={
              <ProtectedRoute
                element={
                  <AdminLayout>
                    <TokoPage />
                  </AdminLayout>
                }
                role="admin"
              />
            }
          />
          <Route
            path="/admin/pesanan"
            element={
              <ProtectedRoute
                element={
                  <AdminLayout>
                    <PesananPage />
                  </AdminLayout>
                }
                role="admin"
              />
            }
          />

          {/* Routing umum (Login dan Register) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
