import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getProducts() {
  const productsCollection = collection(db, "products");
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
