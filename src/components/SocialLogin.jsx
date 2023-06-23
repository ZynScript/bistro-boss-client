import React, {useContext} from "react";
import {FaGoogle} from "react-icons/fa";
import {AuthContext} from "../providers/AuthProvider";
import {useLocation, useNavigate} from "react-router-dom";

const SocialLogin = () => {
  const {googleSignIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      const saveUser = {name: user.displayName, email: user.email};
      fetch("https://bistro-boss-server-sigma-teal.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, {replace: true});
        });
    });
  };
  return (
    <div>
      <div className="divider m-0 pb-4"></div>
      <div className="text-center mb-4">
        <button onClick={handleGoogleSignIn} className="btn btn-neutral">
          <FaGoogle /> Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
