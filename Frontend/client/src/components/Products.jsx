// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../lib/firebase";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         const items = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setProducts(items);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//       {products.map(product => (
//         <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
//           <h4>{product.name}</h4>
//           {product.image && (
//             <img
//               src={product.image}
//               alt={product.name}
//               style={{ width: "100%", height: "150px", objectFit: "cover" }}
//             />
//           )}
//           <p>Price: ₹{product.discount_price}</p>
//           <p>Rating: {product.ratings} ⭐</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;



import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import ProductCard from "./ProductCard"; // Make sure this path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          ratings={product.ratings}
          no_of_ratings={product.no_of_ratings}
          discount_price={product.discount_price}
          actual_price={product.actual_price}
        />
      ))}
    </div>
  );
};

export default Products;