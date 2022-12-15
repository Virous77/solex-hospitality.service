import React from "react";
import useFetchCollectionbyParam from "../../hooks/useFetchCollectionbyParam";
import { useAuthContext } from "../../store/authContext";
import WishList from "../../components/WishList";
import { useNavigate } from "react-router-dom";
import empty from "../../assets/empty.svg";
import Empty from "../../components/UI/Empty";

const Whishlists = () => {
  const { activeUser } = useAuthContext();
  const navigate = useNavigate();
  const { data, loading } = useFetchCollectionbyParam(
    "wishUser",
    activeUser?.uid,
    "wishlist"
  );

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data?.length > 0 ? (
        <section className="userListingBarContent">
          {data?.map((listing) => (
            <div
              className="userListing"
              key={listing.id}
              onClick={() =>
                navigate(`/rooms/${listing?.propertyTitle}/${listing?.bookId}`)
              }
            >
              <WishList listing={listing} />
            </div>
          ))}
        </section>
      ) : (
        <Empty title="Your Wishlist is empty." image={empty} />
      )}
    </>
  );
};

export default Whishlists;
