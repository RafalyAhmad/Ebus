import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, formatRupiah } from "../utils/commerce";
import Footer from "../components/Fragments/Footer";

const ProdukPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-700">Memuat semua produk...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-xl text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Jelajahi Semua Layanan Premium
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Temukan berbagai layanan berkualitas tinggi dengan harga
              terjangkau
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center text-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <div className="text-2xl font-bold text-blue-600">
                {products.length}
              </div>
              <div className="text-gray-600">Total Layanan</div>
            </div>
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <div className="text-2xl font-bold text-green-600">⭐ 4.8+</div>
              <div className="text-gray-600">Rating Rata-rata</div>
            </div>
            <div className="w-full sm:w-auto">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="block group"
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl group-hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                    alt={product.name}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-yellow-500 text-sm font-medium">
                      ⭐ {product.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description.length > 80
                      ? `${product.description.substring(0, 80)}...`
                      : product.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatRupiah(product.price_tiers[0].price_idr)}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        Mulai dari
                      </span>
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                      Lihat Detail
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Section (if needed) */}
        {products.length > 12 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProdukPage;
