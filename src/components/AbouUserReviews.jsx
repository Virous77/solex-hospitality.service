import React from "react";
import useFetchCollectionByUid from "../hooks/useFetchCollectionByUid";
import { BsFillStarFill } from "react-icons/bs";

const AbouUserReviews = ({ uid }) => {
  const { data } = useFetchCollectionByUid(uid, "users");

  return (
    <>
      {data[0]?.reviews?.length > 0 ? (
        <div className="aboutUserRevBar">
          {data[0]?.reviews?.map((rev, idx) => (
            <div className="aboutRevList" key={idx}>
              <div className="aboutTopInfo">
                <img src={rev?.reviewUserImage} alt="" />

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

              <div className="aboutStar">
                <p>Rating</p>
                <span>
                  {rev.rating} <BsFillStarFill />{" "}
                </span>
              </div>
              <p>{rev.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="zeroReview">
          <h2>Past reviews</h2>
          <p>No one has reviewed you yet.</p>
        </div>
      )}
    </>
  );
};

export default AbouUserReviews;
