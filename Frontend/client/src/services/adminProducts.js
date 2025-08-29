// import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../lib/firebase";

// // ✅ Add a new product
// export async function addProduct(product) {
//   const productsCollection = collection(db, "products");
//   const docRef = await addDoc(productsCollection, product);
//   return docRef.id;
// }

// // ✅ Update product by ID
// export async function updateProduct(id, updatedData) {
//   const productRef = doc(db, "products", id);
//   await updateDoc(productRef, updatedData);
// }

// // ✅ Delete product by ID
// export async function deleteProduct(id) {
//   const productRef = doc(db, "products", id);
//   await deleteDoc(productRef);
// }



import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase"; // ✅ Adjust the path if needed

// ✅ Firestore collection name
const productsCollection = collection(db, "products");

/**
 * ✅ Add a new product to Firestore
 * @param {Object} product - Product details
 * @returns {string} - The document ID of the added product
 */
export async function addProduct(product) {
  try {
    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * ✅ Update an existing product by ID
 * @param {string} id - Firestore document ID
 * @param {Object} updatedData - Fields to update
 */
export async function updateProduct(id, updatedData) {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * ✅ Delete a product by ID
 * @param {string} id - Firestore document ID
 */
export async function deleteProduct(id) {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
