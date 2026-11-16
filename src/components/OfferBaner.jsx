
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OfferBaner.css";

const OfferBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="offer-banner">
      <div className="offer-banner-content">
        <p className="offer-label">LIMITED TIME OFFER</p>

        <h2>
          Special Offer
          <span> Up To 50% OFF</span>
        </h2>

        <p className="offer-description">
          Discover amazing deals on your favourite products.
          Shop now and enjoy exclusive discounts.
        </p>

        <button onClick={() => navigate("/products")}>
          Explore Deals →
        </button>
      </div>

      <div className="offer-banner-image">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
          alt="Special shopping offers"
        />
        <div className="discount-circle">
          <h3>50%</h3>
          <p>OFF</p>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
