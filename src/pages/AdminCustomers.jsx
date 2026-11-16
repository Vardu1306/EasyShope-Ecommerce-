
import React, { useEffect, useState } from "react";
import "./AdminCustomers.css";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Load customers from localStorage
  useEffect(() => {
    try {
      const orders = JSON.parse(
        localStorage.getItem("shopeaseOrders") || "[]"
      );

      const customerMap = new Map();

      orders.forEach((order) => {
        const customer = order.customer;

        if (!customer) return;

        const key = (
          customer.email ||
          customer.phone ||
          customer.fullName
        )?.toLowerCase();

        if (!key) return;

        if (!customerMap.has(key)) {
          customerMap.set(key, {
            ...customer,
            totalOrders: 0,
            totalSpent: 0,
            orderDetails: [],
          });
        }

        const existingCustomer = customerMap.get(key);

        existingCustomer.totalOrders += 1;
        existingCustomer.totalSpent += Number(
          order.totalAmount || 0
        );

        existingCustomer.orderDetails.push(order);
      });

      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  }, []);

  // Search customers
  const filteredCustomers = customers.filter((customer) =>
    `${customer.fullName || ""} ${customer.email || ""} ${
      customer.phone || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Total orders
  const totalOrders = customers.reduce(
    (total, customer) => total + customer.totalOrders,
    0
  );

  // Total spending
  const totalSpending = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0
  );

  return (
    <div className="admin-customers">

      {/* Page Header */}
      <div className="admin-customers-header">
        <div>
          <h1>Manage Customers</h1>
          <p>View and manage your ShopEase customers.</p>
        </div>
      </div>

      {/* Customer Statistics */}
      <div className="customer-stats">

        <div className="customer-stat-card">
          <h3>Total Customers</h3>
          <h2>{customers.length}</h2>
        </div>

        <div className="customer-stat-card">
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="customer-stat-card">
          <h3>Total Customer Spending</h3>
          <h2>₹{totalSpending.toFixed(2)}</h2>
        </div>

      </div>

      {/* Customers Table */}
      <div className="customers-table-container">

        <div className="customers-table-header">
          <h2>All Customers</h2>

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredCustomers.length === 0 ? (
          <p className="customer-empty">
            No customers found. Place an order to see customer details.
          </p>
        ) : (

          <div className="customers-table-wrapper">
            <table>

              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer.email || customer.phone || index}>

                    <td>{customer.fullName || "N/A"}</td>
                    <td>{customer.email || "N/A"}</td>
                    <td>{customer.phone || "N/A"}</td>
                    <td>{customer.city || "N/A"}</td>
                    <td>{customer.totalOrders}</td>
                    <td>₹{customer.totalSpent.toFixed(2)}</td>

                    <td>
                      <button
                        className="view-customer-btn"
                        onClick={() =>
                          setSelectedCustomer(customer)
                        }
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >

          <div
            className="customer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="customer-modal-header">
              <h2>Customer Details</h2>

              <button
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>
            </div>

            {/* Customer Information */}
            <div className="customer-details-content">

              <div className="customer-avatar">
                {selectedCustomer.fullName
                  ?.charAt(0)
                  .toUpperCase() || "C"}
              </div>

              <h3>
                {selectedCustomer.fullName || "N/A"}
              </h3>

              <div className="customer-detail-item">
                <strong>Email:</strong>
                <span>{selectedCustomer.email || "N/A"}</span>
              </div>

              <div className="customer-detail-item">
                <strong>Phone:</strong>
                <span>{selectedCustomer.phone || "N/A"}</span>
              </div>

              <div className="customer-detail-item">
                <strong>Address:</strong>
                <span>{selectedCustomer.address || "N/A"}</span>
              </div>

              <div className="customer-detail-item">
                <strong>City:</strong>
                <span>{selectedCustomer.city || "N/A"}</span>
              </div>

              <div className="customer-detail-item">
                <strong>Total Orders:</strong>
                <span>{selectedCustomer.totalOrders}</span>
              </div>

              <div className="customer-detail-item">
                <strong>Total Spent:</strong>
                <span>
                  ₹{selectedCustomer.totalSpent.toFixed(2)}
                </span>
              </div>

              {/* Customer Order History */}
              <div className="customer-order-history">

                <h3>Order History</h3>

                {selectedCustomer.orderDetails.length === 0 ? (
                  <p>No orders found.</p>
                ) : (

                  selectedCustomer.orderDetails.map((order, index) => (

                    <div
                      className="customer-order-card"
                      key={order.id || index}
                    >

                      <div>
                        <strong>
                          Order #{order.id || index + 1}
                        </strong>

                        <p>
                          Date:{" "}
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "Date unavailable"}
                        </p>
                      </div>

                      <div>
                        <strong>
                          ₹{Number(
                            order.totalAmount || 0
                          ).toFixed(2)}
                        </strong>

                        <span className="customer-order-status">
                          {order.status || "Order Placed"}
                        </span>
                      </div>

                    </div>

                  ))
                )}

              </div>

            </div>

            <button
              className="close-customer-btn"
              onClick={() => setSelectedCustomer(null)}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminCustomers;
