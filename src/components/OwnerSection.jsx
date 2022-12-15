import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Message from "./Message";
import { useAuthContext } from "../store/authContext";
import RoomOwnerData from "./RoomOwnerData";
import { Link } from "react-router-dom";

const OwnerSection = ({ userActive, listing, propertyId, scroller2 }) => {
  const { activeUser } = useAuthContext();
  const dates = userActive && userActive[0]?.createdAt;

  const [showMessage, setShowMessage] = useState(false);
  const [tempData, setTempData] = useState("");

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function convertTimestamp(timestamp) {
    let date = timestamp?.toDate();
    let name = month[date?.getMonth()];
    let yyyy = date?.getFullYear();

    date = name + " " + yyyy;
    return date;
  }

  const setData = (e) => {
    const data = {
      price: e.price,
      image: e.propertyImage[0],
      hostImage: (userActive && userActive[0]?.photoURL) || null,
      hostFirstName: userActive && userActive[0]?.firstName,
      hostLastName: (userActive && userActive[0]?.lastName) || null,
      hostId: userActive && userActive[0]?.uid,
      name: e?.listing?.propertyTitle,
      type: e?.listing?.propertyType,
      propertyId,
      rating: e.rating,
      rateCount: e.rateCount,
    };

    setTempData(data);
  };

  return (
    <section className="hostUserBar" ref={scroller2}>
      <div className="hostUser">
        {userActive && userActive[0]?.photoURL ? (
          <Link to={`/users/${userActive[0]?.uid}`}>
            <img src={userActive[0]?.photoURL} alt="Host" />
          </Link>
        ) : (
          <Link to={`/users/${userActive[0]?.uid}`}>
            <AiOutlineUser className="owner" />
          </Link>
        )}

        <div className="hostInfo">
          <h3>
            Hosted By {userActive && userActive[0]?.firstName}{" "}
            {userActive && userActive[0]?.lastName}{" "}
          </h3>
          <p>Joined in {convertTimestamp(dates)}</p>
        </div>
      </div>

      <div className="hostWrap">
        <div className="leftHost">
          <RoomOwnerData userActive={userActive} />
        </div>
        <div className="rightHost">
          <p>
            <span>Policy Identity :</span> {userActive && userActive[0]?.uid}
          </p>

          <p>
            <span>Response rate :</span> 100%
          </p>

          <p>
            <span> Response time :</span> within an hour
          </p>

          {activeUser.uid !== listing?.userUid && (
            <button
              onClick={() => {
                setData(listing);
                setShowMessage(true);
              }}
            >
              Contact Host
            </button>
          )}
        </div>
      </div>

      {showMessage && (
        <Message
          setShowMessage={setShowMessage}
          tempData={tempData}
          id={activeUser?.uid}
        />
      )}
    </section>
  );
};

export default OwnerSection;
