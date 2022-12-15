import React from "react";
import "../styles/SolexUsers.css";
import { useParams, Link } from "react-router-dom";
import useFetchCollectionByUid from "../hooks/useFetchCollectionByUid";
import Loader from "../components/UI/Loader";
import { FaUserAlt } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiHomeSmile } from "react-icons/bi";
import { month } from "../utils/function";
import { MdSpeakerNotes, MdWork } from "react-icons/md";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import SloexUsersReviews from "../components/SloexUsersReviews";

const SolexUsers = () => {
  const { id } = useParams();
  const { data: userActive, loading } = useFetchCollectionByUid(id, "users");
  const { data } = useFetchCollectionbyParam("userUid", id, "property");

  function convert(str) {
    const date = str?.toDate();
    const mnth = month[date?.getMonth()];
    return mnth + " " + date?.getFullYear();
  }

  if (loading) return <Loader />;

  return (
    <section className="solexUsersBar">
      <div className="solexUserWrap">
        <div className="userImageBar">
          {userActive[0]?.photoURL ? (
            <img
              src={userActive[0]?.photoURL}
              alt="User"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUserAlt />
          )}

          <b className="solexUserReview">
            <AiOutlineStar />
            {userActive[0]?.reviews?.length}{" "}
            {userActive[0]?.reviews?.length > 0 ? "reviews" : "review"}
          </b>

          <h3>{userActive[0]?.firstName} Confirmed</h3>

          <div className="confirmBar">
            {userActive[0]?.profileComp === "done" && (
              <div className="confirm">
                <BsPatchCheckFill color="green" />
                <span>Profile Completed</span>
              </div>
            )}

            {userActive[0]?.location && (
              <div className="confirm">
                <BsPatchCheckFill color="green" />
                <span>Location</span>
              </div>
            )}
          </div>
        </div>

        <div className="solexUserReview">
          <div className="userEditProfileBar">
            <h2>Hi, I’m {userActive[0]?.firstName}</h2>
            <span>Joined in {convert(userActive[0]?.createdAt)}</span>

            {userActive[0]?.profileComp === "done" && (
              <div className="compDoneAbout solexUsersAbout">
                <h3>About</h3>

                {userActive[0]?.about && (
                  <b className="userAbout">{userActive[0]?.about}</b>
                )}

                <div className="compDataInfoBar">
                  {userActive[0]?.location && (
                    <div className="compDataInfo">
                      <b>
                        <BiHomeSmile className="doneIcon" />
                      </b>
                      <b>
                        Lives in <span>{userActive[0]?.location}</span>
                      </b>
                    </div>
                  )}

                  {userActive[0]?.languages.length > 0 && (
                    <div className="compDataInfo">
                      <b>
                        <MdSpeakerNotes className="doneIcon" />
                      </b>
                      <b>
                        Speak{" "}
                        <span>
                          {userActive[0]?.languages?.map((p, idx) => (
                            <b key={idx}>{p},</b>
                          ))}
                        </span>
                      </b>
                    </div>
                  )}

                  {userActive[0]?.work && (
                    <div className="compDataInfo">
                      <b>
                        <MdWork className="doneIcon" />
                      </b>
                      <b>
                        Work: <span>{userActive[0]?.work}</span>
                      </b>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="line"></div>

            {data?.length > 0 && (
              <div className="solextUserListingBar">
                <h3>{userActive[0]?.firstName} listing</h3>

                <div className="solexUserListing">
                  {data?.map((list) => (
                    <div className="solexUserListingList" key={list.id}>
                      <Link
                        to={`/rooms/${list.listing.propertyTitle}/${list.id}`}
                      >
                        <img src={list.propertyImage[0]} alt="" />

                        <div className="solexUserPInfo">
                          <div className="solexUserPInfoTop">
                            <h4>{list?.listing.propertyTitle}</h4>

                            {list.rating / list.rateCount > 0 ? (
                              <span>
                                <AiFillStar />
                                {(list.rating / list.rateCount)?.toFixed(1)}
                              </span>
                            ) : (
                              <span>New</span>
                            )}
                          </div>
                          <p>{list?.listing.propertyLocation}</p>
                          <p>
                            {list.listing.propertyType === "free"
                              ? "entire"
                              : list.listing.propertyType === "private"
                              ? "private"
                              : list.listing.propertyType === "shared"
                              ? "shared"
                              : ""}{" "}
                            . {list?.listing.property}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="line"></div>

            <SloexUsersReviews userActive={userActive} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolexUsers;
