import React from "react";
import "./preloader.css";

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
