import React from "react";
import "./Alert.css";
import alertPic from "../../assets/compP.svg";
import { Link } from "react-router-dom";

const AlertUpdateProfile = ({ uid, setAlert }) => {
  return (
    <>
      <div className="overLay"></div>
      <div className="alertCompList">
        <img src={alertPic} alt="Error" />
        <p>
          Complete Your profile for listing property on Solex. It's important as
          customer wants to know about their host.
        </p>

        <div className="alertCompAction">
          <button onClick={() => setAlert(false)}>Cancel</button>
          <button>
            <Link to={`/profile/${uid}`}>Go to Profile</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default AlertUpdateProfile;
