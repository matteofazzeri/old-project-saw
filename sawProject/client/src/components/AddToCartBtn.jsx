import { React, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { CircularLoader } from "./Loader";
import { FaCartPlus } from "react-icons/fa";

import serverURL from "../config/config";

const AddToCartBtn = ({ data }) => {
  const [amount, setAmount] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    let paylod = {
      user_id: 1,
      product_id: data["product_id"],
      quantity: amount,
    };

    let inputData = JSON.stringify(
      Object.fromEntries(
        Object.entries(paylod).filter(([key, value]) => value !== "")
      ),
      null,
      2
    );

    if (inCart) {
      // remove the item from the cart
      let info = {
        method: "DELETE",
        body: inputData,
      };

      fetch(serverURL.development.backendUrl + `/cart`, info)
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
          setInCart(!inCart);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });
    } else {
      console.log(inputData);
      let info = {
        method: "POST",
        body: inputData,
      };

      fetch(serverURL.development.backendUrl + "/cart", info)
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
          setInCart(!inCart);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });
    }
  };

  const checkElemInCart = () => {
    setLoading(true);

    let info = {
      method: "GET",
    };

    console.log(`${serverURL.development.backendUrl}/cart?user_id=1&product_id=${data['product_id']}`);

    fetch(`${serverURL.development.backendUrl}/cart?user_id=1&product_id=${data['product_id']}`, info)
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
      .then((paylod) => {
        console.log("Success:", paylod);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  };

  useEffect(() => {
    checkElemInCart();
  }, []);

  return (
    <button
      className="w-fit border-[1px] border-solid rounded-md py-2 px-3 flex justify-center align-middle flex-row text-white"
      onClick={handleAddToCart}
    >
      {loading ? (
        <>
          <CircularLoader color="#fff" size="22px" />
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
  );
};

export default AddToCartBtn;
