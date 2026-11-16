
import React from "react";
import "./OrderTracking.css";

const OrderTracking = ({ order }) => {
  const trackingSteps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStatus = order.status || "Order Placed";
  const currentIndex = trackingSteps.indexOf(currentStatus);

  return (
    <div className="tracking-container">
      <h3>Order Tracking</h3>

      <div className="tracking-order-info">
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>

        <p>
          <strong>Order Date:</strong> {order.orderDate}
        </p>

        <p>
          <strong>Status:</strong>
          <span className="tracking-status">
            {currentStatus}
          </span>
        </p>
      </div>

      <div className="tracking-progress">
        {trackingSteps.map((step, index) => (
          <div
            className={`tracking-step ${
              index <= currentIndex ? "completed" : ""
            }`}
            key={step}
          >
            <div className="tracking-circle">
              {index < currentIndex ? "✓" : index + 1}
            </div>

            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="tracking-history">
        <h4>Status History</h4>

        {order.statusHistory?.length > 0 ? (
          order.statusHistory.map((item, index) => (
            <div className="tracking-history-item" key={index}>
              <span className="history-dot"></span>

              <div>
                <strong>{item.status}</strong>
                <p>{item.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Order placed successfully.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
