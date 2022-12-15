import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";

const UserReviews = ({ setTempReviews, tempReviews }) => {
  return (
    <>
      <div className="overLay" onClick={() => setTempReviews("")}></div>
      <div className="langBar" style={{ width: "600px" }}>
        <div className="usRevTop">
          <AiOutlineClose
            cursor={"pointer"}
            size={18}
            onClick={() => setTempReviews("")}
          />

          <h4>Review Details</h4>
        </div>

        <div className="usRevContent">
          <div className="usRevInfo">
            <div className="usRevProperty">
              <img src={tempReviews?.propertyImage} alt="" />
              <h4>{tempReviews?.propertyName}</h4>
              <span>{tempReviews?.propertyLocation}</span>
            </div>

            <div className="usRevRating">
              <b>Property Id: {tempReviews?.propertyId}</b>
              <div className="wrapRev">
                <p>Clean</p>

                <span>
                  {tempReviews?.userReview?.clean} <BsFillStarFill />{" "}
                </span>
              </div>

              <div className="wrapRev">
                <p>Location</p>

                <span>
                  {tempReviews?.userReview?.location} <BsFillStarFill />{" "}
                </span>
              </div>

              <div className="wrapRev">
                <p>Accuracy</p>

                <span>
                  {tempReviews?.userReview?.accuracy} <BsFillStarFill />{" "}
                </span>
              </div>

              <div className="wrapRev">
                <p>Value</p>

                <span>
                  {tempReviews?.userReview?.value} <BsFillStarFill />{" "}
                </span>
              </div>

              <div className="wrapRev">
                <p>Communication</p>

                <span>
                  {tempReviews?.userReview?.communication} <BsFillStarFill />{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="myRevList">
          <div className="myRevInfo">
            <div className="myRevProfile">
              <img
                src={tempReviews?.reviewUserImage}
                alt=""
                referrerPolicy="no-referrer"
              />

              <div className="myRevPInfo">
                <h4>
                  {tempReviews.reviewUserFirstName}{" "}
                  {tempReviews.reviewUserLastName &&
                    tempReviews.reviewUserLastName}
                </h4>
                <span>
                  Reviewed at {tempReviews.createdAt?.toDate()?.toDateString()}
                </span>
              </div>
            </div>
          </div>
          <p>{tempReviews.reviewMessage}</p>
        </div>
      </div>
    </>
  );
};

export default UserReviews;
