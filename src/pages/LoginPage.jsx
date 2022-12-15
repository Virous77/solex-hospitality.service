import React, { useState } from "react";
import "../styles/Auth.css";
import { Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import GoogleAuth from "../components/auth/GoogleAuth";
import { useAuthContext } from "../store/authContext";

const LoginPage = () => {
  const { loading, handleChange, LoginUser, user } = useAuthContext();
  const { email, password } = user;
  const [showPass, setShowPass] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <section className="registerBar">
      <div className="authCard">
        <h1>Welcome to Solex</h1>

        <div className="form">
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

          <div className="formLink">
            <p>Don't have an account?</p>
            <span>
              <Link to="/sign-up">Sign Up</Link>
            </span>
          </div>

          <div className="formButton">
            <button onClick={LoginUser}>
              {loading ? "Processing" : "Sign Up"}
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

export default LoginPage;
