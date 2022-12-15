import React, { useState } from "react";
import { month } from "../utils/function";
import { CgChevronRight } from "react-icons/cg";
import ReviewsPopup from "./ReviewsPopup";
import { Link } from "react-router-dom";

const BookuserReviews = ({
  data,
  clean,
  userData,
  value,
  location,
  accuracy,
  communication,
}) => {
  const [showReview, setShowReview] = useState(false);
  function convert(str) {
    const date = str?.toDate();
    const mnth = month[date?.getMonth()];
    return mnth + " " + date?.getFullYear();
  }

  return (
    <div className="userReviewsList">
      {data?.slice(0, 6)?.map((review) => (
        <div className="reviewList" key={review.id}>
          <div className="userReviewInfo">
            <Link to={`/users/${review.userId}`}>
              <img src={review.reviewUserImage} alt="" />
            </Link>

            <div className="reviewDate">
              <h4>
                {review.reviewUserFirstName}{" "}
                {review.reviewUserLasttName && review.reviewUserLasttName}
              </h4>
              <span>{convert(review?.createdAt)}</span>
            </div>
          </div>

          <p>
            {review.reviewMessage.substring(0, 183)}
            {review.reviewMessage.length > 183 && "..."}{" "}
          </p>

          {review.reviewMessage?.length > 183 && (
            <div className="showReview">
              <p onClick={() => setShowReview(true)}>
                Show more
                <CgChevronRight />
              </p>
            </div>
          )}
        </div>
      ))}

      {data.length >= 6 && (
        <div className="showAmenities">
          <button onClick={() => setShowReview(true)}>
            Show all {data?.length} reviews
          </button>
        </div>
      )}

      {showReview && (
        <ReviewsPopup
          data={data}
          setShowReview={setShowReview}
          userData={userData}
          location={location}
          value={value}
          accuracy={accuracy}
          communication={communication}
          clean={clean}
        />
      )}
    </div>
  );
};

export default BookuserReviews;
