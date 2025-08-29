import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";

// Context
import { CartProvider } from "./context/CartContext";

// New Component for Products
import Products from "./components/Products";

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="container mx-auto px-4 py-8"
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();

  return (
    <CartProvider>
     // <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen rounded-lg shadow-md">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Page>
                  <Home />
                  {/* Add Products listing on Home */}
                  
                </Page>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Page>
                  <ProductPage />
                </Page>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Page>
                  <Dashboard />
                </Page>
              }
            />
            <Route
              path="/cart"
              element={
                <Page>
                  <Cart />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </CartProvider>
  );
}
