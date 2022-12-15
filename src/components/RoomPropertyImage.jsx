import React from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { CgChevronLeft } from "react-icons/cg";

const RoomPropertyImage = ({
  image,
  showAllImage,
  setShowAllImage,
  bedImg,
}) => {
  return (
    <>
      <div className="photoFrame">
        <div className="mainPic">
          <img src={image && image[0]} alt="property pic" />
          <div
            className="imgOverlay"
            onClick={() => setShowAllImage(true)}
          ></div>
        </div>

        <div className="subImageFrame">
          {image?.slice(1, 5).map((pic, idx) => (
            <div className="subImage" key={idx}>
              <img
                src={pic}
                alt="property pic"
                className={idx === 1 ? "one" : idx === 3 ? "second" : ""}
              />
              <div
                className={`imgOverlays ${
                  idx === 1 ? "one" : idx === 3 ? "second" : ""
                }`}
                onClick={() => setShowAllImage(true)}
              ></div>
            </div>
          ))}
        </div>

        <div className="showMorePics">
          <BsGrid3X3GapFill />
          <button onClick={() => setShowAllImage(true)}>Show all Photos</button>
        </div>
      </div>

      {showAllImage && (
        <div className="allImg">
          <div className="allImgHead">
            <CgChevronLeft
              onClick={() => setShowAllImage(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="allImgBar">
            {image &&
              image?.map((pic, idx) => (
                <div className="allImgList" key={idx}>
                  <img src={pic} alt="" />
                </div>
              ))}
          </div>
          <div className="allImgBar">
            {bedImg &&
              bedImg?.map((pic, idx) => (
                <div className="allImgList" key={idx}>
                  <img src={pic} alt="" />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RoomPropertyImage;
