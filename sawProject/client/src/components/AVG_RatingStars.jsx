import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const AVG_RatingStars = ({ rating, maxRating = 5 }) => {
  const starComponents = [];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starComponents.push(<FaStar key={i} />);
  }

  // Half star
  if (hasHalfStar) {
    starComponents.push(<FaStarHalfAlt key="half" />);
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starComponents.push(<FaRegStar key={`empty-${i}`} />);
  }

  return <div className="flex align-middle text-yellow-400">{starComponents}</div>;
};

export default AVG_RatingStars;
