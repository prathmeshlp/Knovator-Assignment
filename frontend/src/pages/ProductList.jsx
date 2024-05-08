import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../pages/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  console.log(products, "products");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => toast.error("Error fetching products"));
  }, []);

  return (
    <div className="productlistcontainer">
      <div className="productlist_header">
        <h1>Product List</h1>
      </div>
      <div className="product_list">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
