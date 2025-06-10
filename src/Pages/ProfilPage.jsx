import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, fetchUserProfile, logoutUser } from "../utils/auth";
import { getAllProducts } from "../utils/commerce";
import Footer from "../components/Fragments/Footer";

const ProfilPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribedProducts, setSubscribedProducts] = useState([]);
  const [logoutMessage, setLogoutMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      const loggedInUser = getCurrentUser();

      if (!loggedInUser) {
        setError("Anda belum login. Silakan login terlebih dahulu.");
        setLoading(false);
        navigate("/login");
        return;
      }

      setCurrentUser(loggedInUser);

      try {
        const profileResult = await fetchUserProfile();
        if (profileResult.success) {
          setUserProfile(profileResult.data);

          const allProducts = await getAllProducts();
          const userSubs = profileResult.data.subscriptions;

          const detailedSubscriptions = userSubs
            .map((subId) => {
              const product = allProducts.find((p) => p.id === subId);
              return product
                ? {
                    id: product.id,
                    name: product.name,
                    image_url: product.image_url,
                    tier_info: "Berlangganan",
                    duration_months: 3,
                  }
                : null;
            })
            .filter(Boolean);

          setSubscribedProducts(detailedSubscriptions);
        } else {
          setError(profileResult.message || "Gagal memuat data profil.");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat profil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true);
    setLogoutMessage("");
    try {
      const result = await logoutUser();
      if (result.success) {
        setLogoutMessage("Logout berhasil! Anda akan diarahkan.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setLogoutMessage(result.message || "Logout gagal.");
      }
    } catch (err) {
      setLogoutMessage("Terjadi kesalahan saat logout.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Single Column, Desktop: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Info Card - Mobile: Full width, Desktop: Left sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
              {/* Logout Message */}
              {logoutMessage && (
                <div
                  className={`p-3 mb-4 rounded-lg text-center text-sm font-medium ${
                    logoutMessage.includes("berhasil")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {logoutMessage}
                </div>
              )}

              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src="https://via.placeholder.com/120"
                    alt="Profil Pengguna"
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-blue-100 shadow-lg mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4 mb-1">
                  {userProfile?.name || "Pengguna"}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {userProfile?.email}
                </p>

                <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {subscribedProducts.length} Aplikasi Premium
                </div>
              </div>

              {/* Quick Stats - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {subscribedProducts.length}
                    </div>
                    <div className="text-xs text-gray-500">Berlangganan</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-xs text-gray-500">Bulan Aktif</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Subscribed Apps Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Aplikasi Premium Saya
                </h3>
                {subscribedProducts.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {subscribedProducts.length} Aktif
                  </span>
                )}
              </div>

              {subscribedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {subscribedProducts.map((app) => (
                    <div key={app.id} className="group">
                      <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200 border border-gray-100 hover:border-gray-200">
                        <img
                          src={app.image_url}
                          alt={app.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        <p className="text-sm font-medium text-gray-900 truncate mb-1">
                          {app.name}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {app.duration_months
                            ? `${app.duration_months} Bulan`
                            : app.tier_info}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📱</div>
                  <p className="text-gray-500 mb-4">
                    Belum ada aplikasi premium
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Jelajahi Aplikasi
                  </Link>
                </div>
              )}
            </div>

            {/* Settings & Information Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Pengaturan & Informasi
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/profil/edit"
                  className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-purple-500 p-3 rounded-xl text-white group-hover:bg-purple-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ubah Profil</p>
                      <p className="text-sm text-gray-500">
                        Edit informasi pribadi
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link
                  to="/profil/verify"
                  className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-yellow-500 p-3 rounded-xl text-white group-hover:bg-yellow-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Verifikasi Identitas
                      </p>
                      <p className="text-sm text-gray-500">
                        Verifikasi akun Anda
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link
                  to="/profil/history"
                  className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-green-500 p-3 rounded-xl text-white group-hover:bg-green-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Riwayat Berlangganan
                      </p>
                      <p className="text-sm text-gray-500">
                        Lihat riwayat transaksi
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link
                  to="/about"
                  className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-blue-500 p-3 rounded-xl text-white group-hover:bg-blue-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Tentang Aplikasi
                      </p>
                      <p className="text-sm text-gray-500">
                        Informasi aplikasi
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              {/* Logout Button - Full width */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full group flex items-center justify-center p-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 p-2 rounded-lg text-white group-hover:bg-red-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{loading ? "Keluar..." : "Keluar dari Akun"}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilPage;
