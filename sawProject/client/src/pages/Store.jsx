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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // Abort the request after 5000 milliseconds
  const fetchData = async () => {
    try {
      if (category && search) {
        //window.location.href = `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`;

        await fetch(
          `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`,
          { method: "GET", signal: controller.signal }
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
          })
          .finally(() => {
            clearTimeout(timeoutId);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    /* console.log("Categories:", category);
    console.log("Search:", search); */
  }, []);

  return (
    <>
      <Navbar />
      <section className="w-full h-fit pt-4 md:pt-8 text-white">
        {loading ? (
          <Loader />
        ) : !loading && !error ? ( // ! to invert the condition
          <div className="w-[90%] min-h-[85vh] m-auto bg-white">
            <div id="card-container" className="p-1 grid grid-cols-4 gap-4">
              {items.map((item) => (
                <Card key={item.id} data={item} />
              ))}
            </div>
          </div>
        ) : (
          <p>
            Oops! No products found. Try another search or explore our
            categories for more options.
          </p>
        )}
      </section>
    </>
  );
};

export default Store;
