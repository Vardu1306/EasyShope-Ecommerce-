
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About ShopEase</h1>
        <p>Your trusted destination for a smarter shopping experience.</p>
      </section>

      <section className="about-container">
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            ShopEase is an online shopping platform designed to make shopping
            simple, convenient, and enjoyable. We bring a wide range of
            products together in one place so customers can discover and
            purchase their favourite products with ease.
          </p>
          <p>
            Our goal is to provide a smooth shopping experience with easy
            navigation, quality products, and customer-focused service.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900"
            alt="Online shopping"
          />
        </div>
      </section>

      <section className="about-values">
        <h2>Why Choose ShopEase?</h2>

        <div className="about-cards">
          <div className="about-card">
            <span>🛍️</span>
            <h3>Quality Products</h3>
            <p>Discover products selected to make your shopping worthwhile.</p>
          </div>

          <div className="about-card">
            <span>🚚</span>
            <h3>Easy Shopping</h3>
            <p>Enjoy a simple and convenient online shopping experience.</p>
          </div>

          <div className="about-card">
            <span>🔒</span>
            <h3>Secure Experience</h3>
            <p>We focus on making your shopping journey smooth and reliable.</p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To make online shopping accessible, enjoyable, and convenient for
          everyone through a user-friendly shopping platform.
        </p>
      </section>
    </div>
  );
};

export default About;
