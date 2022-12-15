import React, { useState } from "react";
import { convertTimestamp } from "../../utils/function";
import BookedDetails from "../BookedDetails";
import { FiAlertOctagon } from "react-icons/fi";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../store/authContext";
import { db } from "../../firebase/firebase.config";
import CheckoutPayment from "../Payments/CheckoutPayment";
import { RiCloseLine } from "react-icons/ri";

const Pay = ({ accept }) => {
  const { activeUser } = useAuthContext();
  const [tempData, setTempData] = useState("");
  const [alertAccept, setAlertAccept] = useState(false);
  const [saveData, setSaveData] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const [pay, setPay] = useState("");

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
      {accept?.map((item) => (
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
                <span style={{ backgroundColor: "green" }}>Accept</span>
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

              <button className="payButton" onClick={() => setPay(item)}>
                Complete Payment
              </button>
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

      {pay && (
        <>
          <div className="overLay" onClick={() => setPay("")}></div>
          <div className="payPopup">
            <div className="payTops">
              <RiCloseLine className="payIcon" onClick={() => setPay("")} />
              <h4>Stripe Payment</h4>
            </div>

            <div className="widthIt">
              <CheckoutPayment
                setThankYou={setThankYou}
                data={pay}
                email={activeUser?.email}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pay;
