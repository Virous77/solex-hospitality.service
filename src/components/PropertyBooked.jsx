import React, { useState } from "react";
import "../styles/Booked.css";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import { useAuthContext } from "../store/authContext";
import BookedDetails from "./BookedDetails";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { FiAlertOctagon } from "react-icons/fi";
import Empty from "./UI/Empty";
import empty from "../assets/empty.svg";
import Loader from "./UI/Loader";

const PropertyBooked = () => {
  const { activeUser } = useAuthContext();
  const { data, loading } = useFetchCollectionbyParam(
    "hostId",
    activeUser?.uid,
    "booking"
  );

  const uniqueData = data?.filter((item) => item.booking !== "cancel");

  const [tempData, setTempData] = useState("");
  const [saveData, setSaveData] = useState("");
  const [alertAccept, setAlertAccept] = useState("");

  const saveChanges = async () => {
    const saveChangeRef = doc(db, "booking", saveData.id);

    try {
      await updateDoc(saveChangeRef, {
        booking: "accept",
        acceptAt: serverTimestamp(),
      });
      setSaveData("");
      setAlertAccept("");
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  const cancelBooking = async () => {
    const saveChangeRef = doc(db, "booking", saveData.id);

    try {
      await updateDoc(saveChangeRef, {
        booking: "cancel",
        cancelId: activeUser?.uid,
        cancelAt: serverTimestamp(),
      });
      setSaveData("");
      setAlertAccept("");
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      {uniqueData.length > 0 ? (
        <section className="bookedListBar">
          {uniqueData.map((book) => (
            <div className="bookedList" key={book.id}>
              <div className="leftBooked">
                {book?.bookUserImage ? (
                  <img
                    src={book?.bookUserImage}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="noBookImg">
                    <FaUserAlt style={{ fontSize: "2rem" }} />
                  </div>
                )}
                <div className="leftBookedInfo">
                  <h4>
                    {book?.bookUserFirstName}{" "}
                    {book?.bookUserLastName && book?.bookUserLastName}
                  </h4>
                </div>
              </div>
              <div className="rightBooked">
                <button
                  className="bookedDetails"
                  onClick={() => setTempData(book)}
                >
                  Details
                </button>
                {book.booking === "pending" ? (
                  <button
                    className="bookedAccept"
                    onClick={() => {
                      setAlertAccept("accept");
                      setSaveData(book);
                    }}
                  >
                    Accept
                  </button>
                ) : (
                  <>
                    {book.booking !== "completed" && (
                      <button className="bookAccepted">Accepted</button>
                    )}
                  </>
                )}

                {book.booking === "pending" && (
                  <button
                    onClick={() => {
                      setAlertAccept("reject");
                      setSaveData(book);
                    }}
                    className="bookReject"
                  >
                    Reject
                  </button>
                )}

                {book.booking === "completed" && (
                  <button
                    className="bookAccepted"
                    style={{ color: "green", fontWeight: "600" }}
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <Empty image={empty} title="Booking is empty." />
      )}

      {tempData && (
        <BookedDetails tempData={tempData} setTempData={setTempData} />
      )}

      {alertAccept === "accept" && (
        <>
          <div className="overLay" onClick={() => setAlertAccept("")}></div>
          <div className="alertAccepted makeAlert">
            <FiAlertOctagon style={{ fontSize: "2rem", color: "green" }} />

            <p>Are you sure wanna Accept this Booking?</p>

            <div className="acceptAction">
              <button
                onClick={() => setAlertAccept("")}
                style={{ backgroundColor: "black" }}
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                style={{ backgroundColor: " #ff385c" }}
              >
                Accept
              </button>
            </div>
          </div>
        </>
      )}

      {alertAccept === "reject" && (
        <>
          <div className="overLay" onClick={() => setAlertAccept("")}></div>
          <div className="alertAccepted makeAlert">
            <FiAlertOctagon style={{ fontSize: "2rem", color: "green" }} />

            <p>Are you sure wanna Cancel this Booking?</p>

            <div className="acceptAction">
              <button
                onClick={() => setAlertAccept("")}
                style={{ backgroundColor: "black" }}
              >
                Cancel
              </button>
              <button
                onClick={cancelBooking}
                style={{ backgroundColor: "red" }}
              >
                Reject
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PropertyBooked;
