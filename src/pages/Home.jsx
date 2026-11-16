
import React from "react";
import "./Home.css";
import Category from "../components/Ctaegory";
import FeaturedProducts from "../components/FeaturedProducts";
import OfferBanner from "../components/OfferBaner";
import RecentlyViewed from "../components/RecentlyViewed";
const Home = () => {
  return (
    <div className="home-page">
      
      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-subtitle">
            WELCOME TO SHOPEASE
          </p>

          <h1>
            Discover Your
            <span> Perfect Style</span>
          </h1>

          <p className="hero-description">
            Explore the latest trends, discover amazing products
            and enjoy shopping with exclusive deals.
          </p>

          <div className="hero-buttons">

            <button className="shop-now-btn">
              Shop Now
            </button>

            <button className="explore-btn">
              Explore More
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <h3>10K+</h3>
              <p>Products</p>
            </div>

            <div>
              <h3>5K+</h3>
              <p>Customers</p>
            </div>

            <div>
              <h3>4.8</h3>
              <p>Customer Rating</p>
            </div>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
            alt="ShopEase shopping collection"
          />

          <div className="offer-card">
            <h3>30% OFF</h3>
            <p>On your first order</p>
          </div>

        </div>

      </section>
      <RecentlyViewed/>
      <Category/>
        <FeaturedProducts/>
        <OfferBanner/>
    </div>
  );
};

export default Home;
