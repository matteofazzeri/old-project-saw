import { React, useState } from "react";
import { FaRegStar, FaStar, FaCartPlus } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

import AVG_RatingStars from "./AVG_RatingStars";
import AddToCartBtn from "./AddToCartBtn";

const Card = ({ data, handleSetCartAmount }) => {
  const [wishList, setWishList] = useState(false);

  const handleWishList = () => {
    setWishList(!wishList);
  };

  const handleOpenItem = () => {
    // open the item page
    console.log("open: ", data["product_id"]);
  };

  return (
    <>
      <div
        className="relative block text-gray-500 w-[90%] m-auto md:m-0 h-[300px] md:w-[300px] md:h-[500px] bg-black rounded-xl transition-all duration-100 ease-in-out"
        id={data["product_id"]}
      >
        <div className="relative h-[60%] w-full bg-white justify-end">
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
            className="w-full h-full bg-blue-500 rounded-t-xl cursor-pointer"
            src=""
            alt={data["product_name"]}
            onClick={handleOpenItem}
          />
        </div>

        <div className="p-1 w-full h-fit flex flex-col gap-2">
          <AVG_RatingStars rating={data["product_rating"]} />
          <h3
            className="font-bold cursor-pointer hover:text-gray-200 "
            onClick={handleOpenItem}
          >
            {data["product_name"]}
          </h3>
          <span className="flex justify-between text-[13px]">
            <p className="font-bold">{data["product_price"]}</p>
            <p>{data["product_quantity"]}</p>
          </span>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex flex-row justify-between p-2">
            <AddToCartBtn
              data={data}
              handleSetCartAmount={handleSetCartAmount}
            />
            <button className="w-fit border-[1px] border-solid rounded-md py-2 px-4 border-green-700 bg-green-700 flex justify-center align-middle text-white">
              <MdPayment size={22} />
              <p className="text-sm">Buy Now</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
