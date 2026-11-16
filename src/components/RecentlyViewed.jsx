
import React, { useContext } from "react";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import ProductCard from "./ProductCard";
import "./RecentlyViewed.css";

const RecentlyViewed = () => {
  const { recentlyViewed } = useContext(RecentlyViewedContext);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <h2>Recently Viewed Products</h2>

      <div className="recently-viewed-container">
        {recentlyViewed.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
