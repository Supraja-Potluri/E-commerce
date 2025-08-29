import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      const finalPrice = Number(product.discount_price || product.actual_price || product.price || 0);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [
        ...prev,
        {
          ...product,
          price: finalPrice, // ✅ always numeric
          actual_price: Number(product.actual_price || finalPrice),
          discount_price: product.discount_price ? Number(product.discount_price) : null,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const setQty = (id, qty) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );

  const clearCart = () => setCart([]);

  // ✅ Subtotal (sum of actual price * qty)
  const subtotal = cart.reduce((sum, p) => sum + (p.actual_price || 0) * p.qty, 0);

  // ✅ Total after discounts
  const total = cart.reduce((sum, p) => sum + (p.price || 0) * p.qty, 0);

  // ✅ Discount amount
  const discount = subtotal - total;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setQty,
        clearCart,
        subtotal,
        total,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
