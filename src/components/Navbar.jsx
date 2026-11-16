
import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const { user, logout, isLoggedIn } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(searchTerm.trim())}`
      );
      setSearchTerm("");
      closeMenu();
    }
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          ShopEase
        </Link>

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Products
          </NavLink>

          <NavLink to="/wishlist" onClick={closeMenu}>
            Wishlist
          </NavLink>

          <NavLink to="/orders" onClick={closeMenu}>
            Orders
          </NavLink>

          <Link
            to="/cart"
            className="cart-link"
            onClick={closeMenu}
          >
            Cart ({cartItems.length})
          </Link>

          {/* Login / Profile / Logout */}
          {isLoggedIn ? (
            <>
              <span className="nav-user-name">
                👤 {user?.fullName}
              </span>

              <Link
                to="/profile"
                className="profile-link"
                onClick={closeMenu}
              >
                My Profile
              </Link>
              <NavLink to="/about" className="nav-link">
  About Us
</NavLink>

              <button
                className="login-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              👤 Login
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Navbar;
