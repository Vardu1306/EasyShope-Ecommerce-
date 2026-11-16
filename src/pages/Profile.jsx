
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    if (
      formData.pincode &&
      !/^[0-9]{6}$/.test(formData.pincode)
    ) {
      setError("Pincode must contain 6 digits");
      return;
    }

    updateUser(formData);
    setMessage("Profile updated successfully!");
  };

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-heading">
          <h1>My Profile</h1>
          <p>Manage your personal information and delivery address</p>
        </div>

        <div className="profile-card">

          <div className="profile-user-info">
            <div className="profile-avatar">
              {formData.fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{formData.fullName}</h2>
              <p>{formData.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <h3>Personal Information</h3>

            <div className="profile-form-grid">

              <div className="profile-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="profile-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="profile-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

            </div>

            <div className="profile-divider"></div>

            <h3>Delivery Address</h3>

            <div className="profile-form-grid">

              <div className="profile-group profile-full-width">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                  rows="3"
                />
              </div>

              <div className="profile-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="profile-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="profile-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                />
              </div>

            </div>

            {error && (
              <p className="profile-error">{error}</p>
            )}

            {message && (
              <p className="profile-success">{message}</p>
            )}

            <button type="submit" className="profile-save-btn">
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
