import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../utils/commerce";
import {
  isAuthenticated,
  getCurrentUser,
  fetchUserProfile,
} from "../utils/auth";
import Footer from "../components/Fragments/Footer";
// Remove Footer import as it's handled by MainLayout
// import Footer from "../components/Fragments/Footer";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [allAvailableProducts, setAllAvailableProducts] = useState([]);

  useEffect(() => {
    const fetchReviewsAndUserData = async () => {
      setLoading(true);
      setError(null);
      setFormMessage("");

      const currentUser = getCurrentUser();
      if (isAuthenticated() && currentUser) {
        setLoggedInUser(currentUser);
        try {
          const profileResult = await fetchUserProfile();
          if (profileResult.success && profileResult.data) {
            setUserSubscriptions(profileResult.data.subscriptions || []);
          }
        } catch (err) {
          console.error("Failed to fetch user subscriptions:", err);
        }
      }

      let productsData = [];
      try {
        productsData = await getAllProducts();
        setAllAvailableProducts(productsData);
      } catch (err) {
        setError("Gagal memuat daftar produk.");
        setLoading(false);
        return;
      }

      const mockUsers = [
        {
          name: "Clarissa",
          email: "clarissa@example.com",
          avatar: "https://via.placeholder.com/50/FF6347/FFFFFF?text=CL",
        },
        {
          name: "Budi Santoso",
          email: "budi@example.com",
          avatar: "https://via.placeholder.com/50/4682B4/FFFFFF?text=BS",
        },
        {
          name: "Siti Aminah",
          email: "siti@example.com",
          avatar: "https://via.placeholder.com/50/32CD32/FFFFFF?text=SA",
        },
        {
          name: "Admin Test",
          email: "user@example.com",
          avatar: "https://via.placeholder.com/50/0000FF/FFFFFF?text=AT",
        },
      ];

      const initialReviews = [
        {
          userId: mockUsers[0].email,
          productId: "app_netflix_premium",
          rating: 5,
          comment:
            "Netflix memberikan pengalaman streaming terbaik dengan berbagai konten menarik!",
          timestamp: 1678886400000,
        },
        {
          userId: mockUsers[1].email,
          productId: "app_spotify_family",
          rating: 4,
          comment:
            "Spotify Premium sangat bagus untuk musik, tapi kadang ada glitch kecil.",
          timestamp: 1679059200000,
        },
        {
          userId: mockUsers[2].email,
          productId: "app_adobe_creative_cloud",
          rating: 5,
          comment:
            "Adobe Creative Cloud sangat penting untuk pekerjaan desain saya. Lengkap!",
          timestamp: 1679232000000,
        },
        {
          userId: mockUsers[3].email,
          productId: "app_spotify_family",
          rating: 4,
          comment:
            "Sudah pakai Spotify Family beberapa bulan, puas dengan fitur offline dan kualitas audio.",
          timestamp: 1679404800000,
        },
        {
          userId: mockUsers[3].email,
          productId: "app_netflix_premium",
          rating: 5,
          comment: "Konten Netflix selalu update, tidak pernah bosan!",
          timestamp: 1679577600000,
        },
      ];

      const storedReviews = localStorage.getItem("appReviews");
      const currentReviews = storedReviews
        ? JSON.parse(storedReviews)
        : initialReviews;

      const detailedReviews = currentReviews.map((review) => {
        const user =
          mockUsers.find((u) => u.email === review.userId) ||
          (currentUser && currentUser.email === review.userId
            ? currentUser
            : null);
        const product = productsData.find((p) => p.id === review.productId);
        return {
          ...review,
          userName: user ? user.name : "Pengguna Anonim",
          userAvatar: user
            ? user.avatar
            : `https://via.placeholder.com/50/CCCCCC/FFFFFF?text=?`,
          appName: product ? product.name : "Aplikasi Tidak Dikenal",
          appIcon: product ? product.image_url : "",
        };
      });

      setReviews(detailedReviews);
      setLoading(false);
    };

    fetchReviewsAndUserData();
  }, [navigate]);

  const renderStars = (rating) => {
    return "⭐️".repeat(rating) + "☆".repeat(5 - rating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");
    setFormMessageType("");

    if (!selectedProduct || !comment || rating < 1 || rating > 5) {
      setFormMessage("Harap lengkapi semua kolom dan berikan rating.");
      setFormMessageType("error");
      setIsSubmitting(false);
      return;
    }
    if (!loggedInUser) {
      setFormMessage("Anda harus login untuk menambahkan ulasan.");
      setFormMessageType("error");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newReview = {
        userId: loggedInUser.email,
        productId: selectedProduct,
        rating: parseInt(rating),
        comment: comment,
        timestamp: Date.now(),
      };

      // Get product details synchronously from already fetched allAvailableProducts
      const productForNewReview = allAvailableProducts.find(
        (p) => p.id === newReview.productId
      );

      const detailedNewReview = {
        ...newReview,
        userName: loggedInUser.name,
        userAvatar: `https://via.placeholder.com/50/<span class="math-inline">\{Math\.floor\(Math\.random\(\)\*16777215\)\.toString\(16\)\}/FFFFFF?text\=</span>{loggedInUser.name.split(' ').map(n=>n[0]).join('')}`,
        appName: productForNewReview
          ? productForNewReview.name
          : "Aplikasi Tidak Dikenal",
        appIcon: productForNewReview ? productForNewReview.image_url : "",
      };

      setReviews((prevReviews) => {
        const updatedReviews = [detailedNewReview, ...prevReviews];
        localStorage.setItem(
          "appReviews",
          JSON.stringify(
            updatedReviews.map((r) => ({
              userId: r.userId,
              productId: r.productId,
              rating: r.rating,
              comment: r.comment,
              timestamp: r.timestamp,
            }))
          )
        );
        return updatedReviews;
      });

      setFormMessage("Ulasan berhasil ditambahkan!");
      setFormMessageType("success");
      setSelectedProduct("");
      setRating(5);
      setComment("");
    } catch (err) {
      setFormMessage("Gagal menambahkan ulasan. Silakan coba lagi.");
      setFormMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <p className="text-xl text-gray-700">Memuat ulasan...</p>
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

  const uniqueSubscribedProducts = userSubscriptions.reduce((acc, subId) => {
    const product = allAvailableProducts.find((p) => p.id === subId);
    if (product && !acc.some((item) => item.id === product.id)) {
      acc.push({ id: product.id, name: product.name });
    }
    return acc;
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 pt-8">
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Ulasan <span className="text-blue-600">Pelanggan</span>
          </h2>

          {isAuthenticated() && loggedInUser ? (
            <section className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Tambah Ulasan Baru
              </h3>
              {formMessage && (
                <div
                  className={`p-3 mb-4 rounded-md text-center ${
                    formMessageType === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {formMessage}
                </div>
              )}
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="productSelect"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Pilih Aplikasi
                  </label>
                  <select
                    id="productSelect"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    disabled={
                      isSubmitting || uniqueSubscribedProducts.length === 0
                    }
                    required
                  >
                    <option value="">-- Pilih Aplikasi Anda --</option>
                    {uniqueSubscribedProducts.length === 0 && (
                      <option value="" disabled>
                        Anda belum berlangganan aplikasi yang bisa diulas.
                      </option>
                    )}
                    {uniqueSubscribedProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="ratingSelect"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Rating
                  </label>
                  <select
                    id="ratingSelect"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    disabled={isSubmitting}
                    required
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {renderStars(num)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="commentInput"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Komentar Anda
                  </label>
                  <textarea
                    id="commentInput"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y min-h-[100px]"
                    placeholder="Tulis ulasan Anda di sini..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={isSubmitting}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    isSubmitting || uniqueSubscribedProducts.length === 0
                  }
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </form>
            </section>
          ) : (
            <p className="text-center text-gray-600 text-lg py-4 mb-8">
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>{" "}
              untuk menambahkan ulasan Anda.
            </p>
          )}

          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-t pt-6">
            Semua Ulasan
          </h3>
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600 text-lg py-10">
              Belum ada ulasan untuk ditampilkan.
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={review.timestamp || index}
                  className="border border-blue-200 bg-blue-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        {review.userName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Berlangganan:{" "}
                        <span className="font-medium text-blue-600">
                          {review.appName}
                        </span>
                      </p>
                    </div>
                    {review.appIcon && (
                      <img
                        src={review.appIcon}
                        alt={review.appName}
                        className="w-8 h-8 object-contain ml-auto rounded-md"
                        title={review.appName}
                      />
                    )}
                  </div>
                  <p className="text-yellow-500 text-xl mb-2">
                    {renderStars(review.rating)}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/product"
              className="text-blue-600 hover:underline font-semibold"
            >
              Lihat Produk Lain
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;
