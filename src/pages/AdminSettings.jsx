
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSettings.css";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState({
    storeName: "ShopEase",
    email: "support@shopease.com",
    phone: "",
    address: "",
  });

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@shopease.com",
  });

  const [message, setMessage] = useState("");

  // Load saved settings
  useEffect(() => {
    try {
      const savedStore = JSON.parse(
        localStorage.getItem("shopeaseStoreSettings") || "null"
      );

      const savedProfile = JSON.parse(
        localStorage.getItem("shopeaseAdminProfile") || "null"
      );

      if (savedStore) setStore(savedStore);
      if (savedProfile) setProfile(savedProfile);
    } catch (error) {
      console.error("Unable to load settings:", error);
    }
  }, []);

  // Store input changes
  const handleStoreChange = (e) => {
    const { name, value } = e.target;

    setStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save settings
  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shopeaseStoreSettings",
      JSON.stringify(store)
    );

    localStorage.setItem(
      "shopeaseAdminProfile",
      JSON.stringify(profile)
    );

    setMessage("Settings saved successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      navigate("/login");
    }
  };

  return (
    <div className="admin-settings">

      <div className="settings-header">
        <div>
          <h1>Admin Settings</h1>
          <p>Manage your store and administrator information</p>
        </div>
      </div>

      {message && (
        <div className="settings-success">
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>

        {/* Store Information */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>Store Information</h2>
            <p>Update your ShopEase store details</p>
          </div>

          <div className="settings-form-grid">

            <div className="settings-field">
              <label>Store Name</label>
              <input
                type="text"
                name="storeName"
                value={store.storeName}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="settings-field">
              <label>Store Email</label>
              <input
                type="email"
                name="email"
                value={store.email}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="settings-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={store.phone}
                onChange={handleStoreChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="settings-field">
              <label>Store Address</label>
              <textarea
                name="address"
                value={store.address}
                onChange={handleStoreChange}
                placeholder="Enter store address"
                rows="3"
              />
            </div>

          </div>
        </div>

        {/* Admin Profile */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>Admin Profile</h2>
            <p>Update administrator details</p>
          </div>

          <div className="settings-form-grid">

            <div className="settings-field">
              <label>Admin Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="settings-field">
              <label>Admin Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>

          </div>
        </div>

        {/* Actions */}
        <div className="settings-actions">
          <button type="submit" className="save-settings-btn">
            Save Settings
          </button>

          <button
            type="button"
            className="logout-settings-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;