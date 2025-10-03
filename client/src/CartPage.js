import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items, updateItem, removeItem, setItems } = useCart();
  const navigate = useNavigate();
  const [cartId, setCartId] = useState("");

  const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!res.ok) {
          const err = await res.json();
          console.error(err.message || "Failed to fetch cart");
          setItems([]);
          return;
        }

        const data = await res.json();
        setCartId(data._id || "");
        const normalizedItems = (data.items || []).map((i) => ({
          id: i.product._id,
          name: i.product.name,
          description: i.product.description,
          image: i.product.image,
          sizes: i.product.sizes || ["S", "M", "L", "XL"],
          selectedSize: (i.product.sizes && i.product.sizes[0]) || "M",
          quantity: i.qty,
          price: i.product.price || 1000, // fallback price
        }));

        setItems(normalizedItems);
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    };

  useEffect(() => {
    

    fetchCart();
  }, [setItems]);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ cartId }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to create order");
        return;
      }

      const orderData = await res.json();
      console.log("✅ Order created:", orderData);

      alert("Order placed successfully!");
      fetchCart(); // refresh cart
       // redirect to orders page if you have one
    } catch (err) {
      console.error(err);
      alert("Error creating order");
    }
  };

  const addItemToCart = async (productId, qty = 1) => {
    try {
      const token = localStorage.getItem("token");
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

  // calculate total
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🛒 Your Cart</h1>
        <button
          onClick={() => navigate("/product")}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition"
        >
          ← Back to Products
        </button>
      </div>

      {items.length === 0 ? (
        // Empty cart
        <div className="max-w-lg mx-auto mt-20 text-center bg-white p-12 rounded-2xl shadow-lg">
          <p className="mb-6 text-gray-600 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-3 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition relative"
              >
                {/* Delete button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                  title="Delete item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 9zm4-6h6l1 2H8l1-2z" />
                  </svg>
                </button>

                {/* Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-sm"
                  />
                </div>

                {/* Name + Desc */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 text-center">
                  {item.description}
                </p>

                {/* Size */}
                <div className="flex items-center justify-between mb-3">
                  <label className="text-gray-700 font-medium">Size</label>
                  <select
                    value={item.selectedSize}
                    onChange={(e) =>
                      updateItem(item.id, { selectedSize: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1 focus:ring focus:ring-blue-200 focus:outline-none"
                  >
                    {item.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-gray-700 font-medium">Quantity</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => {
                      updateItem(item.id, {
                        quantity: parseInt(e.target.value, 10),
                      });
                      addItemToCart(item.id, parseInt(e.target.value, 10));
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-1 focus:ring focus:ring-blue-200 focus:outline-none"
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <p className="text-right text-gray-800 font-medium">
                  Rs. {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Cart Summary
            </h2>
            <p className="flex justify-between mb-2 text-gray-600">
              <span>Total Items:</span> <span>{items.length}</span>
            </p>
            <p className="flex justify-between mb-6 text-gray-600">
              <span>Total Price:</span>{" "}
              <span className="font-semibold text-gray-800">
                Rs. {totalPrice}
              </span>
            </p>
            {cartId && (
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow"
            >
              Checkout
            </button>)}
          </div>
        </div>
      )}
    </div>
  );
}
