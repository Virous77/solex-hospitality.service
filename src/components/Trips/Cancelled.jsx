import React, { useState } from "react";
import { convertTimestamp } from "../../utils/function";
import BookedDetails from "../BookedDetails";
import empty from "../../assets/cancel.svg";
import Empty from "../../components/UI/Empty";

const Cancelled = ({ cancel }) => {
  const [tempData, setTempData] = useState("");

  return (
    <>
      {cancel.length > 0 ? (
        <div className="pendingBar">
          {cancel?.map((item) => (
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
                    <span>Cancelled</span>
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
                  </div>
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
    </>
  );
};

export default Cancelled;
