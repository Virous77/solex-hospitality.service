import React, { useState } from "react";
import { convertTimestamp } from "../../utils/function";
import BookedDetails from "../BookedDetails";
import empty from "../../assets/empty3.svg";
import Empty from "../../components/UI/Empty";
import Review from "../Review";
import ReviewHost from "../ReviewHost";

const Completed = ({ completed }) => {
  const [tempData, setTempData] = useState("");
  const [review, setReview] = useState("");
  const [host, setHost] = useState("");

  return (
    <>
      {completed.length > 0 ? (
        <div className="pendingBar">
          {completed?.map((item) => (
            <div className="pendingList" key={item.id}>
              <div className="pendingWrap">
                <div className="pendingTop">
                  <img src={item?.bookData.propertyImage} alt="" />

                  <div className="pendingInfo">
                    <h4>{item?.bookData?.propertyName}</h4>
                    <span>{item?.bookData?.propertyLocation}</span>
                  </div>
                </div>

                <div className="pendingRight">
                  <div className="status">
                    <p>Status : </p>
                    <span style={{ backgroundColor: "green" }}>Completed</span>
                  </div>
                  <div className="pendingBooking">
                    <div className="pendingBookTop">
                      <p>Check-In</p>

                      <span>{convertTimestamp(item?.bookData.checkIn)}</span>
                    </div>

                    <div className="pendingBookTop">
                      <p>Check-Out</p>

                      <span>{convertTimestamp(item?.bookData.checkOut)}</span>
                    </div>
                  </div>

                  <div className="pendingAction">
                    <button
                      style={{ backgroundColor: "black" }}
                      onClick={() => setTempData(item)}
                    >
                      Details
                    </button>
                    {item.review !== "done" && (
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => setReview(item)}
                      >
                        Rate Us
                      </button>
                    )}

                    {item.hostReview !== "done" && (
                      <>
                        {item.review === "done" && (
                          <button
                            style={{ backgroundColor: "green" }}
                            onClick={() => setHost(item)}
                          >
                            Rate Host
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {item.review === "done" && item.hostReview === "done" && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        opacity: "0.9",
                        textAlign: "end",
                        marginTop: "1rem",
                        color: "#ff385c",
                        fontWeight: "bold",
                      }}
                    >
                      Thank You for Rate us.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {tempData && (
            <BookedDetails tempData={tempData} setTempData={setTempData} />
          )}
        </div>
      ) : (
        <Empty image={empty} title="You don't have any bookings with us!" />
      )}

      {review && <Review review={review} setReview={setReview} />}
      {host && <ReviewHost host={host} setHost={setHost} />}
    </>
  );
};

export default Completed;
