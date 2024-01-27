import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// settings
import serverURL from "../config/config";

// components
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Loader } from "../components/Loader";

const Store = ({ cartAmount, handleSetCartAmount }) => {
  // setup for loading animations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  // setup for search engine
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("categories");
  const search = params.get("search");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // Abort the request after 5000 milliseconds

  const fetchData = async () => {
    try {
      if (category && search) {
        setLoading(true);
        await fetch(
          `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`,
          { method: "GET", signal: controller.signal }
        )
          .then((res) => res.json())
          .then((data) => {
            setItems(data);
            setLoading(false);
            //console.log(data);
            data.length === 0 ? setError(true) : setError(false);
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
            console.log(err);
          })
          .finally(() => {
            clearTimeout(timeoutId);
          });
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // TODO: PAGINATION WE NEED PAGINATION!!!!

  return (
    <>
      <section className="w-full h-fit mt-[51px] mb-0 text-white">
        <Navbar
          cartAmount={cartAmount}
          handleSetCartAmount={handleSetCartAmount}
        />
        <div
          id="card-container"
          className="w-full md:w-[90%] min-h-screen h-fit m-auto flex flex-col md:flex-row md:flex-wrap gap-4 bg-white p-1"
        >
          {loading ? (
            <Loader />
          ) : !error ? ( // ! to invert the condition
            <>
              {items.map((item) => (
                <Card
                  key={item.product_id}
                  data={item}
                  handleSetCartAmount={handleSetCartAmount}
                />
              ))}
            </>
          ) : (
            <p className="text-black">
              Oops! No products found. Try another search or explore our
              categories for more options.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Store;
