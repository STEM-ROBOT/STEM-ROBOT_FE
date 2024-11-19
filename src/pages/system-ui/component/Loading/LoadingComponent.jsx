import React from "react";
import "./LoadingComponent.css";
const LoadingComponent = ({ position, borderRadius,backgroundColor }) => {
  return (
    <div
      className="loading_container"
      style={{ position: `${position}`, borderRadius: `${borderRadius}` ,backgroundColor: `${backgroundColor}`}}
    >
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

export default LoadingComponent;
