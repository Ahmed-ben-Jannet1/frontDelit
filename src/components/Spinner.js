import React, { Fragment } from "react";
import spinner from "../utils/spin.gif";

const Spinner = () => {
  return (
    <Fragment>
      <section className="container">
        <img src={spinner} className="spinner" alt="Loading ..." />
      </section>
    </Fragment>
  );
};

export default Spinner;
