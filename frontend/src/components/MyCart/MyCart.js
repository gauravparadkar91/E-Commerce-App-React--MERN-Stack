import React, { useState, useEffect } from 'react';
import './MyCart.css';

const MyCart = ({ cart }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      let items = 0;
      let price = 0;

      cart.forEach(item => {
        items += item.quantity;
        price += item.quantity * item.product.price;
      });

      setTotalItems(items);
      setTotalPrice(price);
    }
  }, [cart]);

  const handleBuy = () => {
    console.log("Buy button clicked");
    // Implement buy logic here
  };

  return (
    <div className="my-cart-container">
      <h2 className="my-cart-heading">My Cart</h2>
      <div className="my-cart-items">
        {cart && cart.map(item => (
          <div key={item.product.id} className="my-cart-item">
            <img src={`/images/${item.product.image}`} alt={item.product.name} className='product-image'/>
            <div>
              <h3>{item.product.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      {cart && cart.length > 0 && (
        <div className="cart-actions">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button className="buy-btn" onClick={handleBuy}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default MyCart;
