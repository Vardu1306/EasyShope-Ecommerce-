
import React, {
  createContext,
  useState,
  useEffect,
} from "react";

export const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const savedProducts = localStorage.getItem("recentlyViewed");

    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    );
  }, [recentlyViewed]);

  const addRecentlyViewed = (product) => {
    setRecentlyViewed((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (item) => item.id !== product.id
      );

      return [product, ...updatedProducts].slice(0, 8);
    });
  };

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, addRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};
