import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Navbar = (props) => {
  return (
    <ul>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      {props.isLoggedIn && (
        <li>
          <Link to="/my-cart">My Cart</Link>
        </li>
      )}
      {props.isLoggedIn ? (
        <li style={{ float: "right" }}>
          <Link to="/sign-out" onClick={props.handleSignOut}>
            Sign Out
          </Link>
        </li>
      ) : (
        <li style={{ float: "right" }}>
          <Link to="/sign-in">Sign In</Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
