import React, { useRef, useState } from "react";
import "../styles/Filter.css";
import { svgData } from "../utils/Data";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { RiFilterOffFill } from "react-icons/ri";
import { BsFillFilterCircleFill } from "react-icons/bs";

const Filter = ({ setType, type: types, setShowFilter }) => {
  const [left, setLeft] = useState(0);
  const scroll = useRef();

  const btnnext = (id) => {
    id === "right"
      ? scroll.current.scrollBy({
          top: 0,
          left: +400,
          behavior: "smooth",
        })
      : scroll.current.scrollBy({
          top: 0,
          left: -400,
          behavior: "smooth",
        });

    if (id === "prev" && scroll.current.scrollLeft === 0) {
      setLeft(0);
    } else {
      setLeft(scroll.current.scrollLeft + 1);
    }
  };

  return (
    <header className="filterBar">
      <div className="wrapFilter">
        <div className="subFilter">
          <div className="filterTypeBar" ref={scroll}>
            {types && (
              <div className="clearFilter" onClick={() => setType("")}>
                <RiFilterOffFill size={26} />
                <p>Clear</p>
              </div>
            )}
            {svgData?.map((type) => (
              <div
                className={types === type.name ? "filterType2" : "filterType"}
                key={type.id}
                onClick={() => setType(type.name)}
              >
                <img src={type.value} alt={type.name} />
                <p>{type.name}</p>
              </div>
            ))}
          </div>

          <div className="homeFilterBar" onClick={() => setShowFilter(true)}>
            <BsFillFilterCircleFill size={24} />
            <p>Filter</p>
          </div>

          <div className="filterAction">
            {left > 0 && (
              <div className="leftFilter">
                <button onClick={() => btnnext("prev")}>
                  <BiChevronLeft />
                </button>
              </div>
            )}

            <div className="rightFilter">
              <button onClick={() => btnnext("right")}>
                <BiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Filter;
