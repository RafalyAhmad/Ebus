import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { formatRupiah, processPayment } from "../utils/commerce"; // Import processPayment
import { isAuthenticated, getCurrentUser } from "../utils/auth"; // Import auth utilities
import Footer from "../components/Fragments/Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "app_netflix_premium",
      name: "Netflix Premium Plan",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
      price: 119000,
      quantity: 1,
      tier_description: "1 Bulan",
    },
    {
      id: "app_spotify_family",
      name: "Spotify Family Premium",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
      price: 79000,
      quantity: 2,
      tier_description: "1 Bulan",
    },
    {
      id: "app_canva_pro",
      name: "Canva Pro",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/3/30/Canva_Logo.svg",
      price: 120000,
      quantity: 1,
      tier_description: "12 Bulan",
    },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentMessageType, setPaymentMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();
  const currentUser = getCurrentUser(); // Get current user

  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newTotal = newSubtotal + shippingCost;
    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, [cartItems, shippingCost]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated() || !currentUser) {
      setPaymentMessage("Anda harus login untuk melanjutkan pembayaran.");
      setPaymentMessageType("error");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login
      return;
    }

    if (cartItems.length === 0) {
      setPaymentMessage(
        "Keranjang Anda kosong. Tambahkan item sebelum checkout."
      );
      setPaymentMessageType("error");
      return;
    }

    setPaymentLoading(true);
    setPaymentMessage("Memproses pembayaran Anda...");
    setPaymentMessageType("");

    try {
      const result = await processPayment(cartItems, currentUser.id, total);
      if (result.success) {
        setPaymentMessage(
          result.message + ` Transaksi ID: ${result.transactionId}`
        );
        setPaymentMessageType("success");
        setCartItems([]); // Clear cart after successful payment
        // You might redirect to an order confirmation page here
        setTimeout(() => navigate("/profil"), 3000); // Example: go to profile page
      } else {
        setPaymentMessage(result.message);
        setPaymentMessageType("error");
      }
    } catch (error) {
      setPaymentMessage(
        "Terjadi kesalahan tak terduga saat memproses pembayaran."
      );
      setPaymentMessageType("error");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (
    cartItems.length === 0 &&
    !paymentLoading &&
    paymentMessageType !== "success"
  ) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[calc(100vh-180px)] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Keranjang Anda Kosong
        </h2>
        <p className="text-gray-600 mb-6">
          Sepertinya Anda belum menambahkan layanan apa pun ke keranjang.
        </p>
        <Link
          to="/product"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Lihat Semua Produk
        </Link>
        {paymentMessage && (
          <div
            className={`p-3 mt-4 rounded-md text-center ${
              paymentMessageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {paymentMessage}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Keranjang Belanja Anda
      </h1>

      {paymentMessage && (
        <div
          className={`p-3 mb-6 rounded-md text-center ${
            paymentMessageType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {paymentMessage}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">
            Item di Keranjang ({cartItems.length})
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 py-4 last:border-b-0"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4 flex-shrink-0"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm">{item.tier_description}</p>
                <p className="text-blue-600 font-bold text-md mt-1">
                  {formatRupiah(item.price)}
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-auto">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  disabled={paymentLoading}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  disabled={paymentLoading}
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors ml-4"
                  title="Hapus item"
                  disabled={paymentLoading}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">
            Ringkasan Pesanan
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Ongkos Kirim</span>
              <span>{formatRupiah(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-3 mt-3">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={paymentLoading || cartItems.length === 0}
          >
            {paymentLoading ? "Memproses..." : "Lanjutkan ke Pembayaran"}
          </button>
          <Link
            to="/product"
            className="block text-center text-blue-600 mt-4 hover:underline transition duration-200"
          >
            Lanjutkan Belanja
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
