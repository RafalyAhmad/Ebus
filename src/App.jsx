import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdukPage from "./Pages/produk";
import ProductDetail from "./components/Layouts/productdetail";
import Navbar from "./components/Fragments/Navbar";
import Footer from "./components/Fragments/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/product/:name" />
        {/* Tambahkan halaman 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-red-500">
              404 - Halaman Tidak Ditemukan
            </h1>
          }
        />
      </Routes>
      <div className="p-5">
        <section className="mb-6">
          <h2 className="text-lg font-semibold">
            Produk <span className="text-blue-500">Terlaris</span>
          </h2>
          <div className="bg-white p-4 rounded-lg shadow mt-2 flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
              className="w-16 h-16"
              alt="Netflix"
            />
            <div className="ml-4">
              <h3 className="flex justify-between items-center">
                Netflix
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                  Premium
                </span>
              </h3>
              <p className="text-sm text-blue-500">
                <b>Bulanan</b>
              </p>
              <p className="text-sm text-gray-700">
                ⭐ 4.95 | Mulai dari Rp31.000
              </p>
              <div className="mt-2 space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Beli
                </button>
                <button className="bg-gray-200 px-3 py-1 rounded">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-500">
            Produk Populer
          </h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
              className="rounded-lg"
              alt="Film 1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
              className="rounded-lg"
              alt="Film 2"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
              className="rounded-lg"
              alt="Film 3"
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Promo</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
                className="rounded-lg"
                alt="Film 2"
              />
              <p className="text-sm">Aplikasi Design</p>
              <p className="text-sm">Mulai dari 10.000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
                className="rounded-lg"
                alt="Film 2"
              />
              <p className="text-sm">Aplikasi Streaming</p>
              <p className="text-sm">Mulai dari 30.000</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold">Promo</h2>
          <h2 className="text-lg font-semibold">Promo</h2>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default App;
