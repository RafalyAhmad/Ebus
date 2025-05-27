import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { name } = useParams();

  if (!name) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">Product not found!</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">
        Detail Produk: {decodeURIComponent(name)}
      </h1>
    </div>
  );
};

export default ProductDetail;
