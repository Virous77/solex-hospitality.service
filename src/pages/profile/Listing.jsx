import React, { useState } from "react";
import { useAuthContext } from "../../store/authContext";
import useFetchCollectionbyParam from "../../hooks/useFetchCollectionbyParam";
import HomeList from "../../components/HomeList";
import { useNavigate } from "react-router-dom";
import Empty from "../../components/UI/Empty";
import empty from "../../assets/empty2.svg";
import PropertyBooked from "../../components/PropertyBooked";
import HostCancel from "../../components/HostCancel";
import Loader from "../../components/UI/Loader";

const Listing = () => {
  const { activeUser } = useAuthContext();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("listing");
  const { data, loading } = useFetchCollectionbyParam(
    "userUid",
    activeUser?.uid,
    "property"
  );

  if (loading) return <Loader />;

  return (
    <>
      {data?.length > 0 ? (
        <section className="userListingBar">
          <div className="listingHead">
            <p
              onClick={() => setToggle("listing")}
              className={toggle === "listing" ? "listingActive " : ""}
            >
              Your Listing
            </p>
            <p
              className={toggle === "booking" ? "listingActive " : ""}
              onClick={() => setToggle("booking")}
            >
              Booking List
            </p>

            <p
              className={toggle === "cancel" ? "listingActive " : ""}
              onClick={() => setToggle("cancel")}
            >
              Cancelled
            </p>
          </div>

          {toggle === "listing" && (
            <div className="userListingBarContent">
              {data?.map((listing) => (
                <div
                  className="userListing"
                  key={listing.id}
                  onClick={() =>
                    navigate(
                      `/rooms/${listing?.listing.propertyTitle}/${listing?.id}`
                    )
                  }
                >
                  <HomeList listing={listing} />
                </div>
              ))}
            </div>
          )}

          {toggle === "booking" && <PropertyBooked />}
          {toggle === "cancel" && <HostCancel uid={activeUser?.uid} />}
        </section>
      ) : (
        <Empty
          title="You haven't listed any property yet on Solvex."
          image={empty}
        />
      )}
    </>
  );
};

export default Listing;
