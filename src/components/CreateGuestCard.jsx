import React from "react";

const CreateGuestCard = ({
  setGuest,
  guest,
  maxGuest,
  setShowGuest,
  title,
  saveChange,
  setEditGuest,
}) => {
  return (
    <>
      {title === "book" && (
        <div className="overLay" onClick={() => setEditGuest(false)}></div>
      )}
      <div className={title === "calander" ? "guestCard" : "bookGuestCard"}>
        <div className="adultsBar">
          <div className="adults">
            <h4>Adults</h4>
            <span>Age 13+</span>
          </div>

          <div className="guestValue">
            <button
              disabled={guest.adults === 1}
              onClick={() => setGuest({ ...guest, adults: guest.adults - 1 })}
            >
              -
            </button>
            <p>{guest.adults}</p>
            <button
              disabled={guest.adults + guest.children === maxGuest}
              onClick={() => setGuest({ ...guest, adults: guest.adults + 1 })}
            >
              +
            </button>
          </div>
        </div>

        <div className="adultsBar">
          <div className="adults">
            <h4>Children</h4>
            <span>Ages 2-12</span>
          </div>

          <div className="guestValue">
            <button
              disabled={guest.children === 0}
              onClick={() =>
                setGuest({ ...guest, children: guest.children - 1 })
              }
            >
              -
            </button>
            <p>{guest.children}</p>
            <button
              disabled={guest.children + guest.adults === maxGuest}
              onClick={() =>
                setGuest({ ...guest, children: guest.children + 1 })
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="adultsBar">
          <div className="adults">
            <h4>Infants</h4>
            <span>Under 2</span>
          </div>

          <div className="guestValue">
            <button
              disabled={guest.infants === 0}
              onClick={() => setGuest({ ...guest, infants: guest.infants - 1 })}
            >
              -
            </button>
            <p>{guest.infants}</p>
            <button
              disabled={guest.infants === 6}
              onClick={() => setGuest({ ...guest, infants: guest.infants + 1 })}
            >
              +
            </button>
          </div>
        </div>

        <div className="adultsBar">
          <div className="adults">
            <h4>Pets</h4>
          </div>

          <div className="guestValue">
            <button
              disabled={guest.pets === 0}
              onClick={() => setGuest({ ...guest, pets: guest.pets - 1 })}
            >
              -
            </button>
            <p>{guest.pets}</p>
            <button
              disabled={guest.pets === 4}
              onClick={() => setGuest({ ...guest, pets: guest.pets + 1 })}
            >
              +
            </button>
          </div>
        </div>

        {title === "calander" && (
          <div className="closeGuest notBook">
            <p onClick={() => setShowGuest(false)}>Close</p>
          </div>
        )}

        {title === "book" && (
          <div className="flexBook">
            <div className="closeGuest">
              <p onClick={() => setEditGuest(false)}>Close</p>
            </div>

            <div className="saveChange" onClick={saveChange}>
              Save
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateGuestCard;
