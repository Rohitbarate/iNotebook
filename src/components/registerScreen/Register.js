import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { registerNewUser } from "../userApi";

function Signup({setMessage}) {
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [phoneValid, setPhoneValid] = useState(false);

  const phoneRegex = /^[0-9]{10}$/;
  const isValid = (number) => {
    setPhoneValid(phoneRegex.test(number));
  };
  const register_User = (e)=>{
    e.preventDefault();
   const data = registerNewUser(user);
   setMessage(data.message)
  }
  return (
    <div className="container">
      <div className="form">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fName" className="form-label">
              First name
            </label>
            <input
              minLength={3}
              maxLength={15}
              type="text"
              className="form-control"
              id="fName"
              value={user.fName}
              onChange={(e) => {
                setUser({ ...user, fName: e.target.value });
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lName" className="form-label">
              Last name
            </label>
            <input
              minLength={3}
              maxLength={15}
              onError={(err) => console.log(err)}
              type="text"
              className="form-control"
              id="lName"
              value={user.lName}
              onChange={(e) => {
                setUser({ ...user, lName: e.target.value });

                // console.log(user);
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                console.log(user);
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              maxLength={10}
              minLength={10}
              type="number"
              className="form-control"
              id="phoneNumber"
              value={user.phoneNo}
              onChange={(e) => {
                setUser({ ...user, phoneNo: e.target.value });
                isValid(e.target.value);
              }}
            />
            {!phoneValid && (
              <span style={{ color: "red", fontSize: "12px" }}>
                *Phone number must be 10 degit long.
              </span>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="pass"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                console.log(user);
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="cPass" className="form-label">
              Confirm password
            </label>
            <input type="text" className="form-control" id="cPass" />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => register_User(e)}
            >
              Sign up
            </button>
          </div>
        </form>
        <p>
          If you have an account ,
          <Link className="mx-1" to="/login" role="button">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
