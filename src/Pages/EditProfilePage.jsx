import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, fetchUserProfile } from "../utils/auth";
import { Link } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      const user = getCurrentUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setCurrentUser(user);

      try {
        const profileResult = await fetchUserProfile();
        if (profileResult.success) {
          setName(profileResult.data.name || "");
          setEmail(profileResult.data.email || "");
        } else {
          setMessage(profileResult.message || "Failed to load profile data.");
          setMessageType("error");
        }
      } catch (error) {
        setMessage("An unexpected error occurred while loading profile data.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // In a real application, you'd send this data to your backend API
    // await updateProfileApi({ name, email });

    setTimeout(() => {
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setLoading(false);
      // Ideally, update currentUser in localStorage and state after successful backend update
      // For mock:
      // localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, name, email }));
      // setCurrentUser({ ...currentUser, name, email });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading profile editor...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Ubah Profil
          </h2>
          {message && (
            <div
              className={`p-3 mb-4 rounded-md text-center ${
                messageType === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled // Email usually cannot be changed directly via profile edit
              />
              <p className="text-sm text-gray-500 mt-1">
                Email tidak dapat diubah dari sini.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <Link
              to="/profil"
              className="block text-center text-blue-600 mt-4 hover:underline"
            >
              Kembali ke Profil
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
