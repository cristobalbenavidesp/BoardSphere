import * as React from "react";

const SvgComponent = (props) => (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="#fff"
      fillRule="evenodd"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 6.5h12M4.498 10.5h11.997M4.5 14.5h11.995" />
    </g>
  </svg>
);

export default SvgComponent;
