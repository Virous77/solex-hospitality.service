import React from "react";
import "./Loader.css";
import { TbLoader } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="Loader">
      <TbLoader className="loaderIcon" />
    </div>
  );
};

export default Loader;
