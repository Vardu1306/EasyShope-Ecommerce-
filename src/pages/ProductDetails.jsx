
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ProductDetails.css";

import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { ReviewContext } from "../context/ReviewContext";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useContext(ProductContext);
  const { dispatch } = useContext(CartContext);
  const { reviews } = useContext(ReviewContext);
  const { addRecentlyViewed } = useContext(RecentlyViewedContext);

  const [quantity, setQuantity] = useState(1);

  // Find product using ProductContext
  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  // Add product to Recently Viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product]);

  // Get product reviews
  const productReviews = reviews.filter(
    (review) => String(review.productId) === String(id)
  );

  // Calculate average rating
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (total, review) => total + Number(review.rating),
            0
          ) / productReviews.length
        ).toFixed(1)
      : "0.0";

  const price = Number(product?.price || 0);

  const increaseQuantity = () => {
    if (product?.stock !== undefined && quantity >= Number(product.stock)) {
      alert("Maximum available stock reached!");
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock !== undefined && quantity > Number(product.stock)) {
      alert("Not enough stock available!");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity: quantity,
      },
    });

    alert("Product added to cart successfully!");
  };

  // Loading state
  if (loading) {
    return (
      <div className="details-message">
        Loading product details...
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="details-error">
        <h2>Product Not Found</h2>
        <p>This product is unavailable.</p>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <div className="product-average-rating">
        <span className="average-stars">★</span>
        <strong>{averageRating} / 5</strong>
        <span>({productReviews.length} Reviews)</span>
      </div>

      <button
        className="back-products-btn"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <div className="product-details-container">

        <div className="details-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="details-content">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <div className="details-rating">
            ⭐ {product.rating?.rate ?? "No rating"}
            <span>
              {product.rating?.count
                ? ` (${product.rating.count} reviews)`
                : ""}
            </span>
          </div>

          <h2 className="details-price">
            ${price.toFixed(2)}
          </h2>

          <p className="details-description">
            {product.description}
          </p>

          {product.stock !== undefined && (
            <p className="details-stock">
              Available Stock: {product.stock}
            </p>
          )}

          <div className="quantity-section">
            <span>Quantity:</span>

            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>
                −
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>

          <div className="details-total">
            Total: ${(price * quantity).toFixed(2)}
          </div>

          <button
            className="add-to-cart-details-btn"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

          <div className="product-reviews-section">
            <ReviewForm />
            <ReviewList />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
