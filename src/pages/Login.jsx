
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("shopeaseUsers")) || [];

    const loggedInUser = existingUsers.find(
      (user) =>
        user.email?.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!loggedInUser) {
      setError("Invalid email or password");
      return;
    }

    // Admins must use the separate Admin Login page
    if (loggedInUser.role === "admin") {
      setError("Please use Admin Login to access the admin panel.");
      return;
    }

    const userSession = {
      id: loggedInUser.id,
      fullName: loggedInUser.fullName,
      email: loggedInUser.email,
      phone: loggedInUser.phone,
      address: loggedInUser.address || "",
      city: loggedInUser.city || "",
      state: loggedInUser.state || "",
      pincode: loggedInUser.pincode || "",
      role: "customer",
    };

    login(userSession);

    setSuccess("Login successful! Redirecting...");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-heading">
          <h1>ShopEase</h1>
          <h2>Welcome Back!</h2>
          <p>Login to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="forgot-link">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <button type="submit" className="login-btn">
            Customer Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>

          <div className="admin-login-option">
            <p>Are you an administrator?</p>

            <Link to="/admin-login" className="admin-login-link">
              <span>🛡️</span> Admin Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
