import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, getCurrentUser } from "../utils/auth";
import { getAllProducts, formatRupiah } from "../utils/commerce";

const SubscriptionHistoryPage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    const loadSubscriptionHistory = async () => {
      setLoading(true);
      setError(null);
      const currentUser = getCurrentUser();

      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const profileResult = await fetchUserProfile();
        if (profileResult.success && profileResult.data) {
          setUserProfile(profileResult.data);

          const allProducts = await getAllProducts();
          const userSubscriptions = profileResult.data.subscriptions;

          const detailedHistory = userSubscriptions
            .map((subId) => {
              const product = allProducts.find((p) => p.id === subId);
              if (product) {
                return {
                  id: subId,
                  name: product.name,
                  image_url: product.image_url,
                  tier_description:
                    product.price_tiers[0]?.tier_description ||
                    "Langganan Premium",
                  price: product.price_tiers[0]?.price_idr || 0,
                  purchaseDate: new Date(
                    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("id-ID"),
                  status: "Aktif",
                };
              }
              return null;
            })
            .filter(Boolean);

          setHistoryItems(detailedHistory);
        } else {
          setError(
            profileResult.message || "Failed to load subscription history."
          );
        }
      } catch (error) {
        setError(
          "An unexpected error occurred while loading subscription history."
        );
      } finally {
        setLoading(false);
      }
    };
    loadSubscriptionHistory();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <p className="text-xl text-gray-700">Memuat riwayat berlangganan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <p className="text-xl text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Riwayat Berlangganan
          </h2>

          {historyItems.length > 0 ? (
            <div className="space-y-4">
              {historyItems.map((item) => (
                <div
                  key={item.id + item.purchaseDate}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-md mr-4 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.tier_description} ({item.status})
                    </p>
                    <p className="text-gray-500 text-xs">
                      Tanggal Pembelian: {item.purchaseDate}
                    </p>
                  </div>
                  <span className="text-blue-600 font-bold ml-auto">
                    {formatRupiah(item.price)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg py-10">
              Anda belum memiliki riwayat berlangganan.
              <Link
                to="/product"
                className="block text-blue-600 mt-2 hover:underline"
              >
                Mulai Berlangganan Sekarang!
              </Link>
            </div>
          )}

          <Link
            to="/profil"
            className="block text-center text-blue-600 mt-8 hover:underline"
          >
            Kembali ke Profil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHistoryPage;
