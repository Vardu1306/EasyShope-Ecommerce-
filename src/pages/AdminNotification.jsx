
import React, { useEffect, useState } from "react";
import "./AdminNotification.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedNotifications =
      JSON.parse(localStorage.getItem("shopeaseNotifications")) || [];

    const savedOrders =
      JSON.parse(localStorage.getItem("shopeaseOrders")) || [];

    if (savedNotifications.length === 0 && savedOrders.length > 0) {
      const newNotifications = savedOrders.map((order, index) => ({
        id: "NOT-" + (order.orderId || order.id || index),
        title: "New Order Received",
        message: `Order ${order.orderId || order.id || ""} has been placed successfully.`,
        type: "order",
        date:
          order.createdAt ||
          order.orderDate ||
          order.date ||
          new Date().toISOString(),
        read: false,
      }));

      setNotifications(newNotifications);

      localStorage.setItem(
        "shopeaseNotifications",
        JSON.stringify(newNotifications)
      );

      window.dispatchEvent(
        new Event("shopeaseNotificationsUpdated")
      );
    } else {
      setNotifications(savedNotifications);
    }
  }, []);

  const saveNotifications = (updatedNotifications) => {
    setNotifications(updatedNotifications);

    localStorage.setItem(
      "shopeaseNotifications",
      JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(
      new Event("shopeaseNotificationsUpdated")
    );
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );

    saveNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    saveNotifications(updatedNotifications);
  };

  const clearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all notifications?"
    );

    if (confirmClear) {
      saveNotifications([]);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const getNotificationIcon = (type) => {
    if (type === "order") return "📦";
    if (type === "inventory") return "⚠️";
    if (type === "out-of-stock") return "🚫";
    return "🔔";
  };

  return (
    <div className="admin-notifications">
      <div className="notifications-header">
        <div>
          <h1>Notifications 🔔</h1>
          <p>
            You have {unreadCount} unread notification
            {unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="notification-actions">
          <button onClick={markAllAsRead} className="mark-all-btn">
            ✓ Mark All as Read
          </button>

          <button onClick={clearAll} className="clear-notifications-btn">
            🗑 Clear All
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <span>🔔</span>
            <h2>No Notifications</h2>
            <p>You don't have any notifications right now.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${
                notification.read ? "read" : "unread"
              }`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>

                <span className="notification-date">
                  {new Date(notification.date).toLocaleString()}
                </span>
              </div>

              {!notification.read && (
                <button
                  className="mark-read-btn"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark Read
                </button>
              )}

              {notification.read && (
                <span className="read-label">✓ Read</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
