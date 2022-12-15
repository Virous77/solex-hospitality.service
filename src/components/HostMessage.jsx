import React, { useState } from "react";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import useFetchMessage from "../hooks/useFetchMessage";
import { VscClose } from "react-icons/vsc";
import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAuthContext } from "../store/authContext";
import { useNavigate } from "react-router-dom";

const HostMessage = ({ id, bookData, setHostMessage, userActive }) => {
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { data: hostUser } = useFetchCollectionbyParam(
    "uid",
    bookData?.hostId,
    "users"
  );
  const { data: userMessage, loading } = useFetchMessage("message");
  const currentUserChat = userMessage?.filter((use) =>
    use.userUid.includes(id)
  );
  const thisPropertyMessage = currentUserChat?.find(
    (msg) => msg.propertyId === bookData?.propertyId
  );

  function convertTimestamp(timestamp) {
    let date = timestamp?.toDate();
    let yyyy = date?.getFullYear();
    date = yyyy;
    return date;
  }

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
      userUid: [id, hostUser[0]?.uid && hostUser[0]?.uid],
      createdAt: serverTimestamp(),
      editedAt: serverTimestamp(),
      hostImage: (hostUser[0]?.photoURL && hostUser[0]?.photoURL) || null,
      hostFirstName: hostUser[0]?.firstName && hostUser[0]?.firstName,
      hostLastName: hostUser[0]?.lastName && hostUser[0]?.lastName,
      hostId: bookData?.hostId,
      propertyId: bookData?.propertyId,
    };

    try {
      if (thisPropertyMessage) {
        const messageRef = doc(db, "message", thisPropertyMessage?.id);
        await updateDoc(messageRef, {
          messages: arrayUnion(newMessage),
        });
        setMessage("");
        setHostMessage(false);
        return;
      }

      await addDoc(collection(db, "message"), makeData);
      setMessage("");
      setHostMessage(false);
    } catch (error) {
      toast.error("Something went wrong,Try again!");
    }
  };

  return (
    <>
      <div className="overLay" onClick={() => setHostMessage(false)}></div>
      <div className="hostBookMessage">
        <div className="topBookHost">
          <VscClose className="vscIcon" onClick={() => setHostMessage(false)} />
          <h4>Message the host</h4>
        </div>

        <div className="line"></div>

        {!loading ? (
          <div className="leftMessage trim">
            <h2>Message the host</h2>
            <p>
              Let the host know why you're travelling and when you'll check in.
            </p>

            <div className="messageHost">
              {hostUser[0]?.photoURL ? (
                <img
                  src={hostUser[0]?.photoURL && hostUser[0]?.photoURL}
                  alt="Host"
                  referrerPolicy="non-referrer"
                />
              ) : (
                <BiUser className="hostMessageIcon" />
              )}

              <div className="hostMessageInfo">
                <b>
                  {hostUser[0]?.firstName && hostUser[0]?.firstName}{" "}
                  {hostUser[0]?.lastName && hostUser[0]?.lastName}{" "}
                </b>

                <span>
                  {" "}
                  Joined in{" "}
                  {convertTimestamp(
                    hostUser[0]?.createdAt && hostUser[0]?.createdAt
                  )}
                </span>
              </div>
            </div>

            <form onSubmit={sendMessage}>
              <textarea
                cols="30"
                rows="10"
                spellCheck="true"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button disabled={message?.trim()?.length === 0}>
                Send Message
              </button>
            </form>
          </div>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default HostMessage;
