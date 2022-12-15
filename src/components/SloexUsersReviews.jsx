import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const SloexUsersReviews = ({ userActive }) => {
  return (
    <div className="solexUserAReviewsBar">
      <h3>
        {" "}
        <AiFillStar />
        {userActive[0]?.reviews?.length}{" "}
        {userActive[0]?.reviews?.length > 0 ? "reviews" : "review"}
      </h3>

      <p>From Guests ({userActive[0]?.reviews?.length})</p>

      <>
        {userActive[0]?.reviews?.length > 0 ? (
          <div className="aboutUserRevBar">
            {userActive[0]?.reviews?.map((rev, idx) => (
              <div className="aboutRevList SolexvList" key={idx}>
                <div className="aboutTopInfo">
                  <Link to={`/users/${rev.reviewUserId}`}>
                    <img
                      src={rev?.reviewUserImage}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  </Link>

                  <div className="aboutUserData">
                    <h4>
                      {rev.reviewUserFirstName}{" "}
                      {rev.reviewUserLastName && rev.reviewUserLastName}
                    </h4>
                    <span>
                      Reviewed at {rev.createdAt?.toDate()?.toDateString()}
                    </span>
                  </div>
                </div>

                <div className="aboutStar solexAReviews">
                  <p>Rating</p>
                  <span>
                    {rev.rating} <AiFillStar />{" "}
                  </span>
                </div>
                <p
                  style={{ fontWeight: "400", fontSize: "0.9rem" }}
                  className="solextRevMsg"
                >
                  {rev.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="zeroReview  SolexzeroReview">
            <h2>Past reviews</h2>
            <p>No one has reviewed you yet.</p>
          </div>
        )}
      </>
    </div>
  );
};

export default SloexUsersReviews;
