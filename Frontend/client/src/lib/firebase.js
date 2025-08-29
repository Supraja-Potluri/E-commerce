// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXA-dp18ND6VEwOxm3DeV-Gb_miLN88-c",
  authDomain: "e-commerce-3b22c.firebaseapp.com",
  projectId: "e-commerce-3b22c",
  storageBucket: "e-commerce-3b22c.firebasestorage.app",
  messagingSenderId: "850235497291",
  appId: "1:850235497291:web:5ad21c54da8098de7c26ce",
  measurementId: "G-VSXRL528FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);