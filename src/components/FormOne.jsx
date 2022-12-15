import React, { useState } from "react";
import { svgData } from "../utils/Data";
import asset4 from "../assets/formOneicons/asset1.svg";
import asset8 from "../assets/formOneicons/asset8.svg";
import asset9 from "../assets/formOneicons/asset9.svg";
import FormTwo from "./FormTwo";
import { useListingContext } from "../store/listingContext";

const FormOne = ({ setNexts }) => {
  const [showNext, setShowNext] = useState(false);
  const [showNexts, setShowNexts] = useState(false);

  const { listing, setListing } = useListingContext();
  const { property, propertyType } = listing;

  return (
    <>
      {!showNext && (
        <section className="svg">
          <div className="svgBar">
            {svgData.map((svg) => (
              <div
                className={`svgList typesvgList ${
                  property === svg.name ? "activeSvg" : ""
                }`}
                key={svg.id}
                onClick={() => {
                  setListing({ ...listing, property: svg.name });
                }}
              >
                <img src={svg.value} alt="" />
                <p>{svg.name}</p>
              </div>
            ))}
          </div>

          <div className="secAction">
            <button onClick={() => setNexts(false)} className="back">
              Back
            </button>
            <button
              disabled={property.trim().length === 0}
              onClick={() => setShowNext(true)}
              className="next"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {!showNexts && (
        <>
          {showNext && (
            <div className="placeType">
              <h1>What type of place will guests have?</h1>

              <div className="placeWrap">
                <div
                  className={`placeList ${
                    propertyType === "free" ? "placeActive" : ""
                  }`}
                  onClick={() =>
                    setListing({ ...listing, propertyType: "free" })
                  }
                >
                  <div className="placeLeft">
                    <p>An entire place</p>
                    <span>Guests have the whole place to themselves</span>
                  </div>

                  <div className="placeLogo">
                    <img src={asset4} alt="" />
                  </div>
                </div>

                <div
                  className={`placeList ${
                    propertyType === "private" ? "placeActive" : ""
                  }`}
                  onClick={() =>
                    setListing({ ...listing, propertyType: "private" })
                  }
                >
                  <div className="placeLeft">
                    <p>An private room</p>
                    <span>
                      Guests sleep in a private room but some areas may be
                      shared with you or others.
                    </span>
                  </div>

                  <div className="placeLogo">
                    <img src={asset8} alt="" />
                  </div>
                </div>

                <div
                  className={`placeList ${
                    propertyType === "shared" ? "placeActive" : ""
                  }`}
                  onClick={() =>
                    setListing({ ...listing, propertyType: "shared" })
                  }
                >
                  <div className="placeLeft">
                    <p>An shared room</p>
                    <span>
                      Guests sleep in a room or common area that may be shared
                      with you or others.
                    </span>
                  </div>

                  <div className="placeLogo">
                    <img src={asset9} alt="" />
                  </div>
                </div>
              </div>
              <div className="secAction">
                <button onClick={() => setShowNext(false)} className="back">
                  Back
                </button>
                <button
                  disabled={propertyType.trim().length === 0}
                  onClick={() => setShowNexts(true)}
                  className="next"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {showNexts && <FormTwo setShowNexts={setShowNexts} />}
    </>
  );
};

export default FormOne;
