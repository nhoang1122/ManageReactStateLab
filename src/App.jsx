import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => itemInCart.sku === sku);
      if (itemInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { id, sku, quantity: 1 }]
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return items.map((i) => i.sku === sku ? {...i, quantity} : i)
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products></Products>} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart}></Detail>} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}></Cart>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
