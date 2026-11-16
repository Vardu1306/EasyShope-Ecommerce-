
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { wishlistItems, dispatch } = useContext(WishlistContext);

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: product.id
      });
    } else {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: product
      });
    }
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">

      <button
        className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
        onClick={handleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? "❤️" : "♡"}
      </button>

      <div className="product-card-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-card-content">
        <p className="product-category">{product.category}</p>

        <h3>{product.title}</h3>

        <div className="product-card-rating">
          ⭐ {product.rating.rate}
          <span> ({product.rating.count} reviews)</span>
        </div>

        <div className="product-card-bottom">
          <h4>${product.price}</h4>
          <button onClick={handleViewProduct}>
            View Product
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
