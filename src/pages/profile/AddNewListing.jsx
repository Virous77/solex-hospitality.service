import React, { useState } from "react";
import "../../styles/Listing.css";
import asset0 from "../../assets/asset0.webp";
import asset1 from "../../assets/asset1.webp";
import asset2 from "../../assets/asset2.webp";
import interior from "../../assets/interior.jpeg";
import FormOne from "../../components/FormOne";
import AlertUpdateProfile from "../../components/UI/AlertUpdateProfile";

const AddNewListing = ({ userActive, uid }) => {
  const [next, setNext] = useState(false);
  const [nexts, setNexts] = useState(false);
  const [alert, setAlert] = useState(false);

  const validate = () => {
    if (userActive[0]?.photoURL) {
      setNexts(true);
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      {!next && (
        <section className="addListingBar">
          <div className="addListingWrap">
            <div className="rightsec">
              <h1>It’s easy to get started on Solex</h1>
            </div>

            <div className="leftSec">
              <div className="leftWrap">
                <div className="subRights">
                  <div className="subSecRight">
                    <p>1</p>
                  </div>

                  <div className="subSecLeft">
                    <h3>Tell us about your place</h3>
                    <p>
                      Share some basic info, such as where it is and how many
                      guests can stay.
                    </p>
                  </div>
                </div>

                <div className="subRight">
                  <img src={asset0} alt="bed" />
                </div>
              </div>

              <div className="leftWrap">
                <div className="subRights">
                  <div className="subSecRight">
                    <p>2</p>
                  </div>

                  <div className="subSecLeft">
                    <h3>Make it stand out</h3>
                    <p>
                      Add 5 or more photos plus a title and description – we’ll
                      help you out.
                    </p>
                  </div>
                </div>

                <div className="subRight">
                  <img src={asset1} alt="bed" />
                </div>
              </div>

              <div className="leftWrap">
                <div className="subRights">
                  <div className="subSecRight">
                    <p>3</p>
                  </div>

                  <div className="subSecLeft">
                    <h3>Finish it stand out</h3>
                    <p>
                      Set a starting price and publish your listing when you're
                      ready.
                    </p>
                  </div>
                </div>

                <div className="subRight">
                  <img src={asset2} alt="bed" />
                </div>
              </div>
            </div>
          </div>
          <div className="getStarted">
            <button onClick={() => setNext(true)}>Get Started</button>
          </div>
        </section>
      )}

      {!nexts && (
        <>
          {next && (
            <section className="tellUs">
              <div className="tellUsWrap">
                <div className="leftTell">
                  <span>STEP 1</span>
                  <h1>Tell us about your place</h1>
                  <p>
                    In this step, we'll ask you which type of property you have
                    and if guests will book the entire place or just a room.
                    Then let us know the location and how many guests can stay.
                  </p>
                </div>

                <div className="rightTell">
                  <img src={interior} alt="" />
                </div>
              </div>

              <div className="nextAction">
                <button className="back" onClick={() => setNext(false)}>
                  Back
                </button>

                <button
                  className="next"
                  onClick={() => {
                    validate();
                  }}
                >
                  Next
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {nexts && <FormOne setNexts={setNexts} />}
      {alert && <AlertUpdateProfile uid={uid} setAlert={setAlert} />}
    </>
  );
};

export default AddNewListing;
