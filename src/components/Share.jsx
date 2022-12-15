import React, { useState } from "react";
import "../styles/Share.css";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

const Share = ({ showShare, setShowShare }) => {
  const [showClip, setShowClip] = useState(false);

  const shareTwiter = (e) => {
    window.open(
      "https://twitter.com/share?url=" +
        encodeURIComponent(e) +
        "&text=" +
        document.title,
      "",
      "menubar=no, toolbar=no,resizable=yes,scrollbar=yes,height=400,width=600"
    );

    return false;
  };

  const shareMail = (e) => {
    let url =
      "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body=" +
      `${e}` +
      "&ui=2&tf=1&pli=1";

    window.open(url, "sharer", "toolbar=0,status=0,width=648,height=395");

    return false;
  };

  return (
    <>
      <div className="overLay" onClick={() => setShowShare("")}></div>
      <section className="shareBar">
        <div className="shareTop">
          <AiOutlineClose
            onClick={() => setShowShare("")}
            cursor={"pointer"}
            size={20}
          />
        </div>
        <h2>Share this place with friends and family</h2>

        <div className="shareContent">
          <div
            className="shareListItem"
            onClick={() => {
              navigator.clipboard.writeText(showShare);
              setShowClip(true);
              setTimeout(() => {
                setShowClip(false);
              }, 2000);
            }}
          >
            <MdOutlineContentCopy size={22} />
            <p>Copy Link</p>
          </div>

          <div className="shareListItem" onClick={() => shareTwiter(showShare)}>
            <BsTwitter size={22} color="blue" />
            <p>Twitter</p>
          </div>

          <a
            className="shareListItem"
            href={`https://api.whatsapp.com/send?text=${showShare}`}
            data-action="share/whatsapp/share"
            target={"_blank"}
          >
            <BsWhatsapp color="green" size={22} />
            WhatsApp
          </a>

          <div className="shareListItem" onClick={() => shareMail(showShare)}>
            <FiMail size={22} color="black" />
            <p>Mail</p>
          </div>
        </div>
        {showClip && <div className="showClip">Link copy to Clipboard</div>}
      </section>
    </>
  );
};

export default Share;
