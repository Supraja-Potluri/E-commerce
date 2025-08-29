import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// ✅ Amazon-like stars renderer
function renderStars(rating = 0) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.15;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-500 text-lg" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-lg" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500 text-lg" />);
  }

  return stars;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  const finalPrice = product.discount_price || product.actual_price;
  const originalPrice = product.discount_price ? product.actual_price : null;
  const discountPercent =
    originalPrice && product.discount_price
      ? Math.round(((originalPrice - product.discount_price) / originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* ✅ Product Image */}
      <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg p-6">
        <img
          src={
            product.image ||
            "https://png.pngtree.com/png-clipart/20230417/original/pngtree-headphone-electronics-white-transparent-png-image_9062514.png"
          }
          alt={product.name}
          className="object-contain max-h-[400px]"
        />
      </div>

      {/* ✅ Product Details */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-1">{product.sub_category}</p>

        {/* ✅ Rating Section */}
        <div className="flex items-center gap-2 mt-3">
          {renderStars(product.ratings)}
          <span className="ml-2 text-base text-gray-700 font-semibold">
            {product.ratings?.toFixed(1)}
          </span>
          <span className="ml-1 text-sm text-gray-500">
            ({product.no_of_ratings?.toLocaleString() || 0} ratings)
          </span>
        </div>

        {/* ✅ Price Section */}
        <div className="flex items-center gap-3 mt-4">
          <p className="text-purple-600 text-3xl font-bold">
            ₹{Number(finalPrice).toLocaleString()}
          </p>
          {originalPrice && (
            <p className="text-gray-400 text-lg line-through">
              ₹{Number(originalPrice).toLocaleString()}
            </p>
          )}
          {discountPercent && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* ✅ Description */}
        <p className="mt-3 text-gray-700">
          {product.description || "No description provided."}
        </p>

        {/* ✅ Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => alert("Proceeding to Buy Now...")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
