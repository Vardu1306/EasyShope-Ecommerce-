
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import SalesChart from "../components/SalesChart";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { products } = useContext(ProductContext);

  const [orders, setOrders] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load Orders from LocalStorage
  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = JSON.parse(
          localStorage.getItem("shopeaseOrders") || "[]"
        );

        setOrders(savedOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  // Load and Update Notification Count
  useEffect(() => {
    const updateNotificationCount = () => {
      try {
        const savedNotifications = JSON.parse(
          localStorage.getItem("shopeaseNotifications") || "[]"
        );

        const unread = savedNotifications.filter(
          (notification) => !notification.read
        ).length;

        setUnreadCount(unread);
      } catch (error) {
        console.error("Error loading notifications:", error);
        setUnreadCount(0);
      }
    };

    updateNotificationCount();

    window.addEventListener(
      "shopeaseNotificationsUpdated",
      updateNotificationCount
    );

    window.addEventListener("storage", updateNotificationCount);

    return () => {
      window.removeEventListener(
        "shopeaseNotificationsUpdated",
        updateNotificationCount
      );

      window.removeEventListener("storage", updateNotificationCount);
    };
  }, []);

  // Total Sales
  const totalSales = orders.reduce((total, order) => {
    return total + Number(order.totalAmount || 0);
  }, 0);

  // Total Orders
  const totalOrders = orders.length;

  // Total Products
  const totalProducts = products.length;

  // Total Customers
  const customerSet = new Set(
    orders
      .map((order) => {
        const customer = order.customer || {};

        return (
          customer.email ||
          customer.phone ||
          customer.fullName ||
          customer.name
        );
      })
      .filter(Boolean)
      .map((value) => String(value).toLowerCase())
  );

  const totalCustomers = customerSet.size;

  // Dashboard Cards
  const dashboardCards = [
    {
      title: "Total Sales",
      value: `₹${totalSales.toFixed(2)}`,
      icon: "💰",
      color: "sales",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "📦",
      color: "orders",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: "🛍️",
      color: "products",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: "👥",
      color: "customers",
    },
  ];

  // Calculate Top Customers
  const customerMap = {};

  orders.forEach((order) => {
    const customer = order.customer || {};

    const email = customer.email || "";
    const phone = customer.phone || "";
    const name = customer.fullName || customer.name || "Customer";

    const key = (email || phone || name).toLowerCase();

    if (!key) return;

    if (!customerMap[key]) {
      customerMap[key] = {
        name,
        email: email || "N/A",
        totalOrders: 0,
        totalSpent: 0,
      };
    }

    customerMap[key].totalOrders += 1;
    customerMap[key].totalSpent += Number(order.totalAmount || 0);
  });

  const topCustomers = Object.values(customerMap)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  // Recent Orders
  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="admin-dashboard">

      {/* Dashboard Header */}
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome to ShopEase Admin Panel</p>
        </div>

        <div className="dashboard-header-actions">

          <button
            className="dashboard-notification-btn"
            onClick={() => navigate("/admin/notifications")}
            title="View Notifications"
          >
            🔔

            {unreadCount > 0 && (
              <span className="dashboard-notification-count">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <button
            className="admin-dashboard-btn"
            onClick={() => navigate("/admin/orders")}
          >
            Manage Orders
          </button>

        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <div className="dashboard-card" key={index}>

            <div className={`dashboard-card-icon ${card.color}`}>
              {card.icon}
            </div>

            <div>
              <h3>{card.title}</h3>
              <h2>{card.value}</h2>
            </div>

          </div>
        ))}
      </div>

      {/* Sales Analytics */}
      <SalesChart orders={orders} />

      {/* Top Customers */}
      <div className="top-customers">

        <div className="top-customers-header">
          <h2>Top Customers</h2>
          <p>Your highest-spending customers</p>
        </div>

        {topCustomers.length === 0 ? (
          <p className="no-customers">
            No customer data available yet.
          </p>
        ) : (
          <div className="customers-table-container">
            <table className="customers-table">

              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                </tr>
              </thead>

              <tbody>
                {topCustomers.map((customer, index) => (
                  <tr key={customer.email + index}>
                    <td>
                      <span className="customer-rank">
                        #{index + 1}
                      </span>
                    </td>

                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.totalOrders}</td>

                    <td className="customer-spending">
                      ₹{customer.totalSpent.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Recent Orders */}
      <div className="recent-orders">

        <div className="recent-orders-header">
          <h2>Recent Orders</h2>

          <button onClick={() => navigate("/admin/orders")}>
            View All
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="no-orders">
            No orders available yet.
          </p>
        ) : (
          <div className="orders-table-container">

            <table className="admin-orders-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order, index) => {

                  const customer = order.customer || {};

                  const orderDate =
                    order.createdAt ||
                    order.orderDate ||
                    order.date;

                  const status = order.status || "Order Placed";

                  const statusClass = status
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return (
                    <tr key={order.id || index}>

                      <td>
                        {order.id || `ORD-${index + 1}`}
                      </td>

                      <td>
                        {customer.fullName ||
                          customer.name ||
                          "Customer"}
                      </td>

                      <td>
                        {customer.email || "N/A"}
                      </td>

                      <td>
                        {orderDate &&
                        !Number.isNaN(new Date(orderDate).getTime())
                          ? new Date(orderDate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>

                      <td>
                        ₹{Number(order.totalAmount || 0).toFixed(2)}
                      </td>

                      <td>
                        <span
                          className={`admin-order-status ${statusClass}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-order-btn"
                          onClick={() => navigate("/admin/orders")}
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;
