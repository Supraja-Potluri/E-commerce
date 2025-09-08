// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { getProducts } from "../services/firestore";
// import { addProduct, deleteProduct } from "../services/adminProducts";

// export default function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     actual_price: "",
//     discount_price: "",
//     image: "",
//     description: "",
//     sub_category: "",
//     ratings: 0,
//     no_of_ratings: 0,
//   });

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     setLoading(true);
//     const data = await getProducts();
//     setProducts(data);
//     setLoading(false);
//   };

//   const handleAdd = async () => {
//     if (!newProduct.name || !newProduct.actual_price) {
//       alert("Name and Price are required");
//       return;
//     }
//     await addProduct(newProduct);
//     alert("Product added!");
//     setNewProduct({
//       name: "",
//       actual_price: "",
//       discount_price: "",
//       image: "",
//       description: "",
//       sub_category: "",
//     });
//     loadProducts();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       await deleteProduct(id);
//       alert("Product deleted!");
//       loadProducts();
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="p-8 bg-white rounded-xl shadow-lg"
//     >
//       <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
//         Dashboard
//       </h1>
//       <p className="text-gray-600 mb-8">Manage your products here.</p>

//       {/* ✅ Add New Product Form */}
//       <div className="mb-8 p-4 border rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Actual Price"
//             value={newProduct.actual_price}
//             onChange={(e) => setNewProduct({ ...newProduct, actual_price: Number(e.target.value) })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Discount Price"
//             value={newProduct.discount_price}
//             onChange={(e) => setNewProduct({ ...newProduct, discount_price: Number(e.target.value) })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newProduct.image}
//             onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Sub Category"
//             value={newProduct.sub_category}
//             onChange={(e) => setNewProduct({ ...newProduct, sub_category: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <textarea
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//             className="border p-2 rounded col-span-2"
//           />
//         </div>
//         <button
//           onClick={handleAdd}
//           className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           Add Product
//         </button>
//       </div>

//       {/* ✅ Product List */}
//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">All Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {products.map((p) => (
//               <div key={p.id} className="border p-4 rounded shadow">
//                 <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-2" />
//                 <h3 className="font-bold">{p.name}</h3>
//                 <p>Price: ₹{p.actual_price}</p>
//                 {p.discount_price && <p>Discount: ₹{p.discount_price}</p>}
//                 <p className="text-sm text-gray-600 truncate">{p.description}</p>
//                 <button
//                   onClick={() => handleDelete(p.id)}
//                   className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }




import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../services/firestore";
import { addProduct, deleteProduct, updateProduct } from "../services/adminProducts";

// ✅ Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-32">
    <div className="relative w-14 h-14">
      <div
        className="absolute w-full h-full rounded-full border-4 border-transparent animate-spin"
        style={{
          borderTopColor: "#3b82f6", // Dark blue
          borderRightColor: "#3b82f6",
          borderBottomColor: "#93c5fd", // Light blue
          borderLeftColor: "#93c5fd",
        }}
      ></div>
    </div>
  </div>
);

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    actual_price: "",
    discount_price: "",
    image: "",
    description: "",
    sub_category: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editProductData, setEditProductData] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Load products from Firestore
  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  // ✅ Add product
  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.actual_price) {
      alert("Name and Price are required");
      return;
    }
    await addProduct(newProduct);
    alert("✅ Product added successfully!");
    setNewProduct({
      name: "",
      actual_price: "",
      discount_price: "",
      image: "",
      description: "",
      sub_category: "",
    });
    loadProducts();
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      alert("❌ Product deleted!");
      loadProducts();
    }
  };

  // ✅ Edit product
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditProductData({ ...product });
  };

  const handleEditChange = (field, value) => {
    setEditProductData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Update product
  const handleUpdate = async () => {
    if (!editProductData.name || !editProductData.actual_price) {
      alert("Name and Price are required");
      return;
    }
    await updateProduct(editingId, editProductData);
    alert("✅ Product updated!");
    setEditingId(null);
    setEditProductData({});
    loadProducts();
  };

  // ✅ Search Filter
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-xl shadow-lg"
    >
      {/* ✅ Header */}
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-6">Manage your products here.</p>

      {/* ✅ Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded shadow-sm text-gray-800 placeholder-gray-400 
           focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ✅ Add New Product */}
      <div className="mb-8 p-4 border rounded shadow bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Add New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 rounded text-gray-800"
          />
          <input
            type="number"
            placeholder="Actual Price"
            value={newProduct.actual_price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                actual_price: Number(e.target.value),
              })
            }
            className="border p-2 rounded text-gray-800"
          />
          <input
            type="number"
            placeholder="Discount Price"
            value={newProduct.discount_price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                discount_price: Number(e.target.value),
              })
            }
            className="border p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Sub Category"
            value={newProduct.sub_category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, sub_category: e.target.value })
            }
            className="border p-2 rounded text-gray-800"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border p-2 rounded col-span-2 text-gray-800"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border p-2 rounded col-span-2 text-gray-800"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Add Product
          
        </button>
      </div>

      {/* ✅ Loader or Product List */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border p-4 rounded shadow hover:shadow-lg transition bg-white"
                >

                  <div className="w-full">
                  <img
                      src={p.image || "https://via.placeholder.com/150"}
                      alt={p.name}
                      className="w-full h-48 object-contain mb-2 rounded text-center text-gray-800 "
                 />
                  
                  </div>                  

                  {editingId === p.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editProductData.name}
                        onChange={(e) =>
                          handleEditChange("name", e.target.value)
                        }
                        className="border p-2 w-full rounded text-gray-800"
                      />
                      <input
                        type="number"
                        value={editProductData.actual_price || ""}
                        onChange={(e) =>
                          handleEditChange(
                            "actual_price",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 w-full rounded text-gray-800"
                      />
                      <input
                        type="number"
                        value={editProductData.discount_price || ""}
                        onChange={(e) =>
                          handleEditChange(
                            "discount_price",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 w-full rounded text-gray-800"
                      />
                      <textarea
                        value={editProductData.description || ""}
                        onChange={(e) =>
                          handleEditChange("description", e.target.value)
                        }
                        className="border p-2 w-full rounded text-gray-800"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={editProductData.image || ""}
                        onChange={(e) =>
                          handleEditChange("image", e.target.value)
                        }
                        className="border p-2 w-full rounded text-gray-800"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdate}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-lg text-gray-800 truncate">
                        {p.name}
                      </h3>
                      <p className="text-gray-700">
                        Price: ₹{p.actual_price}
                      </p>
                      {p.discount_price ? (
                        <p className="text-green-600">
                          Discount: ₹{p.discount_price}
                        </p>
                      ) : null}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
