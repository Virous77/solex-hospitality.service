import React, { useState, useEffect } from "react";
import "../styles/Book.css";
import Card from "../components/UI/Card";
import { CgChevronLeft } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { setPrice } from "../utils/function";
import BookCreateCard from "../components/BookCreateCard";
import { giveDate, giveMonth, giveYear, convert } from "../utils/function";
import PaymentsSection from "../components/Payments/PaymentsSection";
import { validateBooked } from "../utils/function";
import useFetchValidate from "../hooks/useFetchNestedData";
import _ from "lodash";
import ALertBookeddDates from "../components/UI/ALertBookeddDates";

const Book = () => {
  const [bookData, setBookData] = useState("");
  const [showBookingInfo, setShowBookingInfo] = useState(false);
  const [bookedDate, setBookedDate] = useState([]);

  const { data, getCollection } = useFetchValidate(
    "bookingDates",
    bookData?.propertyId,
    "propertyId"
  );

  const { data: bookedUserDates, getCollection: getUserBookingCollection } =
    useFetchValidate("bookingDates", bookData?.activeUser, "bookUser");

  const [values, onChanges] = useState(0);
  const navigate = useNavigate();
  const initialState = {
    adults: +bookData?.adults,
    children: +bookData?.children,
    infants: +bookData?.infants,
    pets: +bookData?.pets,
  };
  const [guest, setGuest] = useState(initialState);
  const [editGuest, setEditGuest] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [showCard, setShowCard] = useState(false);

  ////////////////////
  const taxes = setPrice(
    ((+bookData?.price * bookData?.night * 8) / 100)?.toFixed(0)
  );
  const grandTotal = setPrice(
    (
      +bookData?.price * bookData?.night +
      (+bookData?.price * bookData?.night * 2.81) / 100 +
      (+bookData?.price * bookData?.night * 12) / 100 +
      (+bookData?.price * bookData?.night * 8) / 100
    )?.toFixed(0)
  );

  const dates = convert(values[0]);
  const date2 = convert(values[1]);
  let checkDate1 = giveDate(values[0]);
  let checkDate2 = giveDate(values[1]);
  let checkMonth1 = giveMonth(values[0]);
  let checkMonth2 = giveMonth(values[1]);
  let checkYear1 = giveYear(values[0]);
  let checkYear2 = giveYear(values[1]);

  ///Save Change
  const saveChange = () => {
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

    const bookingRemainingDates = data?.flatMap((li) => li.dates);
    const alreadyBookedDates = _.intersection(
      BookingDates,
      bookingRemainingDates
    );

    setBookedDate(alreadyBookedDates);

    const totalNightBill = setPrice(
      (+bookData?.price * nightCount)?.toFixed(0)
    );
    const service = setPrice(
      ((+bookData?.price * nightCount * 12) / 100)?.toFixed(0)
    );
    const cleaning = setPrice(
      ((+bookData?.price * nightCount * 2.81) / 100)?.toFixed(0)
    );

    const taxes = setPrice(
      ((+bookData?.price * nightCount * 8) / 100)?.toFixed(0)
    );
    const grandTotal = setPrice(
      (
        +bookData?.price * nightCount +
        (+bookData?.price * nightCount * 2.81) / 100 +
        (+bookData?.price * nightCount * 12) / 100 +
        (+bookData?.price * nightCount * 8) / 100
      )?.toFixed(0)
    );

    const newCheckin = dates;
    const newCheckout = date2;

    const tempdata = {
      propertyId: bookData.propertyId,
      propertyName: bookData.propertyName,
      propertyImage: bookData?.propertyImage,
      propertyType: bookData.propertyType,
      property: bookData.property,
      total: null,
      grandTotal,
      totalNightBill: totalNightBill,
      service: service,
      cleaning: cleaning,
      night: nightCount || bookData?.night,
      price: bookData?.price,
      checkIn: newCheckin || bookData?.checkIn,
      checkOut: newCheckout || bookData?.checkOut,
      propertyLocation: bookData.propertyLocation,
      pets: guest.pets,
      adults: guest.adults,
      children: guest.children,
      infants: guest.infants,
      max: bookData.max,
      checkInString: values[0],
      checkOutString: values[1],
      hostId: bookData?.hostId,
      activeUser: bookData?.activeUser,
      taxes: taxes,
      rating: bookData?.rating,
      rateCount: bookData?.rateCount,
      Bookingdata: BookingDates || bookData?.Bookingdata,
    };

    if (alreadyBookedDates?.length > 0) {
      setShowBookingInfo(true);
      setEditDate(false);
      return;
    } else {
      localStorage.setItem("solexBook", JSON.stringify(tempdata));
      setEditGuest(false);
      setEditDate(false);
    }
  };

  ///////////
  useEffect(() => {
    setGuest(initialState);
    onChanges([
      new Date(bookData?.checkInString && bookData?.checkInString),
      new Date(bookData?.checkOutString && bookData?.checkOutString),
    ]);
  }, [bookData, editDate]);

  useEffect(() => {
    const result = localStorage.getItem("solexBook");
    const res = result ? JSON.parse(result) : "";
    setBookData(res);
  }, [editGuest, editDate, setPrice]);

  useEffect(() => {
    getUserBookingCollection();
  }, [bookData]);

  return (
    <section className="bookBar">
      <Card>
        <div className="bookTop">
          <CgChevronLeft
            className="bookGo"
            onClick={() =>
              navigate(`/rooms/${bookData.propertyName}/${bookData.propertyId}`)
            }
          />
          <h2>Request to book</h2>
        </div>
        <div
          className="book"
          onClick={(e) => {
            e.stopPropagation();
            setShowCard(false);
          }}
        >
          <div className="leftBook " id="cool">
            <h3>Your Trip</h3>
            <BookCreateCard
              bookData={bookData}
              guest={guest}
              setGuest={setGuest}
              values={values}
              onChanges={onChanges}
              saveChange={saveChange}
              editDate={editDate}
              setEditDate={setEditDate}
              editGuest={editGuest}
              setEditGuest={setEditGuest}
              getCollection={getCollection}
            />

            <PaymentsSection
              bookData={bookData}
              showCard={showCard}
              setShowCard={setShowCard}
              grandTotal={grandTotal}
              taxes={taxes}
              bookedUserDates={bookedUserDates}
            />
          </div>
          <div className="rightBook" id="cool">
            <div className="rightBookWrap">
              <div className="bookPropertyInfo">
                <div className="imgBook">
                  <img src={bookData.propertyImage} alt="" />
                </div>
                <div className="bookInfo">
                  <div className="wrapEntire">
                    <span>
                      {bookData.propertyType === "free"
                        ? "Entire"
                        : bookData.propertyType === "private"
                        ? "Private"
                        : bookData.propertyType === "shared"
                        ? "Shared"
                        : ""}
                    </span>
                    <span>{bookData.property}</span>
                  </div>

                  <p>{bookData.propertyName}</p>
                  <p>{bookData.propertyLocation}</p>
                  {bookData.rating / bookData.rateCount > 0 ? (
                    <p className="bookReview">
                      <AiFillStar />{" "}
                      {(bookData.rating / bookData.rateCount)?.toFixed(1)} (
                      {bookData.rateCount} reviews)
                    </p>
                  ) : (
                    <p className="bookReview">New</p>
                  )}
                </div>
              </div>

              <div className="cover">
                <p>
                  Your booking is protected by <span>sol</span>cover
                </p>
              </div>

              <div className="line"></div>
              <div className="bookPriceBar">
                <div className="bookPrice">
                  <p>
                    ${setPrice(bookData.price)} x {bookData.night} nights
                  </p>

                  <span>${bookData.totalNightBill}</span>
                </div>

                <div className="bookPrice">
                  <p>Cleaning fee</p>

                  <span>${bookData?.cleaning}</span>
                </div>

                <div className="bookPrice">
                  <p>Service fee</p>

                  <span>${bookData?.service}</span>
                </div>

                <div className="bookPrice">
                  <p>Taxes</p>

                  <span>${taxes}</span>
                </div>

                <div className="line"></div>

                <div className="totalBill">
                  <b>Total (USD)</b>
                  <b>${grandTotal}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {showBookingInfo && (
        <ALertBookeddDates
          title="book"
          setShowBookedDates={setShowBookingInfo}
          dates={bookedDate}
          userData={{
            propertyImage: bookData?.propertyImage,

            listing: {
              propertyTitle: bookData?.propertyName,
              propertyLocation: bookData?.propertyLocation,
            },
          }}
        />
      )}
    </section>
  );
};

export default Book;
