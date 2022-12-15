import React from "react";
import { convertTimestamp } from "../utils/function";
import CreateGuestCard from "./CreateGuestCard";
import BookCalander from "./BookCalander";

const BookCreateCard = ({
  bookData,
  guest,
  setGuest,
  values,
  onChanges,
  saveChange,
  setEditGuest,
  editGuest,
  setEditDate,
  editDate,
  getCollection,
}) => {
  const checkOutDate = convertTimestamp(bookData.checkOut);

  return (
    <div className="bookCardBar">
      <div className="bookCard">
        <div className="topCard">
          <div className="leftTop">
            <h4>Dates</h4>
            <span>
              {bookData.checkIn?.slice(0, 2)}-{checkOutDate}
            </span>
          </div>

          <b
            onClick={() => {
              setEditDate(true);
              getCollection();
            }}
          >
            Edit
          </b>
        </div>
        <div className="bottomCard">
          <div className="leftTop">
            <h4>Guests</h4>
            <p>
              <span>
                {bookData.adults + bookData.children}{" "}
                {bookData.adults + bookData.children > 1 ? "Guests" : "Guest"}
              </span>

              {bookData.infants > 0 && (
                <span>
                  . {bookData.infants}{" "}
                  {bookData.infants > 1 ? "Infants" : "Infant"}
                </span>
              )}

              {bookData.pets > 0 && (
                <span>
                  . {bookData.pets} {bookData.pets > 1 ? "Pets" : "Pet"}
                </span>
              )}
            </p>
          </div>

          <b onClick={() => setEditGuest(true)}>Edit</b>
        </div>
      </div>

      {editGuest && (
        <CreateGuestCard
          guest={guest}
          setGuest={setGuest}
          setEditGuest={setEditGuest}
          editGuest={editGuest}
          title="book"
          maxGuest={bookData.max}
          saveChange={saveChange}
        />
      )}

      {editDate && (
        <BookCalander
          values={values}
          onChanges={onChanges}
          saveChange={saveChange}
          setEditDate={setEditDate}
        />
      )}
    </div>
  );
};

export default BookCreateCard;
