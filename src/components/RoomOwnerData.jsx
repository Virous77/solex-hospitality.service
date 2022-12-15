import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const RoomOwnerData = ({ userActive }) => {
  return (
    <div>
      <div className="dataVerfied">
        {userActive[0]?.reviews.length > 0 ? (
          <div className="firstData">
            <BsFillStarFill />
            <p>
              {userActive[0]?.reviews.length}{" "}
              {userActive[0]?.reviews > 1 ? "Reviews" : "Review"}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: "0.9rem" }}>New on Solex</p>
        )}

        {userActive[0]?.profileComp === "done" && (
          <div className="firstData">
            <MdVerified />
            <p>Identity verified</p>
          </div>
        )}
      </div>

      {userActive[0]?.reviews?.length > 0 && (
        <div className="aboutUserRevBar  ownerDataBar">
          {userActive[0]?.reviews?.slice(0, 2)?.map((rev, idx) => (
            <div className="aboutRevList" key={idx}>
              <div className="aboutTopInfo">
                <Link to={`/users/${rev.reviewUserId}`}>
                  <img src={rev?.reviewUserImage} alt="" />
                </Link>

                <div className="aboutUserData">
                  <h4>
                    {rev.reviewUserFirstName}{" "}
                    {rev.reviewUserLastName && rev.reviewUserLastName}
                  </h4>
                  <span>
                    Reviewed in {rev.createdAt?.toDate()?.getFullYear()}
                  </span>
                </div>
              </div>

              <p className="downData">{rev.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomOwnerData;
