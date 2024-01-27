import { React, useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import { useSnapshot } from "valtio";
import { IoMenu, IoHome, IoCart, IoPerson } from "react-icons/io5";
import { BiCartDownload } from "react-icons/bi";

import settings from "../settings/state";
import { CircularLoader } from "./Loader";
import serverURL from "../config/config";

const Navbar = ({ cartAmount, handleSetCartAmount }) => {
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
    sessionStorage.setItem("searchElem", e.target.value);
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // check if search bar has something to be searched
    if (!(search === "" || search === undefined)) {
      const attribute = `categories=${category}&search=${search}`;
      //console.log(attribute);
      window.location.href = `/shop?${attribute}`;
    }
  };

  // * have fun with gps info thanks to ip address :D
  var requestOptions = {
    method: "GET",
  };

  const shippingAddress = () => {
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
  };
  useEffect(() => {
    shippingAddress();
  }, []);

  async function checkElemInCart() {
    let info = {
      method: "GET",
    };

    await fetch(`${serverURL.development.backendUrl}/cart?user_id=1}`, info)
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
      .then((payload) => {
        //console.log("inside func: ",payload);
        const items = JSON.parse(payload);
        //console.log(items.length);
        handleSetCartAmount((prevAmount) => items.length);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        return error;
      });
  }
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const items = await checkElemInCart();
          //console.log(items);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    },
    [
      /* Dependencies */
    ]
  );

  return (
    <>
      <header className="fixed top-0 left-0 h-[50px] w-screen z-50 box-border bg-slate-700">
        <nav className="w-[95%] h-full mx-auto flex align-middle flex-row">
          <ul className="w-full flex items-center justify-around py-1 text-white">
            <li className="hidden md:block max-w-[7%]">
              <Link to="/">
                <img className="w-full" src="startSAW.png" alt="Logo" />
              </Link>
            </li>
            <li className="hidden md:block w-[fit] cursor-pointer ">
              {false || (
                <div
                  id="location"
                  className="border-[1px] border-transparent hover:border-[1px] hover:border-white text-sm w-max mx-3"
                >
                  <CircularLoader />
                </div>
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
                  <option value="spaceship">Spaceships</option>
                  <option value="spacesuit">Spacesuits</option>
                  <option value="spacepart">Spaceparts</option>
                </select>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Hypersonic spaceship..."
                  value={search}
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
            <li id="cart-desktop" className="hidden md:block mx-2">
              <a href="/cart">
                <span className="relative flex text-end ">
                  <div className="relative">
                    <div className="absolute top-[6px] left-[50%] -translate-x-[25%] w-[11px] h-[13px] rounded-xl bg-slate-700"></div>
                    <p
                      id="num-item-cart"
                      className="absolute -top-[3px] left-[50%] -translate-x-[38%] rounded-2xl text-yellow-500 font-semibold text-sm bg-none py-0 px-[3px]"
                    >
                      {cartAmount}
                    </p>
                    <BiCartDownload size={"2rem"} />
                  </div>
                  <p>Carrello</p>
                </span>
              </a>
            </li>
            {/*
              maybe fare in modo che l'utente possa sceglierlo
              TODO: fare in modo che richiami alla pagina di modifica dell'indirizzo di spedizione
            */}
            <li id="mobile-bar" className="flex md:hidden">
              <ul className="fixed bottom-0 left-0 flex justify-between w-screen p-2 bg-[#042247]">
                <li id="shop">
                  <a href="/shop">
                    <IoHome size={"2rem"} />
                  </a>
                </li>
                <li id="profile">
                  <a href="/profile">
                    <IoPerson size={"2rem"} />
                  </a>
                </li>
                <li id="cart-mobile">
                  <a href="/cart">
                    <div className="relative">
                      <div className="absolute top-[6px] left-[50%] -translate-x-[25%] w-[11px] h-[13px] rounded-xl bg-[#042247]"></div>
                      <p
                        id="num-item-cart"
                        className="absolute -top-[3px] left-[50%] -translate-x-[38%] rounded-2xl text-yellow-500 font-semibold text-sm bg-none py-0 px-[3px]"
                      >
                        {cartAmount}
                      </p>
                      <BiCartDownload size={"2rem"} />
                    </div>
                  </a>
                </li>
                <li id="menu" onClick={setIsOpen}>
                  <IoMenu size={"2rem"} />
                </li>
              </ul>
            </li>
          </ul>
          {/* SIDEBAR */}
          <ul
            id="sidebar"
            className="hidden flex-col z-50 fixed top-0 right-0 h-[100vh] w-[50%] bg-blue-800/50 shadow-[0_2px_6px_3px_rgba(199,193,193,0.3)]
                        text-white align-middle justify-start py-6 backdrop-blur-sm"
          >
            <li className="w-full h-fit flex items-center align-middle justify-around flex-row border-b-[1px] pb-4 border-dotted">
              <span
                className="w-fit flex items-center align-middle h-fit flex-col"
                onClick={setIsOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="white"
                  className="hover:bg-slate-500/40 rounded-full border bg-slate-400"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </span>
              <Link to="/">
                <img className="w-44" src="startSAW.png" alt="Logo" />
              </Link>
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
