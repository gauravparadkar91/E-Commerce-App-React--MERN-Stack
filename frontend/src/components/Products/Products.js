// Products.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = ({ addToCart, isLoggedIn, clearCart, cartData }) => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    "Electronic Products"
  );
  const [cart, setCart] = useState([]);
  
  // useEffect(() => {
  //   clearCart();
  // }, []);

  const productsByCategory = {
    "Electronic Products": [
      {
        id: 1,
        name: "Laptop",
        image: "laptop.jpg",
        price: 999.99,
      },
      {
        id: 2,
        name: "Smartphone",
        image: "smartphone.jpg",
        price: 499.99,
      },
      {
        id: 3,
        name: "Tablet",
        image: "tablet.jpg",
        price: 299.99,
      },
    ],
    "Men's Clothes": [
      {
        id: 4,
        name: "T Shirt",
        image: "t-shirt.jpg",
        price: 29.99,
      },
      {
        id: 5,
        name: "Jeans",
        image: "jeans.jpg",
        price: 39.99,
      },
      {
        id: 6,
        name: "Jacket",
        image: "jacket.jpg",
        price: 49.99,
      },
    ],
    "Men's Accessories": [
      {
        id: 7,
        name: "Watch",
        image: "watch.jpg",
        price: 99.99,
      },
      {
        id: 8,
        name: "Wallet",
        image: "wallet.jpg",
        price: 49.99,
      },
      {
        id: 9,
        name: "Sunglasses",
        image: "sunglasses.jpg",
        price: 19.99,
      },
    ],
    "Perfumes": [
      {
        id: 10,
        name: "Perfume 1",
        image: "perfume1.jpg",
        price: 59.99,
      },
      {
        id: 11,
        name: "Perfume 2",
        image: "perfume2.jpg",
        price: 79.99,
      },
      {
        id: 12,
        name: "Perfume 3",
        image: "perfume3.jpg",
        price: 69.99,
      },
    ],
    // Add more categories here
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product, key) => {
    const updatedCart = [...cart];
    const foundIndex = updatedCart.findIndex(
      (item) => item.product.id === product.id
    );
    if (foundIndex !== -1) {
      if (key === "add") {
        if (updatedCart[foundIndex].quantity < 5) {
          // Assuming maximum quantity is 5
          updatedCart[foundIndex].quantity++;
        }
      } else {
        if (updatedCart[foundIndex].quantity > 0) {
          updatedCart[foundIndex].quantity--;
        }
      }
    } else {
      if (key === "add") {
        updatedCart.push({ product: product, quantity: 1 });
      }
    }
    setCart(updatedCart);
    addToCart(product); // Add to cart via props
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
  };

  const getTotalItemsInCart = () => {
    return cartData.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  const navigateToCart = () => {
    setCart(cart);
    navigate("/my-cart");
  };

  return (
    <div className="products-container">
      <div className="navbar">
        <h2 className="products-heading">Categories</h2>
        <ul>
          {Object.keys(productsByCategory).map((category) => (
            <li key={category} onClick={() => handleCategoryChange(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <section className="products-section">
        <h2 className="category-heading">{selectedCategory}</h2>
        <div className="product-list">
          {productsByCategory[selectedCategory].map((product) => (
            <div key={product.id} className="product-card">
              <img
                className="product-image"
                src={`/images/${product.image}`}
                alt={product.name}
              />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
              {isLoggedIn && (
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleAddToCart(product, "remove")}
                  >
                    -
                  </button>
                  <span className="quantity">
                    {cart.find((item) => item.product.id === product.id)
                      ?.quantity || 0}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleAddToCart(product, "add")}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {isLoggedIn && (
          <div className="cart-summary">
            <button className="view-cart-btn" onClick={navigateToCart}>
              View Cart ({getTotalItemsInCart()})
            </button>
            <p className="total-price">
              Total Price: ${getTotalPrice().toFixed(2)}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
