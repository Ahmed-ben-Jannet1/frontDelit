import React from "react";

function ErrorAuth() {
  return (
    <>
      <section className="container">
        <div className="text-center">
          <h1 className="large text-primary">Not Authenticated</h1>
          <h1 className="lead">Error 401</h1>
        </div>
      </section>
    </>
  );
}

export default ErrorAuth;
