import React from "react";

const CustomButton = ({ type, disable, title, customStyles, handleClick }) => {
  return (
    <button
      className={customStyles}
      onClick={handleClick}
      type={type || "#"}
      disabled={disable || false}
    >
      {title}
    </button>
  );
};

export default CustomButton;
