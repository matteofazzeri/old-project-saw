import React from "react";

// settings
import serverURL from "../config/config";

// components
import Navbar from "../components/Navbar";

const Store = () => {
  const item = null;

  const YourComponent = () => {
    useEffect(() => {
      // Function to fetch data based on categories and search values
      const fetchData = async () => {
        try {
          // Get the current URL
          const currentUrl = window.location.href;

          // Extract query parameters using URLSearchParams
          const urlSearchParams = new URLSearchParams(currentUrl);
          const categories = urlSearchParams.get("categories");
          const search = urlSearchParams.get("search");

          // Check if both categories and search values are present
          if (categories && search) {
            // Fetch data from the server using categories and search values
            const response = await fetch(
              `${serverURL.development.backendUrl}/shop?categories=${categories}&search=${search}`
            );
            const data = await response.json();

            // Process the fetched data as needed
            console.log("Fetched data:", data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // Call the fetchData function when the component mounts
      fetchData();
    }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
  };

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
