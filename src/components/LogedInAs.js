import React from "react";

const LogedInAs = ({ logedInUser, getAPI, win, showpfp }) => {

  return (
    <div className="logInAs">
      <div className="username">
        <img
          id="image"
          src={logedInUser.pfp}
          className="accountImage"
          style={{ opacity: showpfp ? "100%" : "0%" }}
          onClick={() => {
            getAPI();
          }}
        ></img>
        <div className="name">{logedInUser.username}</div>
      </div>
      <div>{showpfp ? `X player: ${win[0]}` : ""}</div>
      <div>{showpfp ? `O player: ${win[1]}` : ""}</div>
    </div>
  );
};

export default LogedInAs;
