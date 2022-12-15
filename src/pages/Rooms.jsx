import React, { useState, useRef } from "react";
import useFetchUser from "../hooks/useFetchUser";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Rooms.css";
import Card from "../components/UI/Card";
import { AiOutlineHeart, AiTwotoneHeart, AiFillStar } from "react-icons/ai";
import { RiShareForward2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAuthContext } from "../store/authContext";
import useFetchCollectionbyParam from "../hooks/useFetchCollectionbyParam";
import RoomPropertyImage from "../components/RoomPropertyImage";
import RoomAuthor from "../components/RoomAuthor";
import BedRoomImage from "../components/BedRoomImage";
import Amentiies from "../components/Amentiies";
import RoomLocaton from "../components/RoomLocaton";
import OwnerSection from "../components/OwnerSection";
import Calander from "../components/Calander";
import RoomReview from "../components/RoomReview";
import Loader from "../components/UI/Loader";
import Share from "../components/Share";
import RoomFooter from "../components/layout/RoomFooter";

const Rooms = () => {
  const { id } = useParams();
  const { user, activeUser } = useAuthContext();
  const [showAllImage, setShowAllImage] = useState(false);
  const [showCalander, setShowCalander] = useState(false);
  const [showShare, setShowShare] = useState("");
  const navigate = useNavigate();
  const { userData, loading } = useFetchUser("property", id);
  const { data } = useFetchCollectionbyParam(
    "wishUser",
    activeUser.uid,
    "wishlist"
  );
  const { data: userActive } = useFetchCollectionbyParam(
    "uid",
    userData?.userUid,
    "users"
  );

  const uniqueWish = data?.find((wish) => wish.bookId === id);

  const scroller = useRef(null);
  const scroller2 = useRef(null);
  const scroller3 = useRef(null);

  const executeScroll = () =>
    scroller.current.scrollIntoView({ behavior: "smooth" });
  const executeScroll2 = () =>
    scroller2.current.scrollIntoView({ behavior: "smooth" });
  const executeScroll3 = () =>
    scroller3.current.scrollIntoView({ behavior: "smooth" });

  //ADD to Wishlist
  const saveWishList = async (e) => {
    if (!user.isLoggedIn) {
      navigate("/sign-in");
      return;
    }

    const tempData = {
      propertyImage: userData?.propertyImage,
      propertyTitle: userData?.listing.propertyTitle,
      propertyLocation: userData?.listing.propertyLocation,
      price: userData?.price,
      wishUser: activeUser?.uid,
      rating: userData?.rating,
      rateCount: userData?.rateCount,
      bookId: id,
      createdAt: serverTimestamp(),
    };

    const uniqueData = data?.find((wish) => wish.bookId === e);
    try {
      if (uniqueData) {
        await deleteDoc(doc(db, "wishlist", uniqueData.id));

        return;
      }
      await addDoc(collection(db, "wishlist"), tempData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <section
      className="roomsBar"
      onClick={(e) => {
        e.stopPropagation();
        setShowCalander(false);
      }}
    >
      <Card>
        <div className="roomsHead">
          <div className="roomTitle">
            <h1>{userData?.listing?.propertyTitle}</h1>
          </div>
          <div className="subHead">
            <div className="leftSub">
              {userData.rating / userData?.rateCount > 0 ? (
                <p className="roomRating" onClick={() => executeScroll3()}>
                  <AiFillStar />
                  {(userData?.rating / userData?.rateCount)?.toFixed(1)}
                </p>
              ) : (
                <p
                  className="roomRating norate"
                  onClick={() => executeScroll3()}
                >
                  New
                </p>
              )}
              <p className="roomlocation" onClick={() => executeScroll()}>
                {userData?.listing?.propertyLocation}
              </p>
            </div>
            <div className="rightSub">
              <div
                className="share"
                onClick={() => setShowShare(window.location.href)}
              >
                <RiShareForward2Fill />
                <p>Share</p>
              </div>
              {uniqueWish?.bookId === id ? (
                <div className="roomSave" onClick={() => saveWishList(id)}>
                  <AiTwotoneHeart />
                  <p>Saved</p>
                </div>
              ) : (
                <div className="roomSave" onClick={() => saveWishList(id)}>
                  <AiOutlineHeart />
                  <p>Save</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="roomPhoto">
          <RoomPropertyImage
            image={userData?.propertyImage}
            showAllImage={showAllImage}
            setShowAllImage={setShowAllImage}
            bedImg={userData?.propertyBedImage}
          />
        </div>

        <div className="wrapAll">
          <div className="smallWrapAll">
            <div>
              <RoomAuthor
                userActive={userActive}
                listing={userData}
                executeScroll2={executeScroll2}
              />
              <Amentiies type={userData?.amenitiesType} />
            </div>
          </div>
          <div style={{ justifySelf: "center" }}>
            <Calander
              userData={userData}
              showCalander={showCalander}
              setShowCalander={setShowCalander}
              propertyId={id}
            />
          </div>
        </div>

        <BedRoomImage
          image={userData?.propertyBedImage}
          setShowAllImage={setShowAllImage}
        />
        {userData.rating / userData.rateCount > 0 && (
          <RoomReview
            userData={userData}
            scroller3={scroller3}
            propertyId={id}
          />
        )}
        <RoomLocaton
          location={userData?.geolocation}
          aboutLocation={userData?.listing?.aboutLocation}
          locationData={userData?.listing?.propertyLocation}
          scroller={scroller}
        />
        <OwnerSection
          userActive={userActive}
          listing={userData}
          propertyId={id}
          scroller2={scroller2}
        />
      </Card>
      <RoomFooter />
      {showShare && <Share showShare={showShare} setShowShare={setShowShare} />}
    </section>
  );
};

export default Rooms;
