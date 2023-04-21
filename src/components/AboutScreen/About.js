import React, { useContext, useEffect, useState } from "react";
import noteContext from "../../context/notes/NoteContext";
import { Link, Navigate } from "react-router-dom";
import { getUser } from "../userApi";
import Loader from "../loader/Loader";

const About = ({ user, setUser, setMessage }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(user);
  useEffect(() => {
    setLoading(true);
    getUser().then((data) => {
      console.log("data: ", data);
      setUserDetails(data.user);
      setLoading(false);
      setMessage(data.message);
    });
  }, []);

  if (!user) {
    console.log({ user });
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {loading ? (
          <Loader />
        ) : !userDetails ? (
          <div>
            login first to access this page..!
            <span>
              <Link className="btn btn-success mx-1" to="/login" role="button">
                Login
              </Link>
            </span>
            <div>
              if you don't have an account,
              <span>
                <Link
                  className="btn btn-success mx-1"
                  to="/register"
                  role="button"
                >
                  create account
                </Link>
              </span>
            </div>
          </div>
        ) : (
          <div>
            <h1>Profile</h1>
            <div className="userData">{userDetails.name}</div>
            <div>{userDetails.email}</div>
            <div className="userData">{userDetails.mobileNo}</div>
          </div>
        )}
      </div>
    );
  }
};
export default About;
