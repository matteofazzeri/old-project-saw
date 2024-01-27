import React, { useEffect, useState } from "react";

import CustomButton from "./CustomButton";
import serverURL from "../config/config";

const AmountInput = (data) => {
  const [needTextInput, setNeedTextInput] = useState(false);
  const [valueInput, setvalueInput] = useState(10);
  const [amount, setAmount] = useState(0);

  async function changeQuantity(value) {
    try {
      // Prepare the payload
      const payload = {
        user_id: data.userId,
        product_id: data.product_id,
        quantity: value,
      };

      // Convert payload to JSON
      const inputData = JSON.stringify(payload);

      // Set up the fetch options
      const info = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: inputData,
      };

      // Make the fetch request
      await fetch(`${serverURL.development.backendUrl}/cart`, info)
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
        })
        .finally(() => {
          window.location.reload();
        });
    } catch (error) {
      // Log and handle errors
      console.error("Error updating quantity:", error.message);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setAmount(value);

    if (value >= 10) {
      setNeedTextInput(true);
    } else {
      setNeedTextInput(false);
      changeQuantity(value);
    }
  };

  const handleChangeInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    //console.log(value);
    setvalueInput(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setNeedTextInput(false);
    setAmount(valueInput);
    setvalueInput(10);
    changeQuantity(valueInput);
  };

  useEffect(() => {
    setAmount(data.amount);
  }, []);

  return (
    <div className="cursor-pointer w-fit">
      {needTextInput ? (
        <form onSubmit={handleSubmit} className="flex align-middle">
          <input
            type="number"
            name="amount"
            id="new-amount"
            onChange={handleChangeInput}
            value={valueInput}
            className="outline-none w-[50px] h-fit rounded-xl text-center appearance-auto"
          />
          <CustomButton
            type={"submit"}
            title={"Submit"}
            customStyles={
              "bg-yellow-500 w-fit h-fit ml-[2px] mt-[4px] px-2 text-[10px] font-sm text-black rounded-md"
            }
            handleClick={handleSubmit}
          />
        </form>
      ) : (
        <form>
          <select
            name="item-count"
            id={"item-count" + data.productId}
            className="outline-none w-[50px] h-fit rounded-xl text-center appearance-auto"
            value={amount}
            onChange={handleChange}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
            {amount > 10 && <option value={amount}>{amount}</option>}
          </select>
        </form>
      )}
    </div>
  );
};

export default AmountInput;
