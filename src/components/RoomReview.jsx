import React from "react";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import { AiFillStar } from "react-icons/ai";
import BookuserReviews from "./BookuserReviews";

const RoomReview = ({ userData, scroller3, propertyId }) => {
  const { data } = useFetchCollectionbyParam(
    "propertyId",
    propertyId,
    "rating"
  );

  const reviewData = data?.map((item) => item.userReview);
  const value = reviewData?.reduce((a, b) => a + b.value, 0) / data?.length;
  const communication =
    reviewData?.reduce((a, b) => a + b.communication, 0) / data?.length;
  const location =
    reviewData?.reduce((a, b) => a + b.location, 0) / data?.length;
  const clean = reviewData?.reduce((a, b) => a + b.clean, 0) / data?.length;
  const accuracy =
    reviewData?.reduce((a, b) => a + b.accuracy, 0) / data?.length;

  return (
    <section ref={scroller3} className="roomReviewBar">
      <h2>
        <AiFillStar />
        {(userData?.rating / userData?.rateCount)?.toFixed(1)} .{" "}
        {userData?.rateCount} Reviews
      </h2>

      <div className="reviewsGraph">
        <div className="leftGraph">
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
        </div>
        <div className="rightGraph">
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
      <BookuserReviews
        data={data}
        userData={userData}
        value={value}
        location={location}
        communication={communication}
        accuracy={accuracy}
        clean={clean}
      />
    </section>
  );
};

export default RoomReview;
