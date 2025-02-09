import React from "react";

function Article({ children, className }) {
  return (
    <article
      className={`max-w-xs md:max-w-sm lg:max-w-md row-span-2 order-2 flex-grow-0 flex-shrink-0 ${className}`}
    >
      {children}
    </article>
  );
}

export default Article;
