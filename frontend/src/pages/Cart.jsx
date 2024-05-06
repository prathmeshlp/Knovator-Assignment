import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateQuantity,
} from "../redux/productsAPI";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate} from 'react-router-dom'

const Cart = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems, "cartitems");

  const handleRemoveItem = (item) => {
    // console.log(id);
    dispatch(removeFromCart(item));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const handleQuantityChange = (e, id) => {
    const quantity = parseInt(e.target.value);
    if (quantity >= 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/placeOrder",
        { firstName, lastName, address, cartItems }
      );
      console.log(response);
      console.log("Order placed successfully:", response.data);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      setFirstName("");
      setLastName("");
      setAddress("");
      navigate("/")
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  return (
    <>
      <div className="cartcontainer">
        <div className="cartsection1">
          {cartItems.map((item) => (
            <div className="cartitems" key={item.id}>
              <span>{item.name}</span>
              <span>Price: {item.price}</span>
              <div className="quantity_buttons">
                <FaMinus onClick={() => handleDecrement(item.id)} />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                />

                <FaPlus onClick={() => handleIncrement(item.id)} />
              </div>
              <Button
                onClick={() => handleRemoveItem(item)}
                variant="solid"
                colorScheme="blue"
              >
                Remove Item
              </Button>
            </div>
          ))}
          <span>Total Price: {calculateTotalPrice().toFixed(2)}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="cartsection2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button type="submit" variant="solid" colorScheme="blue">
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Cart;
