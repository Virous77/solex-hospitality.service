import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useAuthContext } from "../store/authContext";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import { AiOutlineClose } from "react-icons/ai";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase.config";

const ReviewHost = ({ setHost, host }) => {
  const { activeUser } = useAuthContext();
  const { data } = useFetchCollectionbyParam("uid", host.hostId, "users");
  const [rate, setRate] = useState(0);
  const [reviews, setReviews] = useState("");

  const handleRating = async (e) => {
    e.preventDefault();

    const today = new Date();

    const ChangeRef = doc(db, "booking", host.id);
    const saveChangeRef = doc(db, "users", data[0]?.id);

    const tempData = {
      message: reviews,
      rating: rate,
      reviewUserId: activeUser?.uid,
      reviewUserFirstName: host.bookUserFirstName,
      reviewUserLastName: host.bookUserLastName,
      reviewUserImage: host.bookUserImage,
      createdAt: today,
    };

    try {
      await updateDoc(ChangeRef, {
        hostReview: "done",
      });
      await updateDoc(saveChangeRef, {
        reviews: arrayUnion(tempData),
      });
      setHost("");
    } catch (error) {
      toast.error("Something went wrong,Try again!");
    }
  };

  return (
    <>
      <div className="overLay" onClick={() => setHost("")}></div>
      <div className="langBar">
        <div className="hRateTop">
          <AiOutlineClose
            cursor={"pointer"}
            size={18}
            onClick={() => setHost("")}
          />
          <h4>Rate The Host</h4>
        </div>

        <div className="ratehostInfoBar">
          <img src={data[0]?.photoURL} alt="" />

          <div className="rateHostInfo">
            <h4>
              {data[0]?.firstName} {data[0]?.lastName && data[0]?.lastName}
            </h4>
          </div>
        </div>

        <div className="ratingHead gapItm">
          <p>Rating</p>
          <Rating
            onClick={(e) => setRate(e)}
            initialValue={rate}
            transition="true"
            allowFraction="true"
            fillColor="#ff385c"
            size={27}
          />
        </div>
        <div className="reviewBox btext">
          <p>Write a Review</p>

          <form onSubmit={handleRating}>
            <textarea
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
            ></textarea>

            <button disabled={reviews.trim().length === 0}>
              Submit Rating
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewHost;
