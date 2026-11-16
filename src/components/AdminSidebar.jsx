
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <h2>ShopEase</h2>
        <p>Admin Panel</p>
      </div>

      <div className="admin-sidebar-menu">
        <p>MAIN MENU</p>

        <NavLink to="/admin/dashboard" className="admin-menu-link">
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/orders" className="admin-menu-link">
          <span>📦</span>
          <span>Manage Orders</span>
        </NavLink>

        <NavLink to="/admin/products" className="admin-menu-link">
          <span>🛍️</span>
          <span>Manage Products</span>
        </NavLink>

        <NavLink to="/admin/customers" className="admin-menu-link">
          <span>👥</span>
          <span>Customers</span>
        </NavLink>

        <NavLink to="/admin/inventory" className="admin-menu-link">
          <span>📋</span>
          <span>Inventory</span>
        </NavLink>

        <NavLink to="/admin/reports" className="admin-menu-link">
          <span>📈</span>
          <span>Reports</span>
        </NavLink>

        <NavLink to="/admin/notifications" className="admin-menu-link">
          <span>🔔</span>
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/admin/settings" className="admin-menu-link">
          <span>⚙️</span>
          <span>Settings</span>
        </NavLink>
        <NavLink to="/admin/messages" className="admin-menu-link">
  <span>✉️</span>
  <span>Customer Messages</span>
</NavLink>
      </div>

      <div className="admin-sidebar-footer">
        <p>ShopEase Admin</p>
        <span>Version 1.0</span>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
