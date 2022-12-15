import React, { useState } from "react";
import "../styles/Auth.css";
import { Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import GoogleAuth from "../components/auth/GoogleAuth";
import { useAuthContext } from "../store/authContext";

const RegisterPage = () => {
  const { loading, handleChange, submitUser, user } = useAuthContext();
  const { email, password, firstName, lastName, confirmPassword } = user;
  const [showPass, setShowPass] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <section className="registerBar signBar">
      <div className="authCard">
        <h1>Welcome to Solex</h1>

        <div className="form">
          <div className="inputForm">
            <input
              style={{ textTransform: "capitalize" }}
              type="text"
              name="firstName"
              placeholder="First Name"
              onFocus={() => setFocus(false)}
              value={firstName}
              onChange={handleChange}
            />
          </div>

          <div className="inputForm">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              style={{ textTransform: "capitalize" }}
              onFocus={() => setFocus(false)}
              value={lastName}
              onChange={handleChange}
            />
          </div>

          <div className="inputForm">
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              onFocus={() => setFocus(false)}
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="inputForm  eye">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onFocus={() => setFocus(true)}
              value={password}
              onChange={handleChange}
            />

            {focus && (
              <div>
                {showPass ? (
                  <BsEyeSlashFill
                    className="eyeIcon"
                    onClick={() => {
                      setShowPass(false);
                    }}
                  />
                ) : (
                  <BsEyeFill
                    className="eyeIcon"
                    onClick={() => {
                      setShowPass(true);
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="inputForm">
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              onFocus={() => setFocus(false)}
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="formLink">
            <p>Already have an account?</p>
            <span>
              <Link to="/sign-in">Sign In</Link>
            </span>
          </div>

          <div className="formButton">
            <button onClick={submitUser}>
              {loading ? "Processing" : "Sign In"}
            </button>
          </div>

          <div className="or">
            <div className="ors"></div>
            <p>OR</p>
            <div className="ors"></div>
          </div>

          <GoogleAuth />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
