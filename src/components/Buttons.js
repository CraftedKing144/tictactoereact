import React from "react";

const Buttons = ({ reset, api }) => {
  return (
    <span className="buttons">
      <span
        className="rButton"
        onClick={() => {
          reset(false);
        }}
      >
        Reset
      </span>
      <span
        className="rButton"
        onClick={() => {
          reset(true);
        }}
      >
        Reset Points
      </span>
    </span>
  );
};

export default Buttons;
