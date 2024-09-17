// src/components/StarRating.js
import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? <FaStar key={i} color="#f39c12" /> : <FaRegStar key={i} color="#f39c12" />
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;