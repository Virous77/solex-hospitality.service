import React, { useState } from "react";
import "../styles/Review.css";
import { Rating } from "react-simple-star-rating";
import {
  serverTimestamp,
  doc,
  updateDoc,
  addDoc,
  collection,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useAuthContext } from "../store/authContext";

const Review = ({ review: dataReview, setReview }) => {
  const { activeUser } = useAuthContext();
  const [reviews, setReviews] = useState("");
  const initialState = {
    clean: 0,
    communication: 0,
    value: 0,
    location: 0,
    accuracy: 0,
  };
  const [rate, setRate] = useState(initialState);
  const { clean, accuracy, location, value, communication } = rate;

  const handleRating = async (e) => {
    e.preventDefault();

    const userReview = {
      clean,
      accuracy,
      location,
      value,
      communication,
    };
    const total = (clean + accuracy + communication + location + value) / 5;

    const userReviewData = {
      reviewUserFirstName: dataReview?.bookUserFirstName,
      reviewUserLasttName: dataReview?.bookUserLastName,
      reviewUserImage: dataReview?.bookUserImage,
      createdAt: serverTimestamp(),
      userReview,
      reviewMessage: reviews,
      propertyId: dataReview?.bookData.propertyId,
      userId: activeUser?.uid,
      propertyImage: dataReview?.bookData.propertyImage,
      propertyName: dataReview?.bookData.propertyName,
      propertyLocation: dataReview?.bookData.propertyLocation,
    };

    const saveChangeRef = doc(db, "property", dataReview?.bookData.propertyId);
    const ChangeRef = doc(db, "booking", dataReview.id);

    try {
      await updateDoc(ChangeRef, {
        review: "done",
      });
      await updateDoc(saveChangeRef, {
        rating: increment(total),
        rateCount: increment(1),
      });
      await addDoc(collection(db, "rating"), userReviewData);
      setReview("");
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  return (
    <>
      <div className="overLay" onClick={() => setReview("")}></div>
      <section className="reviewBar">
        <div className="shopReview">
          <img
            src={dataReview.bookData.propertyImage}
            alt={dataReview.bookData.propertyName}
          />
          <div>
            <p>{dataReview.bookData.propertyName}</p>
            <span>{dataReview.bookData.propertyLocation}</span>
          </div>
        </div>

        <div className="rating">
          <div className="ratingHead">
            <p>Cleanliness</p>
            <Rating
              onClick={(e) => setRate({ ...rate, clean: e })}
              initialValue={rate.clean}
              transition="true"
              allowFraction="true"
              fillColor="#ff385c"
              size={27}
            />
          </div>

          <div className="ratingHead">
            <p>Communication</p>
            <Rating
              onClick={(e) => setRate({ ...rate, communication: e })}
              initialValue={rate.communication}
              transition="true"
              allowFraction="true"
              fillColor="#ff385c"
              size={27}
            />
          </div>

          <div className="ratingHead">
            <p>Location</p>
            <Rating
              onClick={(e) => setRate({ ...rate, location: e })}
              initialValue={rate.location}
              transition="true"
              allowFraction="true"
              fillColor="#ff385c"
              size={27}
            />
          </div>

          <div className="ratingHead">
            <p>Accuracy</p>
            <Rating
              onClick={(e) => setRate({ ...rate, accuracy: e })}
              initialValue={rate.accuracy}
              transition="true"
              allowFraction="true"
              fillColor="#ff385c"
              size={27}
            />
          </div>

          <div className="ratingHead">
            <p>Value</p>
            <Rating
              onClick={(e) => setRate({ ...rate, value: e })}
              initialValue={rate.value}
              transition="true"
              allowFraction="true"
              fillColor="#ff385c"
              size={27}
            />
          </div>
        </div>

        <div className="reviewBox">
          <p>Write a Review</p>

          <form onSubmit={handleRating}>
            <textarea
              placeholder="Write a Review"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
            ></textarea>

            <button disabled={reviews.trim().length === 0}>
              Submit Rating
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Review;
