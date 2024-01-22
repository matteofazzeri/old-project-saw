import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RateProductStars = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="flex flex-row">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              size={50}
              color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              /* color={ratingValue <= 3 ? "red" : "yellow"} */
            />
          </label>
        );
      })}

      {/* <p>your rating is: {rating}</p> */}
    </div>
  );
};

export default RateProductStars;
