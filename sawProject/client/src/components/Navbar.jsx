import React from "react";
import { Link } from "react-router-dom";


import CustomButton from "./CustomButton";
import logo from "../assets/startSAW.png";

const Navbar = ({ nextPage, txt, btnStyleCustom, handleClick }) => {
  return (
    <header>
      <Link to={"/home"}>
        <img src={logo} alt="logo" />
      </Link>

      <Link to={nextPage}>
        <CustomButton
          newPage={nextPage || "/"}
          title={txt || ""}
          customStyles={btnStyleCustom || "start-btn"}
          handleClick={handleClick || null}
        />
      </Link>
    </header>
  );
};

export default Navbar;
