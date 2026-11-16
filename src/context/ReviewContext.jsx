
import React, { createContext, useState, useEffect } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("productReviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem("productReviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
