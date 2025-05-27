import { useState, useEffect } from "react";
import React from "react";
import { getProduct } from "../services/product.services";

const FilmHeader = ({ title }) => {
  return (
    <div className="bg-red-400 p-4 rounded-t-lg">
      <h1 className="text-white font-bold">{title}</h1>
    </div>
  );
};

const FilmFooter = ({ durasi, plusCart, minCart }) => {
  return (
    <div className="bg-blue-200 p-4 rounded-b-lg">
      <p>{durasi}</p>
      <button
        className="bg-green-400 px-4 py-2 rounded text-white mt-2"
        onClick={plusCart}
      >
        Tambahkan Ke Watchlist
      </button>
      <button
        className="bg-yellow-400 px-4 py-2 rounded text-white mt-2"
        onClick={minCart}
      >
        Hapus dari Watchlist
      </button>
    </div>
  );
};

const FilmPage = () => {
  const [Watchlist, SetWatchlist] = useState(0);
  const [products, SetProduct] = useState([]);
  const addCart = () => {
    SetWatchlist(Watchlist + 1);
  };
  const minusCart = () => {
    SetWatchlist(Watchlist - 1);
  };

  //data api
  useEffect(() => {
    getProduct((data) => {
      SetProduct(data);
    });
  }, []);

  //data
  // const films = [
  //   {
  //     title: "Naruto Shipuden",
  //     durasi: "2 jam",
  //   },
  //   {
  //     title: "AOT ",
  //     durasi: "1 jam 50 menit",
  //   },
  // ];

  //tampilan
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg">
        {products.map((product, index) => (
          <div key={index}>
            <FilmHeader title={product.title} />
            <FilmFooter plusCart={addCart} minCart={minusCart} />
          </div>
        ))}
        <div className="m-5">Watchlist : {Watchlist}</div>
      </div>
    </div>
  );
};

export default FilmPage;
