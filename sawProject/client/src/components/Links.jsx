import React from "react";

const Links = (to, updatePathname, text) => {
  return (
    <>
      <a
        href={to}
        onClick={(event) => {
          event.preventDefault();
          updatePathname(to);
        }}  
      >
        {text}
      </a>
    </>
  );
};

export default Links;
