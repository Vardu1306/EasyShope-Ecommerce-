
import React, { useContext } from "react";
import { ReviewContext } from "../context/ReviewContext";
import { useParams } from "react-router-dom";
import "./ReviewList.css";

const ReviewList = () => {
  const { id } = useParams();
  const { reviews } = useContext(ReviewContext);

  const productReviews = reviews.filter(
    (review) => String(review.productId) === String(id)
  );

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>

      {productReviews.length === 0 ? (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      ) : (
        productReviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-stars">
              {"★".repeat(review.rating)}
              <span>{"☆".repeat(5 - review.rating)}</span>
            </div>

            <p>{review.comment}</p>
            <small>Posted on: {review.date}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
