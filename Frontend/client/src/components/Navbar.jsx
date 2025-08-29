import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, LayoutGrid } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((n, item) => n + item.qty, 0);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white shadow-xl sticky top-0 z-50 border-b border-purple-700">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
            ElectroSpace
          </span>
          <span className="block text-sm text-gray-300 font-light -mt-1">
            Explore the Electronics Universe
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-lg font-semibold">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition duration-300 hover:text-blue-400 ${isActive ? "text-blue-400" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `flex items-center gap-2 transition duration-300 hover:text-purple-400 ${isActive ? "text-purple-400" : ""}`
            }
          >
            <LayoutGrid size={18}/> Dashboard
          </NavLink>

          {/* Cart */}
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              `relative flex items-center gap-2 transition duration-300 hover:text-pink-400 ${isActive ? "text-pink-400" : ""}`
            }
          >
            <ShoppingCart size={20}/>
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                {count}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
