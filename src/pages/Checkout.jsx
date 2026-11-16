
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { products, updateProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    paymentMethod: "Cash on Delivery",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const totalAmount = subtotal;
  const finalAmount = Math.max(0, subtotal - discount);

  // Handle shipping form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle payment details
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply coupon
  const applyCoupon = () => {
    const coupon = couponCode.trim().toUpperCase();

    if (coupon === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setAppliedCoupon(coupon);
      alert("10% discount applied successfully!");
    } else if (coupon === "SAVE20") {
      setDiscount(subtotal * 0.2);
      setAppliedCoupon(coupon);
      alert("20% discount applied successfully!");
    } else {
      setDiscount(0);
      setAppliedCoupon("");
      alert("Invalid coupon code!");
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon("");
    setCouponCode("");
  };

  // Handle order submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/products");
      return;
    }

    // Validate shipping details
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    // Validate UPI details
    if (formData.paymentMethod === "UPI") {
      const upiPattern = /^[\w.-]+@[\w.-]+$/;

      if (!upiPattern.test(paymentDetails.upiId.trim())) {
        alert("Please enter a valid UPI ID.");
        return;
      }
    }

    // Validate card details (demo only)
    if (formData.paymentMethod === "Credit/Debit Card") {
      const cardNumber = paymentDetails.cardNumber.replace(/\s/g, "");

      if (!paymentDetails.cardHolder.trim()) {
        alert("Please enter card holder name.");
        return;
      }

      if (!/^\d{13,19}$/.test(cardNumber)) {
        alert("Please enter a valid card number.");
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiryDate)) {
        alert("Enter expiry date in MM/YY format.");
        return;
      }

      if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
        alert("Please enter a valid CVV.");
        return;
      }

      alert(
        "Card payment is not connected yet. Please use Cash on Delivery or UPI demo."
      );
      return;
    }

    // Combine quantities for duplicate products
    const quantityMap = {};

    cartItems.forEach((item) => {
      quantityMap[item.id] =
        (quantityMap[item.id] || 0) + Number(item.quantity || 1);
    });

    // Validate stock
    const stockUpdates = [];

    for (const productId of Object.keys(quantityMap)) {
      const product = products.find(
        (item) => String(item.id) === String(productId)
      );

      if (!product) {
        alert("One or more products are no longer available.");
        return;
      }

      const availableStock = Number(product.stock || 0);
      const requestedQuantity = quantityMap[productId];

      if (availableStock < requestedQuantity) {
        alert(
          `Insufficient stock for ${product.title}. Available stock: ${availableStock}`
        );
        return;
      }

      stockUpdates.push({
        product,
        previousStock: availableStock,
        remainingStock: availableStock - requestedQuantity,
      });
    }

    // Create order
    const order = {
      orderId: "SE" + Date.now(),
      customer: { ...formData },
      products: [...cartItems],
      subtotal: totalAmount,
      discount: discount,
      couponCode: appliedCoupon,
      totalAmount: finalAmount,
      orderDate: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
      status: "Order Placed",
      paymentMethod: formData.paymentMethod,
      paymentStatus:
        formData.paymentMethod === "Cash on Delivery"
          ? "Pending"
          : "Demo - Not Paid",
      statusHistory: [
        {
          status: "Order Placed",
          date: new Date().toLocaleString(),
        },
      ],
    };

    // Save order
    const existingOrders =
      JSON.parse(localStorage.getItem("shopeaseOrders")) || [];

    localStorage.setItem(
      "shopeaseOrders",
      JSON.stringify([...existingOrders, order])
    );

    // Update product stock and create inventory notifications
    const inventoryNotifications = [];

    stockUpdates.forEach(
      ({ product, previousStock, remainingStock }) => {
        updateProduct({
          ...product,
          stock: remainingStock,
        });

        if (previousStock > 0 && remainingStock === 0) {
          inventoryNotifications.push({
            id: "OUT-" + product.id + "-" + Date.now(),
            title: "Product Out of Stock",
            message: `${product.title} is now out of stock.`,
            type: "out-of-stock",
            date: new Date().toISOString(),
            read: false,
          });
        } else if (previousStock > 5 && remainingStock <= 5) {
          inventoryNotifications.push({
            id: "LOW-" + product.id + "-" + Date.now(),
            title: "Low Stock Alert",
            message: `${product.title} has only ${remainingStock} item(s) remaining.`,
            type: "inventory",
            date: new Date().toISOString(),
            read: false,
          });
        }
      }
    );

    // Create order notification
    const newNotification = {
      id: "NOT-" + Date.now(),
      title: "New Order Received",
      message: `New order ${order.orderId} placed by ${formData.fullName}.`,
      type: "order",
      date: new Date().toISOString(),
      read: false,
      orderId: order.orderId,
    };

    const existingNotifications =
      JSON.parse(localStorage.getItem("shopeaseNotifications")) || [];

    const updatedNotifications = [
      newNotification,
      ...inventoryNotifications,
      ...existingNotifications,
    ];

    localStorage.setItem(
      "shopeaseNotifications",
      JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(
      new Event("shopeaseNotificationsUpdated")
    );

    // Clear cart
    dispatch({ type: "CLEAR_CART" });

    // Navigate to confirmation page
    navigate("/order-confirmation", {
      state: { order },
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-details">
          <h3>Shipping Details</h3>

          <div className="checkout-input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="checkout-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="checkout-input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              required
            />
          </div>

          <div className="checkout-input-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
              required
            />
          </div>

          <div className="checkout-input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>

          <div className="checkout-input-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>

          <div className="checkout-input-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              required
            />
          </div>

          <h3>Payment Method</h3>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={formData.paymentMethod === "Cash on Delivery"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={formData.paymentMethod === "UPI"}
                onChange={handleChange}
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Credit/Debit Card"
                checked={formData.paymentMethod === "Credit/Debit Card"}
                onChange={handleChange}
              />
              Credit/Debit Card
            </label>
          </div>

          {formData.paymentMethod === "UPI" && (
            <div className="checkout-input-group">
              <label>UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={paymentDetails.upiId}
                onChange={handlePaymentChange}
                placeholder="example@upi"
              />
            </div>
          )}

          {formData.paymentMethod === "Credit/Debit Card" && (
            <div className="card-payment-fields">
              <div className="checkout-input-group">
                <label>Card Holder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={paymentDetails.cardHolder}
                  onChange={handlePaymentChange}
                  placeholder="Name on card"
                />
              </div>

              <div className="checkout-input-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="Enter card number"
                />
              </div>

              <div className="checkout-input-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                />
              </div>

              <div className="checkout-input-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentChange}
                  placeholder="CVV"
                />
              </div>
            </div>
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <span>{item.title}</span>
              <span>
                ₹{Number(item.price) * Number(item.quantity || 1)}
              </span>
            </div>
          ))}

          <div className="coupon-section">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
            />

            <button type="button" onClick={applyCoupon}>
              Apply
            </button>

            {appliedCoupon && (
              <button type="button" onClick={removeCoupon}>
                Remove Coupon
              </button>
            )}
          </div>

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="checkout-total-row">
            <span>Discount</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>

          <div className="checkout-total-row checkout-grand-total">
            <strong>Total Amount</strong>
            <strong>₹{finalAmount.toFixed(2)}</strong>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
