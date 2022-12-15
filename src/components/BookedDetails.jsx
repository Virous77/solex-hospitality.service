import React from "react";
import {
  MdOutlineCloseFullscreen,
  MdTimer,
  MdOutlineTimerOff,
} from "react-icons/md";
import { convertTimestamp } from "../utils/function";

const BookedDetails = ({ setTempData, tempData }) => {
  const checkIn = convertTimestamp(tempData?.bookData?.checkIn);
  const checkOut = convertTimestamp(tempData?.bookData?.checkOut);

  return (
    <>
      <div className="overLay" onClick={() => setTempData("")}></div>
      <div className="bookedDetailsBar">
        <div className="bookedDTop">
          <MdOutlineCloseFullscreen
            className="minimize"
            onClick={() => setTempData("")}
          />

          <h4>Book Details</h4>
        </div>

        <div className="bookedDataContent">
          <div className="bookedDataTop">
            <img src={tempData?.bookData?.propertyImage} alt="" />

            <div className="bookedDataInfo">
              <h4>{tempData?.bookData?.propertyName}</h4>
              <span>{tempData?.bookData?.propertyLocation}</span>
            </div>
          </div>

          <div className="line"></div>

          <div className="bookedDataCheck">
            <h3>Booking Details</h3>
            <div className="guestCheckIn">
              <span>
                <MdTimer /> Check-In :
              </span>
              <p>{checkIn}</p>
            </div>

            <div className="guestCheckIn">
              <span>
                <MdOutlineTimerOff /> Check-Out :
              </span>

              <p>{checkOut}</p>
            </div>
          </div>

          <div className="line"></div>

          <div className="guestBookedBar">
            <h3>Guest Details</h3>

            <div className="guestBookedList">
              <div className="guestBooked">
                <span>Adults :</span>
                <p>{tempData?.bookData?.adults}</p>
              </div>

              {tempData?.bookData?.children > 0 && (
                <div className="guestBooked">
                  <span>Children :</span>
                  <p>{tempData?.bookData?.children}</p>
                </div>
              )}

              {tempData?.bookData?.infants > 0 && (
                <div className="guestBooked">
                  <span>Infants :</span>
                  <p>{tempData?.bookData?.infants}</p>
                </div>
              )}

              {tempData.pets > 0 && (
                <div className="guestBooked">
                  <span>Pets :</span>
                  <p>{tempData?.bookData?.pets}</p>
                </div>
              )}
            </div>
          </div>

          <div className="line"></div>

          <div className="bookedDataPrice">
            <h3>Pricing Details</h3>

            <div className="bookedPricingBar">
              <div className="bookedPricing">
                <h4>
                  {tempData?.bookData?.price} X {tempData?.bookData?.night}{" "}
                  night
                </h4>

                <p>${tempData?.bookData?.totalNightBill}</p>
              </div>

              <div className="bookedPricing">
                <h4>Cleaning</h4>

                <p>${tempData?.bookData?.cleaning}</p>
              </div>

              <div className="bookedPricing">
                <h4>Service</h4>

                <p>${tempData?.bookData?.service}</p>
              </div>

              <div className="bookedPricing">
                <h4>Taxes</h4>

                <p>${tempData?.taxes}</p>
              </div>

              <div className="line"></div>

              <div className="bookedPricing to">
                <h4>Total</h4>

                <b>${tempData?.grandTotal}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookedDetails;
