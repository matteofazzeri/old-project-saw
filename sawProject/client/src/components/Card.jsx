import { React, useState } from "react";
import { FaRegStar, FaStar, FaCartPlus } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsCartX } from "react-icons/bs";

import AVG_RatingStars from "./AVG_RatingStars";
import serverURL from "../config/config";
import { CircularLoader } from "./Loader";

const Card = ({ id, data }) => {
  const [wishList, setWishList] = useState(false);
  const [amount, setAmount] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWishList = () => {
    setWishList(!wishList);
  };

  const handleOpenItem = () => {
    // open the item page
    console.log("open: ", data["id"]);
  };

  const handleAddToCart = () => {
    setInCart(!inCart);
    setLoading(true);

    /*  if (inCart) {
      // remove the item from the cart
      let info = {
        method: "DELETE",
      };

      fetch(
        serverURL.development.backendUrl +
          `/shop_cart?user_id=1&item_id=${data["id"]}`,
        info
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Check if the response content type is JSON
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            // Handle non-JSON response (e.g., plain text or HTML)
            return response.text();
          }
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });
    } else {
      // add the item to the cart
      let paylod = {
        user_id: 1,
        item_id: data["id"],
        quantity: amount,
      };

      let info = {
        method: "POST",
        body: paylod,
      };

      fetch(serverURL.development.backendUrl + "/shop_cart", info)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Check if the response content type is JSON
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            // Handle non-JSON response (e.g., plain text or HTML)
            return response.text();
          }
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });
    } */
  };

  return (
    <>
      <div
        className="relative block text-gray-500 w-[90%] m-auto md:m-0 h-[300px] md:w-[300px] md:h-[500px] bg-black rounded-xl transition-all duration-100 ease-in-out"
        id={id}
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
            alt={data["name"]}
            onClick={handleOpenItem}
          />
        </div>

        <div className="p-1 w-full h-fit flex flex-col gap-2">
          <AVG_RatingStars rating={data["average_rating"]} />
          <h3
            className="font-bold cursor-pointer hover:text-gray-200 "
            onClick={handleOpenItem}
          >
            {data["name"]}
          </h3>
          <span className="flex justify-between text-[13px]">
            <p className="font-bold">{data["price"]}</p>
            <p>{data["quantity"]}</p>
          </span>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex flex-row justify-between p-2">
            <button
              className="w-fit border-[1px] border-solid rounded-md py-2 px-3 flex justify-center align-middle flex-row text-white"
              onClick={handleAddToCart}
            >
              {loading ? (
                <>
                  <CircularLoader color="#fff" size="22px"/>
                  <p className="text-sm">Adding...</p>
                </>
              ) : inCart ? (
                <>
                  <BsCartX size={22} />
                  <p className="text-sm">Remove Item</p>
                </>
              ) : (
                <>
                  <FaCartPlus size={22} />
                  <p className="text-sm">Add to Cart</p>
                </>
              )}
            </button>
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
