
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="shopease-footer">
      <div className="footer-container">

        {/* Company Information */}
        <div className="footer-section footer-about">
          <h2>Shop<span>Ease</span></h2>
          <p>
            Your one-stop destination for quality products.
            Shop your favourite products with ease and enjoy
            a wonderful shopping experience.
          </p>

          <div className="footer-social">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/profile">My Account</Link>
          <Link to="/orders">Order Tracking</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>📍 Hyderabad, Telangana, India</p>
          <p>📧 support@shopease.com</p>
          <p>📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopEase. All Rights Reserved.
        </p>
        <p>Designed with ❤️ for a better shopping experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
