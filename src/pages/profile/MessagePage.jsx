import React, { useState, useEffect, useRef } from "react";
import "../../styles/ProfileMessage.css";
import { AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import useFetchMessage from "../../hooks/useFetchMessage";
import MessageProperty from "../../components/MessageProperty";
import Empty from "../../components/UI/Empty";
import empty from "../../assets/empty.svg";
import Loader from "../../components/UI/Loader";

const MessagePage = ({ userActive, id }) => {
  const [initialMessage, setInitialMessage] = useState("");
  const [showSend, setShowSend] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const { data: userMessage, loading } = useFetchMessage("message");
  const justMessage = useRef();

  const currentUserChat = userMessage?.filter((use) =>
    use.userUid.includes(id)
  );
  const thisPropertyMessage = userMessage?.find(
    (msg) => msg.propertyId === initialMessage?.propertyId
  );

  const month = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function convertTimestamp(timestamp) {
    let date = timestamp?.toDate();
    let dd = date?.getDate();
    let name = month[date?.getMonth()];
    let yyyy = date?.getFullYear();

    date = name + " " + dd + " " + yyyy;
    return date;
  }

  const sendNewMessage = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      message: sendMessage,
      createdAt: time,
      date,
      image: (userActive[0]?.photoURL && userActive[0]?.photoURL) || null,
      firstName: userActive[0]?.firstName && userActive[0]?.firstName,
      lastName: (userActive[0]?.lastName && userActive[0]?.lastName) || null,
    };

    const makeData = {
      messages: initialMessage.messages,
      userUid: initialMessage.userUid,
      createdAt: initialMessage.createdAt,
      editedAt: serverTimestamp(),
      hostImage: initialMessage.hostImage,
      hostFirstName: initialMessage.hostFirstName,
      hostLastName: initialMessage.hostLastName,
      hostId: initialMessage.hostId,
      propertyId: initialMessage.propertyId,
    };

    try {
      await setDoc(doc(db, "message", thisPropertyMessage?.id), makeData);

      const messageRef = doc(db, "message", thisPropertyMessage?.id);

      await updateDoc(messageRef, {
        messages: arrayUnion(newMessage),
      });
      setSendMessage("");
      setShowSend(false);
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  useEffect(() => {
    setInitialMessage(currentUserChat[0]);
  }, [currentUserChat[0]?.messages]);

  useEffect(() => {
    justMessage?.current?.scrollIntoView({ behavior: "smooth" });
  }, [sendMessage]);

  if (loading) return <Loader />;

  return (
    <>
      {currentUserChat?.length > 0 ? (
        <section className="userMessageBars">
          <div className="leftMessageBar">
            <div className="top">
              <h3>Message</h3>
            </div>

            <div className="leftMessage">
              {currentUserChat?.map((host) => {
                const lastMessage = host.messages?.slice(-1)[0];

                return (
                  <div
                    className="hostProfileList"
                    key={host.id}
                    onClick={() => setInitialMessage(host)}
                  >
                    <div className="hostProile">
                      {host.hostImage ? (
                        <img
                          src={host.hostImage}
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <AiOutlineUser className="hostIcon" />
                      )}
                    </div>

                    <div className="hostProfileInfo">
                      <h4>
                        {host.hostFirstName}{" "}
                        {host.hostLastName && host.hostLastName}
                      </h4>
                      <p>
                        {lastMessage.message?.substring(0, 60)}
                        {lastMessage?.message.length > 60 ? "..." : ""}{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mediumMessageBar">
            <div className="topM">
              <h3>
                {initialMessage?.hostFirstName}{" "}
                {initialMessage?.hostLastName && initialMessage?.hostLastName}{" "}
              </h3>
            </div>

            <div className="hostMessageContent">
              <p className="todays">
                {convertTimestamp(initialMessage?.createdAt)}
              </p>

              <div className="hostMessageList">
                {initialMessage?.messages?.map((msg, idx) => (
                  <div className="hostMsgList" key={idx} ref={justMessage}>
                    <div className="msgImage">
                      {msg?.image ? (
                        <img
                          src={msg?.image}
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <AiOutlineUser className="noImg" />
                      )}
                    </div>

                    <div className="hostInfos">
                      <div className="flex">
                        <h5>
                          {msg?.firstName} {msg?.lastName && msg?.lastName}
                        </h5>
                        <span>{msg?.createdAt}</span>
                      </div>
                      <p>{msg?.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendNewMessage(initialMessage);
              }}
              className="sendMessage"
            >
              <input
                className={`msgNoActive ${!showSend ? "msgActive" : ""}`}
                type="text"
                placeholder="Type Message"
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                onFocus={() => setShowSend(true)}
                onBlur={() => setShowSend(false)}
              />
              <button>Send</button>
            </form>
          </div>
          <div className="rightMessageBar">
            <MessageProperty
              propertyIds={initialMessage?.propertyId}
              initialMessage={initialMessage}
            />
          </div>
        </section>
      ) : (
        <Empty image={empty} title="You haven't started any chat yet." />
      )}
    </>
  );
};

export default MessagePage;
