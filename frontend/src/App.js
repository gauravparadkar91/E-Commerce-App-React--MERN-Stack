// App.js
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Products from "./components/Products/Products";
import SignIn from "./components/SignIn/SignIn";
import About from "./components/About/About";
import SignOut from "./components/SignOut/SignOut";
import MyCart from "./components/MyCart/MyCart";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [userName, setUserName] = useState("");

  const isAuthenticated = () => {
    return isLoggedIn && localStorage.getItem("userAuthenticated");
  };

  const handleSignOut = () => {
    localStorage.removeItem("userAuthenticated");
    setIsLoggedIn(false);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const foundIndex = updatedCart.findIndex(
      (item) => item.product.id === product.id
    );
    if (foundIndex !== -1) {
      if (updatedCart[foundIndex].quantity < 5) {
        updatedCart[foundIndex].quantity++;
      }
    } else {
      updatedCart.push({ product: product, quantity: 1 });
    }
    setCart(updatedCart);
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
  };

  const handleSignIn = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut}/>
        <Routes>
          <Route index path="/home" element={<Home userName={userName}/>} />
          <Route
            path="/products"
            element={<Products isLoggedIn={isLoggedIn} addToCart={addToCart} clearCart={() => setCart([])} cartData={cart}/>}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/sign-in"
            element={<SignIn onSignIn={(name) => handleSignIn(name)} />}
          />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/my-cart" element={<MyCart cart={cart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
