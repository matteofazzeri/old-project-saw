import { React, useState, useEffect } from "react";

import serverURL from "../config/config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CircularLoader } from "../components/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = ({ cartAmount, handleSetCartAmount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function updateTotalPrice() {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item["product_price"]);
    });
    setTotalPrice(total);
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetch(`${serverURL.development.backendUrl}/cart?user_id=1`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setItems(data);
          data.length === 0 ? setError(true) : setError(false);
        })
        .catch((err) => {
          setError(true);
          //console.log(err);
        })
        .finally(() => {
          updateTotalPrice();
          setLoading(false);
        });
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function handleQuantityChange(e, id) {
    try {
      console.log(e);
    } catch (error) {
      //console.log(error);
    }
  }

  async function handleDeleteItem(id) {
    let payload = {
      user_id: 1,
      product_id: id,
      quantity: 0,
    };

    let inputData = JSON.stringify(
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value !== "")
      ),
      null,
      2
    );

    let info = {
      method: "DELETE",
      body: inputData,
    };

    try {
      const response = await fetch(
        serverURL.development.backendUrl + `/cart`,
        info
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      const data =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      // Update the state to remove the deleted item
      setItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== id)
      );

      handleSetCartAmount((prevAmount) => prevAmount - 1);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
      updateTotalPrice();
    }
  }

  return (
    <>
      <section className="w-full h-fit mt-[51px] mb-0 text-white">
        <Navbar
          cartAmount={cartAmount}
          handleSetCartAmount={handleSetCartAmount}
        />
        <div
          id="cart-view"
          className="w-full md:w-[90%] min-h-screen h-fit m-auto flex flex-col gap-4 bg-yellow-800 p-1"
        >
          {loading ? (
            <CircularLoader color="#fff" size="22px" />
          ) : !error && items.length !== 0 ? (
            <>
              {items.map((item) => (
                <div
                  key={"cart-" + item["product_id"]}
                  id={"cart-" + item["product_id"]}
                  className="flex flex-row bg-white w-full md:w-[50%] mx-auto max-h-[150px] text-black"
                >
                  <img
                    src=""
                    alt={
                      item["product_name"] + " - " + item["product_description"]
                    }
                    className="w-[120px] h-[120px] bg-green-300"
                  />
                  <div className="w-full h-full flex flex-col">
                    <span className="flex flex-row justify-between w-full h-fit bg-blue-200 p-1">
                      <p className="">{item["product_name"]}</p>
                      <p>{item["product_price"]}</p>
                    </span>

                    <span className="flex flex-row w-fit h-fit outline-none p-1 text-black font-normal">
                      <span
                        className="w-fit h-fit bg-blue-300"
                        onClick={() => handleDeleteItem(item["product_id"])}
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-black">Il tuo carrello è vuoto.</p>
          )}
          <div>
            <p>Totale provvisorio: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
