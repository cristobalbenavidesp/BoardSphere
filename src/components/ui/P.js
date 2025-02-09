import React from "react";

function P({ children, className }) {
  return (
    <p
      className={`text-lg text-left max-w-xs xl:max-w-sm 2xl:max-w-md flex-grow-0 flex-shrink-0 ${className}`}
    >
      {children}
    </p>
  );
}

export default P;
