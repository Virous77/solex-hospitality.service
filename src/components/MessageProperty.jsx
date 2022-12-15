import React from "react";
import useFetchUser from "../hooks/useFetchUser";
import { CgChevronRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const MessageProperty = ({ propertyIds, initialMessage }) => {
  const { userData, loading } = useFetchUser("property", propertyIds);
  const navigate = useNavigate();

  const setPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="profileSide">
      <div className="top">
        <h3>Details</h3>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="sideBarContent">
          <div className="sideImg">
            <img
              src={userData?.propertyImage && userData?.propertyImage[0]}
              alt=""
            />

            {userData?.propertyImage && <p className="enquiry">Enquiry</p>}
          </div>

          <div className="bookIt">
            <h4>Ready to book?</h4>
            <p>
              <span>
                {initialMessage?.hostFirstName}{" "}
                {initialMessage?.hostLastName && initialMessage?.hostLastName}{" "}
              </span>
              lets guests book instantly.
            </p>
            <button
              onClick={() =>
                navigate(
                  `/rooms/${userData?.listing?.propertyTitle}/${propertyIds}`
                )
              }
            >
              Book Now
            </button>
          </div>

          <div className="tripProfile">
            <h3>Trip Details</h3>

            <div className="sidePropertyInfo">
              <div>
                <h5>{userData?.listing?.propertyTitle}</h5>
                <b>
                  <span>$</span>
                  {setPrice(userData?.price)} night
                </b>
                <p>
                  <span>
                    {userData?.listing?.propertyType === "free"
                      ? "An entire place"
                      : userData?.listing?.propertyType === "private"
                      ? "An private room"
                      : userData?.listing?.propertyType === "shared"
                      ? "An shared room"
                      : ""}
                  </span>
                  <span> . </span>{" "}
                  <span>{userData?.listing?.propertyLocation}</span>
                </p>
              </div>
              <CgChevronRight
                className="sideIcon"
                onClick={() =>
                  navigate(
                    `/rooms/${userData?.listing?.propertyTitle}/${propertyIds}`
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageProperty;
