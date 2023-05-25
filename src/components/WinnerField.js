import React from "react";

const WinnerField = ({ changePlayer, win }) => {
  return (
    <div className="winner">
      <span id="xPlayer" style={{ color: changePlayer ? "#e5def3" : "black" }}>
        X player: {win[0]}
      </span>
      <br />
      <span id="oPlayer" style={{ color: changePlayer ? "black" : "#e5def3" }}>
        O player: {win[1]}
      </span>
    </div>
  );
};

export default WinnerField;
