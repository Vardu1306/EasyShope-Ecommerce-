
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeaturedProducts.css";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products"
        );

        setProducts(response.data.slice(0, 4));
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-heading">
        <p>OUR BEST COLLECTION</p>
        <h2>Featured <span>Products</span></h2>
        <h4>Discover our most popular products.</h4>
      </div>

      {loading && <p className="product-message">Loading products...</p>}

      {error && <p className="product-error">{error}</p>}

      {!loading && !error && (
        <div className="featured-container">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>      )}
    </section>
  );
};

export default FeaturedProducts;
