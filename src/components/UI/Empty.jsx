import React from "react";
import "./Empty.css";

const Empty = ({ image, title, style }) => {
  return (
    <div className={style === "home" ? "empty2" : "empty"}>
      <img src={image} alt="empty" />
      <p>{title}</p>
    </div>
  );
};

export default Empty;
