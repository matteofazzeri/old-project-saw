import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// settings
import serverURL from "../config/config";

// components
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Store = () => {
  const [items, setItems] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("categories");
  const search = params.get("search");

  useEffect(() => {
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
              //console.log(data);
            })
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
        {items === null || items === undefined ? (
          <p>Search Something...</p>
        ) : (
          <div id="card-container" className="">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Store;
