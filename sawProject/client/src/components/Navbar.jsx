import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

import settings from "../settings/state";

const Navbar = () => {
  let { isOpen, setIsOpen } = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { state, userInfo } = settings;
  const snapUser = useSnapshot(userInfo);

  setIsOpen = () => {
    isOpen = !isOpen;
    const sidebar = document.getElementById("sidebar");
    if (isOpen) {
      sidebar.classList.remove("hidden");
      sidebar.classList.add("flex");
    } else {
      sidebar.classList.remove("flex");
      sidebar.classList.add("hidden");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // check if search bar has something to be searched
    if (!(search === "" || search === undefined)) {
      window.location.href = `/shop?categories=${category}&search=${search}`;
      console.log(`categories=${category}&search=${search}`);
    }
  };

  // * have fun with gps info thanks to ip address :D

  var requestOptions = {
    method: "GET",
  };

  // fetch where the user is if not logged
  if (snapUser.loggedIn) {
    document.getElementById("location").innerHTML = `${
      "Send to" + snapUser.name + snapUser.address
    }`;
  } else {
    fetch(
      "https://api.geoapify.com/v1/ipinfo?&apiKey=fa4633f6309745f39484e1343fb0d8cf",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        document.getElementById("location").innerHTML = `${
          "Sending to " + result.city.name
        }`;
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <header className="h-fit w-screen z-50 box-border bg-slate-700">
        <nav className="w-[99%] mx-auto">
          <ul className="flex items-center justify-around py-1 text-white">
            <li className="hidden md:block max-w-[7%]">
              <Link to="/">
                <img className="w-full" src="startSAW.png" alt="Logo" />
              </Link>
            </li>
            <li className="hidden md:block w-[fit] cursor-pointer ">
              {false || (
                <p
                  id="location"
                  className="border-[1px] border-transparent hover:border-[1px] hover:border-white text-sm w-max mx-3"
                >
                  Location: Loading...
                </p>
              )}
            </li>
            <li id="searchBar" className="h-[40px] w-full">
              <form
                onSubmit={handleSearch}
                action=""
                className="flex align-middle h-full w-full"
              >
                {/* we have to change this */}
                <select
                  name="categories"
                  id="categories"
                  defaultValue="all"
                  className="h-full w-fit flex justify-center text-[12px] text-gray-700 bg-gray-300 outline-none rounded-l-md"
                  onChange={handleCategoryChange}
                >
                  <option value="all">All</option>
                  <option value="raceship">Race Spaceship</option>
                </select>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Hypersonic spaceship..."
                  className="text-gray-500 bg-white outline-none px-1 h-full w-full"
                  onChange={handleSearchChange}
                />
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    viewBox="0 -960 960 960"
                    width="45"
                    fill="white"
                    className="hover:bg-yellow-700 rounded-r-md bg-yellow-600"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </button>
              </form>
            </li>
            <li className="hidden md:block w-[150px] mx-2">
              {/* <a> or <Link> we'll see */}
              <a href="">
                <div className="flex flex-col">
                  <span className="m-0 p-0 bg-red-300 text-xs flex">
                    Ciao, &nbsp;{" "}
                    <p className="uppercase">
                      {snapUser.loggedIn ? snapUser.name : "Accedi"}
                    </p>
                  </span>
                  <span className="m-0 p-0 bg-green-300 text-xs">
                    Account e liste
                  </span>
                </div>
              </a>
            </li>
            <li className="hidden md:block mx-2">
              <a href="/cart">
                <span className="relative flex text-end bg-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="white"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                  <p>Carrello</p>
                </span>
              </a>
            </li>
            {/*
              maybe fare in modo che l'utente possa sceglierlo
              TODO: fare in modo che richiami alla pagina di modifica dell'indirizzo di spedizione
            */}
            <li id="menu" onClick={setIsOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 -960 960 960"
                width="35"
                fill="white"
                className="flex md:hidden fixed bottom-2 right-2"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </li>
          </ul>
          {/* SIDEBAR */}
          <ul
            id="sidebar"
            className="hidden flex-col z-50 fixed top-0 right-0 h-[100vh] w-[50%] bg-blue-800/50 shadow-[0_2px_6px_3px_rgba(199,193,193,0.3)]
                        text-white align-middle justify-start py-6 backdrop-blur-sm"
          >
            <li className="w-[100%]" onClick={setIsOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="white"
                className="hover:bg-slate-500/40 rounded-full mx-3 mb-10 border"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </li>
            <li className="px-4 py-2 w-full">
              <a href="/#home">Home</a>
            </li>
            <li className="px-4 py-2 w-full">
              <a href="/#about">About Us</a>
            </li>
            <li className="px-4 py-2 w-full">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-4 py-2 w-full">
              <Link to="/store">Shop</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
