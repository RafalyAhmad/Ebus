import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4 animate-bounce">
        404
      </h1>
      <p className="text-2xl text-gray-800 mb-8 text-center">
        Oops! Halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-lg"
      >
        Kembali ke Beranda
      </Link>
      <p className="text-sm text-gray-500 mt-4">
        Jika Anda yakin ini adalah kesalahan, silakan hubungi dukungan.
      </p>
    </div>
  );
};

export default NotFoundPage;
