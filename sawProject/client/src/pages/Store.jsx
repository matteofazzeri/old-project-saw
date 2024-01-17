import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// settings
import serverURL from "../config/config";

// components
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Store = () => {
  // setup for loading animations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // setup for search engine
  const [items, setItems] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("categories");
  const search = params.get("search");
  const fetchData = async () => {
    try {
      if (category && search) {
        //window.location.href = `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`;

        await fetch(
          `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`,
          { method: "GET" }
        )
          .then((res) => res.json())
          .then((data) => {
            setItems(data);
            setLoading(false);
            console.log(data);
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    console.log("Categories:", category);
    console.log("Search:", search);
  }, []);

  return (
    <>
      <Navbar />
      <section className="w-full h-fit pt-20 md:pt-24 text-white">
        {loading ? (
          <Loader />
          
        ) : !loading && !error ? ( // ! to invert the condition
          <div className="">
            {console.log(loading, " - ", error)}
            <div id="card-container" className="">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          </div>
        ) : (
          <p>
            {console.log(loading, " - ", error)}
            Oops! No products found. Try another search or explore our
            categories for more options.
          </p>
        )}
      </section>
    </>
  );
};

export default Store;
