import React, { useState } from "react";
import { convertTimestamp } from "../utils/function";
import BookedDetails from "./BookedDetails";
import empty from "../assets/cancel.svg";
import Empty from "../components/UI/Empty";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import Loader from "./UI/Loader";

const HostCancel = ({ uid }) => {
  const { data, loading } = useFetchCollectionbyParam("hostId", uid, "booking");
  const [tempData, setTempData] = useState("");

  const uniqueData = data?.filter((item) => item.booking === "cancel");

  if (loading) return <Loader />;

  return (
    <>
      {uniqueData.length > 0 ? (
        <div className="pendingBar">
          {uniqueData?.map((item) => (
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

export default HostCancel;
