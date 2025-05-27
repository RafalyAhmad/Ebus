import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";

const productsData = {
  Netflix: 50000,
  "Disney Hotstar": 40000,
  VIU: 30000,
  WeTV: 25000,
};

const ProductList = ({ title, price, addToCart }) => {
  const formattedTitle = encodeURIComponent(title.trim());

  return (
    <div className="flex flex-col items-center bg-gray-300 my-3 p-5 w-64 rounded-lg shadow-md">
      {/* Nama produk bisa diklik untuk masuk ke halaman detail */}
      <Link
        to={`/product/${formattedTitle}`}
        className="text-blue-500 underline"
      >
        <h1 className="text-lg font-bold">{title}</h1>
      </Link>
      <p className="text-gray-700">Rp{price.toLocaleString()}</p>
      <button
        onClick={() => addToCart(title)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Simpan
      </button>
    </div>
  );
};

const ProdukPage = () => {
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    return Object.values(cart).reduce((acc, qty) => acc + qty, 0);
  });

  const [showNotif, setShowNotif] = useState(false);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[product] = (cart[product] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));

    setCartCount(Object.values(cart).reduce((acc, qty) => acc + qty, 0));

    // Tampilkan notifikasi
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1500);
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(productsData).map((product, index) => (
          <ProductList
            key={index}
            title={product}
            price={productsData[product]}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Notifikasi saat produk ditambahkan */}
      {showNotif && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          ✅ Barang ditambahkan ke keranjang!
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProdukPage;
