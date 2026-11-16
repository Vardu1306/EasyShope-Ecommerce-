
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Customer Pages
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/WishList";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import OrderHistory from "../pages/OrderHistory";
import Profile from "../pages/Profile";

// Authentication Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// Route Protection
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../components/AdminLayout";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import AdminOrders from "../pages/AdminOrders";
import AdminProducts from "../pages/AdminProducts";
import AdminCustomers from "../pages/AdminCustomers";
import AdminSettings from "../pages/AdminSettings";
import AdminReports from "../pages/AdminReports";
import AdminNotifications from "../pages/AdminNotification";
import AdminInventory from "../pages/AdminInventory";

import PublicOnlyRoute from "../components/PublicOnlyRoute";
import ForgotPassword from "../pages/ForgetPassword";
import AdminMessages from "../pages/AdminMessages";
import About from "../pages/About";
import AdminLogin from "../pages/AdminLogin";
const AppRoutes = () => {
  return (
    <Routes>
      {/* First page */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

     {/* Authentication Pages */}
<Route
  path="/login"
  element={
    <PublicOnlyRoute>
      <Login />
    </PublicOnlyRoute>
  }
/>
<Route
  path="/admin-login"
  element={
    <PublicOnlyRoute>
      <AdminLogin />
    </PublicOnlyRoute>
  }
/>
<Route
  path="/forgot-password"
  element={
    <PublicOnlyRoute>
      <ForgotPassword />
    </PublicOnlyRoute>
  }
/>

<Route
  path="/register"
  element={
    <PublicOnlyRoute>
      <Register />
    </PublicOnlyRoute>
  }
/>
      {/* Customer Pages */}
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Admin Pages */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="inventory" element={<AdminInventory />} />
      </Route>

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="messages" element={<AdminMessages />} />
      <Route
  path="/about"
  element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;
