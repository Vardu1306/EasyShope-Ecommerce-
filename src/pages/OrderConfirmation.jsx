
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="confirmation-container">
        <h2>No order details found!</h2>
        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">

      <div className="success-icon">✓</div>

      <h1>Order Placed Successfully!</h1>

      <p className="success-message">
        Thank you for shopping with ShopEase.
        Your order has been placed successfully.
      </p>

      <div className="order-details-card">

        <h2>Order Details</h2>

        <div className="order-info">
          <span>Order ID</span>
          <strong>{order.orderId}</strong>
        </div>

        <div className="order-info">
          <span>Customer Name</span>
          <strong>{order.customer.fullName}</strong>
        </div>

        <div className="order-info">
          <span>Email</span>
          <strong>{order.customer.email}</strong>
        </div>

        <div className="order-info">
          <span>Phone</span>
          <strong>{order.customer.phone}</strong>
        </div>

        <div className="order-info">
          <span>Payment Method</span>
          <strong>{order.customer.paymentMethod}</strong>
        </div>

        <div className="order-info">
          <span>Shipping Address</span>
          <strong>
            {order.customer.address}, {order.customer.city},
            {order.customer.state} - {order.customer.pincode}
          </strong>
        </div>

        <h3>Ordered Products</h3>

        {order.products.map((item) => (
          <div className="confirmed-product" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="confirmed-product-info">
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="confirmed-total">
          <span>Total Amount</span>
          <strong>₹{order.totalAmount.toFixed(2)}</strong>
        </div>

      </div>

      <button
        className="continue-shopping-btn"
        onClick={() => navigate("/products")}
      >
        Continue Shopping →
      </button>

    </div>
  );
};

export default OrderConfirmation;
