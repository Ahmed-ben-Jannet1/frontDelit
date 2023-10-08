import logvideo from "../utils/vidlist.mp4";
import React from "react";
import classes from "./landing.module.css";

function Landing() {
  return (
    <>
      <video controls autoPlay loop muted className={classes.video}>
        <source src={logvideo} type="video/mp4" />
      </video>
    </>
  );
}

export default Landing;
