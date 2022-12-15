import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./AlreadyBookedDates.css";

const ALertBookeddDates = ({ setShowBookedDates, dates, userData, title }) => {
  return (
    <>
      <div className="overLay" onClick={() => setShowBookedDates(false)}></div>
      <div className="alertDatesC">
        <div className="alertDateCTop">
          <AiOutlineClose
            cursor={"pointer"}
            onClick={() => setShowBookedDates(false)}
          />
          <h4>Booked Dates</h4>
        </div>

        <div className="line"></div>

        <div className="alertDateContent">
          <div className="alertDatesProperty">
            <img
              src={
                title === "book"
                  ? userData?.propertyImage
                  : userData?.propertyImage[0]
              }
              alt=""
            />
            <div>
              <h3>{userData?.listing.propertyTitle}</h3>
              <span>{userData?.listing.propertyLocation}</span>
            </div>
          </div>

          <div className="sameDateAlert">
            <p>This property is already booked in these dates.</p>

            <div className="sameWrap">
              {dates?.map((date, idx) => (
                <div className="sameDateList" key={idx}>
                  <p>{date}</p>
                </div>
              ))}
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontWeight: "600",
              }}
            >
              Look for other Dates. Cheers!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ALertBookeddDates;
