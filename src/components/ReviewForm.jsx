
import React, { useContext, useState } from "react";
import { ReviewContext } from "../context/ReviewContext";
import { useParams } from "react-router-dom";
import "./ReviewForm.css";

const ReviewForm = () => {
  const { id } = useParams();
  const { addReview } = useContext(ReviewContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (comment.trim() === "") {
      alert("Please write your review");
      return;
    }

    const newReview = {
      id: Date.now(),
      productId: id,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    addReview(newReview);

    setRating(0);
    setComment("");

    alert("Review submitted successfully!");
  };

  return (
    <div className="review-form">
      <h2>Write a Review</h2>

      <form onSubmit={handleSubmit}>
        <label>Your Rating</label>

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "active" : ""}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <label>Your Review</label>

        <textarea
          placeholder="Write your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
