import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Arnxt from "./images/arnxtreg.png";

const Navbar = () => {
  const history = useHistory();
  const onBackHandler = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    history.push("/");
  };

  let uname = JSON.parse(sessionStorage.getItem("user"));

  let pageVisisted = new Date();

  useEffect(() => {
    let logindet = document.getElementById("counter").innerHTML;

    if (logindet) {
      let pageVisisted = new Date();

      setInterval(function () {
        let timeOnSite = new Date() - pageVisisted;

        let secondsTotal = timeOnSite / 1000;
        let hours = Math.floor(secondsTotal / 3600);
        let minutes = Math.floor(secondsTotal / 60) % 3600;
        let seconds = Math.floor(secondsTotal) % 60;

        if (logindet) {
          logindet = hours + ":" + minutes + ":" + seconds;
        }
      }, 1000);
    }
  });

  return (
    <div>
      <div className="header">
        <div className="profile-info">
          <img src={Arnxt} alt="Avataar" className="profile-img" />

          <div className="profile-name">{uname && uname.email}</div>
        </div>
        <div className="profile-name">Welcome to Arxnt Internal Dashboard</div>
        <div className="logout">
          <div className="logoutinside">
            <span>Logged in:</span>{" "}
            <div className="logged-in" id="counter"></div>
          </div>
          <div className="time-year">DD:MM:YYYY hh:mm:ss</div>
          <div className="button-row-logout">
            <button className="logout-button" onClick={onBackHandler}>
              Back
            </button>
            <button className="logout-button" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
