import React from "react";
import "../styles/Filter.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { useFilterContext } from "../store/filterContext";

const HomeFilterBox = ({ setShowFilter }) => {
  const {
    checkBox,
    setCheckBox,
    highPrice,
    setHighPrice,
    lowPrice,
    setLowPrice,
    filterPrice,
    minPrice,
    highestProperty,
    submit,
    clear,
    liveData,
  } = useFilterContext();

  return (
    <>
      <div className="masterOverLay" onClick={() => setShowFilter(false)}></div>
      <div className="masterFilterBar">
        <div className="masterFilterTop">
          <AiOutlineClose
            cursor={"pointer"}
            size={20}
            onClick={() => setShowFilter(false)}
          />
          <h4>Filters</h4>
        </div>
        <div className="line"></div>

        <div className="masterFilterContent">
          <div className="masterContentTop">
            <h3>Price range</h3>
            <p>The average nightly price is ${filterPrice?.toFixed(2)}</p>
          </div>

          <input
            type="range"
            min={minPrice}
            max={highestProperty}
            className="input"
            onChange={(e) => setLowPrice(e.target.value)}
          />

          <div className="masterInputBox">
            <div className="masterFirstInput">
              <span>Min price</span>
              <input
                type="number"
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
              />
            </div>

            <div className="masterFirstInput">
              <span>Max price</span>
              <input
                type="number"
                value={highPrice}
                onChange={(e) => setHighPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="line"></div>

        <div className="masterFilterPType">
          <h3>Type of place</h3>

          <div className="masterCheckBoxBar">
            <div className="masterFirstCheck">
              {checkBox === "free" ? (
                <p onClick={() => setCheckBox("")} className="masterFill">
                  <BsCheck size={24} />
                </p>
              ) : (
                <p
                  className="masterCheckBox"
                  onClick={() => setCheckBox("free")}
                ></p>
              )}

              <div className="masterCheckInfo">
                <p>Entire place</p>
                <span>A place to yourself</span>
              </div>
            </div>

            <div className="masterFirstCheck">
              {checkBox === "private" ? (
                <p onClick={() => setCheckBox("")} className="masterFill">
                  <BsCheck size={24} />
                </p>
              ) : (
                <p
                  className="masterCheckBox"
                  onClick={() => setCheckBox("private")}
                ></p>
              )}

              <div className="masterCheckInfo">
                <p>Private room</p>
                <span>
                  Your own room in a home or a hotel, plus some shared common
                  spaces
                </span>
              </div>
            </div>

            <div className="masterFirstCheck">
              {checkBox === "shared" ? (
                <p onClick={() => setCheckBox("")} className="masterFill">
                  <BsCheck size={24} />
                </p>
              ) : (
                <p
                  className="masterCheckBox"
                  onClick={() => setCheckBox("shared")}
                ></p>
              )}

              <div className="masterCheckInfo">
                <p>Shared room</p>
                <span>
                  A sleeping space and common areas that may be shared with
                  others
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="line"></div>

        <div className="masterFilterAction">
          <button className="masterClear" onClick={clear}>
            Clear
          </button>

          <button
            className="masterShow"
            onClick={() => {
              submit();
              setShowFilter(false);
            }}
          >
            Show {liveData?.length} homes
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeFilterBox;
