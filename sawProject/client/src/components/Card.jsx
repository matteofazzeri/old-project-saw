import { React, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

import AVG_RatingStars from "./AVG_RatingStars";

const Card = ({ id, data }) => {
  const [wishList, setWishList] = useState(false);

  function checkWishList() {
    if (wishList) {
      return true;
    } else {
      return false;
    }
    // check if the item is in the wishlist in the database
    // if it is, return true
    // else return false
  }

  checkWishList();

  const handleWishList = () => {
    setWishList(!wishList);
  };

  return (
    <>
      <div
        className="hidden md:block text-gray-500 w-[300px] h-[500px] bg-black rounded-xl hover:scale-[1.01] transition-all duration-100 ease-in-out"
        id={id}
      >
        <div className="relative h-fit w-full bg-white justify-end">
          {/* simbols for add to wishlist and for add to cart (maybe only wishlist) */}
          <span
            className="absolute top-2 right-2 w-fit rounded-lg text-yellow-400"
            onClick={handleWishList}
          >
            {wishList ? (
              <FaStar fill="yellow" size={22} />
            ) : (
              <FaRegStar size={22} />
            )}
          </span>
          <img
            className="w-full h-[300px] bg-blue-500 rounded-t-xl"
            src=""
            alt={data["name"]}
          />
        </div>

        <div className="p-1 w-full h-fit flex flex-col gap-2">
          <AVG_RatingStars rating={data["average_rating"]} />
          <h3 className="font-bold">{data["name"]}</h3>
          <span className="flex justify-between text-[13px]">
            <p className="font-bold">{data["price"]}</p>
            <p>{data["quantity"]}</p>
          </span>
        </div>
      </div>

      <div
        className="md:hidden text-gray-500 w-full h-[300px] bg-black rounded-xl py-1 hover:scale-[1.02]"
        id={id}
      >
        <span className="flex p-[2px] h-fit w-full bg-white justify-end">
          {/* simbols for add to wishlist and for add to cart (maybe only wishlist) */}
          <FaRegStar />
          <FaStar fill="yellow" /> {/* only on click  */}
        </span>
        <img className="w-full h-[60%] bg-blue-500" src="" alt={data["name"]} />
        <div className="p-1 w-full h-fit flex flex-col gap-2">
          <AVG_RatingStars rating={data["average_rating"]} />
          <h3 className="font-bold">{data["name"]}</h3>
          <span className="flex justify-between text-[13px]">
            <p className="font-bold">{data["price"]}</p>
            <p>{data["quantity"]}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
