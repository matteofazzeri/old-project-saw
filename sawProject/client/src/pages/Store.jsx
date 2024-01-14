import React from "react";

// components
import Navbar from "../components/Navbar";

const Store = () => {
  const item = null;

  return (
    <>
      <Navbar />
      <section className="w-full h-fit pt-20 md:pt-24">
        {item === null && <p>Search Something...</p>}
      </section>
    </>
  );
};

export default Store;
