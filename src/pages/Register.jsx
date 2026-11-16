
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must contain 10 digits");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("shopeaseUsers")) || [];

    const userExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setError("This email is already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName,
      email: email.toLowerCase(),
      phone,
      password,
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "shopeaseUsers",
      JSON.stringify([...existingUsers, newUser])
    );

    setSuccess("Registration successful! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-heading">
          <h1>ShopEase</h1>
          <h2>Create Account</h2>
          <p>Join ShopEase and start shopping today!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="register-form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="register-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="register-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="register-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
