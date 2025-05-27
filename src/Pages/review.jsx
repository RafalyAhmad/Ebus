import React from "react";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";

const ReviewPage = () => {
  return (
    <div>
      <main className="p-6">
        <section className="p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center">Review Produk</h2>
          <div className="mt-4 space-y-4">
            <div className="border-blue-500 border-2 p-4 rounded-lg">
              Pengguna Berlangganan : <b className="text-blue-500">Clarissa</b>
              <br /> Aplikasi : Netflix
              <p> Nilai : ⭐️⭐️⭐️⭐️⭐️</p>
              <p>Keterangan :</p>
              <p>
                "Netflix memberikan pengalaman streaming terbaik dengan berbagai
                konten menarik!"
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="border-blue-500 border-2 p-4 rounded-lg">
              Pengguna Berlangganan : <b className="text-blue-500">Clarissa</b>
              <br /> Aplikasi : Netflix
              <p> Nilai : ⭐️⭐️⭐️⭐️⭐️</p>
              <p>Keterangan :</p>
              <p>
                "Netflix memberikan pengalaman streaming terbaik dengan berbagai
                konten menarik!"
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* tutup akhir */}
      <Footer />
    </div>
  );
};

export default ReviewPage;
