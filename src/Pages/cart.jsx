import React, { useState, useEffect } from "react";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";

const productsData = {
  Netflix: 50000,
  "Disney Hotstar": 40000,
  VIU: 30000,
  WeTV: 25000,
};

const CartPage = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(storedCart);
  }, []);

  const removeFromCart = (product) => {
    const updatedCart = { ...cart };
    if (updatedCart[product] > 1) {
      updatedCart[product] -= 1;
    } else {
      delete updatedCart[product];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalHarga = Object.entries(cart).reduce(
    (total, [product, quantity]) => total + productsData[product] * quantity,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="my-5 p-4 bg-white shadow-md rounded-lg mx-auto max-w-md">
        <h2 className="text-xl font-bold mb-3">Keranjang Belanja</h2>
        {Object.keys(cart).length > 0 ? (
          <>
            <ul>
              {Object.entries(cart).map(([item, quantity]) => (
                <li key={item} className="flex justify-between border-b py-2">
                  <span>
                    {item} x{quantity} - Rp
                    {(productsData[item] * quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold text-lg">
              Total: Rp{totalHarga.toLocaleString()}
            </div>
          </>
        ) : (
          <p>Keranjang masih kosong.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
