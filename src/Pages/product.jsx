import React, { useState } from "react";

// Komponen CardProductHeader
const CardProductHeader = ({ name }) => {
  return (
    <div className="bg-gray-100 text-lg font-bold text-center py-2 border-b border-gray-300">
      {name}
    </div>
  );
};

// Komponen CardProductFooter
const CardProductFooter = ({ price, onAddToCart }) => {
  return (
    <div className="bg-gray-200 text-base font-medium text-center py-2 border-t border-gray-300">
      Price: ${price}
      <button
        className="bg-blue-500 text-white p-2 m-1 rounded"
        onClick={onAddToCart}
      >
        Tambahkan ke Keranjang
      </button>
    </div>
  );
};

// Komponen Utama
const ProductPage = () => {
  const [cart, setCart] = useState(0); // State untuk keranjang

  const handleCart = () => {
    setCart(cart + 1); // Tambahkan 1 ke keranjang
  };

  const products = [
    {
      name: "Sepatu Baru",
      price: "10.000",
    },
    {
      name: "Sepatu Lama",
      price: "5.000",
    },
    {
      name: "Sepatu Nike",
      price: "5.000.000",
    },
  ];

  //Tampilan
  return (
    <div className="d-flex items-center justify-center">
      {/* Daftar Produk */}
      {products.map((product, index) => (
        <div className="my-2 w-72 border rounded shadow" key={index}>
          <CardProductHeader name={product.name} />
          <CardProductFooter price={product.price} onAddToCart={handleCart} />
        </div>
      ))}

      {/* Tampilan Keranjang */}
      <div className="mt-4 p-4 bg-red-100 text-red-600 font-bold rounded">
        Isi Keranjang: {cart}
      </div>
    </div>
  );
};

export default ProductPage;
