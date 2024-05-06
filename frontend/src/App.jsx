import React from "react";
import Navbar from "./Components/Navbar";
import ProductList from "./pages/ProductList";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import  { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      {" "}
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Toaster position="top-center"/>
      </BrowserRouter>
    </>
  );
};

export default App;
