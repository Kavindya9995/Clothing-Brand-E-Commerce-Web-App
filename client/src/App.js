import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import ProductList from "./ProductList";
import CartPage from "./CartPage";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
