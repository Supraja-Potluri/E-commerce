// import React, { useEffect, useMemo, useState } from "react";
// import { Search } from "lucide-react";
// import ProductCard from "../components/ProductCard";
// import { motion } from "framer-motion";
// import { getProducts } from "../services/firestore";
// import HeroCarousel from "../components/HeroCarousel";
// import ProductSkeleton from "../components/ProductSkeleton";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("Default");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

//   // ✅ Fetch products from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getProducts();
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else {
//           setProducts([]); // Avoid crash if Firestore returns null
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products.");
//         setProducts([]); // Keep empty array to avoid blank screen crash
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Filter & Sort
//   const filteredProducts = useMemo(() => {
//     const query = searchTerm.trim().toLowerCase();
//     let list = products.filter((p) => {
//       return (
//         !query ||
//         p.name?.toLowerCase().includes(query) ||
//         p.sub_category?.toLowerCase().includes(query)
//       );
//     });

//     if (sortOrder === "Price: Low to High") {
//       list = [...list].sort(
//         (a, b) =>
//           (a.discount_price || a.actual_price) -
//           (b.discount_price || b.actual_price)
//       );
//     } else if (sortOrder === "Price: High to Low") {
//       list = [...list].sort(
//         (a, b) =>
//           (b.discount_price || b.actual_price) -
//           (a.discount_price || a.actual_price)
//       );
//     }

//     return list;
//   }, [products, searchTerm, sortOrder]);

//   const visibleProducts =
//     searchTerm.length > 0 ? filteredProducts : filteredProducts.slice(0, 8);

//   return (
//     <div className="p-0">
//       {/* Hero Section */}
//       <HeroCarousel />

//       {/* Search + Sort */}
//       <div className="p-6 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <div className="relative w-full md:w-1/2">
//           <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search for products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           {sortOptions.map((o) => (
//             <option key={o} value={o}>
//               {o}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Products Grid */}
//       <div className="px-6">
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <ProductSkeleton key={i} />
//             ))}
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : visibleProducts.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
//             {visibleProducts.map((p, index) => (
//               <motion.div
//                 key={p.id || index}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.35 }}
//                 className="h-full"
//               >
//                 <ProductCard
//                   id={p.id}
//                   name={p.name}
//                   image={p.image}
//                   actual_price={p.actual_price}
//                   discount_price={p.discount_price}
//                   ratings={p.ratings}
//                   no_of_ratings={p.no_of_ratings}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { getProducts } from "../services/firestore";
import HeroCarousel from "../components/HeroCarousel";
import ProductSkeleton from "../components/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

  // ✅ Fetch products from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); // avoid crash if data is not array
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter & Sort (Instant search)
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    let list = products.filter((p) => {
      return (
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.sub_category?.toLowerCase().includes(query)
      );
    });

    if (sortOrder === "Price: Low to High") {
      list = [...list].sort((a, b) => {
        const priceA = a.discount_price || a.actual_price || 0;
        const priceB = b.discount_price || b.actual_price || 0;
        return priceA - priceB;
      });
    } else if (sortOrder === "Price: High to Low") {
      list = [...list].sort((a, b) => {
        const priceA = a.discount_price || a.actual_price || 0;
        const priceB = b.discount_price || b.actual_price || 0;
        return priceB - priceA;
      });
    }

    return list;
  }, [products, searchTerm, sortOrder]);

  // ✅ Show only first 8 products when search is empty
  const visibleProducts =
    searchTerm.length > 0 ? filteredProducts : filteredProducts.slice(0, 8);

  return (
    <div className="p-0">
      {/* ✅ Hero Section */}
      <HeroCarousel />

      {/* ✅ Search & Sort */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
        >
          {sortOptions.map((o) => (
            <option
              key={o}
              value={o}
              className="text-gray-800 bg-white"
            >
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Products Grid */}
      <div className="px-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
            {visibleProducts.map((p, index) => (
              <motion.div
                key={p.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <ProductCard
                  id={p.id}
                  name={p.name}
                  image={p.image || "/placeholder.png"}
                  actual_price={p.actual_price || 0}
                  discount_price={p.discount_price || 0}
                  ratings={p.ratings || 0}
                  no_of_ratings={p.no_of_ratings || 0}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}
