import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductCard({
  id,
  name,
  image,
  ratings = 0,
  no_of_ratings = 0,
  discount_price,
  actual_price,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  // Calculate stars dynamically
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const discountPercent =
    actual_price && discount_price
      ? Math.round(((actual_price - discount_price) / actual_price) * 100)
      : null;

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="flex justify-center items-center h-48">
        <img
          src={
            image ||
            "https://png.pngtree.com/png-clipart/20230417/original/pngtree-headphone-electronics-white-transparent-png-image_9062514.png"
          }
          alt={name}
          className="object-contain h-40"
        />
      </div>

      {/* Product Name */}
      <h2 className="mt-3 text-base font-semibold text-gray-800 line-clamp-2">
        {name}
      </h2>

      {/* Ratings */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex">{renderStars(ratings)}</div>
        <span className="text-sm text-gray-600">
          {ratings ? ratings.toFixed(1) : "0.0"}
        </span>
      </div>
      {no_of_ratings > 0 && (
        <p className="text-gray-500 text-xs mt-1">
          ({no_of_ratings.toLocaleString()} ratings)
        </p>
      )}

      {/* Pricing */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-purple-600 font-bold text-lg">
          ₹{Number(discount_price || actual_price || 0).toLocaleString()}
        </span>
        {discount_price && actual_price && (
          <>
            <span className="line-through text-gray-400">
              ₹{Number(actual_price).toLocaleString()}
            </span>
            {discountPercent && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}