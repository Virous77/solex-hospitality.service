import React, { useState } from "react";
import "../styles/Home.css";
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";
import { AiOutlineHeart, AiTwotoneHeart, AiFillStar } from "react-icons/ai";
import { useAuthContext } from "../store/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import Loader from "./UI/Loader";

const WishList = ({ listing }) => {
  const [count, setCount] = useState(0);
  const { user, activeUser } = useAuthContext();
  const navigate = useNavigate();

  const { data, loading } = useFetchCollectionbyParam(
    "wishUser",
    activeUser.uid,
    "wishlist"
  );

  const uniqueWish = data?.find((wish) => wish.bookId === listing.bookId);

  const setPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //ADD to WishList
  const saveWishList = async (e) => {
    if (!user.isLoggedIn) {
      navigate("/sign-in");
      return;
    }

    const tempData = {
      propertyImage: e.propertyImage,
      propertyTitle: e.propertyTitle,
      propertyLocation: e.propertyLocation,
      price: e.price,
      wishUser: activeUser.uid,
      bookId: e.id,
      createdAt: serverTimestamp(),
    };

    const uniqueData = data?.find((wish) => wish.bookId === e.bookId);
    try {
      if (uniqueData) {
        await deleteDoc(doc(db, "wishlist", uniqueData.id));
        return;
      }
      await addDoc(collection(db, "wishlist"), tempData);
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="homeListBar">
      <div className="homeImg">
        {listing.propertyImage.map((imgs, idx) => (
          <div div key={idx}>
            {idx === count && (
              <div>
                <img src={imgs} alt="" />

                <div className="heart">
                  {uniqueWish?.bookId === listing?.bookId ? (
                    <AiTwotoneHeart
                      className="heartIcon activeHeart"
                      onClick={(e) => {
                        saveWishList(listing);
                        e.stopPropagation();
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="heartIcon"
                      onClick={(e) => {
                        saveWishList(listing);
                        e.stopPropagation();
                      }}
                    />
                  )}
                </div>
                <div className="imgAction showAction">
                  <CgChevronLeft
                    onClick={(e) => {
                      setCount(
                        count === 0
                          ? listing.propertyImage.length - 1
                          : count - 1
                      );
                      e.stopPropagation();
                    }}
                    className="arrowIcon"
                  />
                  <CgChevronRight
                    className="arrowIcon"
                    onClick={(e) => {
                      setCount(
                        count === listing.propertyImage.length - 1
                          ? 0
                          : count + 1
                      );
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="homeName">
        <h3>{listing?.propertyTitle}</h3>
        {listing.rating / listing.rateCount > 0 ? (
          <span>
            <AiFillStar /> {(listing.rating / listing.rateCount)?.toFixed(1)}
          </span>
        ) : (
          <span>New</span>
        )}
      </div>

      <div className="hotelInfo">
        <p>{listing?.propertyLocation}</p>
        <p>
          <b>$</b>
          <span>{setPrice(listing.price)}</span> night
        </p>
      </div>
    </div>
  );
};

export default WishList;
