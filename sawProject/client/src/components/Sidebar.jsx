import React from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

import settings from "../settings/state";


const Sidebar = () => {
  const { state, userInfo } = settings;
  const snap = useSnapshot(state);

  const setIsOpen = () => {
    snap.sidebarOpen = !snap.sidebarOpen;
    const sidebar = document.getElementById("sidebar");
    if (snap.sidebarOpen) {
      sidebar.classList.remove("hidden");
      sidebar.classList.add("flex");
    } else {
      sidebar.classList.remove("flex");
      sidebar.classList.add("hidden");
    }
  };

  return (
    <ul
      id="sidebar"
      className="hidden flex-col z-[999] fixed top-0 right-0 h-[100vh] w-[250px] bg-blue-800/50 shadow-[0_2px_6px_3px_rgba(199,193,193,0.3)] text-white align-middle justify-start py-6 backdrop-blur-md"
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
        <Link to="/">Home</Link>
      </li>
      <li className="px-4 py-2 w-[100%] hover:bg-black">
        <Link to="/about">About Us</Link>
      </li>
      <li className="px-4 py-2 w-[100%] hover:bg-black">
        <Link to="/contact">Contact</Link>
      </li>
      <li className="px-4 py-2 w-[100%] hover:bg-black">
        <Link to="/shop">Shop</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
