import React, { Fragment } from "react";
import ErrorAuth from "../pages/authError/ErrorAuth";

const PrivateRoutes = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <Fragment>
        <ErrorAuth />
      </Fragment>
    );
  }
  return children;
};

export default PrivateRoutes;
