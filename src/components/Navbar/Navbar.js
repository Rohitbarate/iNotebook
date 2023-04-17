import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ user, setUser,setMessage }) {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : " "
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : " "
                    } `}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            )}
            {!user ? (
              <div>
                <Link
                  className="btn btn-success mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-success mx-1"
                  to="/register"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <button
                className="btn btn-success mx-1"
                role="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  setMessage({
                    type:"success",
                    msg:"log out successfully...!"
                  })
                }}
              >
                log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
