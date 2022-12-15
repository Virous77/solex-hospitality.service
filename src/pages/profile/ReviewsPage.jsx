import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
import "../../styles/UserReviews.css";
import useFetchCollectionbyParam from "../../hooks/useFetchCollectionbyParam";
import { BsThreeDots } from "react-icons/bs";
import UserReviews from "../../components/UserReviews";
import AbouUserReviews from "../../components/AbouUserReviews";
import Loader from "../../components/UI/Loader";

const ReviewsPage = () => {
  const { activeUser } = useAuthContext();
  const { data, loading } = useFetchCollectionbyParam(
    "userId",
    activeUser?.uid,
    "rating"
  );

  const [reviews, setReviews] = useState(true);
  const [tempReviews, setTempReviews] = useState("");

  if (loading) return <Loader />;

  return (
    <section className="userReviewsPageBar">
      <div className="linkSection">
        <span>
          <Link to={`/profile/${activeUser?.uid}`}>Profile</Link>
        </span>

        <AiOutlineRight size={10} />

        <span>Reviews</span>
      </div>

      <h1>Reviews by you</h1>

      <div className="reviewNav">
        <p
          className={reviews ? "fccc" : "fcx"}
          onClick={() => setReviews(true)}
        >
          Reviews by you
        </p>
        <p
          className={!reviews ? "fccc" : "fcx"}
          onClick={() => setReviews(false)}
        >
          Reviews about you
        </p>
      </div>
      <div className="line"></div>

      {reviews && (
        <div className="myReview">
          {data.length > 0 ? (
            <div className="myReviewBar">
              {data?.map((rev) => (
                <div className="myRevList" key={rev.id}>
                  <div className="myRevInfo">
                    <div className="myRevProfile">
                      <img
                        src={rev?.reviewUserImage}
                        alt=""
                        referrerPolicy="no-referrer"
                      />

                      <div className="myRevPInfo">
                        <h4>
                          {rev.reviewUserFirstName}{" "}
                          {rev.reviewUserLastName && rev.reviewUserLastName}
                        </h4>
                        <span>
                          Reviewed in {rev.createdAt?.toDate()?.getFullYear()}
                        </span>
                      </div>
                    </div>
                    <BsThreeDots
                      cursor={"pointer"}
                      size={25}
                      onClick={() => setTempReviews(rev)}
                    />
                  </div>
                  <p>{rev.reviewMessage}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="zeroReview">
              <h2>Past reviews you’ve written</h2>
              <p>You have not written any reviews yet.</p>
            </div>
          )}
        </div>
      )}

      {!reviews && (
        <div className="recieveReview">
          <AbouUserReviews uid={activeUser?.uid} />
        </div>
      )}

      {tempReviews && (
        <UserReviews
          tempReviews={tempReviews}
          setTempReviews={setTempReviews}
        />
      )}
    </section>
  );
};

export default ReviewsPage;
