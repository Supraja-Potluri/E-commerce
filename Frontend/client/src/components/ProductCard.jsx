// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// export default function ProductCard({
//   id,
//   name,
//   actual_price,
//   discount_price,
//   image,
//   rating = 4.5,
//   ratings_count = 0,
// }) {
//   const navigate = useNavigate();
//   const onCardClick = () => navigate(`/product/${id}`);

//   const finalPrice = discount_price || actual_price;
//   const originalPrice = discount_price ? actual_price : null;

//   const discountPercent =
//     originalPrice && discount_price
//       ? Math.round(((originalPrice - discount_price) / originalPrice) * 100)
//       : null;

//   // Function to render stars like Amazon (including half stars)
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//     for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
//     if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
//     for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);

//     return stars;
//   };

//   return (
//     <div
//       onClick={onCardClick}
//       className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col"
//     >
//       <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
//         <img
//           src={
//             image ||
//             "https://png.pngtree.com/png-clipart/20230417/original/pngtree-headphone-electronics-white-transparent-png-image_9062514.png"
//           }
//           alt={name}
//           className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
//         />
//         {discountPercent && (
//           <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//             {discountPercent}% OFF
//           </span>
//         )}
//       </div>

//       <div className="p-4 flex flex-col justify-between flex-grow">
//         <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">{name}</h3>

//         {/* Rating Section */}
//         <div className="mt-1 flex items-center gap-2">
//           <div className="flex">{renderStars(rating)}</div>
//           <span className="text-gray-500 text-xs">{ratings_count.toLocaleString()} ratings</span>
//         </div>

//         {/* Price Section */}
//         <div className="mt-2">
//           <p className="text-purple-600 text-lg font-bold">
//             ₹{Number(finalPrice).toLocaleString()}
//           </p>
//           {originalPrice && (
//             <p className="text-gray-400 text-sm line-through">
//               ₹{Number(originalPrice).toLocaleString()}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProductCard({ id, name, actual_price, discount_price, image, rating }) {
//   const navigate = useNavigate();
//   const onCardClick = () => navigate(`/product/${id}`);

//   // Price logic like ProductDetails
//   const finalPrice = discount_price || actual_price;
//   const originalPrice = discount_price ? actual_price : null;

//   // Discount percentage
//   const discountPercent =
//     originalPrice && discount_price
//       ? Math.round(((originalPrice - discount_price) / originalPrice) * 100)
//       : null;

//   // Star rating logic with half stars
//   const fullStars = Math.floor(rating || 0);
//   const hasHalfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div
//       onClick={onCardClick}
//       className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col"
//     >
//       {/* Image + Discount Badge */}
//       <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
//         <img
//           src={
//             image ||
//             "https://png.pngtree.com/png-clipart/20230417/original/pngtree-headphone-electronics-white-transparent-png-image_9062514.png"
//           }
//           alt={name}
//           className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
//         />
//         {discountPercent && (
//           <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//             {discountPercent}% OFF
//           </span>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="p-4 flex flex-col justify-between flex-grow">
//         <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">{name}</h3>

//         {/* Rating stars */}
//         <div className="mt-1 flex items-center">
//           {Array(fullStars)
//             .fill()
//             .map((_, i) => (
//               <span key={`full-${i}`} className="text-yellow-400">★</span>
//             ))}
//           {hasHalfStar && <span className="text-yellow-400">☆</span>} {/* Half star */}
//           {Array(emptyStars)
//             .fill()
//             .map((_, i) => (
//               <span key={`empty-${i}`} className="text-gray-300">★</span>
//             ))}
//           <span className="ml-1 text-xs text-gray-500">{rating || 0}</span>
//         </div>

//         {/* Price Section */}
//         <div className="mt-2">
//           <p className="text-purple-600 text-lg font-bold">
//             ₹{Number(finalPrice).toLocaleString()}
//           </p>
//           {originalPrice && (
//             <p className="text-gray-400 text-sm line-through">
//               ₹{Number(originalPrice).toLocaleString()}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductCard({
  id,
  name,
  image,
  ratings,
  no_of_ratings,
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
    const hasHalfStar = rating % 1 >= 0.15;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
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
      <div className="flex justify-center items-center h-48">
        <img
          src={
            image ||
            "https://via.placeholder.com/150"
          }
          alt={name}
          className="object-contain h-40"
        />
      </div>
      <h2 className="mt-3 text-lg font-semibold line-clamp-2">{name}</h2>

      {/* Ratings */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex">{renderStars(ratings)}</div>
        <span className="text-sm text-gray-500">{ratings.toFixed(1)}</span>
      </div>
      {no_of_ratings && (
        <p className="text-gray-500 text-xs mt-1">
          ({no_of_ratings.toLocaleString()} ratings)
        </p>
      )}

      {/* Pricing */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-purple-600 font-bold text-lg">
          ₹{Number(discount_price || actual_price).toLocaleString()}
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
