import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, setQty, clearCart, total } = useCart();

  if (!cart.length) {
    return <p className="text-center text-slate-600">Your cart is empty.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow">
              <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src={
                    item.image ||
                    "https://png.pngtree.com/png-clipart/20230417/original/pngtree-headphone-electronics-white-transparent-png-image_9062514.png"
                  }
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                <div className="text-sm text-slate-500">{item.category}</div>
                <div className="mt-1 text-purple-600 font-bold">
                  ₹{Number(item.price).toLocaleString()}
                </div>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(item.id, item.qty - 1)}
                  className="px-2 py-1 rounded bg-slate-100"
                >-</button>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => setQty(item.id, Number(e.target.value))}
                  className="w-14 border rounded px-2 py-1"
                />
                <button
                  onClick={() => setQty(item.id, item.qty + 1)}
                  className="px-2 py-1 rounded bg-slate-100"
                >+</button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 shadow h-max">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between text-slate-700">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-700 mt-2">
            <span>Shipping</span>
            <span>₹0</span>
          </div>
          <div className="h-px bg-slate-200 my-4" />
          <div className="flex justify-between text-lg font-extrabold">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Checkout
          </button>
          <button
            onClick={clearCart}
            className="mt-3 w-full bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
