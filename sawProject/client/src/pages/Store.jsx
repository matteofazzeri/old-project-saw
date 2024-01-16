import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";

// settings
import serverURL from "../config/config";

// components
import Navbar from "../components/Navbar";

const Store = () => {
  const item = null;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("categories");
  const search = params.get("search");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categories && search) {
          //window.location.href = `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`;

          await fetch(
            `${serverURL.development.backendUrl}/shop?categories=${category}&search=${search}`,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    console.log("Categories:", category);
    console.log("Search:", search);
  }, [category, search]);

  return (
    <>
      <Navbar />
      <section className="w-full h-fit pt-20 md:pt-24 text-white">
        {item === null && <p>Search Something...</p>}
      </section>
    </>
  );
};

export default Store;
