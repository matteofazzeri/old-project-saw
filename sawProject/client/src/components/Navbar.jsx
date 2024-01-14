import { React, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let { isOpen, setIsOpen } = useState(false);
  let { search, setSearch } = useState("");

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

  setSearch = (e) => {
    search = e.target.value;
    console.log("searching ... ", search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("the search is: ", search);
  };

  return (
    <>
      <header className="h-fit w-screen z-50 box-border">
        <nav className="w-[98%] mx-auto">
          <ul className="flex items-center">
            <li>
              <Link to="/">
                <img className="max-w-[12rem]" src="startSAW.png" alt="Logo" />
              </Link>
            </li>
            <li className="text-white w-[fit] cursor-pointer p-1">
              {false || (
                <p className="border-[1px] border-transparent px-1 hover:border-[1px] hover:border-white text-sm">
                  Send to <br /> Planet Earth
                </p>
              )}
            </li>
            <li
              id="searchBar"
              className="relative w-[300px] h-[32px] flex items-center border-[1px] border-white rounded-md bg-white"
            >
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="text-black bg-transparent placeholder-gray placeholder-opacity-50 p-1 w-[90%] outline-none"
                  placeholder="Super fast spaceship..."
                  onChange={setSearch}
                />
                <button
                  type="submit"
                  className="absolute right-0 w-[10%]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    viewBox="0 -960 960 960"
                    width="32"
                    fill="white"
                    className="hover:bg-yellow-700 rounded-r-md bg-yellow-600"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </button>
              </form>
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
                className="flex md:hidden fixed top-7 right-5"
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
