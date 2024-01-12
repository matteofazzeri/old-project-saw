import { React, useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  let { isOpen, setIsOpen } = useState(false);

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

  return (
    <>
      <header className="h-fit w-[100vw] py-5 fixed top-0 left-0 bg-black/40 z-50">
        <nav className="flex justify-between items-center max-w-[95%] mx-auto ">
          <span className="min-w-[50%] xl:min-w-[65%]">
            <Link to="/">
              <img className="max-w-[12rem]" src="startSAW.png" alt="" />
            </Link>
          </span>
          <ul className="flex justify-around w-[50%] 2xl:w-[25%] items-center text-white">
            <li className="hidden md:flex sm:text-xl justify-center hover:bg-blue-300/30 rounded-2xl">
              <a className="px-5 py-2 w-[100%]" href="/#home">
                Home
              </a>
            </li>
            <li className="hidden md:flex sm:text-xl justify-center py-2 w-[100%] hover:bg-blue-300/30 rounded-2xl">
              <a href="/#aboutus">About Us</a>
            </li>
            <li className="hidden md:flex sm:text-xl justify-center py-2 w-[100%] hover:bg-blue-300/30 rounded-2xl">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="hidden md:flex sm:text-xl justify-center py-2 w-[100%] hover:bg-blue-300/30 rounded-2xl">
              <Link to="/shop">Shop</Link>
            </li>
            <li onClick={setIsOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 -960 960 960"
                width="35"
                fill="white"
                className="md:hidden fixed top-7 right-5"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </li>
          </ul>

          {/* SIDEBAR */}
          <ul
            id="sidebar"
            className="hidden flex-col z-[999] fixed top-0 right-0 h-[100vh] w-[250px] bg-blue-800/50 shadow-[0_2px_6px_3px_rgba(199,193,193,0.3)]
                        text-white align-middle justify-start py-6 backdrop-blur-md"
          >
            <li className="w-[100%]" onClick={setIsOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="white"
                className="hover:bg-slate-500/40 rounded-full mx-3"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </li>
            <li className="px-4 py-2 w-[100%] hover:bg-black">
              <a href="#home">Home</a>
            </li>
            <li className="px-4 py-2 w-[100%] hover:bg-black">
              <a href="#aboutus">About Us</a>
            </li>
            <li className="px-4 py-2 w-[100%] hover:bg-black">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-4 py-2 w-[100%] hover:bg-black">
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
