import React, { useState } from "react";
import "../../styles/Payment.css";
import visa from "../../assets/card/visa.svg";
import master from "../../assets/card/master.svg";
import card from "../../assets/card/card.svg";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { useAuthContext } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import HostMessage from "../HostMessage";
import useFetchCollectionbyParam from "../../hooks/useFetchCollectionbyParam";
import EditProfilePic from "../EditProfilePic";
import { BsDot } from "react-icons/bs";
import policy from "../../assets/card/policy.svg";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import BookingDone from "../UI/BookingDone";
import { GrCircleAlert } from "react-icons/gr";
import _ from "lodash";
import AlertUser from "../UI/AlertUser";

const PaymentsSection = ({
  bookData,
  showCard,
  setShowCard,
  grandTotal,
  taxes,
  bookedUserDates,
}) => {
  const { activeUser, user } = useAuthContext();
  const { data: userActive } = useFetchCollectionbyParam(
    "uid",
    activeUser?.uid,
    "users"
  );
  const [hostMessage, setHostMessage] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [alertProfile, setAlertProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingWithUs, setBookingWithUs] = useState([]);
  const navigate = useNavigate();

  const saveBooking = () => {
    if (!user.isLoggedIn) {
      navigate("/sign-in");
      return;
    }

    if (userActive[0]?.photoURL === null) {
      setLoading(false);
      setAlertProfile(true);
      return;
    }

    const bookedData = bookedUserDates?.map((li) => li.dates);
    const allBookedData = bookedData?.flatMap((li) => li);
    const commonDate = _.intersection(bookData?.Bookingdata, allBookedData);

    const z = bookedUserDates?.filter((li) =>
      li.dates?.includes(commonDate[0])
    );
    const x = bookedUserDates?.filter((li) =>
      li.dates?.includes(commonDate[bookedUserDates?.length - 1])
    );

    const uniqueBookedHotel = [...new Set([...z, ...x])];
    if (commonDate.length > 0) {
      setBookingWithUs(uniqueBookedHotel);
      return;
    } else {
      confirmBooking();
    }
  };

  async function confirmBooking() {
    setLoading(true);

    const tempData = {
      bookData,
      createdAt: serverTimestamp(),
      grandTotal: bookData?.grandTotal || grandTotal,
      taxes: bookData?.taxes || taxes,
      bookUser: activeUser?.uid,
      booking: "pending",
      hostId: bookData?.hostId,
      bookUserImage: userActive[0]?.photoURL || null,
      bookUserFirstName: userActive[0]?.firstName,
      bookUserLastName: userActive[0]?.lastName || null,
    };

    const bookingDates = {
      dates: bookData?.Bookingdata,
      propertyId: bookData?.propertyId,
      bookUser: activeUser?.uid,
      bookPopertyImage: bookData?.propertyImage,
      bookPropertyName: bookData?.propertyName,
      bookPopertyLocation: bookData?.propertyLocation,
    };

    try {
      await addDoc(collection(db, "bookingDates"), bookingDates);
      await addDoc(collection(db, "booking"), tempData);
      localStorage.removeItem("solexBook");
      setBookingWithUs([]);
      setBookingDone(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went error,Try again!");
    }
  }

  return (
    <>
      <div className="paymentBar">
        <div className="line"></div>

        <div className="cardSection">
          <div className="payTop">
            <h3>Pay With</h3>

            <div className="visa">
              <img src={master} alt="master card" />
              <img src={visa} alt="Visa card" />
            </div>
          </div>

          <div className="parentPay">
            <div className="payCard payCards">
              <div className="leftPay">
                <img src={card} alt="Card" />
                <p>Credit or Debit Card</p>
              </div>

              {showCard ? (
                <RiArrowUpSLine
                  className="payDown"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCard(false);
                  }}
                />
              ) : (
                <RiArrowDownSLine
                  className="payDown"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCard(true);
                  }}
                />
              )}
            </div>

            {showCard && (
              <div
                className="payCard payCardT"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCard(true);
                }}
              >
                <div className="leftPay">
                  <img src={card} alt="Card" />
                  <p>Credit or Debit Card</p>
                </div>

                <MdDone className="payDown" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="require">
        <div className="line"></div>

        <div className="requireContent">
          <h3>Required for your trip</h3>

          <div className="requireParent">
            <div className="hostRequire">
              <div className="leftRequire">
                <h4>Message the host</h4>
                <span>
                  Let the host know why you're travelling and when you'll check
                  in.
                </span>
              </div>

              <div>
                <button onClick={() => setHostMessage(true)}>Add</button>
              </div>
            </div>

            {!userActive[0]?.photoURL && (
              <div className="hostRequire">
                <div className="leftRequire leftRequire2">
                  <h4>Profile photo</h4>
                  <span>Hosts want to know who’s staying at their place.</span>
                </div>

                <div>
                  <button onClick={() => setUserProfile(true)}>Add</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {hostMessage && (
          <HostMessage
            id={activeUser?.uid}
            bookData={bookData}
            setHostMessage={setHostMessage}
            userActive={userActive}
          />
        )}

        {!userActive[0]?.photoURL && (
          <>
            {userProfile && (
              <EditProfilePic
                setUserProfile={setUserProfile}
                userActive={userActive}
              />
            )}
          </>
        )}

        <div className="ground">
          <div className="line"></div>

          <h3>Ground rules</h3>
          <p>
            We ask every guest to remember a few simple things about what makes
            a great guest.
          </p>
          <span>
            <b>
              <BsDot style={{ display: "flex" }} />
            </b>
            Follow the house rules
          </span>
          <span>
            <b>
              <BsDot style={{ display: "flex" }} />
            </b>
            Treat your Host’s home like your own
          </span>
        </div>

        <div className="policyHead">
          <div className="line"></div>
          <div className="policy">
            <img src={policy} alt="policy" />
            <p>
              Your reservation won’t be confirmed until the host accepts your
              request (within 24 hours).
              <span>You won’t be charged until then.</span>
            </p>
          </div>
        </div>

        <div className="submitBook">
          <button onClick={saveBooking}>
            {loading ? "Submitting..." : "Request to book"}
          </button>
        </div>
      </div>

      {bookingDone && <BookingDone />}

      {alertProfile && (
        <>
          <div className="overLay"></div>
          <div className="alertPic">
            <GrCircleAlert className="alertPicIcon" />
            <p>Profile Photo Must be set to go through for this booking.</p>
            <button
              onClick={() => {
                setAlertProfile(false);
                setUserProfile(true);
              }}
            >
              Set Profile Photo
            </button>
          </div>
        </>
      )}

      {bookingWithUs.length > 0 && (
        <AlertUser
          confirmBooking={confirmBooking}
          setBookingWithUs={setBookingWithUs}
          bookingWithUs={bookingWithUs}
          loading={loading}
        />
      )}
    </>
  );
};

export default PaymentsSection;
