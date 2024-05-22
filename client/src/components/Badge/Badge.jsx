/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Badge = ({ color, className, text = "Badge" }) => {
  return (
    <div
      className={`inline-flex items-center px-[10px] py-[2px] rounded-[10px] justify-center relative ${
        color === "green-badge"
          ? "bg-green-100"
          : color === "gray-badge"
          ? "bg-cool-gray100"
          : color === "red-badge"
          ? "bg-red-200"
          : "bg-blue-100"
      } ${className}`}
    >
      <div
        className={`font-text-xs-font-normal w-fit mt-[-1.00px] tracking-[var(--text-xs-font-normal-letter-spacing)] text-[length:var(--text-xs-font-normal-font-size)] [font-style:var(--text-xs-font-normal-font-style)] font-[number:var(--text-xs-font-normal-font-weight)] text-center whitespace-nowrap leading-[var(--text-xs-font-normal-line-height)] relative ${
          color === "green-badge"
            ? "text-green-800"
            : color === "gray-badge"
            ? "text-cool-gray600"
            : color === "red-badge"
            ? "text-red-800"
            : "text-blue-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

Badge.propTypes = {
  color: PropTypes.oneOf(["gray-badge", "blue-badge", "green-badge", "red-badge"]),
  text: PropTypes.string,
};
