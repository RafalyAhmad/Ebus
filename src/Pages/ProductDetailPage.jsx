import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  initiatePurchase,
  hasActiveSubscription,
  formatRupiah,
} from "../utils/commerce";
import { isAuthenticated, getCurrentUser } from "../utils/auth";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = getCurrentUser();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchProductAndSubscriptionStatus = async () => {
      try {
        setLoading(true);
        const foundProduct = await getProductById(id);
        setProduct(foundProduct);

        if (foundProduct && isAuthenticated() && currentUser) {
          const subscribed = await hasActiveSubscription(
            currentUser.id,
            foundProduct.id
          );
          setIsSubscribed(subscribed);
        }
      } catch (error) {
        setMessage("Gagal memuat detail produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSubscriptionStatus();
  }, [id, currentUser]);

  const handlePurchase = async (priceTier) => {
    if (!isAuthenticated() || !currentUser) {
      setMessage("Silakan masuk untuk melakukan pembelian.");
      return;
    }

    setMessage("Memulai pembelian...");
    const result = await initiatePurchase(
      product.id,
      priceTier,
      currentUser.id
    );
    if (result.success) {
      setMessage(
        `Pembelian berhasil! Nomor Pesanan: ${result.orderId}. Anda sekarang dapat mengakses layanan Anda.`
      );
      setIsSubscribed(true);
    } else {
      setMessage(`Pembelian gagal: ${result.message}`);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-xl text-gray-700">Memuat detail produk...</p>
  //     </div>
  //   );
  // }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
        Detail {product.name}
      </h1>
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-48 h-48 rounded-lg shadow-md flex-shrink-0"
        />
        <div className="flex-grow text-center md:text-left">
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Fitur Unggulan:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Pilihan Harga:
            </h3>
            {product.price_tiers.map((tier) => (
              <div
                key={tier.duration_months}
                className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-2 shadow-sm"
              >
                <div className="mb-2 sm:mb-0 text-center sm:text-left">
                  <p className="font-bold text-xl">
                    {tier.duration_months} Bulan
                  </p>
                  {tier.promo_tag && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {tier.promo_tag}
                    </span>
                  )}
                </div>
                <div className="text-center sm:text-right mb-2 sm:mb-0">
                  <p className="text-red-500 line-through text-sm">
                    {formatRupiah(tier.original_price_idr)}
                  </p>
                  <p className="text-blue-600 font-bold text-2xl">
                    {formatRupiah(tier.price_idr)}
                  </p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  onClick={() => handlePurchase(tier)}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "Sudah Berlangganan" : "Beli Sekarang"}
                </button>
              </div>
            ))}
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.includes("gagal")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              } mt-4 text-center`}
            >
              {message}
            </div>
          )}

          <div className="text-sm text-gray-500 mt-4 text-center md:text-left">
            Rating: ⭐ {product.rating} ({product.reviews_count} ulasan)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
