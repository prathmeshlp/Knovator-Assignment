import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems, "cartitems");

  const handleCart = () => {
    navigate("/cart");
  };
  const GotoHome = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="cart_container1">
        <h1 onClick={GotoHome}>Ecommerce</h1>
      </div>
      <div className="cart_container2" onClick={handleCart}>
        <IoCartOutline fontSize="40" />
        <span>{cartItems.length}</span>
      </div>
    </div>
  );
};

export default Navbar;
