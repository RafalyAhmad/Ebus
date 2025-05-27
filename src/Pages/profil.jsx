import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";

const ProfilPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md ">
          <h2 className="text-center text-lg font-semibold">
            Profile <span className="text-blue-500">Saya</span>
          </h2>

          {/* <!-- Profile Section --> */}
          <div className="flex items-center mt-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold">Clarista Lenita</h3>
              <p className="text-sm text-gray-500 flex items-center">
                ❤️ Animator, UI Designer
              </p>
              <p className="text-sm text-gray-500">🏫 Universitas Brawijaya</p>
              <p className="text-sm text-gray-500 flex items-center">
                ✔ Berlangganan 2 Aplikasi
              </p>
            </div>
          </div>

          {/* <!-- Premium Apps --> */}
          <h3 className="mt-6 text-md font-semibold">
            Aplikasi Premium Saat Ini
          </h3>
          <div className="flex space-x-4 mt-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
              className="w-12 h-12"
              alt="Netflix"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
              className="w-12 h-12 bg-black p-1 rounded"
              alt="Spotify"
            />
          </div>

          {/* <!-- Biodata Section --> */}
          <h3 className="mt-6 text-md font-semibold">Biodata</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="bg-purple-500 p-2 rounded-lg text-white">
                  ✏️
                </span>
                <Link to="/changeprofil">Ubah Profile</Link>
              </div>
              <span>➡</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-500 p-2 rounded-lg text-white">
                  🔑
                </span>
                <Link to="/verify"> Verifikasi Identitas</Link>
              </div>
              <span>➡</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="bg-green-500 p-2 rounded-lg text-white">
                  📜
                </span>
                <Link to="/history">Riwayat Berlangganan</Link>
              </div>
              <span>➡</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 p-2 rounded-lg text-white">
                  ℹ️
                </span>
                <Link to="/about">Tentang Aplikasi</Link>
              </div>
              <span>➡</span>
            </div>
            <div className="flex items-center justify-between bg-red-500 text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="p-2">🚪</span>
                <Link to="/logout">Keluar</Link>
              </div>
              <span>➡</span>
            </div>
            <p>Keluar</p>
            <p>Keluar</p>
          </div>
        </div>
        {/* tutup akhir */}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilPage;
