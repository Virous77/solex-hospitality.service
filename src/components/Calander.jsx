import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../styles/Calender.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { MdInfoOutline } from "react-icons/md";
import {
  giveDate,
  giveMonth,
  giveYear,
  convert,
  setPrice,
} from "../utils/function";
import { useNavigate } from "react-router-dom";
import CreateGuestCard from "./CreateGuestCard";
import { useAuthContext } from "../store/authContext";
import useFetchValidate from "../hooks/useFetchNestedData";
import _ from "lodash";
import { validateBooked } from "../utils/function";
import ALertBookeddDates from "./UI/ALertBookeddDates";

const Calander = ({ userData, showCalander, setShowCalander, propertyId }) => {
  const { activeUser } = useAuthContext();
  const { data, getCollection } = useFetchValidate(
    "bookingDates",
    propertyId,
    "propertyId"
  );

  const [value, onChange] = useState(0);
  const [checkValidate, setCheckValidate] = useState(false);
  const [showBookingInfo, setShowBookingInfo] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [showBookedDates, setShowBookedDates] = useState(false);

  const startDates = {
    totalNightBill: 0,
    cleaning: 0,
    service: 0,
    total: 0,
    dateCount: 0,
    BookingDates: [],
    userThisBookDate: [],
  };
  const [bookInfo, setBookInfo] = useState(startDates);
  const initialState = {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  };
  const [guest, setGuest] = useState(initialState);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const {
    totalNightBill,
    total,
    cleaning,
    service,
    dateCount,
    BookingDates: Bookingdata,
    userThisBookDate,
  } = bookInfo;

  const dates = convert(value[0]);
  const date2 = convert(value[1]);
  let checkDate1 = giveDate(value[0]);
  let checkDate2 = giveDate(value[1]);
  let checkMonth1 = giveMonth(value[0]);
  let checkMonth2 = giveMonth(value[1]);
  let checkYear1 = giveYear(value[0]);
  let checkYear2 = giveYear(value[1]);

  const validateBookings = () => {
    const { BookingDates, nightCount } = validateBooked(
      dates,
      date2,
      checkYear1,
      checkYear2,
      checkMonth1,
      checkMonth2,
      checkDate1,
      checkDate2
    );

    ////////////////////
    const totalNightBill = setPrice(
      (+userData?.price * nightCount)?.toFixed(0)
    );
    const cleaning = setPrice(
      ((+userData?.price * nightCount * 2.81) / 100)?.toFixed(0)
    );
    const service = setPrice(
      ((+userData?.price * nightCount * 12) / 100)?.toFixed(0)
    );
    const total = setPrice(
      (
        +userData?.price * nightCount +
        (+userData?.price * nightCount * 2.81) / 100 +
        (+userData?.price * nightCount * 12) / 100
      )?.toFixed(0)
    );
    const dateCount = nightCount;

    ////////////////////

    const bookingRemainingDates = data?.flatMap((li) => li.dates);
    const alreadyBookedDates = _.intersection(
      BookingDates,
      bookingRemainingDates
    );

    setBookInfo({
      ...bookInfo,
      totalNightBill,
      cleaning,
      service,
      total,
      dateCount,
      BookingDates: alreadyBookedDates,
      userThisBookDate: BookingDates,
    });

    if (alreadyBookedDates?.length > 0) {
      setCheckValidate(false);
    } else {
      setCheckValidate(true);
      setShowBookingInfo(true);
    }
  };

  useEffect(() => {
    if (value) {
      validateBookings();
      setShowCalander(false);
    }
  }, [value]);

  const goToCheckIn = () => {
    const tempdata = {
      propertyId,
      propertyName: userData?.listing?.propertyTitle,
      propertyImage: userData?.propertyImage[0],
      propertyType: userData?.listing?.propertyType,
      property: userData?.listing?.property,
      total,
      totalNightBill,
      service,
      cleaning,
      night: dateCount,
      price: userData?.price,
      checkIn: dates,
      checkOut: date2,
      propertyLocation: userData?.listing?.propertyLocation,
      pets: guest.pets,
      adults: guest.adults,
      children: guest.children,
      infants: guest.infants,
      max: userData?.listing?.guest,
      checkInString: value[0],
      checkOutString: value[1],
      hostId: userData?.userUid,
      activeUser: activeUser?.uid,
      taxes: null,
      grandtotal: null,
      rating: userData?.rating,
      rateCount: userData?.rateCount,
      Bookingdata: userThisBookDate,
    };

    localStorage.setItem("solexBook", JSON.stringify(tempdata));
    navigate(`/book/${propertyId}`);
  };

  return (
    <div>
      <div className="clanderBoxBar">
        <div className="priceBoxHead">
          <div className="perNight">
            <h3>${setPrice(userData?.price)}</h3>
            <span>Night</span>
          </div>

          {userData.rating / userData.rateCount > 0 ? (
            <p className="clacStar">
              {" "}
              <AiFillStar />{" "}
              {(userData.rating / userData.rateCount)?.toFixed(1)}
            </p>
          ) : (
            <p>New</p>
          )}
        </div>

        <div className="clanderBox">
          <div className="topBoxCheck">
            <div
              className="checkIn"
              onClick={(e) => {
                e.stopPropagation();
                setShowCalander(true);
                setShowGuest(false);
                getCollection();
                setShowBookingInfo(false);
              }}
            >
              <span>Check-in</span>
              {dates ? <p>{dates}</p> : <p>Add date</p>}
            </div>
            <div
              className="checkOut"
              onClick={(e) => {
                e.stopPropagation();
                setShowGuest(false);
                setShowCalander(true);
              }}
            >
              <span>Checkout</span>
              {date2 ? <p>{date2}</p> : <p>Add date</p>}
            </div>
          </div>

          <div className="guestAdd">
            <div className="guests">
              <h5>Guests</h5>
              <p>
                <span>
                  {guest.adults + guest.children}{" "}
                  {guest.adults + guest.children > 1 ? "guests" : "guest"},
                </span>

                {guest.infants > 0 && (
                  <span>
                    {guest.infants} {guest.infants > 1 ? "infants" : "infant"},
                  </span>
                )}
                {guest.pets > 0 && (
                  <span>
                    {guest.pets} {guest.pets > 1 ? "pets" : "pet"}
                  </span>
                )}
              </p>
            </div>

            {showGuest ? (
              <p>
                <RiArrowUpSLine
                  className="downIcon"
                  onClick={() => setShowGuest(false)}
                />
              </p>
            ) : (
              <p>
                <RiArrowDownSLine
                  className="downIcon"
                  onClick={() => setShowGuest(true)}
                />
              </p>
            )}
          </div>
        </div>
        <div className="checkAvailable">
          {!checkValidate ? (
            <>
              {!checkValidate && value === 0 ? (
                <button disabled={value === 0}>Check Availability</button>
              ) : (
                <p className="alreadyCBooked">
                  <MdInfoOutline
                    cursor={"pointer"}
                    size={19}
                    onClick={() => setShowBookedDates(true)}
                  />
                  Already booked! Try other Dates
                </p>
              )}
            </>
          ) : (
            <>
              {!showBookingInfo ? (
                <button disabled={value === 0}>Check Availability</button>
              ) : (
                <button onClick={goToCheckIn}>Reserve</button>
              )}
            </>
          )}
        </div>

        {checkValidate && (
          <>
            {showBookingInfo && (
              <div className="bookingInfo">
                <div className="totalNight">
                  <p>
                    ${setPrice(userData?.price)} x {dateCount} nights
                  </p>
                  <span>${totalNightBill}</span>
                </div>

                <div className="totalNight">
                  <p>Cleaning Fees</p>
                  <span>${cleaning}</span>
                </div>

                <div className="totalNight">
                  <p>Service Fees</p>
                  <span>${service}</span>
                </div>

                <div className="line"></div>

                <div className="totalBill">
                  <b>Total before taxes</b>
                  <b>${total}</b>
                </div>
              </div>
            )}
          </>
        )}

        {showGuest && (
          <CreateGuestCard
            guest={guest}
            setGuest={setGuest}
            maxGuest={userData?.listing?.guest}
            setShowGuest={setShowGuest}
            title="calander"
          />
        )}
      </div>

      {showCalander && (
        <div
          className={path.includes("/rooms") ? "manageCalander" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setShowCalander(true);
          }}
        >
          <Calendar
            onChange={onChange}
            value={value}
            selectRange={true}
            minDate={new Date()}
          />
        </div>
      )}

      {showBookedDates && (
        <ALertBookeddDates
          dates={Bookingdata}
          setShowBookedDates={setShowBookedDates}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Calander;
