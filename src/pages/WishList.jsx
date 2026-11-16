
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, dispatch } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id
    });
  };

  const handleClearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <h2>My Wishlist ❤️</h2>
        <p>Save your favorite products and find them here.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-heart">♡</div>
          <h3>Your Wishlist is Empty</h3>
          <p>You haven't added any products to your wishlist yet.</p>
          <button onClick={() => navigate("/products")}>
            Explore Products
          </button>
        </div>
      ) : (
        <>
          <div className="wishlist-top">
            <h3>{wishlistItems.length} Saved Products</h3>

            <button onClick={handleClearWishlist}>
              Clear Wishlist
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <div className="wishlist-card" key={product.id}>

                <div className="wishlist-image">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="wishlist-info">
                  <p>{product.category}</p>
                  <h3>{product.title}</h3>
                  <h4>${product.price}</h4>

                  <div className="wishlist-actions">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Product
                    </button>

                    <button
                      className="remove-wishlist"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Wishlist;
