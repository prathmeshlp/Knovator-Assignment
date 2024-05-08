import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
} from "@chakra-ui/react";
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
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  return (
    <>
      <div className="cartcontainer">
        {cartItems.length > 0 ? (
          <>
            
            <div className="cartsection1">
              <TableContainer>
                <Table size="lg">
                  {cartItems.length > 0 ? (
                    <TableCaption fontSize="18">
                      Total Price: {calculateTotalPrice().toFixed(2)}
                    </TableCaption>
                  ) : (
                    ""
                  )}
                  <Thead>
                    <Tr>
                      <Th style={{ textAlign: "center" }}>Item Name</Th>
                      <Th style={{ textAlign: "center" }}>Price</Th>
                      <Th style={{ textAlign: "center" }}>Quantity</Th>
                      <Th style={{ textAlign: "center" }}>Action</Th>
                    </Tr>
                  </Thead>
                  {cartItems.map((item) => (
                    <Tbody key={item.id}>
                      <Tr>
                        <Td style={{ textAlign: "center" }}>{item.name}</Td>
                        <Td style={{ textAlign: "center" }}> {item.price}</Td>
                        <Td style={{ textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 10,
                            }}
                            className="handlequantity"
                          >
                            <FaMinus
                              cursor="pointer"
                              onClick={() => handleDecrement(item.id)}
                            />
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(e, item.id)}
                            />
                            <FaPlus
                              cursor="pointer"
                              onClick={() => handleIncrement(item.id)}
                            />
                          </div>
                        </Td>
                        <Td style={{ textAlign: "center" }}>
                          <MdDelete
                            fontSize="30"
                            onClick={() => handleRemoveItem(item)}
                          />
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </TableContainer>
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
          </>
        ) : (
          <h1>No Items In the cart</h1>
        )}
      </div>
    </>
  );
};

export default Cart;
