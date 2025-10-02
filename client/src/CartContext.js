// src/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartCtx = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Fetch cart from backend on mount
  // In your CartContext



  // Update localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          sizes: product.sizes || ["S", "M", "L", "XL"],
          selectedSize: (product.sizes && product.sizes[0]) || "M",
          quantity: 1,
        },
      ];
    });
  };

  const updateItem = (id, updates) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const removeItem = async (id) => {
  try {
    const token = localStorage.getItem("token"); // if auth is required
    const res = await fetch(`http://localhost:4000/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to remove item from cart");
      return;
    }

    // Remove locally after successful backend deletion
    setItems((prev) => prev.filter((i) => i._id !== id));
  } catch (err) {
    console.error(err);
    alert("Error removing item from cart");
  }
};


  return (
    <CartCtx.Provider value={{ items, addToCart, updateItem, removeItem, setItems }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
