import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../store/authContext";
import { Link } from "react-router-dom";
import {
  MdOutlineMenu,
  MdLogout,
  MdOutlineCollectionsBookmark,
  MdOutlineNewLabel,
} from "react-icons/md";
import { FaRegUser, FaUserAlt } from "react-icons/fa";
import { BiTrip, BiMessageRounded } from "react-icons/bi";
import { RiFileList3Fill, RiLoginBoxLine } from "react-icons/ri";
import useFetchCollectionByUid from "../../hooks/useFetchCollectionByUid";
import "../../styles/Navbar.css";
import { useFilterContext } from "../../store/filterContext";

const Navbar = () => {
  const { activeUser, getCurrentUser, logout, user } = useAuthContext();
  const { showPopUp, setShowPopUp } = useFilterContext();

  const { data, getCollection } = useFetchCollectionByUid(
    activeUser?.uid,
    "users"
  );

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getCollection();
  }, [activeUser?.uid]);

  return (
    <nav onClick={() => setShowPopUp(false)}>
      <div className="logo">
        <Link to="/">
          <h1>Solex</h1>
        </Link>
      </div>

      <div className="navAction">
        <div
          className="userNav"
          onClick={(e) => {
            e.stopPropagation();
            setShowPopUp(!showPopUp);
          }}
        >
          <MdOutlineMenu className="navMenu" />
          {data[0]?.photoURL ? (
            <img
              src={data[0]?.photoURL}
              alt={data[0]?.firstName}
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaRegUser />
          )}
        </div>
      </div>

      {showPopUp && (
        <div className="popup">
          {user.isLoggedIn && (
            <Link to={`/profile/${activeUser?.uid}`}>
              <p onClick={() => setShowPopUp(false)}>
                <FaUserAlt />
                Profile
              </p>
            </Link>
          )}

          {user.isLoggedIn && (
            <Link
              to={`/profile/message/${
                data[0]?.firstName && data[0]?.firstName
              }-${data[0]?.lastName && data[0]?.lastName}`}
            >
              <p onClick={() => setShowPopUp(false)}>
                <BiMessageRounded />
                Message
              </p>
            </Link>
          )}

          {user.isLoggedIn && (
            <Link to="/profile/trips">
              <p onClick={() => setShowPopUp(false)}>
                <BiTrip />
                Trips
              </p>
            </Link>
          )}

          {user.isLoggedIn && (
            <Link to="/profile/wishlists">
              <p onClick={() => setShowPopUp(false)}>
                <MdOutlineCollectionsBookmark />
                Wishlists
              </p>
            </Link>
          )}

          {user.isLoggedIn && (
            <Link to="/profile/new-listing">
              <p onClick={() => setShowPopUp(false)}>
                <RiFileList3Fill />
                Manage Listing
              </p>
            </Link>
          )}

          {user.isLoggedIn && (
            <Link to="/">
              <p
                onClick={() => {
                  setShowPopUp(false);
                  logout();
                }}
              >
                <MdLogout />
                Logout
              </p>
            </Link>
          )}

          {!user.isLoggedIn && (
            <Link to="/sign-in">
              <p
                onClick={() => {
                  setShowPopUp(false);
                }}
              >
                <RiLoginBoxLine />
                Sign In
              </p>
            </Link>
          )}

          {!user.isLoggedIn && (
            <Link to="/sign-up">
              <p
                onClick={() => {
                  setShowPopUp(false);
                }}
              >
                <MdOutlineNewLabel />
                Sign Up
              </p>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
