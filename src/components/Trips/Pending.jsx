import React, { useState } from "react";
import { convertTimestamp } from "../../utils/function";
import BookedDetails from "../BookedDetails";
import { FiAlertOctagon } from "react-icons/fi";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../store/authContext";
import { db } from "../../firebase/firebase.config";

const Pending = ({ pending }) => {
  const { activeUser } = useAuthContext();
  const [tempData, setTempData] = useState("");
  const [alertAccept, setAlertAccept] = useState(false);
  const [saveData, setSaveData] = useState("");

  const cancelBooking = async () => {
    const saveChangeRef = doc(db, "booking", saveData.id);

    try {
      await updateDoc(saveChangeRef, {
        booking: "cancel",
        cancelId: activeUser?.uid,
        cancelAt: serverTimestamp(),
      });
      setSaveData("");
      setAlertAccept(false);
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  return (
    <div className="pendingBar">
      {pending?.map((item) => (
        <div className="pendingList" key={item.id}>
          <div className="pendingWrap">
            <div className="pendingTop">
              <img src={item?.bookData.propertyImage} alt="" />

              <div className="pendingInfo">
                <h4>{item?.bookData?.propertyName}</h4>
                <span>{item?.bookData?.propertyLocation}</span>
              </div>
            </div>

            <div className="pendingRight">
              <div className="status">
                <p>Status : </p>
                <span>Pending</span>
              </div>
              <div className="pendingBooking">
                <div className="pendingBookTop">
                  <p>Check-In</p>

                  <span>{convertTimestamp(item?.bookData.checkIn)}</span>
                </div>

                <div className="pendingBookTop">
                  <p>Check-Out</p>

                  <span>{convertTimestamp(item?.bookData.checkOut)}</span>
                </div>
              </div>

              <div className="pendingAction">
                <button
                  style={{ backgroundColor: "black" }}
                  onClick={() => setTempData(item)}
                >
                  Details
                </button>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    setSaveData(item);
                    setAlertAccept(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {tempData && (
        <BookedDetails tempData={tempData} setTempData={setTempData} />
      )}

      {alertAccept && (
        <>
          <div className="overLay" onClick={() => setAlertAccept(false)}></div>
          <div className="alertAccepted makeAlert">
            <FiAlertOctagon style={{ fontSize: "2rem", color: "green" }} />

            <p>Are you sure wanna Cancel this Booking?</p>

            <div className="acceptAction">
              <button
                onClick={() => setAlertAccept(false)}
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
    </div>
  );
};

export default Pending;
