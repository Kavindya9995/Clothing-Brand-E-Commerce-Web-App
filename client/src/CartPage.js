import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items, updateItem, removeItem, setItems } = useCart();
  const navigate = useNavigate();
  console.log("Cart items:", items);
  useEffect(() => {
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token"); // get token if stored

      const res = await fetch("http://localhost:4000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // add token if exists
        },
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err.message || "Failed to fetch cart");
        setItems([]);
        return;
      }

      const data = await res.json();

      const normalizedItems = (data.items || []).map(i => ({
        id: i.product._id, // use _id as id
        name: i.product.name,
        description: i.product.description,
        image: i.product.image,
        sizes: i.product.sizes || ["S", "M", "L", "XL"],
        selectedSize: (i.product.sizes && i.product.sizes[0]) || "M",
        quantity: i.qty,
      }));

      setItems(normalizedItems);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  fetchCart();
}, []);

const addItemToCart = async (productId, qty = 1) => {
    try {
      const token = localStorage.getItem("token"); // if auth is required
      const res = await fetch("http://localhost:4000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ productId, qty }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to add item to cart");
        return null;
      }

      const cartData = await res.json();
      console.log("Cart after adding:", cartData);
      return cartData;
    } catch (err) {
      console.error(err);
      alert("Error adding items to cart");
      return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <button
          onClick={() => navigate("/product")}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
        >
          ← Back to Products
        </button>
      </div>

      {items.length === 0 ? (
        <div className="max-w-lg mx-auto mt-10 text-center bg-white p-10 rounded-xl shadow">
          <p className="mb-6 text-gray-700">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        // <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
        <div className="flex flex-cols-6">
          { items?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 shadow ">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <button
                  onClick={() => removeItem(item.id)}
                  title="Delete item"
                  aria-label={`Delete ${item.name}`}
                  className="text-red-500 hover:text-red-600"
                >
                  {/* trash icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 9zm4-6h6l1 2H8l1-2z" />
                  </svg>
                </button>
              </div>

              {/* Product image */}
              {/* Product image */}
              {/* Product image */}
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px", height: "100px" }}
                  // className="w-32 h-32 object-cover rounded-md"
                />
              </div>

              <p className="text-gray-600 mb-4">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-700 font-medium">Size</label>
                <select
                  value={item.selectedSize}
                  onChange={(e) =>
                    updateItem(item.id, { selectedSize: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-3 py-1"
                >
                  {item.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium">Quantity</label>
                <select
                  value={item.quantity}
                  onChange={(e) => {
                    updateItem(item.id, {
                      quantity: parseInt(e.target.value, 10),
                    });
                    addItemToCart(item.id, parseInt(e.target.value, 10));
                  }}
                  className="border border-gray-300 rounded-md px-3 py-1"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
