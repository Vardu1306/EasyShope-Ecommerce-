
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter Admin User ID and Password");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("shopeaseUsers")) || [];

    const adminUser = existingUsers.find(
      (user) =>
        user.email?.toLowerCase() === email.toLowerCase() &&
        user.password === password &&
        user.role === "admin"
    );

    if (!adminUser) {
      setError("Invalid Admin User ID or Password");
      return;
    }

    const adminSession = {
      id: adminUser.id,
      fullName: adminUser.fullName,
      email: adminUser.email,
      phone: adminUser.phone || "",
      address: adminUser.address || "",
      city: adminUser.city || "",
      state: adminUser.state || "",
      pincode: adminUser.pincode || "",
      role: "admin",
    };

    login(adminSession);

    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-heading">
          <div className="admin-login-icon">🛡️</div>

          <h1>ShopEase</h1>
          <h2>Admin Login</h2>
          <p>Sign in to access the administration panel</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="admin-login-form-group">
            <label>Admin User ID / Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="admin-login-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="admin-login-error">{error}</p>
          )}

          <button type="submit" className="admin-login-btn">
            Login as Admin
          </button>

        </form>

        <div className="admin-login-footer">
          <Link to="/login">
            ← Back to Customer Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
