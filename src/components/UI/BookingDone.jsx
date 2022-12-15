import React from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import booking from "../../assets/bookingDone.svg";

const BookingDone = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="overLay"></div>
      <section className="bookingDone">
        <div className="doneIt">
          <img src={booking} alt="" />
        </div>

        <p>Request sent to Host!</p>
        <span>You have to pay when Host will accept the request.</span>

        <button onClick={() => navigate(`/profile/trips`)}>Go to Trip</button>
      </section>
    </>
  );
};

export default BookingDone;
