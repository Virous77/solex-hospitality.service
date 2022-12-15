import React, { useState } from "react";
import FormThree from "./FormThree";
import { useListingContext } from "../store/listingContext";

const FormTwo = ({ setShowNexts }) => {
  const [showNxt, setShowNxt] = useState(false);
  const [showNxts, setShowNxts] = useState(false);

  const { listing, handleChange } = useListingContext();

  const { propertyTitle, propertyAbout, propertyLocation, aboutLocation } =
    listing;

  return (
    <>
      {!showNxt && (
        <section className="formTwoSec">
          <div className="formTwoWrap">
            <div className="formTwoInput">
              <label htmlFor="propertyTitle">Property Title</label>
              <input
                type="text"
                spellCheck="true"
                name="propertyTitle"
                value={propertyTitle}
                onChange={handleChange}
              />
            </div>

            <div className="formTwoInput">
              <label htmlFor="propertyAbout">About Property</label>
              <textarea
                name="propertyAbout"
                cols="50"
                rows="6"
                value={propertyAbout}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="secAction">
            <button className="back" onClick={() => setShowNexts(false)}>
              Back
            </button>
            <button
              className="next"
              disabled={
                propertyAbout.trim().length === 0 ||
                propertyTitle.trim().length === 0
              }
              onClick={() => setShowNxt(true)}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {!showNxts && (
        <>
          {showNxt && (
            <section className="formTwoSec">
              <div className="formTwoWrap">
                <div className="formTwoInput">
                  <label htmlFor="propertyLocation">Property Address</label>
                  <input
                    type="text"
                    spellCheck="true"
                    name="propertyLocation"
                    value={propertyLocation}
                    onChange={handleChange}
                  />
                </div>

                <div className="formTwoInput">
                  <label htmlFor="aboutLocation">About Location</label>
                  <textarea
                    name="aboutLocation"
                    cols="50"
                    rows="6"
                    value={aboutLocation}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="secAction">
                <button className="back" onClick={() => setShowNxt(false)}>
                  Back
                </button>
                <button
                  className="next"
                  disabled={
                    propertyLocation.trim().length === 0 ||
                    aboutLocation.trim().length === 0
                  }
                  onClick={() => setShowNxts(true)}
                >
                  Next
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {showNxts && <FormThree setShowNxts={setShowNxts} />}
    </>
  );
};

export default FormTwo;
