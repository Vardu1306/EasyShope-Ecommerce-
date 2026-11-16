
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any products yet.</p>
        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-heading">
        <h1>Shopping <span>Cart</span></h1>
        <p>You have {totalItems} item(s) in your cart.</p>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QUANTITY",
                        payload: item.id
                      })
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_QUANTITY",
                        payload: item.id
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-cart-btn"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item.id
                    })
                  }
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

       <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

          <button
            className="clear-cart-btn"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;