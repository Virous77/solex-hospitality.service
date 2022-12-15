import React, { useState } from "react";
import FormFour from "./FormFour";
import imageLogo from "../assets/cool.svg";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useListingContext } from "../store/listingContext";

const FormThree = ({ setShowNxts }) => {
  const [showMore, setShowMore] = useState(false);
  const [showMores, setShowMores] = useState(false);

  const {
    listing,
    setListing,
    uploadImage,
    imageAsset,
    isLoading,
    deleteImage,
  } = useListingContext();
  const { guest, bed, bathroom, bedroom } = listing;

  return (
    <>
      {!showMore && (
        <section className="count">
          <div className="head">
            <h2>Share some basics about your place</h2>
            <p>You'll add more details later, such as bed types.</p>
          </div>

          <div className="guest">
            <div className="guestData">
              <div className="guestLeft">
                <p>Guest</p>
              </div>

              <div className="guestRight">
                <p
                  onClick={() => {
                    if (guest > 1) {
                      setListing({ ...listing, guest: guest - 1 });
                    } else {
                      setListing({ ...listing, guest: 1 });
                    }
                  }}
                >
                  -
                </p>
                <span>{listing.guest}</span>
                <p
                  onClick={() => {
                    setListing({ ...listing, guest: guest + 1 });
                  }}
                >
                  +
                </p>
              </div>
            </div>

            <div className="guestData">
              <div className="guestLeft">
                <p>Beds</p>
              </div>

              <div className="guestRight">
                <p
                  onClick={() => {
                    if (bed > 1) {
                      setListing({ ...listing, bed: bed - 1 });
                    } else {
                      setListing({ ...listing, bed: 1 });
                    }
                  }}
                >
                  -
                </p>
                <span>{bed}</span>
                <p
                  onClick={() => {
                    setListing({ ...listing, bed: bed + 1 });
                  }}
                >
                  +
                </p>
              </div>
            </div>

            <div className="guestData">
              <div className="guestLeft">
                <p>Bedrooms</p>
              </div>

              <div className="guestRight">
                <p
                  onClick={() => {
                    if (bedroom > 1) {
                      setListing({ ...listing, bedroom: bedroom - 1 });
                    } else {
                      setListing({ ...listing, bedroom: 1 });
                    }
                  }}
                >
                  -
                </p>
                <span>{bedroom}</span>
                <p
                  onClick={() => {
                    setListing({ ...listing, bedroom: bedroom + 1 });
                  }}
                >
                  +
                </p>
              </div>
            </div>

            <div className="guestData">
              <div className="guestLeft">
                <p>Bathrooms</p>
              </div>

              <div className="guestRight">
                <p
                  onClick={() => {
                    if (bathroom > 1) {
                      setListing({
                        ...listing,
                        bathroom: bathroom - 1,
                      });
                    } else {
                      setListing({ ...listing, bathroom: 1 });
                    }
                  }}
                >
                  -
                </p>
                <span>{bathroom}</span>
                <p
                  onClick={() => {
                    setListing({ ...listing, bathroom: bathroom + 1 });
                  }}
                >
                  +
                </p>
              </div>
            </div>
          </div>
          <div className="secAction">
            <button className="back" onClick={() => setShowNxts(false)}>
              Back
            </button>
            <button className="next" onClick={() => setShowMore(true)}>
              Next
            </button>
          </div>
        </section>
      )}

      {!showMores && (
        <>
          {showMore && (
            <section className="formThreeSec bedRoom">
              <h3>Property Images</h3>
              <div
                className={`imageWrap ${
                  imageAsset?.length > 0 ? "imageWrapHeight" : "noIg"
                }`}
              >
                {!isLoading ? (
                  <>
                    {!imageAsset || imageAsset?.length === 0 ? (
                      <div className="formImage">
                        <input
                          type="file"
                          multiple
                          min="5"
                          onChange={uploadImage}
                        />
                        <img src={imageLogo} alt="logo" />
                        <p>Click Here upload 5 image Minimum</p>
                      </div>
                    ) : (
                      <div className="imgList">
                        {imageAsset?.map((img, idx) => (
                          <div key={idx} className="imgLists">
                            <img src={img} alt="Pics" />
                            <button onClick={() => deleteImage(img)}>
                              <RiDeleteBin3Line />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="load">
                    <p>Loading...</p>
                  </div>
                )}
              </div>

              <div className="secAction">
                <button className="back" onClick={() => setShowMore(false)}>
                  Back
                </button>
                <button
                  className="next"
                  disabled={!imageAsset || imageAsset?.length < 5}
                  onClick={() => setShowMores(true)}
                >
                  Next
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {showMores && <FormFour setShowMores={setShowMores} />}
    </>
  );
};

export default FormThree;
