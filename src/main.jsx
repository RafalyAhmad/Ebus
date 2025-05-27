import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/loginpage.jsx";
import RegisterPage from "./Pages/register.jsx";
import FilmPage from "./Pages/film.jsx";
import ProdukPage from "./Pages/produk.jsx";
import ReviewPage from "./Pages/review.jsx";
import ProfilPage from "./Pages/profil.jsx";
import ProductDetail from "./components/Layouts/productdetail.jsx";
import CartPage from "./Pages/cart.jsx";
import AboutusPage from "./components/Layouts/layout-profil/aboutUs.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
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
    path: "/profil",
    element: <ProfilPage />,
  },
  {
    path: "/product",
    element: <ProdukPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/product/:name",
    element: <ProductDetail />,
  },
  // sub_menu
  {
    path: "/about",
    element: <AboutusPage />,
  },
  {
    path: "/film",
    element: <FilmPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
