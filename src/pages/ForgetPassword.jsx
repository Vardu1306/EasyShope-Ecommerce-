
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const users =
      JSON.parse(localStorage.getItem("shopeaseUsers")) || [];

    const userIndex = users.findIndex(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      setError("Email address not found.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("shopeaseUsers", JSON.stringify(users));

    setMessage("Password updated successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-card" onSubmit={handleResetPassword}>
        <h2>Forgot Password?</h2>
        <p>Enter your email and create a new password.</p>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="forgot-error">{error}</p>}
        {message && <p className="forgot-success">{message}</p>}

        <button type="submit">Reset Password</button>

        <Link to="/login">Back to Login</Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
