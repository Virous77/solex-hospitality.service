import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../../store/authContext";

const GoogleAuth = () => {
  const { googleLogin, googleLoading } = useAuthContext();

  return (
    <div className="googleBar">
      <button onClick={googleLogin}>
        {!googleLoading ? (
          <span>
            <FcGoogle className="googleIcon" />
            Continue with Google
          </span>
        ) : (
          "Processing.."
        )}
      </button>
    </div>
  );
};

export default GoogleAuth;
