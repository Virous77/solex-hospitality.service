import React, { useState } from "react";
import { AiOutlineClose, AiFillStar } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { month } from "../utils/function";
import { Link } from "react-router-dom";

const ReviewsPopup = ({
  data,
  setShowReview,
  clean,
  userData,
  value,
  location,
  accuracy,
  communication,
}) => {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);

  function convert(str) {
    const date = str?.toDate();
    const mnth = month[date?.getMonth()];
    return mnth + " " + date?.getFullYear();
  }

  return (
    <>
      <div className="overLay" onClick={() => setShowReview(false)}></div>
      <div className="mainUserPopBar">
        <div className="offReview">
          <AiOutlineClose
            className="offIcn"
            onClick={() => setShowReview(false)}
          />
        </div>

        <div className="revPopup">
          <div className="leftRev">
            <h2>
              <AiFillStar />
              {(userData?.rating / userData?.rateCount)?.toFixed(1)} .{" "}
              {userData?.rateCount} Reviews
            </h2>

            <div className="reviewsGraphs">
              <div className="leftSubGraph">
                <p>Cleanliness</p>

                <div className="dataGraph">
                  <input
                    type="range"
                    readOnly="true"
                    draggable="false"
                    min={"0"}
                    max={"5"}
                    value={clean}
                    disabled="true"
                    className="okokoko"
                  />

                  <span>{clean}</span>
                </div>
              </div>

              <div className="leftSubGraph">
                <p>Location</p>

                <div className="dataGraph">
                  <input
                    type="range"
                    readOnly="true"
                    draggable="false"
                    min={"0"}
                    max={"5"}
                    value={location}
                    disabled="true"
                    className="okokoko"
                  />

                  <span>{location}</span>
                </div>
              </div>

              <div className="leftSubGraph">
                <p>Accuracy</p>

                <div className="dataGraph">
                  <input
                    type="range"
                    readOnly="true"
                    draggable="false"
                    value={accuracy}
                    min={"0"}
                    max={"5"}
                    disabled="true"
                    className="okokoko"
                  />

                  <span>{accuracy}</span>
                </div>
              </div>
              <div className="leftSubGraph">
                <p>Communication</p>

                <div className="dataGraph">
                  <input
                    type="range"
                    readOnly="true"
                    draggable="false"
                    min={"0"}
                    max={"5"}
                    value={communication}
                    disabled="true"
                    className="okokoko"
                  />

                  <span>{communication}</span>
                </div>
              </div>

              <div className="leftSubGraph">
                <p>Value</p>

                <div className="dataGraph">
                  <input
                    type="range"
                    readOnly="true"
                    draggable="false"
                    min={"0"}
                    max={"5"}
                    value={value}
                    disabled="true"
                    className="okokoko"
                  />

                  <span>{value}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rightRev">
            <div className={`searchReview ${focus ? "onFocus" : ""}`}>
              <BiSearch className="searchIcon" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              {search.length > 0 && (
                <AiOutlineClose
                  className="searchIcon"
                  onClick={() => setSearch("")}
                />
              )}
            </div>

            <div className="revReviewListBar">
              {data
                ?.filter((li) =>
                  li.reviewMessage
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
                ?.map((review) => (
                  <div className="reviewList" key={review.id}>
                    <div className="userReviewInfo">
                      <Link to={`/users/${review.userId}`}>
                        <img src={review.reviewUserImage} alt="" />
                      </Link>

                      <div className="reviewDate">
                        <h4>
                          {review.reviewUserFirstName}{" "}
                          {review.reviewUserLasttName &&
                            review.reviewUserLasttName}
                        </h4>
                        <span>{convert(review?.createdAt)}</span>
                      </div>
                    </div>

                    <p>{review.reviewMessage}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPopup;
