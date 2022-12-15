import React, { useState } from "react";
import "../styles/Message.css";
import { CgChevronLeft } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import useFetchMessage from "../hooks/useFetchMessage";
import { useAuthContext } from "../store/authContext";

const Message = ({ tempData, setShowMessage, id }) => {
  const [message, setMessage] = useState("");
  const [showExit, setShowExit] = useState(false);
  const navigate = useNavigate();
  const { data: userActive } = useFetchCollectionbyParam("uid", id, "users");
  const { data: userMessage } = useFetchMessage("message");
  const { user } = useAuthContext();
  const currentUserChat = userMessage?.filter((use) =>
    use.userUid.includes(id)
  );
  const thisPropertyMessage = currentUserChat?.find(
    (msg) => msg.propertyId === tempData?.propertyId
  );

  const setPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!user.isLoggedIn) {
      navigate("/sign-in");
      return;
    }

    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      message,
      createdAt: time,
      date,
      image: (userActive[0]?.photoURL && userActive[0]?.photoURL) || null,
      firstName: userActive[0]?.firstName && userActive[0]?.firstName,
      lastName: (userActive[0]?.lastName && userActive[0]?.lastName) || null,
    };

    const makeData = {
      messages: [newMessage],
      userUid: [id, tempData?.hostId],
      createdAt: serverTimestamp(),
      editedAt: serverTimestamp(),
      hostImage: tempData?.hostImage || null,
      hostFirstName: tempData?.hostFirstName,
      hostLastName: tempData?.hostLastName || null,
      hostId: tempData?.hostId,
      propertyId: tempData?.propertyId,
    };

    try {
      if (thisPropertyMessage) {
        const messageRef = doc(db, "message", thisPropertyMessage?.id);

        await updateDoc(messageRef, {
          messages: arrayUnion(newMessage),
        });
        setShowExit(true);
        return;
      }

      await addDoc(collection(db, "message"), makeData);
      setShowExit(true);
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  return (
    <section className="messageBar">
      <div className="messageOff">
        <CgChevronLeft
          onClick={() => setShowMessage(false)}
          className="messageClose"
        />
      </div>

      <div className="messageWrapBar">
        <div className="leftMessage">
          <h2>Message the host</h2>

          <form onSubmit={sendMessage}>
            <textarea
              cols="30"
              rows="10"
              spellCheck="true"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button disabled={message.trim().length === 0}>Send Message</button>
          </form>
        </div>

        <div className="rightMessage">
          <div className="wrapMessage">
            <div className="leftMessageInfo">
              <div className="night">
                <h3>${setPrice(tempData.price)}</h3>
                <p>night</p>
              </div>
              <span className="mName">{tempData.name}</span>
              <div className="messageType">
                {tempData?.rating / tempData?.rateCount > 0 ? (
                  <span>
                    <AiFillStar />{" "}
                    {(tempData?.rating / tempData.rateCount)?.toFixed(1)}
                  </span>
                ) : (
                  <span>New</span>
                )}
                .
                <span>
                  {tempData.type === "free"
                    ? "An entire place"
                    : tempData.type === "private"
                    ? "An private room"
                    : tempData.type === "shared"
                    ? "An shared room"
                    : ""}
                </span>
              </div>
            </div>
            <div className="rightMessageInfo">
              <img src={tempData.image} alt="" />
            </div>
          </div>
        </div>
      </div>

      {showExit && (
        <>
          <div className="overLay"></div>
          <div className="thankYou">
            <div className="thankYouDone">
              <MdDone className="rightIcon" />
              <p>Message sent to Host.</p>
            </div>
            <div className="thankYouAction">
              <button
                onClick={() => {
                  setShowMessage(false);
                  setShowExit(false);
                }}
              >
                Done
              </button>
              <button
                onClick={() =>
                  navigate(
                    `/profile/message/${
                      userActive[0]?.firstName && userActive[0]?.firstName
                    }${
                      userActive[0]?.lastName && `-${userActive[0]?.lastName}`
                    }`
                  )
                }
              >
                Go to Message
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Message;
