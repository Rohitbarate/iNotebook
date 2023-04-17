import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import Loader from "../loader/Loader";
// import MessageBox from "../messageBox/MessageBox";
import { loginUser } from "../userApi";

const Login = ({ setUser, user,setMessage }) => {
//   const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      email,
      password,
    };
    loginUser(user).then((data) => {
      if (data.token) {
        console.log(data.message.msg);
        setUser(data.token);
      }
      setMessage(data.message);
      setLoading(false);

    });
    // clear input fields if user get login successfully
    // if (message && resData.type === "success") {
    //     setEmail("");
    //     setPassword("");
    // }
  };

  if (user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="container">
        {/* {message ? <MessageBox message={message} /> : ""} */}
        <div className="form">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn btn-success">
                login
              </button>
            )}
          </form>

          <p className="convertLine">
            If you don't have an account ,
            <Link className="mx-1" to="/register" role="button">
              register
            </Link>
          </p>
        </div>
      </div>
    );
  }
};

export default Login;
