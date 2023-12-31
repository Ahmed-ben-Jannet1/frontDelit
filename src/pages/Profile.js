import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UPDATE_STATUS } from "../utils/queries";

function Profile() {
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.auth.user);

  const [update] = useMutation(UPDATE_STATUS, {});

  const updateStatus = (e) => {
    e.preventDefault();
    update({
      variables: {
        status: status,
      },
    });
  };
  return (
    <>
      <div className="container">
        <form className="login-form" onSubmit={(e) => updateStatus(e)}>
          <div className="flex-row">
            <label className="lf--label" for="Status">
              <svg x="0px" y="0px" width="12px" height="13px">
                <path
                  fill="#B1B7C4"
                  d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
                />
              </svg>
            </label>
            <input
              id="status"
              name="status"
              className="lf--input"
              placeholder={"Status : " + user.status}
              type="text"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="flex-row">
            <label className="lf--label" for="name">
              <h6>Name</h6>
            </label>
            <input
              id="name"
              name="name"
              className="lf--input"
              placeholder={user.name}
              type="text"
              disabled="true"
            />
          </div>
          <div className="flex-row">
            <label className="lf--label" for="email">
              <h6>Email</h6>
            </label>
            <input
              id="email"
              name="email"
              className="lf--input"
              placeholder={user.email}
              type="text"
              disabled="true"
            />
          </div>

          <input className="lf--submit" type="submit" value="Update Status" />
        </form>
      </div>
    </>
  );
}

export default Profile;
