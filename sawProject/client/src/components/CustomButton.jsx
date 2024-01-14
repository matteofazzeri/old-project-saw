import React from "react";

const CustomButton = ({ type, disable, title, customStyles, handleClick }) => {
  return (
    <button
      className={customStyles + " p-2 px-4 border-2 rounded-md "}
      onClick={handleClick}
      type={type || "#"}
      disabled={disable || false}
    >
      {title}
    </button>
  );
};

export default CustomButton;
