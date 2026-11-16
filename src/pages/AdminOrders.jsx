
import React, { useState } from "react";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("shopeaseOrders")) || [];
  });

  const statusOptions = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  // Update order status and create notification
  const handleStatusChange = (orderId, newStatus) => {
    const currentOrder = orders.find(
      (order) => order.orderId === orderId
    );

    if (!currentOrder || currentOrder.status === newStatus) {
      return;
    }

    const updatedOrders = orders.map((order) => {
      if (order.orderId === orderId) {
        const currentHistory = order.statusHistory || [];

        return {
          ...order,
          status: newStatus,
          statusHistory: [
            ...currentHistory,
            {
              status: newStatus,
              date: new Date().toLocaleString(),
            },
          ],
        };
      }

      return order;
    });

    // Update orders
    setOrders(updatedOrders);

    localStorage.setItem(
      "shopeaseOrders",
      JSON.stringify(updatedOrders)
    );

    // Create notification
    const newNotification = {
      id: "NOT-" + Date.now(),
      title: "Order Status Updated",
      message: `Order ${orderId} status changed from ${
        currentOrder.status || "Order Placed"
      } to ${newStatus}.`,
      type: "order",
      date: new Date().toISOString(),
      read: false,
      orderId: orderId,
    };

    // Save notification
    const existingNotifications =
      JSON.parse(
        localStorage.getItem("shopeaseNotifications") || "[]"
      );

    const updatedNotifications = [
      newNotification,
      ...existingNotifications,
    ];

    localStorage.setItem(
      "shopeaseNotifications",
      JSON.stringify(updatedNotifications)
    );

    // Update notification count in Sidebar and Dashboard
    window.dispatchEvent(
      new Event("shopeaseNotificationsUpdated")
    );
  };

  return (
    <div className="admin-orders-container">
      <h1>Admin Order Management</h1>

      <div className="admin-orders-header">
        <div>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div>
          <h3>Delivered Orders</h3>
          <p>
            {orders.filter(
              (order) => order.status === "Delivered"
            ).length}
          </p>
        </div>

        <div>
          <h3>Pending Orders</h3>
          <p>
            {orders.filter(
              (order) => order.status !== "Delivered"
            ).length}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="admin-no-orders">
          <h2>No Orders Available</h2>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {[...orders].reverse().map((order) => (
            <div className="admin-order-card" key={order.orderId}>

              {/* Order Header */}
              <div className="admin-order-top">
                <div>
                  <h3>Order #{order.orderId}</h3>
                  <p>Date: {order.orderDate}</p>
                </div>

                <span className="admin-order-status">
                  {order.status || "Order Placed"}
                </span>
              </div>

              {/* Customer Details */}
              <div className="admin-customer-details">
                <h4>Customer Details</h4>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customer?.fullName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.customer?.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.customer?.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.customer?.address},{" "}
                  {order.customer?.city},{" "}
                  {order.customer?.state} -{" "}
                  {order.customer?.pincode}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.customer?.paymentMethod}
                </p>
              </div>

              {/* Products */}
              <div className="admin-order-products">
                <h4>Ordered Products</h4>

                {order.products?.map((product, index) => (
                  <div
                    className="admin-product-item"
                    key={`${product.id}-${index}`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                    />

                    <div>
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

              {/* Amount */}
              <div className="admin-order-total">
                <p>
                  Subtotal: ₹
                  {(order.subtotal ?? order.totalAmount).toFixed(2)}
                </p>

                <p>
                  Discount: ₹
                  {(order.discount || 0).toFixed(2)}
                </p>

                <h3>
                  Total: ₹{order.totalAmount.toFixed(2)}
                </h3>
              </div>

              {/* Update Status */}
              <div className="admin-status-update">
                <label htmlFor={`status-${order.orderId}`}>
                  Update Order Status
                </label>

                <select
                  id={`status-${order.orderId}`}
                  value={order.status || "Order Placed"}
                  onChange={(e) =>
                    handleStatusChange(
                      order.orderId,
                      e.target.value
                    )
                  }
                >
                  {statusOptions.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status History */}
              <div className="admin-status-history">
                <h4>Status History</h4>

                {order.statusHistory?.length > 0 ? (
                  [...order.statusHistory].reverse().map(
                    (item, index) => (
                      <div
                        className="admin-history-item"
                        key={index}
                      >
                        <strong>{item.status}</strong>
                        <span>{item.date}</span>
                      </div>
                    )
                  )
                ) : (
                  <p>Order placed successfully.</p>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
