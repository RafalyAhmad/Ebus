import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/loginpage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import FilmPage from "./Pages/film.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import ReviewPage from "./Pages/review.jsx";
import ProfilPage from "./Pages/ProfilPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import AboutusPage from "./components/Layouts/layout-profil/aboutUs.jsx";
import EditProfilePage from "./Pages/EditProfilePage.jsx";
import SubscriptionHistoryPage from "./Pages/SubscriptionHistoryPage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
  },
  {
    path: "/product",
    element: (
      <ProtectedRoute>
        <ProductPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/about",
    element: <AboutusPage />,
  },
  {
    path: "/film",
    element: <FilmPage />,
  },
  {
    path: "profil",
    element: (
      <ProtectedRoute>
        <ProfilPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "cart",
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ), // Protected
  },
  {
    path: "profil/edit",
    element: (
      <ProtectedRoute>
        <EditProfilePage />
      </ProtectedRoute>
    ), // Protected
  },
  // {
  //   path: "profil/verify",
  //   element: (
  //     <ProtectedRoute>
  //       <VerifyIdentityPage />
  //     </ProtectedRoute>
  //   ), // Protected
  // },
  {
    path: "profil/history",
    element: (
      <ProtectedRoute>
        <SubscriptionHistoryPage />
      </ProtectedRoute>
    ), // Protected
  },
  // Catch-all route for unmatched paths within the layout
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
