import React, { useState } from "react";
import { AiOutlineUser, AiOutlineCloseCircle } from "react-icons/ai";
import { CgChevronRight } from "react-icons/cg";

const RoomAuthor = ({ userActive, listing, executeScroll2 }) => {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <>
      <div className="authorBar">
        <div className="leftAuthor">
          <h2>
            Entire {listing?.listing?.property} hosted by{" "}
            <span style={{ textTransform: "capitalize" }}>
              {userActive && userActive[0]?.firstName}{" "}
              {userActive && userActive[0]?.lastName}
            </span>
          </h2>
          <p>
            {listing?.listing?.guest} guests . {listing?.listing?.bedroom}
            {listing?.listing?.bedroom > 1 ? " bedrooms" : " bedroom"} .{" "}
            {listing?.listing?.bed}
            {listing?.listing?.bed > 1 ? " beds" : " bed "} .{" "}
            {listing?.listing?.bathroom}{" "}
            {listing?.listing?.bathroom > 1 ? " bathrooms" : " bathroom"}
          </p>
        </div>

        <div className="rightAuthor">
          {userActive && userActive[0]?.photoURL ? (
            <img
              src={userActive[0]?.photoURL}
              alt=""
              onClick={() => executeScroll2()}
            />
          ) : (
            <AiOutlineUser className="owner" onClick={() => executeScroll2()} />
          )}
        </div>
      </div>

      <div className="de">
        <h2>About {listing?.listing?.propertyTitle}</h2>
        <p className="desc">
          {listing?.listing?.propertyAbout?.substring(0, 250)}...
        </p>

        <p className="showDesc" onClick={() => setShowDesc(true)}>
          <span>Show more</span>
          <CgChevronRight />
        </p>
      </div>

      {showDesc && (
        <div className="descDetails">
          <div className="overLay" onClick={() => setShowDesc(false)}></div>
          <div className="descContent">
            <div className="closeBar">
              <AiOutlineCloseCircle
                className="close"
                onClick={() => setShowDesc(false)}
              />
            </div>

            <p>
              <span className="big">
                {listing?.listing?.propertyAbout?.slice(0, 1)}
              </span>
              {listing?.listing?.propertyAbout?.slice(
                1,
                listing?.listing?.propertyAbout.length - 0
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomAuthor;
