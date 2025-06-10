import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, formatRupiah } from "../utils/commerce";
import { SearchContext } from "../contexts/SearchProvider";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Gagal memuat produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearchTerm) ||
        product.description.toLowerCase().includes(lowercasedSearchTerm) ||
        product.category.toLowerCase().includes(lowercasedSearchTerm) ||
        product.provider.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 font-medium">Memuat produk...</p>
          <p className="text-sm text-gray-500 mt-2">Tunggu sebentar ya...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-lg text-red-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const bestSellingProduct = products.reduce(
    (prev, current) =>
      (prev.rating * prev.reviews_count || 0) >
      (current.rating * current.reviews_count || 0)
        ? prev
        : current,
    products[0]
  );

  const popularProducts = products.filter((p) => p.is_popular).slice(0, 6);
  const promoProducts = products
    .filter((p) => p.price_tiers.some((tier) => tier.promo_tag))
    .slice(0, 6);

  // Search Results View
  if (searchTerm && filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="text-gray-400 text-6xl mb-6">🔍</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Hasil Pencarian untuk "{searchTerm}"
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Maaf, tidak ada produk yang cocok dengan pencarian Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Lihat Semua Produk
              </button>
              <Link
                to="/categories"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Jelajahi Kategori
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (searchTerm) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Hasil Pencarian untuk "{searchTerm}"
            </h2>
            <p className="text-gray-600">
              Ditemukan {filteredProducts.length} produk
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 group-hover:shadow-lg group-hover:border-gray-300 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={product.name}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-sm px-2 py-1 rounded-full flex items-center">
                        ⭐ {product.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold text-lg">
                        {formatRupiah(product.price_tiers[0].price_idr)}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.provider}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Homepage View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Best Selling Product */}
      {bestSellingProduct && (
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Produk <span className="text-blue-200">Terlaris</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Aplikasi premium pilihan jutaan pengguna
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={bestSellingProduct.image_url}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-2xl border-4 border-white/30"
                      alt={bestSellingProduct.name}
                    />
                    {bestSellingProduct.price_tiers[0]?.promo_tag && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {bestSellingProduct.price_tiers[0].promo_tag}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <div className="mb-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {bestSellingProduct.name}
                    </h2>
                    <p className="text-lg text-blue-200 font-medium">
                      by {bestSellingProduct.provider}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-medium">
                        ⭐ {bestSellingProduct.rating} (
                        {bestSellingProduct.reviews_count} ulasan)
                      </span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-medium">
                        Mulai dari{" "}
                        {formatRupiah(
                          bestSellingProduct.price_tiers[0].price_idr
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-blue-100 mb-8 max-w-2xl">
                    {bestSellingProduct.description.substring(0, 200)}...
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to={`/product/${bestSellingProduct.id}`}
                      className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                      Beli Sekarang
                    </Link>
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold border border-white/30 transition-all duration-300">
                      Simpan untuk Nanti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Popular Products Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Produk <span className="text-blue-600">Populer</span>
            </h2>
            <p className="text-lg text-gray-600">
              Aplikasi premium yang paling banyak dipilih pengguna
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 group-hover:shadow-xl group-hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                        ⭐ {product.rating}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        POPULER
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {formatRupiah(product.price_tiers[0].price_idr)}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {product.provider}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {popularProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to="/product"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Lihat Semua Produk
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </section>

        {promoProducts.length > 0 && (
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                🔥 <span className="text-green-600">Promo Menarik</span>
              </h2>
              <p className="text-lg text-gray-600">
                Hemat lebih banyak dengan penawaran terbatas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promoProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-green-200 group-hover:shadow-xl group-hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative inline-block mb-6">
                      <img
                        src={product.image_url}
                        className="w-24 h-24 mx-auto rounded-2xl border-4 border-green-200 group-hover:border-green-300 transition-colors"
                        alt={product.name}
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        {product.price_tiers[0].discount_percentage}% OFF
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="mb-4">
                      <p className="text-lg text-green-600 font-bold">
                        {formatRupiah(product.price_tiers[0].price_idr)}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        {formatRupiah(
                          product.price_tiers[0].original_price_idr
                        )}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg">
                      Dapatkan Promo
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
