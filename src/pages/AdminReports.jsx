
import React, { useEffect, useState } from "react";
import "./AdminReports.css";

const AdminReports = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("shopeaseOrders")) || [];

    setOrders(savedOrders);
  }, []);

  const totalSales = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "delivered"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending"
  ).length;

  // Best-selling products
  const productMap = {};

  orders.forEach((order) => {
    const items = order.items || order.cartItems || [];

    items.forEach((item) => {
      const productName = item.title || item.name || "Unknown Product";
      const quantity = Number(item.quantity || 1);

      if (productMap[productName]) {
        productMap[productName] += quantity;
      } else {
        productMap[productName] = quantity;
      }
    });
  });

  const bestSellingProducts = Object.entries(productMap)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Export CSV Report
  const exportReport = () => {
    const csvData = [
      ["Order ID", "Customer", "Date", "Amount", "Status"],
      ...orders.map((order) => [
        order.id,
        order.customer?.fullName || order.customer?.name || "Customer",
        order.createdAt || order.orderDate || order.date || "",
        order.totalAmount || 0,
        order.status || "Pending",
      ]),
    ];

    const csvContent = csvData
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ShopEase-Orders-Report.csv";
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="admin-reports">
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>View your ShopEase business performance</p>
        </div>

        <button onClick={exportReport} className="export-report-btn">
          📥 Export CSV
        </button>
      </div>

      <div className="reports-stats">
        <div className="report-card">
          <span>💰</span>
          <h3>Total Sales</h3>
          <h2>₹{totalSales.toFixed(2)}</h2>
        </div>

        <div className="report-card">
          <span>📦</span>
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="report-card">
          <span>🚚</span>
          <h3>Delivered Orders</h3>
          <h2>{completedOrders}</h2>
        </div>

        <div className="report-card">
          <span>⏳</span>
          <h3>Pending Orders</h3>
          <h2>{pendingOrders}</h2>
        </div>
      </div>

      <div className="best-selling-section">
        <h2>🏆 Best Selling Products</h2>

        {bestSellingProducts.length === 0 ? (
          <p className="no-report-data">No product sales available yet.</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product Name</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>

            <tbody>
              {bestSellingProducts.map((product, index) => (
                <tr key={product.name}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="reports-footer">
        <p>ShopEase Admin Reports</p>
        <p>Report generated from your saved order data.</p>
      </div>
    </div>
  );
};

export default AdminReports;
