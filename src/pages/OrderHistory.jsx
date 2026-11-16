
import React, { useState } from "react";
import OrderTracking from "../components/OrderTracking";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders] = useState(() => {
    return JSON.parse(localStorage.getItem("shopeaseOrders")) || [];
  });

  return (
    <div className="order-history-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {[...orders].reverse().map((order) => (
            <div className="order-card" key={order.orderId}>

              <div className="order-header">
                <div>
                  <h3>Order #{order.orderId}</h3>
                  <p>Order Date: {order.orderDate}</p>
                </div>

                <span className="order-status">
                  {order.status || "Order Placed"}
                </span>
              </div>

              <div className="order-products">
                <h4>Products</h4>

                {order.products.map((product, index) => (
                  <div
                    className="order-product"
                    key={`${product.id}-${index}`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                    />

                    <div className="order-product-details">
                      <h5>{product.title}</h5>
                      <p>Quantity: {product.quantity}</p>
                      <p>
                        Price: ₹
                        {(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-price-details">
                <p>
                  Subtotal: ₹
                  {(order.subtotal ?? order.totalAmount).toFixed(2)}
                </p>

                <p>
                  Discount: ₹
                  {(order.discount || 0).toFixed(2)}
                </p>

                {order.couponCode && (
                  <p>Coupon: {order.couponCode}</p>
                )}

                <h3>
                  Total: ₹{order.totalAmount.toFixed(2)}
                </h3>
              </div>

              <div className="order-customer">
                <h4>Delivery Address</h4>

                <p>{order.customer.fullName}</p>
                <p>{order.customer.address}</p>
                <p>
                  {order.customer.city},{" "}
                  {order.customer.state} - {order.customer.pincode}
                </p>
                <p>Phone: {order.customer.phone}</p>
                <p>Payment: {order.customer.paymentMethod}</p>
              </div>

              {/* Order Tracking */}
              <OrderTracking order={order} />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
