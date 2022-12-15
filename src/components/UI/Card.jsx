import React from "react";
import "./Card.css";

const Card = ({ children }) => {
  return <section className="card">{children}</section>;
};

export default Card;
