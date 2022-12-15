import React from "react";
import "./AlertUser.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AlertUser = ({
  confirmBooking,
  setBookingWithUs,
  bookingWithUs,
  loading,
}) => {
  const naviagte = useNavigate();
  return (
    <>
      <div className="overLay" onClick={() => setBookingWithUs([])}></div>
      <div className="alertBUserBar alertDatesC">
        <div className="alertTopB alertDateCTop">
          <AiOutlineClose
            cursor={"pointer"}
            onClick={() => setBookingWithUs([])}
          />
          <h4>Booking Info</h4>
        </div>
        <div className="line"></div>

        <div className="alertUserBContent">
          <p>
            You have already {bookingWithUs.length > 1 ? "Bookings" : "Booking"}{" "}
            with us. you have selected this booking some dates are matching with
            your previous {bookingWithUs.length > 1 ? "bookings" : "booking"}{" "}
            dates.
          </p>

          <div className="alertUserBooking">
            {bookingWithUs?.map((booking, idx) => (
              <div className="alretUsrBookingList" key={idx}>
                <img src={booking?.bookPopertyImage} alt="" />

                <div className="alertUserPropertyInfo">
                  <h4>{booking?.bookPropertyName}</h4>
                  <span>{booking?.bookPopertyLocation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="line"></div>

        <div className="alertUserAction">
          <button onClick={() => naviagte("/profile/trips")}>Go to Trip</button>
          <button onClick={confirmBooking}>
            {loading ? "Submitting..." : "Request to book"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AlertUser;
