import React from "react";
import AddNewListing from "./AddNewListing";
import Whishlists from "./Whishlists";
import Trips from "./Trips";
import Listing from "./Listing";
import UserProfile from "./UserProfile";
import ReviewsPage from "./ReviewsPage";
import { Routes, Route, Link } from "react-router-dom";
import "../../styles/Profile.css";
import MessagePage from "./MessagePage";
import { useAuthContext } from "../../store/authContext";
import useFetchCollectionbyParam from "../../hooks/useFetchCollectionbyParam";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BiTrip, BiMessageRounded } from "react-icons/bi";
import { RiFileList3Fill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";

const ProfilePage = () => {
  const { activeUser } = useAuthContext();
  const { data: userActive } = useFetchCollectionbyParam(
    "uid",
    activeUser?.uid,
    "users"
  );

  return (
    <section className="profileBar">
      <div className="profileNav">
        <div className="profileNavWrap">
          <Link
            to={`/profile/message/${
              userActive[0]?.firstName && userActive[0]?.firstName
            }-${userActive[0]?.lastName && userActive[0]?.lastName}`}
          >
            <BiMessageRounded />
            <p>Message</p>
          </Link>

          <Link to="/profile/wishlists">
            <MdOutlineCollectionsBookmark />
            <p>Wishlists</p>
          </Link>

          <Link to="/profile/trips">
            <BiTrip />
            <p>Trips</p>
          </Link>

          <Link to="/profile/new-listing">
            <TfiWrite />
            <p>Manage Listing</p>
          </Link>

          <Link to="/profile/listing">
            <RiFileList3Fill />

            <p>Your Listing</p>
          </Link>

          <Link to={`/profile/${activeUser?.uid}`}>
            <FaUserAlt />
            <p>Profile</p>
          </Link>
        </div>
      </div>

      <Routes>
        <Route
          path="new-listing"
          element={
            <AddNewListing userActive={userActive} uid={activeUser?.uid} />
          }
        />
        <Route path="wishlists" element={<Whishlists />} />
        <Route path="trips" element={<Trips uid={activeUser?.uid} />} />
        <Route path="listing" element={<Listing />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route
          path="message/:name"
          element={<MessagePage id={activeUser?.uid} userActive={userActive} />}
        />
        <Route
          path={`${activeUser?.uid}`}
          element={<UserProfile userActive={userActive} />}
        />
      </Routes>
    </section>
  );
};

export default ProfilePage;
