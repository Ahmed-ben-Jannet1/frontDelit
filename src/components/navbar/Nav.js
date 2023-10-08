import React, { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { PROFILE } from "../../utils/queries";
import { authActions } from "../../store/auth-slice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin, setSignIn] = useState("active");
  const [signup, setSignUp] = useState("");

  const isAuth = localStorage.getItem("AUTH_TOKEN");

  const { loading, error, data } = useQuery(PROFILE);

  if (error) {
    console.error("Error fetching profile:", error);
    // Handle error, e.g., display an error message to the user
  }

  if (data && !error && !loading) {
    dispatch(authActions.USER_LOADED(data.profile));
  }

  const handlesignin = () => {
    setSignIn("active");
    setSignUp("");
  };
  const handlesignup = () => {
    setSignIn("");
    setSignUp("active");
  };
  const handleLogout = () => {
    dispatch(authActions.LOGOUT_OR_FAIL());
    localStorage.removeItem("isConnected");
    return navigate("/");
  };

  const notAuthLinks = (
    <>
      <div className="nav right">
        <a href="#!" className={"nav-link " + signin}>
          <span className="nav-link-span">
            <Link to="/signIn" onClick={handlesignin}>
              <span className="u-nav">Sign in</span>
            </Link>
          </span>
        </a>
        <a href="#!" className={"nav-link " + signup}>
          <span className="nav-link-span">
            <Link to="/signUp" onClick={handlesignup}>
              <span className="u-nav">Sign up</span>
            </Link>
          </span>
        </a>
      </div>
    </>
  );

  const authLinks = (
    <>
      <div className="nav right">
        <a href="#!" className={"nav-link " + signup}>
          <span className="nav-link-span">
            <Link to="/profile" onClick={handlesignup}>
              <span className="u-nav">My Profile</span>
            </Link>
          </span>
        </a>
        <a href="#!" className={"nav-link " + signin}>
          <span className="nav-link-span">
            <Link to="/list" onClick={handlesignin}>
              <span className="u-nav">To do List</span>
            </Link>
          </span>
        </a>
        <a href="#!" className="nav-link" onClick={(e) => handleLogout(e)}>
          <span className="nav-link-span">
            <span className="u-nav">Logout </span>
          </span>
        </a>
      </div>
    </>
  );

  return (
    <>
      <div id="nav-wrapper">
        <nav id="nav">
          <div className="nav left">
            <span className="gradient skew">
              <h1 className="logo un-skew">
                <a href="#home">Delit</a>
              </h1>
            </span>
            <button id="menu" className="btn-nav">
              <span className="fas fa-bars"></span>
            </button>
          </div>
          {isAuth ? authLinks : notAuthLinks}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
